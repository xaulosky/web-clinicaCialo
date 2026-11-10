# Despliegue del arreglo del agendamiento

Orden obligatorio. La migración va **antes** que el código: el código nuevo
escribe columnas que hoy no existen, y si sube primero, cada pago aprobado
fallaría al guardarse.

Servidor: `216.246.47.183`, carpeta remota **`/api.cialo.cl`** (no `/public_html`,
que es el frontend).

---

## 0. Antes de empezar

Anota el estado actual por si hay que volver atrás:

```sql
SELECT status, COUNT(*) FROM reservo_bookings GROUP BY status;
```

Haz una copia de la tabla (30 segundos, permite revertir sin restaurar todo):

```sql
CREATE TABLE reservo_bookings_backup_pre013 AS SELECT * FROM reservo_bookings;
```

---

## 1. Migración de base de datos

Ejecuta `migrations/013_reservo_bookings_trazabilidad_pago.sql` completo en
phpMyAdmin (BD `eluwvgnt_web`).

Es aditiva: añade columnas y un estado nuevo al ENUM, no borra ni reinterpreta
nada. Los dos `UPDATE` que trae solo reclasifican lo que ya era ambiguo:

- `ERROR` **con** `authorization_code` → `PAGADO_SIN_CITA` (sí hubo cobro).
- rellena `paid_at` con `updated_at` para las reservas ya cobradas.
- rellena `profesional` desde el JSON de `payload`.

Verifica:

```sql
SHOW COLUMNS FROM reservo_bookings LIKE 'paid_at';
SELECT status, COUNT(*) FROM reservo_bookings GROUP BY status;
```

---

## 2. Código de la API

Sube por FTP a `/api.cialo.cl` (conservando rutas):

| Archivo | Qué cambia |
|---|---|
| `index.php` | cierra `POST /reservo/cita` y otros endpoints internos; añade las rutas del panel de reservas |
| `controllers/ReservoBookingController.php` | idempotencia, candado de cupo, reintentos, `PAGADO_SIN_CITA`, correos |
| `controllers/ReservoBookingsAdminController.php` | **archivo nuevo** |
| `controllers/TransbankController.php` | guarda de estado en cancelación y timeout del checkout de productos |
| `controllers/ReportsController.php` | abonos por `paid_at`, embudo separando gratis de cobradas |
| `models/ReservoBooking.php` | columnas nuevas, candado de cupo, listados |
| `.htaccess` | bloquea los scripts de diagnóstico |

**No subas `config/config.php`**: el del servidor tiene las credenciales buenas
y el del repo está en `.gitignore`.

---

## 3. Borrar los scripts de diagnóstico del servidor

Están accesibles sin contraseña en `https://api.cialo.cl/`. Bórralos de
`/api.cialo.cl`:

```
db_test.php               filtra nombre de BD, usuario y lista de tablas
transbank_check.php       filtra el commerce code y parte de la API key
transbank_check_mall.php  idem
order_debug.php           CREA UNA ORDEN REAL en cada visita
order_debug_cancel.php    resto de pruebas
extract_backend.php       extrae cualquier .zip dentro de la API (?file=)
```

El `.htaccess` nuevo también los bloquea, pero eso es la segunda barrera: lo
correcto es que no existan.

---

## 4. Frontend

```bash
pnpm build
pnpm deploy:zip
```

Sube `deploy-artifacts/build-cialo.zip` y `scripts/unzip.php` a `/public_html` y
abre `https://cialo.cl/unzip.php`. (O deja que lo haga el workflow de GitHub al
hacer push a `master`.)

Incluye la pantalla nueva `/admin/reservas`.

---

## 5. Comprobaciones

```bash
# Debe responder 401, no 200: el endpoint ya no es público
curl -s -o /dev/null -w "%{http_code}\n" -X POST https://api.cialo.cl/reservo/cita \
  -H "Content-Type: application/json" -d '{}'

# Deben responder 403 (o 404 si los borraste)
for f in db_test.php transbank_check.php order_debug.php extract_backend.php; do
  curl -s -o /dev/null -w "$f %{http_code}\n" "https://api.cialo.cl/$f"
done

# La web debe seguir pintando el agendador
curl -s "https://api.cialo.cl/reservo/agendables" | head -c 120
```

Y en el navegador: entra a **Admin → Reservas**. Debe cargar sin error y mostrar
el filtro «Pagadas sin cita».

---

## 6. Prueba de punta a punta (recomendada)

Con una tarjeta real, agenda una hora barata y anúlala después en reservo:

1. Reserva y paga → debe llegarte el **correo de confirmación** (antes no
   llegaba ninguno) y aparecer en Admin → Reservas como «Confirmada».
2. Recarga la pantalla de confirmación → debe seguir mostrando la cita, no un
   error.
3. Anula esa cita en reservo.cl y borra la fila de prueba.

---

## Vuelta atrás

El código es reversible subiendo los archivos anteriores. Para la base:

```sql
-- Solo si hace falta revertir la reclasificación
UPDATE reservo_bookings SET status = 'ERROR' WHERE status = 'PAGADO_SIN_CITA';
```

Las columnas nuevas pueden quedarse: el código viejo las ignora.
