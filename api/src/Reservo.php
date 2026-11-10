<?php
// api/src/Reservo.php
//
// Cliente + repositorio para reservo.cl, portado desde el scraper Node
// (reservoClient.js + reservoRepo.js + parsers.js). Hace login con cookies
// de sesión persistidas en disco, y expone métodos de lectura/escritura.

namespace App;

class Reservo
{
    private string $baseUrl;
    private string $username;
    private string $password;
    private string $accountId;
    private string $cookieFile;
    private bool $verifySsl;
    private ?string $apiV2Token;
    private string $userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

    public function __construct(array $cfg)
    {
        $this->baseUrl    = rtrim($cfg['base_url'] ?? 'https://reservo.cl', '/');
        $this->username   = $cfg['username'] ?? '';
        $this->password   = $cfg['password'] ?? '';
        $this->accountId  = (string)($cfg['account_id'] ?? '');
        // Token de la API pública v2 (opcional). Vive SOLO en config.php del
        // server. Con él la disponibilidad se contrasta contra la fuente oficial
        // (incluye BLOQUEOS de agenda que el scraper no ve); sin él, todo sigue
        // funcionando con el cálculo propio.
        $this->apiV2Token = $cfg['api_v2_token'] ?? null;
        $this->cookieFile = $cfg['cookie_file'] ?? (sys_get_temp_dir() . '/reservo_session.cookie');
        // Verificación TLS activa por defecto; solo desactivable explícitamente
        // (p.ej. entorno local sin bundle de CA, vía RESERVO_INSECURE_SSL=1).
        // En producción esa env var no existe -> SSL siempre verificado.
        $this->verifySsl  = ($cfg['verify_ssl'] ?? true) && getenv('RESERVO_INSECURE_SSL') !== '1';
    }

    // ---------------------------------------------------------------- HTTP ---

