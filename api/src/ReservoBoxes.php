<?php
// api/src/ReservoBoxes.php
//
// Mapa DEPLOYABLE de boxes por agenda pública de reservo.cl (token makereserva).
// Vive en src/ (y no en config/) a propósito: el deploy FTP sube src/ pero no
// config/, y este mapa NO contiene secretos (ids numéricos internos + tokens
// públicos que ya aparecen en las URLs de cialo.cl).
//
// config.php sigue mandando: lo definido en reservo.agendas[token] con valor
// no-vacío SOBREESCRIBE lo de este mapa (ver merge()). Así el server puede
// corregir un box sin redeploy, y este archivo da la base para todos.
//
// Boxes reales del centro (GET /reservo/agendas, 2026-08-11):
//   50976 Box 1 - Nutrición          50982 BOX 6 Clatuu/Drenaje
//   50977 BOX 2 Dra. Kiss/Dra. González   50398 Box 7 Matrona y Evaluaciones
//   50978 BOX 3 Eval/Scizer/Hydrafacial   50981 BOX 8 Uro/Gine/Maxilofacial
//   50979 BOX 4 Depilación           45366 Box 9 Dr. Laucirica
//   50980 BOX 5 Exilis/Embody/Xwave  45369 Box Concepción Dr. Laucirica
//
// Profesionales (id reservo => box asignado):
//   79458  Dr. Nicolás Laucirica      -> 45366 (Box 9, VERIFICADO con cita real)
//   91883  Valentina Verdejo (Nutri)  -> 50976 (Box 1 Nutrición)
//   99174  Rosella Zaffiri (Nutri)    -> 50976 (Box 1 Nutrición)
//   91836  Dra. Mariane Kiss          -> 50977 (Box 2, lleva su nombre)
//   96174  Dra. Francisca González    -> 50977 (Box 2, lleva su nombre)
//   91879  Dr. Guillermo Contreras    -> 50981 (Box 8 Urología)
//   91910  Dr. Frank Ulloa            -> 50981 (Box 8 Urología)
//   91912  Dra. M. Laura Villarroel   -> 50981 (Box 8 Ginecología)
//   91120  Stefania Kuncar (Matrona)  -> 50398 (Box 7 Matrona)
//   94264  Dra. Elga Viviana Peña     -> 50398 (Box 7, confirmado)
//   91915  Dra. Javiera Araya (Trico) -> 50981 (Box 8, confirmado)
//   98798  Fanny Cea (Psicología)     -> 50398 (Box 7, confirmado)
//   91049  Enf. M.J. Contreras   -> 50978 (Box 3, eval corporal confirmada)
//   95490  Klga. Keren Matus     -> 50978 (Box 3, eval corporal confirmada)
//   101505 Klga. Katalina Neumann-> 50978 (Box 3, eval corporal confirmada)
//
// Un profesional con box null NO es agendable por el flujo propio (el frontend
// cae al iframe de reservo). Para habilitarlo: poner el box aquí y redeployar,
// o definirlo en config.php del server.

namespace App;

class ReservoBoxes
{
    /** Box por profesional (id reservo => id box). null = no habilitado aún. */
    private const PROF_BOX = [
        '79458'  => '45366', // Dr. Nicolás Laucirica (verificado)
        '91883'  => '50976', // Valentina Verdejo — Box 1 Nutrición
        '99174'  => '50976', // Rosella Zaffiri — Box 1 Nutrición
        '91836'  => '50977', // Dra. Mariane Kiss — Box 2
        '96174'  => '50977', // Dra. Francisca González — Box 2
        '91879'  => '50981', // Dr. Guillermo Contreras — Box 8
        '91910'  => '50981', // Dr. Frank Ulloa — Box 8
        '91912'  => '50981', // Dra. M. Laura Villarroel — Box 8
        '91120'  => '50398', // Stefania Kuncar — Box 7 Matrona
        '94264'  => '50398', // Dra. Peña — Box 7 Evaluaciones (confirmado por Pablo 2026-08-11)
        '91915'  => '50981', // Dra. Araya — Box 8 (confirmado por Pablo 2026-08-11)
        '98798'  => '50398', // Fanny Cea — Box 7 Evaluaciones (confirmado por Pablo 2026-08-11)
        // Equipo corporal: default = Box 3 Eval (confirmado para la EVALUACIÓN corporal).
        // OJO: si algún día se agendan tratamientos de aparatología directo por
        // el flujo propio, hay que mapear box_por_tratamiento por equipo
        // (Depilación→50979, Exilis/Embody/Xwave→50980, Clatuu/Drenaje→50982).
        '91049'  => '50978', // Enf. M.J. Contreras — Box 3 Eval
        '95490'  => '50978', // Klga. Keren Matus — Box 3 Eval
        '101505' => '50978', // Klga. Katalina Neumann — Box 3 Eval
        '112474' => '50981', // Dra. Sorangel Lugo (Dermato/Trico) — Box 8, igual que Araya (ASUMIDO: corregir si atiende en otro)
        '104904' => '50981', // Dra. Scarlet Novoa (Maxilofacial) — Box 8 Uro/Gine/Maxilo
        '112478' => '50398', // Dra. Analith Cuba (Psiquiatría) — Box 7 Evaluaciones, igual que psicología (ASUMIDO: corregir si atiende en otro)
    ];

