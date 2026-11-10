/**
 * Despliegue de la API PHP (api.cialo.cl) por FTP.
 *
 * El repo no tenía forma reproducible de desplegar `api/`: solo existía
 * `api/deploy-ftp.ps1` con las credenciales escritas dentro (eliminado). Esto
 * lee `.env.local` como el resto de scripts del proyecto.
 *
 * Uso (nada se ejecuta sin un subcomando explícito):
 *
 *   npm run deploy:api -- --plan        muestra qué haría, sin tocar nada
 *   npm run deploy:api -- --migracion   sube, ejecuta y borra la migración 013
 *   npm run deploy:api -- --codigo      sube los archivos PHP modificados
 *   npm run deploy:api -- --limpiar     borra los scripts de diagnóstico
 *   npm run deploy:api -- --verificar   comprueba el resultado desde fuera
 *
 * ORDEN OBLIGATORIO: --migracion  ->  --codigo  ->  --limpiar  ->  --verificar
 * El código nuevo escribe columnas que la migración crea. Al revés, cada pago
 * aprobado fallaría al guardarse.
 */

require('dotenv').config({ path: '.env.local' });
const ftp = require('basic-ftp');
const https = require('https');
const path = require('path');
const fs = require('fs');

const RAIZ_REMOTA = '/api.cialo.cl';
const BASE_URL = 'https://api.cialo.cl';

/** Archivos modificados que hay que subir. Rutas relativas a api/. */
const CODIGO = [
    'index.php',
    'controllers/ReservoBookingController.php',
    'controllers/ReservoBookingsAdminController.php',
    'controllers/TransbankController.php',
    'controllers/ReportsController.php',
    'models/ReservoBooking.php',
    '.htaccess',
];

/**
 * Scripts de diagnóstico que quedaron accesibles sin autenticación.
 * db_test filtraba la BD y el usuario; transbank_check el commerce code y parte
 * de la API key; order_debug CREABA una orden real en cada visita;
 * extract_backend extraía cualquier zip (?file=) dentro de la API.
 */
const BASURA = [
    'db_test.php',
    'order_debug.php',
    'order_debug_cancel.php',
    'transbank_check.php',
    'transbank_check_mall.php',
    'extract_backend.php',
];

const LOCAL_API = path.join(__dirname, '..', 'api');

function conectar() {
    const c = new ftp.Client(60000);
    return c.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASS,
        secure: false,
    }).then(() => c);
}

function get(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { timeout: 120000 }, (res) => {
            let body = '';
            res.on('data', (d) => { body += d; });
            res.on('end', () => resolve({ status: res.statusCode, body }));
        }).on('error', reject).on('timeout', function () { this.destroy(new Error('timeout')); });
    });
}

async function plan() {
    console.log('Destino: ' + process.env.FTP_HOST + RAIZ_REMOTA + '\n');
    console.log('--migracion  sube _mig_<aleatorio>.php, lo ejecuta con token y lo borra');
    console.log('--codigo     sube ' + CODIGO.length + ' archivos:');
    CODIGO.forEach((f) => {
        const p = path.join(LOCAL_API, f);
        console.log('               ' + (fs.existsSync(p) ? '✓' : '✗ NO EXISTE') + ' ' + f);
    });
    console.log('--limpiar    borra ' + BASURA.length + ' scripts: ' + BASURA.join(', '));
    console.log('\nNo se ha tocado nada.');
}

async function migracion() {
    const scriptLocal = process.argv[3];
    if (!scriptLocal || !fs.existsSync(scriptLocal)) {
        throw new Error('Pasa la ruta del script de migración: npm run deploy:api -- --migracion <ruta.php>');
    }
    const token = /TOKEN\s*=\s*'([^']+)'/.exec(fs.readFileSync(scriptLocal, 'utf8'));
    if (!token) throw new Error('El script no declara un TOKEN.');

    const nombre = path.basename(scriptLocal);
    const c = await conectar();
    try {
        await c.uploadFrom(scriptLocal, RAIZ_REMOTA + '/' + nombre);
        console.log('Subido ' + nombre);
    } finally {
        c.close();
    }

    console.log('Ejecutando la migración…\n');
    const res = await get(BASE_URL + '/' + nombre + '?k=' + token[1]);
    console.log(res.body);

    // El script se autoelimina; se comprueba y, si sobrevivió, se borra por FTP.
    const c2 = await conectar();
    try {
        try {
            await c2.remove(RAIZ_REMOTA + '/' + nombre);
            console.log('\n[el script seguía ahí: borrado por FTP]');
        } catch {
            console.log('\n[confirmado: el script ya no está en el servidor]');
        }
    } finally {
        c2.close();
    }

    const comprobar = await get(BASE_URL + '/' + nombre);
    console.log('Comprobación HTTP del script borrado: ' + comprobar.status + ' (debe ser 404 o 403)');
    if (res.status !== 200 || !res.body.includes('MIGRACION OK')) {
        throw new Error('La migración NO terminó correctamente. NO subas el código todavía.');
    }
}

async function codigo() {
    const faltan = CODIGO.filter((f) => !fs.existsSync(path.join(LOCAL_API, f)));
    if (faltan.length) throw new Error('Faltan archivos locales: ' + faltan.join(', '));

    const c = await conectar();
    try {
        for (const f of CODIGO) {
            await c.uploadFrom(path.join(LOCAL_API, f), RAIZ_REMOTA + '/' + f);
            console.log('SUBIDO  ' + f);
        }
    } finally {
        c.close();
    }
}

async function limpiar() {
    const c = await conectar();
    try {
        for (const f of BASURA) {
            try {
                await c.remove(RAIZ_REMOTA + '/' + f);
                console.log('BORRADO ' + f);
            } catch (e) {
                console.log('NO-OP   ' + f + '  (' + String(e.message).split('\n')[0] + ')');
            }
        }
    } finally {
        c.close();
    }
}

async function verificar() {
    console.log('== Scripts de diagnóstico (deben dar 403/404) ==');
    for (const f of BASURA) {
        const r = await get(BASE_URL + '/' + f);
        console.log('  ' + String(r.status).padEnd(4) + f + (r.status === 200 ? '   <-- SIGUE EXPUESTO' : ''));
    }

    console.log('\n== La web sigue pudiendo pintar el agendador ==');
    const ag = await get(BASE_URL + '/reservo/agendables');
    console.log('  /reservo/agendables -> ' + ag.status + ' ' + ag.body.slice(0, 60));

    console.log('\n== Endpoints internos (deben dar 401) ==');
    for (const ep of ['/reservo/agendas', '/reservo/bookings']) {
        const r = await get(BASE_URL + ep);
        console.log('  ' + String(r.status).padEnd(4) + ep + (r.status === 200 ? '   <-- SIGUE ABIERTO' : ''));
    }
    console.log('\nNota: POST /reservo/cita no se comprueba aquí para no crear una cita real.');
}

const acciones = { '--plan': plan, '--migracion': migracion, '--codigo': codigo, '--limpiar': limpiar, '--verificar': verificar };

(async () => {
    const accion = acciones[process.argv[2]];
    if (!accion) {
        console.error('Subcomando requerido: ' + Object.keys(acciones).join(' | '));
        process.exit(2);
    }
    try {
        await accion();
    } catch (e) {
        console.error('\nERROR: ' + e.message);
        process.exit(1);
    }
})();
