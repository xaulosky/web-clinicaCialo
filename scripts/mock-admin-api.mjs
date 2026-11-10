// API falsa para revisar la UI del admin en local sin tocar producción.
// Uso: node scripts/mock-admin-api.mjs  (puerto 4010)
// y levantar el front con NEXT_PUBLIC_API_URL=http://localhost:4010
import http from 'node:http';

const nombres = ['Camila Rojas', 'Javiera Muñoz', 'Fernanda Soto', 'Valentina Díaz', 'Constanza Pérez', 'Ignacio Fuentes', 'Catalina Vera', 'Daniela Morales'];
const servicios = ['Evaluación facial', 'Toxina botulínica', 'Depilación láser', 'Consulta nutricional', 'Hydrafacial', 'Consulta urología'];
const estados = ['PAGADO', 'PAGADO', 'PAGADO', 'PAGADO_SIN_CITA', 'RECHAZADO', 'PENDIENTE', 'PAGADO', 'ERROR'];

const reservas = nombres.map((n, i) => ({
    id: String(100 + i),
    buy_order: `RSV-${20261001 + i}`,
    status: estados[i],
    amount: [15000, 20000, 35000, 10000][i % 4],
    amount_paid: estados[i].startsWith('PAGADO') ? [15000, 20000, 35000, 10000][i % 4] : null,
    fecha: `2026-10-${String(2 + i).padStart(2, '0')}`,
    hora_inicio: ['09:00', '10:30', '12:00', '15:30'][i % 4],
    hora_fin: ['09:30', '11:00', '12:30', '16:00'][i % 4],
    servicio: servicios[i % servicios.length],
    profesional: '91912',
    tratamiento: null,
    tratamiento_nombre: servicios[i % servicios.length],
    customer_name: n,
    customer_email: n.toLowerCase().replace(/\s/g, '.').normalize('NFD').replace(/[̀-ͯ]/g, '') + '@mail.com',
    customer_phone: '+56 9 1234 56' + String(10 + i),
    customer_rut: `1${i}.345.678-${i}`,
    cita_id: estados[i] === 'PAGADO' ? String(880000 + i) : null,
    authorization_code: estados[i].startsWith('PAGADO') ? String(1213 + i) : null,
    card_number: '6623',
    response_code: estados[i].startsWith('PAGADO') ? 0 : -1,
    intentos_cita: estados[i] === 'PAGADO_SIN_CITA' ? 3 : 1,
    last_error: estados[i] === 'PAGADO_SIN_CITA' ? 'Horario ya no disponible en reservo' : null,
    paid_at: '2026-10-01 10:12:00',
    resuelto_at: null,
    resuelto_nota: null,
    created_at: `2026-09-${String(20 + i).padStart(2, '0')} 10:00:00`,
    updated_at: '2026-10-01 10:12:00',
}));

const routes = {
    '/reservo/bookings': () => reservas,
    '/reservo/bookings/resumen': () => ({
        por_estado: { PAGADO: { n: 4, monto: 80000 }, RECHAZADO: { n: 1, monto: 0 }, PAGADO_SIN_CITA: { n: 1, monto: 10000 } },
        cobrado: 90000,
        pagadas_sin_cita: 1,
        monto_sin_cita: 10000,
    }),
};

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    if (req.method === 'OPTIONS') return res.end();
    const path = req.url.split('?')[0].replace(/\/$/, '');
    const handler = routes[path];
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, data: handler ? handler() : [] }));
}).listen(4010, () => console.log('mock admin api en http://localhost:4010'));
