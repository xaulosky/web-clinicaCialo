# 🧪 Guía de Pruebas Locales - Laravel Herd

## 📋 Pre-requisitos

1. **Laravel Herd** instalado y funcionando
2. **PHP 8.2+** disponible en Herd
3. **MySQL/MariaDB** corriendo (puede ser el de Herd o uno local)
4. **Composer** instalado globalmente

---

## 🚀 Paso 1: Instalar dependencias

Abre PowerShell o CMD en la carpeta del proyecto:

```powershell
cd C:\Users\salas\Documents\software\web-cialo\backend

# Instalar dependencias de Composer
composer install
```

**Nota:** Si no tienes Composer global, descárgalo de https://getcomposer.org/download/

---

## ⚙️ Paso 2: Configurar entorno

```powershell
# Copiar archivo de entorno
copy .env.example .env

# Generar APP_KEY
php artisan key:generate
```

### Editar `.env` con tus datos:

```env
APP_NAME="Clinica Cialo API"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://cialo-backend.test

# Base de datos (usar la misma estructura que en producción)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cialo_test
DB_USERNAME=root
DB_PASSWORD=

# Para testing con Transbank (usar credenciales de integración)
TRANSBANK_ENVIRONMENT=integration
TRANSBANK_COMMERCE_CODE=597055555532
TRANSBANK_API_KEY=579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C

# JWT (generar uno nuevo o usar el de producción)
JWT_SECRET=tu-jwt-secret-aqui

# Email (configurar con tus credenciales SMTP o dejar para más tarde)
MAIL_MAILER=log
```

---

## 🗄️ Paso 3: Crear base de datos

Abre tu cliente MySQL (phpMyAdmin, TablePlus, DBeaver, etc.) y ejecuta:

```sql
CREATE DATABASE cialo_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## 🏗️ Paso 4: Ejecutar migraciones

```powershell
php artisan migrate
```

Si quieres datos de prueba:
```powershell
php artisan migrate --seed
```

---

## 🔗 Paso 5: Vincular con Herd

```powershell
# En la carpeta backend
herd link cialo-backend
```

Esto creará la URL: `http://cialo-backend.test`

Verificar que esté activo:
```powershell
herd list
```

---

## ✅ Paso 6: Verificar instalación

Visita en tu navegador:
- **API**: http://cialo-backend.test/api/health
- **Admin**: http://cialo-backend.test/admin

Deberías ver:
- API: `{"status": "ok"}`
- Admin: Panel de login de Filament

---

## 🧪 Paso 7: Probar endpoints

### 7.1 Login de Admin

```bash
curl -X POST http://cialo-backend.test/api/auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cialo.cl",
    "password": "admin123"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": 1,
      "email": "admin@cialo.cl",
      "nombre": "Administrador",
      "rol": "super_admin"
    }
  }
}
```

### 7.2 Listar órdenes (con token)

```bash
curl -X GET http://cialo-backend.test/api/orders \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### 7.3 Crear una orden

```bash
curl -X POST http://cialo-backend.test/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "nombre": "Juan",
      "apellido": "Perez",
      "email": "juan@test.com",
      "telefono": "+56912345678",
      "rut": "12.345.678-9"
    },
    "items": [
      {
        "id": "prod-1",
        "name": "Hydrafacial",
        "price": 45000,
        "quantity": 1,
        "type": "tratamiento"
      }
    ],
    "subtotal": 45000,
    "total": 45000
  }'
```

### 7.4 Iniciar pago Transbank (testing)

```bash
curl -X POST http://cialo-backend.test/api/transbank/init \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ID_DE_LA_ORDEN"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "token": "01ab2c3d4e5f...",
    "url": "https://webpay3gint.transbank.cl/webpayserver/initTransaction"
  }
}
```

### 7.5 Acceder al Panel Admin (Filament)

1. Ve a: http://cialo-backend.test/admin
2. Login con:
   - Email: `admin@cialo.cl`
   - Password: `admin123`
3. Explora:
   - Orders
   - Coupons
   - Affiliates
   - Commissions

---

## 🔍 Paso 8: Verificar logs

Si algo falla, revisa:

```powershell
# Ver logs en tiempo real
tail -f storage/logs/laravel.log

# O en Windows
Get-Content storage/logs/laravel.log -Wait
```

---

## 🐛 Solución de problemas comunes

### Error: "SQLSTATE[HY000] [1049] Unknown database"
→ Crear la base de datos `cialo_test` en MySQL

### Error: "Class 'App\Models\User' not found"
→ Ejecutar `composer dump-autoload`

### Error: "Route [filament.admin.auth.login] not defined"
→ Verificar que Filament esté instalado: `php artisan filament:install --panels`

### Error: "No application encryption key has been specified"
→ Ejecutar `php artisan key:generate`

### Error 500 sin mensaje
→ Verificar `APP_DEBUG=true` en `.env`
→ Revisar `storage/logs/laravel.log`

---

## 📝 Checklist de pruebas

### Auth
- [ ] Registro de usuario
- [ ] Login de usuario
- [ ] Login de admin
- [ ] Obtener perfil
- [ ] Cambiar password

### Orders
- [ ] Crear orden
- [ ] Listar órdenes
- [ ] Ver detalle de orden
- [ ] Actualizar estado
- [ ] Buscar por email

### Transbank (Integration)
- [ ] Iniciar pago
- [ ] Ver estado de transacción

### Cupones
- [ ] Listar cupones
- [ ] Crear cupón
- [ ] Validar cupón público

### Admin Panel
- [ ] Login en Filament
- [ ] CRUD de Orders
- [ ] CRUD de Coupons
- [ ] CRUD de Affiliates
- [ ] Gestión de Commissions

---

## 🚀 Siguiente paso

Cuando todo funcione localmente, hacemos el deploy a producción.

**¿Listo para empezar las pruebas?** Ejecuta los comandos del Paso 1 y avísame si tienes algún error.