    /**
     * Petición HTTP cruda con curl. Devuelve [status, body, url, headers].
     * $followRedirect controla CURLOPT_FOLLOWLOCATION (clave para el login).
     */
    private function curl(string $url, array $opts = []): array
    {
        $method        = $opts['method'] ?? 'GET';
        $form          = $opts['form'] ?? null;
        $extraHeaders  = $opts['headers'] ?? [];
        $followRedirect = $opts['followRedirect'] ?? true;

        $headers = ['User-Agent: ' . $this->userAgent];
        foreach ($extraHeaders as $k => $v) {
            $headers[] = $k . ': ' . $v;
        }

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER         => true,
            CURLOPT_CUSTOMREQUEST  => $method,
            CURLOPT_FOLLOWLOCATION => $followRedirect,
            CURLOPT_MAXREDIRS      => 10,
            CURLOPT_COOKIEJAR      => $this->cookieFile,
            CURLOPT_COOKIEFILE     => $this->cookieFile,
            CURLOPT_TIMEOUT        => 30,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_HTTPHEADER     => $headers,
            CURLOPT_SSL_VERIFYPEER => $this->verifySsl,
            CURLOPT_SSL_VERIFYHOST => $this->verifySsl ? 2 : 0,
        ]);

        if ($form !== null) {
            // form-encoded (igual que got { form })
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($form));
            $headers[] = 'Content-Type: application/x-www-form-urlencoded';
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }

        $raw    = curl_exec($ch);
        if ($raw === false) {
            $err = curl_error($ch);
            curl_close($ch);
            throw new \RuntimeException("Fallo de red hacia reservo.cl: $err");
        }
        $status     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $finalUrl   = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
        curl_close($ch);

        $rawHeaders = substr($raw, 0, $headerSize);
        $body       = substr($raw, $headerSize);

        return [
            'status'  => $status,
            'body'    => $body,
            'url'     => $finalUrl,
            'headers' => $rawHeaders,
        ];
    }

    private function csrfFromCookies(): string
    {
        if (!is_readable($this->cookieFile)) return '';
        $contents = file_get_contents($this->cookieFile);
        if ($contents === false) return '';
        // Netscape cookie file: columnas separadas por tab; la 6ª es el nombre,
        // la 7ª el valor.
        foreach (preg_split('/\r?\n/', $contents) as $line) {
            if ($line === '' || $line[0] === '#') {
                // las cookies HttpOnly van como "#HttpOnly_dominio\t..."
                if (strpos($line, 'csrftoken') === false) continue;
            }
            $cols = explode("\t", $line);
            if (count($cols) >= 7 && $cols[5] === 'csrftoken') {
                return trim($cols[6]);
            }
        }
        return '';
    }

    // --------------------------------------------------------------- LOGIN ---

    private function login(): void
    {
        $loginUrl = $this->baseUrl . '/accounts/login/';

        // 1) GET para el token CSRF (atributo csrf="..." del componente <log-in>).
        $page = $this->curl($loginUrl);
        if (!preg_match('/csrf="([^"]+)"/', $page['body'], $m)) {
            throw new \RuntimeException('No se pudo obtener el token CSRF de la página de login.');
        }
        $csrf = $m[1];

        // 2) POST sin seguir redirect (si se sigue, curl arrastra el método al 2fa → 500).
        $res = $this->curl($loginUrl, [
            'method' => 'POST',
            'headers' => [
                'Referer' => $loginUrl,
                'Origin'  => $this->baseUrl,
            ],
            'form' => [
                'csrfmiddlewaretoken' => $csrf,
                'username' => $this->username,
                'password' => $this->password,
                'next' => '',
            ],
            'followRedirect' => false,
        ]);

        $location = '';
        if (preg_match('/^location:\s*(.+)$/mi', $res['headers'], $lm)) {
            $location = trim($lm[1]);
        }
        if ($res['status'] !== 302 || strpos($location, '/accounts/login') !== false) {
            throw new \RuntimeException('Login rechazado: credenciales inválidas o el flujo de login cambió.');
        }

        // 3) GET limpio a /accounts/2fa/ para finalizar la sesión (solo redirige).
        $this->curl($this->baseUrl . '/accounts/2fa/', ['followRedirect' => false]);
    }

    /**
     * Petición autenticada con reintento de login si la sesión expiró.
     */
    private function request(string $path, array $opts = []): array
    {
        $url = (strpos($path, 'http') === 0) ? $path : $this->baseUrl . $path;

        $run = function () use ($url, $opts) {
            $headers = [
                'Referer'     => $this->baseUrl . '/appointment/viewAppt/',
                'Origin'      => $this->baseUrl,
                'x-csrftoken' => $this->csrfFromCookies(),
            ];
            $opts['headers'] = array_merge($headers, $opts['headers'] ?? []);
            return $this->curl($url, $opts);
        };

        // Sesión inválida: en endpoints HTML Django redirige a /accounts/login,
        // pero en endpoints AJAX (POST) responde 403 directo sin redirigir. Ambos
        // casos requieren (re)login.
        $needsLogin = function (array $r): bool {
            return strpos($r['url'] ?? '', '/accounts/login') !== false
                || (int)($r['status'] ?? 0) === 403;
        };

        $res = $run();
        if ($needsLogin($res)) {
            $this->login();
            $res = $run();
            if ($needsLogin($res)) {
                throw new \RuntimeException('No se pudo autenticar contra reservo.cl tras reintentar.');
            }
        }
        return $res;
    }

    private function getDom(string $path, array $opts = []): \DOMXPath
    {
        $res = $this->request($path, $opts);
        $doc = new \DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML('<?xml encoding="utf-8" ?>' . $res['body']);
        libxml_clear_errors();
        return new \DOMXPath($doc);
    }

    private function getJson(string $path, array $opts = []): array
    {
        $res = $this->request($path, $opts);
        $data = json_decode($res['body'], true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            // Sesión fría: algunos endpoints AJAX (p.ej. obtenerDisponibilidad)
            // devuelven HTML con status 200 sin redirigir a /accounts/login, así
            // que request() no reintenta. Forzamos un login y reintentamos una vez.
            $this->login();
            $res = $this->request($path, $opts);
            $data = json_decode($res['body'], true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \RuntimeException("Se esperaba JSON de $path pero la respuesta no lo era (¿sesión expirada o params faltantes?).");
            }
        }
        return $data;
    }

    // ------------------------------------------------------------- HELPERS ---

    private static function clean(?string $s): string
    {
        return trim(preg_replace('/\s+/', ' ', $s ?? ''));
    }

    private function nodeText(?\DOMNode $n): string
    {
        return $n ? self::clean($n->textContent) : '';
    }

    // ------------------------------------------------------------ PARSERS ----

    /**
     * Servicios / tratamientos: tabla #tabla_tratamientos con inputs *_{id}.
     */
    public function getServicios(): array
    {
        $xp = $this->getDom('/tratamiento/makeedittratamientofast/');
        $byId = [];
        $nodes = $xp->query("//*[@id='tabla_tratamientos']//input | //*[@id='tabla_tratamientos']//select");
        foreach ($nodes as $el) {
            /** @var \DOMElement $el */
            $name = $el->getAttribute('name');
            if (!preg_match('/^([a-z]+)_(\d+)$/i', $name, $m)) continue;
            [, $field, $id] = $m;
            if (!isset($byId[$id])) $byId[$id] = ['id' => $id];
            $type = strtolower($el->getAttribute('type'));
            if ($type === 'checkbox') {
                $byId[$id][$field] = $el->hasAttribute('checked');
            } else {
                $byId[$id][$field] = $el->getAttribute('value');
            }
        }
        $out = [];
        foreach ($byId as $s) {
            $out[] = [
                'id'                   => $s['id'],
                'nombre'               => $s['nombre'] ?? '',
                'precio'               => $s['precio'] ?? '',
                'duracion'             => $s['duracion'] ?? '',
                'comision'             => $s['comision'] ?? '',
                'reserva_online'       => !empty($s['online']),
                'requiere_pago_online' => !empty($s['pagoonline']),
                'videoconferencia'     => !empty($s['videoconferencia']),
                'orden'                => $s['orden'] ?? '',
            ];
        }
        return $out;
    }

    /**
     * Agendas / profesionales: inputs nombre-agenda-{id}.
     */
    public function getAgendas(): array
    {
        $xp = $this->getDom('/schedule/listSchedule/');
        $out = [];
        $nodes = $xp->query("//input[starts-with(@name,'nombre-agenda-')]");
        foreach ($nodes as $input) {
            /** @var \DOMElement $input */
            $id = str_replace('nombre-agenda-', '', $input->getAttribute('name'));
            $categoria = null;
            $sel = $xp->query("ancestor::tr[1]//select//option[@selected]", $input)->item(0);
            if ($sel) $categoria = self::clean($sel->textContent) ?: null;
            $out[] = [
                'id'        => $id,
                'nombre'    => $input->getAttribute('value'),
                'categoria' => $categoria,
            ];
        }
        return $out;
    }

    /**
     * Citas del día seleccionado: tabla #citasdia.
     */
    public function getCitas(): array
    {
        $xp = $this->getDom("/appointment/listAppointmentDay/{$this->accountId}/");
        $out = [];
        foreach ($xp->query("//*[@id='citasdia']//tr") as $tr) {
            $tds = $xp->query('.//td', $tr);
            if ($tds->length < 9) continue;
            $cell = fn($i) => self::clean($tds->item($i)->textContent);
            $estadoSelNode = $xp->query(".//option[@selected]", $tds->item(5))->item(0);
            $estado = $estadoSelNode ? self::clean($estadoSelNode->textContent) : $cell(5);
            $out[] = [
                'hora'             => $cell(0),
                'rut'              => $cell(1),
                'nombre'           => $cell(2),
                'servicio'         => $cell(3),
                'comentario'       => $cell(4),
                'estado'           => $estado,
                'contacto'         => preg_replace('/^Tel[eé]fono:\s*/i', '', $cell(6)),
                'ficha'            => $cell(7) ?: null,
                'box_profesional'  => $cell(8),
            ];
        }
        return $out;
    }

    // ----------------------------------------------------- DISPONIBILIDAD ----

    /**
     * Disponibilidad "por profesional" (obtenerDisponibilidad). El endpoint
     * ignora el parámetro `servicios` y SIEMPRE devuelve el horario de TODOS
     * los profesionales, indexado por id de profesional (no de box). Se conserva
     * por compatibilidad, pero para calcular slots por box usa getHorarioBox().
     */
    public function getDisponibilidad(string $fecha, string $vista = 'dia', ?string $servicios = null): array
    {
        return $this->getJson('/disponibilidad/obtenerDisponibilidad/', [
            'method' => 'POST',
            'form' => ['fecha' => $fecha, 'vista' => $vista],
            'headers' => ['x-requested-with' => 'XMLHttpRequest'],
        ]);
    }

    /**
     * Horario de atención por BOX/agenda (vista "por box"): /schedule/obtenerschedule/.
     * La respuesta está indexada por id de box (= id de getAgendas / campo
     * `servicio` de createAppt), e incluye la granularidad de la grilla (`slots`),
     * el rango global (`inicio`/`fin`) y las `annotations` por día de la semana
     * con { dia(1-7), horaInicio, horaFin, tratamientos, all_tratamientos }.
     *
     * @param string $boxIds  uno o varios ids separados por coma
     */
    public function getHorarioBox(string $fecha, string $boxIds, string $vista = 'dia'): array
    {
        return $this->getJson('/schedule/obtenerschedule/', [
            'method' => 'POST',
            'form' => ['fecha' => $fecha, 'vista' => $vista, 'servicios' => $boxIds],
            'headers' => ['x-requested-with' => 'XMLHttpRequest'],
        ]);
    }

    /**
     * Resuelve el token público de una agenda (agendamiento.reservo.cl/makereserva/agenda/TOKEN)
     * a sus datos internos, parseando el JSON embebido en la página pública
     * (servicios_prop = profesionales [cliente.personal], tratamientos_prop).
     * NO requiere sesión autenticada.
     *
     * @return array{profesionales: array, tratamientos: array}
     */
    public function getAgendaPublica(string $token): array
    {
        $url = 'https://agendamiento.reservo.cl/makereserva/agenda/' . rawurlencode($token);
        $res = $this->curl($url);
        $body = $res['body'] ?? '';

        $extract = function (string $prop) use ($body): array {
            if (!preg_match('/' . preg_quote($prop, '/') . '="([^"]*)"/', $body, $m)) return [];
            $json = html_entity_decode($m[1], ENT_QUOTES);
            $data = json_decode($json, true);
            return is_array($data) ? $data : [];
        };

        $profesionales = [];
        foreach ($extract('servicios_prop') as $p) {
            $profesionales[] = [
                'id'     => (string)($p['pk'] ?? ''),
                'nombre' => $p['fields']['nombre'] ?? '',
                'cargo'  => $p['fields']['cargo'] ?? '',
                'color'  => $p['fields']['color'] ?? '',
            ];
        }

        $tratamientos = [];
        foreach ($extract('tratamientos_prop') as $t) {
            $f = $t['fields'] ?? [];
            $tratamientos[] = [
                'id'          => (string)($t['pk'] ?? ''),
                'nombre'      => $f['nombre'] ?? '',
                'duracion'    => $f['duracion'] ?? '',       // "HH:MM:SS"
                'valor'       => $f['valor'] ?? '',
                'online'      => !empty($f['online']),
                'usa_abono'   => !empty($f['usa_abono']),
                'monto_abono' => $f['monto_abono'] ?? '0',
                'pago_online' => !empty($f['pago_online']),
            ];
        }

        return ['profesionales' => $profesionales, 'tratamientos' => $tratamientos];
    }

    // ------------------------------------------------- API pública v2 ---

    /** GET autenticado contra la API pública v2. null si no hay token o falla. */
    private function v2Get(string $path, array $params = []): ?array
    {
        if (!$this->apiV2Token) return null;
        $url = 'https://reservo.cl/APIpublica/v2/' . ltrim($path, '/');
        if ($params) $url .= '?' . http_build_query($params);
        $res = $this->curl($url, ['headers' => ['Authorization' => 'Token ' . $this->apiV2Token]]);
        if (($res['status'] ?? 0) !== 200) return null;
        $data = json_decode($res['body'] ?? '', true);
        return is_array($data) ? $data : null;
    }

    /** normaliza nombres para casarlos entre la página pública y la API v2 */
    private static function normNombre(string $s): string
    {
        $s = mb_strtolower(trim($s));
        $s = strtr($s, ['á'=>'a','é'=>'e','í'=>'i','ó'=>'o','ú'=>'u','ü'=>'u','ñ'=>'n']);
        return preg_replace('/\s+/', ' ', $s);
    }

    /**
     * Agenda online GENERAL del centro (lista TODOS los profesionales y
     * tratamientos en la API v2). Fallback para resolver uuids cuando la agenda
     * de reserva no expone tratamientos vía v2 (varias agendas dedicadas no lo
     * hacen). La disponibilidad del profesional es la misma se mire por la
     * agenda que se mire: su calendario real es uno solo.
     */
    private const V2_AGENDA_GENERAL = 'J0wvbdv0d0vhLv1G6a55aoc5t169SO';

    /**
     * Busca el uuid v2 de un tratamiento por nombre. El buscador de reservo es
     * sensible a tildes y matchea por palabra, así que se consulta con la
     * palabra más distintiva del nombre (no "consulta"/"evaluación") y se exige
     * igualdad de nombre normalizado.
     */
    private function v2BuscarTratamiento(string $agenda, string $nombre): ?string
    {
        $palabras = preg_split('/[^\p{L}\p{N}]+/u', $nombre, -1, PREG_SPLIT_NO_EMPTY) ?: [];
        $genericas = ['consulta', 'evaluacion', 'evaluación', 'medica', 'médica', 'control', 'integral', 'sesion', 'sesión'];
        usort($palabras, fn($a, $b) => mb_strlen($b) <=> mb_strlen($a));
        $candidatas = array_values(array_filter(
            $palabras,
            fn($w) => mb_strlen($w) >= 5 && !in_array(mb_strtolower($w), $genericas, true)
        ));
        if (!$candidatas) $candidatas = $palabras;
        foreach (array_slice($candidatas, 0, 2) as $q) {
            $lista = $this->v2Get("agenda_online/{$agenda}/tratamientos/", ['search_text' => $q]);
            foreach (($lista['resultados'] ?? []) as $r) {
                if (self::normNombre($r['nombre'] ?? '') === self::normNombre($nombre)) return $r['uuid'];
            }
        }
        return null;
    }

    /** Busca el uuid v2 de un profesional por nombre (mismas reglas de búsqueda). */
    private function v2BuscarProfesional(string $agenda, string $nombre): ?string
    {
        $corto = trim(explode('-', $nombre)[0]);
        $palabras = preg_split('/[^\p{L}\p{N}]+/u', $corto, -1, PREG_SPLIT_NO_EMPTY) ?: [];
        usort($palabras, fn($a, $b) => mb_strlen($b) <=> mb_strlen($a));
        $consultas = array_unique(array_merge([$corto], array_slice($palabras, 0, 2)));
        foreach ($consultas as $q) {
            if ($q === '') continue;
            $lista = $this->v2Get("agenda_online/{$agenda}/profesionales/", ['search_text' => mb_substr($q, 0, 30)]);
            foreach (($lista['resultados'] ?? []) as $r) {
                if (self::normNombre($r['nombre'] ?? '') === self::normNombre($nombre)) return $r['uuid'];
            }
        }
        return null;
    }

    /**
     * Resuelve (agenda v2 utilizable, uuid_tratamiento, uuid_profesional) para
     * los ids numéricos dados. Prueba primero la agenda de reserva y luego la
     * agenda GENERAL como fallback. Los nombres salen de getAgendaPublica de la
     * agenda de reserva (los mismos en todas las agendas del centro).
     * @return array{agenda: string, uuid_tratamiento: string, uuid_profesional: ?string}|null
     */
    private function v2ResolverUuids(string $agendaToken, ?string $tratamientoId, ?string $profesionalId): ?array
    {
        if ($tratamientoId === null || $tratamientoId === '') return null;
        $pub = $this->getAgendaPublica($agendaToken);

        $tratNombre = null;
        foreach ($pub['tratamientos'] as $t) {
            if ((string) $t['id'] === (string) $tratamientoId) { $tratNombre = $t['nombre']; break; }
        }
        if ($tratNombre === null) return null;

        $profNombre = null;
        if ($profesionalId !== null && $profesionalId !== '') {
            foreach ($pub['profesionales'] as $p) {
                if ((string) $p['id'] === (string) $profesionalId) { $profNombre = $p['nombre']; break; }
            }
        }

        foreach (array_unique([$agendaToken, self::V2_AGENDA_GENERAL]) as $agenda) {
            $ut = $this->v2BuscarTratamiento($agenda, $tratNombre);
            if ($ut === null) continue;
            $up = null;
            if ($profNombre !== null) {
                $up = $this->v2BuscarProfesional($agenda, $profNombre);
                if ($up === null) continue; // el profesional no está en esta agenda v2
            }
            return ['agenda' => $agenda, 'uuid_tratamiento' => $ut, 'uuid_profesional' => $up];
        }
        return null;
    }

    /**
     * Llama a horarios_disponibles y devuelve las horas por FECHA.
     *
     * OJO con la semántica de reservo: `fecha` NO filtra un día. La respuesta
     * cubre la SEMANA CALENDARIO (domingo a sábado) que contiene esa fecha,
     * desde ella en adelante, y sólo incluye los días con cupos. Por eso:
     *  - para un día concreto hay que quedarse con esa fecha (fusionar la
     *    respuesta mostraría horas de otros días como si fueran del pedido), y
     *  - para recorrer el calendario hay que avanzar SEMANA a SEMANA (una
     *    semana sin cupos responde vacío y no significa "no hay nada más").
     *
     * @return array<string, array<string, string[]>>|null  fecha => hora => [ids prof]
     */
    private function v2HorariosPorFecha(array $uuids, string $desde, array $idPorNombre): ?array
    {
        $params = ['fecha' => $desde, 'uuid_tratamiento' => $uuids['uuid_tratamiento']];
        if (!empty($uuids['uuid_profesional'])) $params['uuid_profesional'] = $uuids['uuid_profesional'];
        $data = $this->v2Get("agenda_online/{$uuids['agenda']}/horarios_disponibles/", $params);
        if ($data === null) return null;

        $out = [];
        foreach ($data as $dia) {
            $f = (string) ($dia['fecha'] ?? '');
            if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $f)) continue;
            if (!isset($out[$f])) $out[$f] = [];
            foreach (($dia['sucursales'] ?? []) as $suc) {
                foreach (($suc['profesionales'] ?? []) as $p) {
                    $pid = $idPorNombre[self::normNombre((string) ($p['nombre'] ?? ''))] ?? null;
                    if ($pid === null) continue; // profesional ajeno a esta agenda
                    foreach (($p['horas_disponibles'] ?? []) as $iso) {
                        // "2026-08-19T09:30:00-04:00" -> "09:30"
                        if (preg_match('/T(\d{2}:\d{2})/', (string) $iso, $m)) {
                            $out[$f][$m[1]][$pid] = true;
                        }
                    }
                }
            }
        }
        return $out;
    }

    /** nombre normalizado -> id numérico de profesional, según la agenda pública. */
    private function idsPorNombre(string $agendaToken): array
    {
        $map = [];
        foreach ($this->getAgendaPublica($agendaToken)['profesionales'] as $p) {
            $map[self::normNombre($p['nombre'])] = (string) $p['id'];
        }
        return $map;
    }

    /**
     * CUPOS OFICIALES de una agenda pública para UNA fecha según la API v2:
     * exactamente lo que reservo ofrece al paciente (considera bloqueos, citas
     * y el re-anclaje de la grilla tras cada reserva — la grilla oficial no es
     * fija, se corre según las citas tomadas; por eso se usa tal cual y no se
     * intersecta con una grilla propia).
     * Devuelve null si no hay token v2 / no se resolvió el tratamiento (el
     * llamador cae a su cálculo propio). Lista vacía = día sin cupos.
     *
     * @return array<int, array{hora: string, profs: string[]}>|null
     */
    public function getCuposOficiales(string $agendaToken, string $fecha, ?string $tratamientoId): ?array
    {
        if (!$this->apiV2Token || $tratamientoId === null || $tratamientoId === '') return null;
        $uuids = $this->v2ResolverUuids($agendaToken, $tratamientoId, null);
        if ($uuids === null) return null;

        $porFecha = $this->v2HorariosPorFecha($uuids, $fecha, $this->idsPorNombre($agendaToken));
        if ($porFecha === null) return null;

        // SOLO el día pedido: el resto de la respuesta son fechas posteriores.
        $porHora = $porFecha[$fecha] ?? [];
        ksort($porHora);
        $out = [];
        foreach ($porHora as $hora => $profs) {
            $out[] = ['hora' => $hora, 'profs' => array_keys($profs)];
        }
        return $out;
    }

    /**
     * Días con cupo REAL según la API v2, entre $desde y $hasta. Recorre el
     * calendario SEMANA a SEMANA (ver v2HorariosPorFecha).
     *
     * $maxSemanas acota el costo (1 request por semana). Si aún no se encuentra
     * ningún día se sigue buscando hasta $maxSemanasVacias: las agendas con poca
     * carga pueden tener su primera hora recién varias semanas más adelante.
     *
     * @return array{dias: string[], cubierto_hasta: string}|null
     *         `cubierto_hasta` = fecha hasta la cual estos días son la verdad
     *         COMPLETA (más allá el llamador debe usar su propio cálculo).
     */
    public function getDiasOficiales(
        string $agendaToken,
        ?string $tratamientoId,
        ?string $profesionalId,
        string $desde,
        string $hasta,
        int $maxSemanas = 3,
        int $maxSemanasVacias = 6
    ): ?array {
        if (!$this->apiV2Token || $tratamientoId === null || $tratamientoId === '') return null;
        $uuids = $this->v2ResolverUuids($agendaToken, $tratamientoId, $profesionalId);
        if ($uuids === null) return null;
        $idPorNombre = $this->idsPorNombre($agendaToken);

        $dias = [];
        $cursor = $desde;
        $cubierto = date('Y-m-d', strtotime($desde) - 86400); // aún nada verificado
        $huboRespuesta = false;
        $contiguo = true;

        for ($i = 0; $cursor <= $hasta; $i++) {
            // se corta al llegar al tope, salvo que aún no haya ningún día
            if ($i >= $maxSemanas && ($dias || $i >= $maxSemanasVacias)) break;

            $ts = strtotime($cursor);
            $finSemana = date('Y-m-d', $ts + (6 - (int) date('w', $ts)) * 86400);

            // Una semana puede fallar puntualmente (el upstream se satura): se
            // salta sin dar por verificado ese tramo, en vez de abortar todo.
            $porFecha = $this->v2HorariosPorFecha($uuids, $cursor, $idPorNombre);
            if ($porFecha === null) {
                $contiguo = false;   // desde aquí ya no se puede afirmar cobertura
                $cursor = date('Y-m-d', strtotime($finSemana) + 86400);
                continue;
            }
            $huboRespuesta = true;
            foreach ($porFecha as $f => $horas) {
                if ($horas && $f >= $desde && $f <= $hasta) $dias[] = $f;
            }

            // La respuesta cubre hasta el sábado de esa semana. `cubierto` sólo
            // avanza mientras las semanas verificadas sean CONTIGUAS desde el
            // inicio: si una falló, más allá no se puede descartar nada.
            if ($contiguo) $cubierto = min($finSemana, $hasta);
            $cursor = date('Y-m-d', strtotime($finSemana) + 86400);
        }

        // Sin ninguna respuesta útil: que el llamador use su propio cálculo.
        if (!$huboRespuesta) return null;

        $dias = array_values(array_unique($dias));
        sort($dias);
        return ['dias' => $dias, 'cubierto_hasta' => $cubierto];
    }

    /**
     * Slots por PROFESIONAL (modelo elegido). Usa obtenerDisponibilidad, que
     * devuelve el horario de todos los profesionales indexado por id de
     * profesional, con ventanas (turnos partidos) en `dias`.
     *
     * @param string $profId  id de profesional (cliente.personal pk)
     * @param string $fecha   YYYY-MM-DD
     * @param int    $durMin  duración del tratamiento en minutos
     * @param int    $pasoMin granularidad de la grilla (default = duración)
     */
    public function getSlotsProfesional(string $profId, string $fecha, int $durMin, int $pasoMin = 0): array
    {
        if ($durMin <= 0) $durMin = 30;
        if ($pasoMin <= 0) $pasoMin = $durMin;

        $disp = $this->getDisponibilidad($fecha, 'dia');
        return $this->slotsDesdeProf($disp[$profId] ?? null, $fecha, $durMin, $pasoMin);
    }

    /**
     * Slots COMBINADOS de varios profesionales (vista por tratamiento). Calcula
     * los slots de cada profesional y los une por hora; cada slot indica qué
     * profesionales están disponibles a esa hora (`profesionales`), para que al
     * elegir se asigne uno y, con él, su box.
     *
     * @param string[] $profIds
     * @return array  [['horaInicio','horaFin','profesionales'=>[ids]], ...]
     */
    public function getSlotsCombinados(array $profIds, string $fecha, int $durMin, int $pasoMin = 0): array
    {
        if ($durMin <= 0) $durMin = 30;
        if ($pasoMin <= 0) $pasoMin = $durMin;

        $disp = $this->getDisponibilidad($fecha, 'dia');
        $byTime = [];
        foreach ($profIds as $pid) {
            $pid = (string)$pid;
            foreach ($this->slotsDesdeProf($disp[$pid] ?? null, $fecha, $durMin, $pasoMin) as $s) {
                $k = $s['horaInicio'];
                if (!isset($byTime[$k])) {
                    $byTime[$k] = ['horaInicio' => $s['horaInicio'], 'horaFin' => $s['horaFin'], 'profesionales' => []];
                }
                $byTime[$k]['profesionales'][] = $pid;
            }
        }
        ksort($byTime);
        return array_values($byTime);
    }

    /**
     * Días (YYYY-MM-DD) con al menos una ventana de atención para alguno de los
     * profesionales dados, dentro de los próximos $numDias desde $desde. Hace UNA
     * sola llamada a obtenerDisponibilidad y computa el resto localmente. NO
     * descuenta citas ya tomadas: sirve para pintar el calendario semanal; el
     * detalle real del día se valida con getSlots* al elegirlo.
     *
     * @param string[] $profIds
     * @return string[] fechas ordenadas con disponibilidad de ventana
     */
    public function getDiasConVentana(array $profIds, string $desde, int $numDias, int $durMin): array
    {
        if ($durMin <= 0) $durMin = 30;
        $disp = $this->getDisponibilidad($desde, 'dia');
        $out = [];
        $ts = strtotime($desde);
        if ($ts === false) return [];
        for ($i = 0; $i < $numDias; $i++) {
            $fecha = date('Y-m-d', $ts + $i * 86400);
            foreach ($profIds as $pid) {
                if ($this->slotsDesdeProf($disp[(string) $pid] ?? null, $fecha, $durMin, $durMin)) {
                    $out[] = $fecha;
                    break;
                }
            }
        }
        return $out;
    }

    /**
     * Genera los slots de UN profesional a partir de su entrada de
     * obtenerDisponibilidad ya descargada (evita repetir la llamada de red).
     */
    private function slotsDesdeProf(?array $prof, string $fecha, int $durMin, int $pasoMin): array
    {
        if (!$prof || empty($prof['dias'])) return [];
        if (!empty($prof['fechaInicio']) && $fecha < $prof['fechaInicio']) return [];
        if (!empty($prof['fechaTermino']) && $fecha > $prof['fechaTermino']) return [];

        $weekday = (int) date('N', strtotime($fecha));
        $toMin = function ($hms) {
            $p = explode(':', $hms);
            return ((int)$p[0]) * 60 + ((int)($p[1] ?? 0));
        };
        $fmt = fn($m) => sprintf('%02d:%02d', intdiv($m, 60), $m % 60);

        // No mostrar horas ya pasadas si la fecha es hoy (hora de Chile).
        $minDesde = -1;
        try {
            $ahora = new \DateTime('now', new \DateTimeZone('America/Santiago'));
            if ($fecha === $ahora->format('Y-m-d')) {
                $minDesde = ((int)$ahora->format('H')) * 60 + ((int)$ahora->format('i'));
            }
        } catch (\Throwable $e) { /* sin filtro si falla la zona horaria */ }

        $slots = [];
        $seen = [];
        foreach ($prof['dias'] as $win) {
            if ((int)($win['dia'] ?? 0) !== $weekday) continue;
            if (empty($win['horaInicio']) || empty($win['horaFin'])) continue;
            $ini = $toMin($win['horaInicio']);
            $fin = $toMin($win['horaFin']);
            for ($t = $ini; $t + $durMin <= $fin; $t += $pasoMin) {
                if ($minDesde >= 0 && $t < $minDesde) continue; // hora pasada hoy
                $hi = $fmt($t);
                if (isset($seen[$hi])) continue;
                $seen[$hi] = true;
                $slots[] = ['horaInicio' => $hi, 'horaFin' => $fmt($t + $durMin)];
            }
        }
        usort($slots, fn($a, $b) => strcmp($a['horaInicio'], $b['horaInicio']));
        return $slots;
    }

    /**
     * Calcula los horarios disponibles (slots) de un box/agenda en una fecha,
     * a partir del horario de atención (obtenerschedule) y la duración del
     * tratamiento. NO descuenta citas ocupadas; ese filtrado vive en el
     * controlador (getOcupadosPorFecha) sobre la grilla por profesional.
     *
     * @param string $agendaId  id numérico de box/agenda
     * @param string $fecha     YYYY-MM-DD
     * @param int    $durMin    duración del tratamiento en minutos
     * @param int    $pasoMin   granularidad de la grilla (default = la del box, o duración)
     * @return array  lista de ['horaInicio'=>'HH:MM','horaFin'=>'HH:MM']
     */
    public function getSlots(string $agendaId, string $fecha, int $durMin, int $pasoMin = 0): array
    {
        if ($durMin <= 0) $durMin = 30;

        $sched = $this->getHorarioBox($fecha, $agendaId);
        $box = $sched[$agendaId] ?? null;
        if (!$box) return []; // box sin horario configurado

        // Paso de la grilla: el argumento manda; si no, la granularidad del box.
        if ($pasoMin <= 0) {
            $pasoMin = (int)($box['slots'] ?? 0);
            if ($pasoMin <= 0) $pasoMin = $durMin;
        }

        $annotations = $box['annotations'] ?? [];
        if (!$annotations) return []; // no atiende

        // reservo: dia 1..7 (lun..dom) == PHP date('N')
        $weekday = (int) date('N', strtotime($fecha));

        $toMin = function ($hms) {
            $p = explode(':', $hms);
            return ((int)$p[0]) * 60 + ((int)($p[1] ?? 0));
        };
        $fmt = function ($m) {
            return sprintf('%02d:%02d', intdiv($m, 60), $m % 60);
        };

        // Puede haber varias ventanas el mismo día (turnos partidos).
        $slots = [];
        $seen = [];
        foreach ($annotations as $win) {
            if ((int)($win['dia'] ?? 0) !== $weekday) continue;
            if (empty($win['horaInicio']) || empty($win['horaFin'])) continue;
            $ini = $toMin($win['horaInicio']);
            $fin = $toMin($win['horaFin']);
            for ($t = $ini; $t + $durMin <= $fin; $t += $pasoMin) {
                $hi = $fmt($t);
                if (isset($seen[$hi])) continue;
                $seen[$hi] = true;
                $slots[] = ['horaInicio' => $hi, 'horaFin' => $fmt($t + $durMin)];
            }
        }
        // Orden cronológico por si hubo varias ventanas.
        usort($slots, fn($a, $b) => strcmp($a['horaInicio'], $b['horaInicio']));
        return $slots;
    }

    /**
     * Citas (rangos horarios ya ocupados) de una fecha concreta.
     *
     * listAppointmentDay sólo muestra la tabla del día "seleccionado" en la
     * sesión. Se cambia con un POST `fecha`, pero esa selección NO persiste a un
     * GET posterior, así que se parsea la tabla #citasdia del MISMO response.
     *
     * Sólo se extrae lo necesario para liberar la grilla: rango horario y la
     * etiqueta de box/profesional. NO se devuelven datos del paciente (rut,
     * nombre, contacto, comentario).
     *
     * @return array  [['horaInicio'=>'HH:MM','horaFin'=>'HH:MM','box'=>etiqueta], ...]
     */
    public function getOcupadosPorFecha(string $fecha): array
    {
        $xp = $this->getDom("/appointment/listAppointmentDay/{$this->accountId}/", [
            'method'  => 'POST',
            'form'    => ['fecha' => $fecha],
            'headers' => ['x-requested-with' => 'XMLHttpRequest'],
        ]);

        $out = [];
        foreach ($xp->query("//*[@id='citasdia']//tr") as $tr) {
            $tds = $xp->query('.//td', $tr);
            if ($tds->length < 9) continue;
            $hora = self::clean($tds->item(0)->textContent);
            $box  = self::clean($tds->item(8)->textContent);
            if (!preg_match('/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/', $hora, $m)) continue;
            $out[] = ['horaInicio' => $m[1], 'horaFin' => $m[2], 'box' => $box];
        }
        return $out;
    }

    // ------------------------------------------------------- AGENDAR CITA ----

    /**
     * Crea una cita. POST /appointment/createAppt/ (replica el AJAX del botón #Reservar).
     * $p: fecha (YYYY-MM-DD), horaInicio/horaFin (HH:mm), servicio (id agenda), + datos cliente.
     */
    public function agendarCita(array $p): array
    {
        if (empty($p['fecha']))       throw new \InvalidArgumentException('Falta "fecha" (YYYY-MM-DD).');
        if (empty($p['horaInicio']) || empty($p['horaFin'])) throw new \InvalidArgumentException('Faltan "horaInicio"/"horaFin" (HH:mm).');
        if (empty($p['servicio']))    throw new \InvalidArgumentException('Falta "servicio" (id de agenda).');

        [$year, $month, $day] = array_map('intval', explode('-', $p['fecha']));
        if (!$year || !$month || !$day) throw new \InvalidArgumentException('"fecha" inválida; use YYYY-MM-DD.');

        $form = [
            'person_id'   => $p['person_id'] ?? '',
            'cliente'     => $p['cliente'] ?? '',
            'direccion'   => $p['direccion'] ?? '',
            'phone_feo'   => '',
            'origen'      => '',
            'rut'         => $p['rut'] ?? '',
            'name'        => $p['name'] ?? '',
            'app_paterno' => $p['app_paterno'] ?? '',
            'app_materno' => $p['app_materno'] ?? '',
            'mail'        => $p['mail'] ?? '',
            'phone_0'     => $p['phone_0'] ?? 'CL',
            'phone_1'     => $p['phone_1'] ?? '',
            'phone'       => $p['phone'] ?? ($p['phone_1'] ?? ''),
            'cellphone'   => $p['cellphone'] ?? ($p['phone'] ?? ($p['phone_1'] ?? '')),
            'day'         => $day,
            'month'       => $month,
            'year'        => $year,
            'hour'        => '',
            'minute'      => '',
            'horaInicio'  => $p['horaInicio'],
            'horaFin'     => $p['horaFin'],
            'servicio'    => $p['servicio'],
            'profesionales' => $p['profesionales'] ?? '',
            'tratamientos'  => $p['tratamientos'] ?? '',
            'recursos'      => $p['recursos'] ?? '',
            'comentario'    => $p['comentario'] ?? '',
            'tiene_profesionales' => 1,
            'ver_codigo'  => 0,
            'sendmail'    => !empty($p['sendmail']) ? 'true' : 'false',
            'registrar'   => !empty($p['registrar']) ? 1 : 0,
            // Campos del form #registropaciente (vacíos por defecto).
            'antecedentes_personales' => '',
            'Nficha'      => '',
            'sexo'        => '0',
            'fecha_nacimiento' => '',
            'prevision'   => '',
            'comuna'      => '',
            'address'     => '',
            'referencia'  => '',
            'categoria'   => '',
            'convenio'    => '',
            // Imprescindible: sin `view` el servidor responde 500.
            'view'        => 'viewAppt',
        ];

        return $this->getJson('/appointment/createAppt/', [
            'method' => 'POST',
            'form' => $form,
            'headers' => ['x-requested-with' => 'XMLHttpRequest'],
        ]);
    }

    /**
     * Elimina (anula) una cita por id. codigo 'E' = eliminar.
     */
    public function eliminarCita(string $id): array
    {
        if (!$id) throw new \InvalidArgumentException('Falta "id" de la cita.');
        return $this->getJson('/appointment/estadoAppt/', [
            'method' => 'POST',
            'form' => ['id' => $id, 'status' => '', 'codigo' => 'E'],
            'headers' => ['x-requested-with' => 'XMLHttpRequest'],
        ]);
    }
}
