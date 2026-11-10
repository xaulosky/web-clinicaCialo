# 🚀 Backend Laravel - Clínica Cialo

API REST y Panel Admin con Laravel 11 + Filament 3 + Sanctum + Transbank SDK v4

---

## 📋 Requisitos

- **PHP**: 8.2+
- **Composer**: 2.x
- **MySQL/MariaDB**: 5.7+
- **Laravel Herd** (recomendado para desarrollo local)

---

## 🛠️ Instalación Local (con Laravel Herd)

### Paso 1: Clonar/Posicionar el proyecto
```bash
cd web-cialo/backend
```

### Paso 2: Instalar dependencias
```bash
composer install
```

### Paso 3: Configurar entorno
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:
```env
APP_URL=http://backend.test

# Base de datos local (usar la misma estructura)
DB_DATABASE=cialo_db
DB_USERNAME=root
DB_PASSWORD=

# Transbank (usar credenciales de integración para testing)
TRANSBANK_ENVIRONMENT=integration
TRANSBANK_COMMERCE_CODE=597055555532
TRANSBANK_API_KEY=579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C
```

### Paso 4: Generar APP_KEY
```bash
php artisan key:generate
```

### Paso 5: Ejecutar migraciones
```bash
php artisan migrate
```

### Paso 6: Seed de datos iniciales
```bash
php artisan db:seed --class=AdminUserSeeder
```

### Paso 7: Iniciar servidor
```bash
php artisan serve
# o con Herd:
herd link cialo-backend
```

---

## 🔐 Credenciales de Prueba

### Admin
- **Email**: `admin@cialo.cl`
- **Password**: `admin123`

### Usuario de Pagos
- **Email**: `pagos@cialo.cl`
- **Password**: `CialoPagos2025`

---

## 📁 Estructura del Proyecto

```
backend/
├── app/
│   ├── Enums/              # Enums tipados (OrderStatus, CommissionStatus, etc.)
│   ├── Filament/
│   │   └── Resources/      # Recursos del panel admin
│   ├── Http/
│   │   ├── Controllers/Api/# Controladores API
│   │   └── Middleware/     # Middleware (EnsureAdmin)
│   ├── Models/             # Modelos Eloquent (UUIDs)
│   └── Traits/
│       └── HasUuid.php     # Trait para UUIDs automáticos
├── config/
│   ├── cors.php            # Configuración CORS para Astro
│   ├── jwt.php             # Configuración JWT
│   └── transbank.php       # Configuración Transbank
├── database/
│   └── migrations/         # 7 migraciones
├── public/                 # Punto de entrada
├── routes/
│   └── api.php             # 31 endpoints API
└── .env.example
```

---

## 🌐 Endpoints API

### Auth Público
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login usuarios
- `POST /api/auth/admin-login` - Login admin

### Auth Protegido (Sanctum)
- `GET /api/auth/me` - Perfil
- `POST /api/auth/logout` - Logout
- `POST /api/auth/change-password` - Cambiar password

### Orders
- `GET /api/orders` - Listar (admin)
- `POST /api/orders` - Crear
- `GET /api/orders/{id}` - Ver detalle
- `PUT /api/orders/{id}` - Actualizar estado
- `GET /api/orders/email/{email}` - Buscar por email

### Transbank
- `POST /api/transbank/init` - Iniciar pago
- `GET|POST /api/transbank/confirm` - Confirmación
- `GET /api/transbank/status/{token}` - Estado

### Cupones
- `GET /api/coupons` - Listar (admin)
- `POST /api/coupons` - Crear (admin)
- `GET /api/coupons/{id}` - Ver (admin)
- `PUT /api/coupons/{id}` - Actualizar (admin)
- `DELETE /api/coupons/{id}` - Eliminar (admin)
- `POST /api/coupons/validate` - Validar (público)

### Afiliados (Admin)
- `GET /api/affiliates`
- `POST /api/affiliates`
- `GET /api/affiliates/{id}`
- `PUT /api/affiliates/{id}`
- `DELETE /api/affiliates/{id}`
- `GET /api/affiliates/stats/dashboard`

### Comisiones (Admin)
- `GET /api/commissions`
- `GET /api/commissions/{id}`
- `POST /api/commissions/{id}/approve`
- `POST /api/commissions/{id}/pay`
- `POST /api/commissions/{id}/cancel`
- `POST /api/commissions/bulk-pay`
- `GET /api/commissions/stats/dashboard`

### Contacto
- `POST /api/contact` - Formulario de contacto

---

## 🎨 Panel Admin (Filament)

Acceso: `http://backend.test/admin`

### Recursos disponibles:
- **Orders**: Gestión completa de pedidos
- **Cupones**: CRUD + estadísticas
- **Afiliados**: Datos bancarios + comisiones
- **Comisiones**: Acciones bulk (aprobar/pagar)
- **Admin Users**: Gestión de usuarios admin

---

## 🚀 Deploy a Producción (cPanel)

### Requisitos en cPanel:
1. **PHP 8.2** activado
2. **Extensiones**: mbstring, xml, ctype, iconv, intl, pdo, pdo_mysql, bcmath
3. **Subdominio**: `api.cialo.cl` apuntando a `/backend/public`
4. **Base de datos**: Misma MySQL actual

### Proceso de Deploy:
1. Configurar secrets en GitHub:
   - `FTP_USER`
   - `FTP_PASSWORD`
   - `APP_KEY`
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASS`
   - `TRANSBANK_COMMERCE_CODE`
   - `TRANSBANK_API_KEY`
   - `JWT_SECRET`
   - `SMTP_PASSWORD`

2. Push a `master` dispara deploy automático
3. Script PHP ejecuta:
   - Extrae ZIP
   - Configura permisos
   - Ejecuta migraciones
   - Genera cache

### Primer Deploy Manual:
Si no hay SSH, subir manualmente:
1. Comprimir `backend/` (excluyendo vendor/)
2. Subir por FTP a `/backend/`
3. Instalar Composer en cPanel (o subir vendor/ también)
4. Crear `.env` manualmente
5. Ejecutar `php artisan migrate` desde cPanel → Terminal (si disponible)

---

## 🧪 Testing

```bash
# Ejecutar tests
php artisan test

# Ver rutas disponibles
php artisan route:list

# Verificar estado
php artisan about
```

---

## 📝 Notas Importantes

- **UUIDs**: Todas las tablas usan UUID v4 excepto `admin_users`
- **Auth**: Sanctum para API, JWT legacy disponible para compatibilidad
- **CORS**: Configurado para aceptar requests desde `cialo.cl`
- **Transbank**: SDK v4 con manejo completo de casos especiales
- **Emails**: Templates Blade con branding Cialo

---

## 🆘 Soporte

Para issues o mejoras:
1. Revisar logs en `storage/logs/`
2. Verificar `.env` esté configurado
3. Ejecutar `php artisan config:clear`
4. Contactar al equipo de desarrollo
