// Dirección de la reserva online: desde el corte de Reservo se agenda en ClíniOS.
//
// Cada profesional tiene su enlace de reserva, creado en ClíniOS en
// Configuración › Reservas online con el mismo id que usa este sitio. Quien no
// aparece acá (no se ofrece online, o está con licencia) va a la reserva general.

export const RESERVA_CLINIOS = 'https://reservas.clinios.cl/cialo/reservar';

const CON_ENLACE = new Set([
    'nicolas-laucirica',
    'sorangel-lugo',
    'scarlet-novoa',
    'analith-cuba',
    'guillermo-contreras',
    'javiera-araya',
    'katalina-neumann',
    'stefania-kuncar',
    'francisca-gonzalez',
    'elga-viviana-pena',
    'frank-ulloa',
    'mariane-kiss',
    'fanny-cea-veloz',
    'rosella-zaffiri',
    'maria-laura-villarroel',
    'valentina-verdejo',
    'maria-jesus-contreras',
]);

export function urlReservaProfesional(profesionalId?: string | null): string {
    return profesionalId && CON_ENLACE.has(profesionalId)
        ? `${RESERVA_CLINIOS}/${profesionalId}`
        : RESERVA_CLINIOS;
}

// Cada consulta y cada categoría de tratamientos tiene también su enlace en
// ClíniOS (Configuración › Reservas online). La dirección es la última parte.
// La lista vigente la publica ClíniOS en
// https://reservas.clinios.cl/api/publico/cialo/sitio-web (campo `enlaces`).

const CONSULTAS: Readonly<Record<string, string>> = {
    'consulta-urologia': 'consulta-urologia',
    'consulta-dermatologia': 'consulta-dermatologia',
    'consulta-flebologia': 'consulta-flebologia',
    'consulta-ginecologia': 'consulta-ginecologia',
    'consulta-matrona': 'consulta-matrona',
    'consulta-medica-integral': 'consulta-medica-integral',
    'consulta-tricologia': 'consulta-tricologia',
    'evaluacion-corporal': 'evaluacion-corporal',
    'evaluacion-maxilofacial': 'evaluacion-maxilofacial',
    // Varias prestaciones: la paciente elige en la categoría o en la agenda de la profesional.
    'evaluacion-nutricional': 'nutricion',
    'consulta-psicologia': 'fanny-cea-veloz',
    'consulta-psiquiatria': 'analith-cuba',
    // La evaluación estética facial se agenda con el Dr. Laucirica.
    'evaluacion-estetica-facial': 'nicolas-laucirica',
};

const CATEGORIAS = new Set([
    'estetica-facial',
    'estetica-corporal',
    'depilacion-laser',
    'laser',
    'dermatologia',
    'cirugia',
    'ginecologia',
    'matroneria',
    'urologia',
    'vascular',
    'tricologia',
    'kinesiologia',
    'nutricion',
    'psicologia-y-psiquiatria',
    'maxilofacial',
    'medicina-interna',
    'procedimientos',
]);

/** Consultas cuyo valor se paga en línea al reservar (Mercado Pago, en ClíniOS). */
const SE_PAGA_AL_RESERVAR = new Set([
    'consulta-urologia',
    'consulta-dermatologia',
    'consulta-flebologia',
    'consulta-ginecologia',
    'consulta-matrona',
    'consulta-tricologia',
    'consulta-medica-integral',
    'evaluacion-maxilofacial',
]);

export function urlReservaConsulta(consultaId?: string | null): string {
    const slug = consultaId ? CONSULTAS[consultaId] : undefined;
    return slug ? `${RESERVA_CLINIOS}/${slug}` : RESERVA_CLINIOS;
}

export function urlReservaCategoria(categoria?: string | null): string {
    return categoria && CATEGORIAS.has(categoria) ? `${RESERVA_CLINIOS}/${categoria}` : RESERVA_CLINIOS;
}

export function consultaSePagaAlReservar(consultaId: string): boolean {
    return SE_PAGA_AL_RESERVAR.has(consultaId);
}

/**
 * A dónde lleva /agendar según su consulta: ?profesional=, ?consulta= o
 * ?categoria=. Solo direcciones de las listas de arriba; cualquier otra cosa,
 * a la reserva general.
 */
export function urlReservaDesde(parametros: { get(nombre: string): string | null }): string {
    const consulta = parametros.get('consulta');
    if (consulta) return urlReservaConsulta(consulta);
    const categoria = parametros.get('categoria');
    if (categoria) return urlReservaCategoria(categoria);
    return urlReservaProfesional(parametros.get('profesional'));
}
