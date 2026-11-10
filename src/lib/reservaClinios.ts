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
]);

export function urlReservaProfesional(profesionalId?: string | null): string {
    return profesionalId && CON_ENLACE.has(profesionalId)
        ? `${RESERVA_CLINIOS}/${profesionalId}`
        : RESERVA_CLINIOS;
}