    /** Profesionales presentes en cada agenda pública (token => ids). */
    private const AGENDA_PROFS = [
        // Agendas de profesionales (perfil)
        '80br1yU0X03NjJ7R6k95ll55U6m99N' => ['79458'],            // Dr. Laucirica
        '90siX1L0z0OvUo7O6l65sca5W5d9iO' => ['91912'],            // Dra. Villarroel
        'v0UXEn70O06BfJ846V15GwH5Q9h9Ra' => ['91883'],            // Valentina Verdejo
        'g0OuO8f0z0khI02o6v35WoG5i339HZ' => ['91879'],            // Dr. G. Contreras
        'N0vcwMl0T02LJs826v45UDc5F2E9Hv' => ['91915'],            // Dra. Araya
        's0U7YsF0U0Dr867r6v65sSV5P159pi' => ['95490'],            // Klga. Matus
        'd0o0gZ80N0leaA8z6I45HDf520091d' => ['101505'],           // Klga. Neumann
        'e0vPtJo0F0NsiN3g6L25mXm5v259ki' => ['91120'],            // Mat. Kuncar
        'Z0RXqEG070dLnN9F6l35GYz5t4p9Xo' => ['96174'],            // Dra. González
        'P0Fgt180n0cWOR7i6K158Qg5n0o9HF' => ['91049'],            // Enf. Contreras
        'A06ZSvV0C0oMz59j6z35pf55A9Q9NU' => ['94264'],            // Dra. Peña
        'K0MEz2L0y0MPto9W6u85llj5F8z9FV' => ['91910'],            // Dr. Ulloa
        'F0wjcVN0y0tIGb4P6S952Wx510s9Ra' => ['91836'],            // Dra. Kiss
        'F0z4dZJ0L0ur6X686X25cQL5N8x9dK' => ['98798'],            // Ps. Cea
        'i0yeW6P0N0ua4s766255uUx565y9bI' => ['99174'],            // Nut. Zaffiri
        // Agendas de consultas (pueden combinar profesionales)
        'q0PpwBT040bexY8k6g556q45D9s9cl' => ['91879', '91910'],   // Consulta urología
        'd0Jj9BT0y00Wun6t6c25haR5D629q1' => ['94264'],            // Consulta estética integral
        'T0bzwNL0b0jwKZ5M6d15FyO5f7b9Ge' => ['96174'],            // Consulta flebología
        'Y0QHK5v0S0Xkc23S6J95Bna5q6L9Mj' => ['91915'],            // Consulta tricología
        'A0mNI300m0LNbU8B6u85YsW5J0J9Tc' => ['91912'],            // Consulta ginecología
        'c0rh9Bc0L0QByn8r6s05y2r5r4N9Xe' => ['91120'],            // Control matrona
        '6025DGc0D0Isoa1e6n05htR5d8t9KA' => ['91049', '95490', '101505'], // Eval corporal
        'E0dF5IU0S0DbiB6R6p95uS15B4m9WO' => ['91883', '99174'],   // Eval nutricional
        // Agendas de tratamientos (equipo corporal)
        'I0PYSzn040NNbz0l6495VRA5l5h9Nt' => ['91049', '95490', '101505'],
        'O0pIun80X0JUVb0p6j152fy5f5b9sD' => ['91049', '95490'],
        'z0u5fkT040fOUF3s6s15tmi5D009xz' => ['91049'],
        // Agenda GENERAL de reservo (23 profesionales). Para la reserva propia
        // solo se habilita aquí a quienes NO tienen agenda dedicada en la web:
        // Sorangel (dermatología), Novoa (maxilofacial), Cuba (psiquiatría).
        // El frontend acota por consulta/serviciosOnline qué ve cada paciente.
        'J0wvbdv0d0vhLv1G6a55aoc5t169SO' => ['112474', '104904', '112478'],
    ];

    /**
     * Tokens cuya "evaluación" usa la franja gratuita (L-Ma-J-V 09/12/15).
     * /reservo/eval-gratis SOLO acepta estos tokens: sin esta guardia, cualquier
     * consulta pagada (p.ej. urología $50.000) podría agendarse gratis llamando
     * al endpoint en un horario de franja.
     */
    public const EVAL_TOKENS = ['80br1yU0X03NjJ7R6k95ll55U6m99N'];

    /** Agendas base (token => box_por_profesional / box_por_tratamiento). */
    public static function agendas(): array
    {
        $out = [];
        foreach (self::AGENDA_PROFS as $token => $profs) {
            $map = [];
            foreach ($profs as $pid) {
                $map[$pid] = self::PROF_BOX[$pid] ?? null;
            }
            $out[$token] = ['box_por_profesional' => $map, 'box_por_tratamiento' => []];
        }
        return $out;
    }

    /**
     * Mezcla las agendas de config.php SOBRE este mapa base. Los valores
     * no-vacíos del config ganan (permite corregir un box en el server sin
     * redeploy); los tokens que solo existen en config se conservan tal cual.
     * OJO: null/'' en config NO desactiva un box de este mapa — para APAGAR
     * un profesional desde el server usa el sentinel 'off' (o false).
     */
    public static function merge(array $configAgendas): array
    {
        $out = self::agendas();
        foreach ($configAgendas as $token => $a) {
            if (!isset($out[$token])) {
                $out[$token] = $a;
                continue;
            }
            foreach (['box_por_profesional', 'box_por_tratamiento'] as $k) {
                foreach (($a[$k] ?? []) as $id => $box) {
                    if ($box === false || $box === 'off') {
                        $out[$token][$k][$id] = null; // desactivación explícita
                    } elseif (!empty($box)) {
                        $out[$token][$k][$id] = (string) $box;
                    }
                }
            }
        }
        return $out;
    }
}
