/**
 * Catálogo de Consultas y Evaluaciones - Clínica Cialo
 * Estructura para gestionar agendamiento de primeras visitas y diagnósticos.
 */

export interface Profesional {
    nombre: string;
    especialidad: string;
    disponibilidad: string;
    tratamientos?: string[];
    condicionGratuidad?: string;
}

export interface Consulta {
    id: string;
    categoria: string;
    iconPath: string;
    nombre: string;
    descripcion: string;
    valor: number | null; // null = Gratuita
    valorTexto: string;
    duracion: string;
    reembolsable: boolean;
    profesionales: Profesional[];
    tratamientosAsociados: string[];
    requisitos: string;
    politicaCancelacion: string;
    agendaUrl?: string; // URL de Reservo para agendar
    /**
     * Nombre EXACTO del servicio en reservo que debe reservarse. Úsalo cuando la
     * agenda ofrece varias variantes del mismo servicio (p.ej. "Ingreso" vs
     * control) y hay que fijar cuál agenda la web. Sin este campo se resuelve
     * por el nombre de la consulta.
     */
    servicioReservo?: string;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };
}

export const consultasData: Consulta[] = [
    {
        id: 'consulta-urologia',
        categoria: 'Urología',
        iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        nombre: 'Consulta Médica – Urología',
        descripcion: 'Evaluación urológica integral centrada en el diagnóstico, prevención y tratamiento de patologías del tracto urinario masculino y femenino, y salud sexual masculina. Aborda desde condiciones benignas hasta procedimientos avanzados en urología funcional y estética genital.',
        valor: 50000,
        valorTexto: '$50.000',
        duracion: '30-45 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Dr. Frank Ulloa Carrasco',
                especialidad: 'Urólogo - Cistoscopía y Engrosamiento Peneano',
                disponibilidad: 'Lunes y Jueves desde 19:00 hrs'
            },
            {
                nombre: 'Dr. Guillermo Jesús Contreras',
                especialidad: 'Urólogo - Estética Íntima Masculina',
                disponibilidad: 'Lunes y Miércoles 18:30-21:00 hrs'
            }
        ],
        tratamientosAsociados: [
            'Bioplastía de Engrosamiento Peniano',
            'Circuncisión',
            'Vasectomía',
            'Frenuloplastía',
            'Cistoscopia Diagnóstica',
            'Varicocelectomía'
        ],
        requisitos: 'Traer exámenes previos si los tiene. No requiere preparación especial.',
        politicaCancelacion: 'Cancelar con mínimo 24 horas de anticipación. Reagendar sin costo.',
        agendaUrl: 'https://reservas.clinios.cl/cialo/reservar/consulta-urologia',
        seo: {
            metaTitle: "Urólogo Los Ángeles | Cirugía y Estética Masculina | Clínica Cialo",
            metaDescription: "Reserva tu consulta urológica en Los Ángeles. Especialistas en vasectomía, engrosamiento peneano con ácido hialurónico (Urofill) y salud íntima masculina.",
            keywords: [
                "urologo los angeles",
                "urologo en los angeles",
                "urologo angeles",
                "dr ulloa urologo",
                "urologos en los angeles"
            ]
        }
    },
    {
        id: 'consulta-dermatologia',
        categoria: 'Dermatología',
        iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        nombre: 'Consulta Dermatológica',
        descripcion: 'Evaluación clínica de la piel, el cabello y las uñas con diagnóstico y plan de tratamiento personalizado. Incluye dermatoscopía cuando corresponde. Atención de adultos y niños desde recién nacidos, gracias a la doble especialidad en Dermatología y Pediatría.',
        valor: 60000,
        valorTexto: '$60.000',
        duracion: '30 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Dra. Sorangel Lugo Mosquera',
                especialidad: 'Dermatología de Adultos y Niños - Tricología',
                disponibilidad: 'Según agenda online'
            }
        ],
        tratamientosAsociados: [
            'Acné y Cicatrices',
            'Rosácea',
            'Melasma y Manchas',
            'Dermatitis Atópica',
            'Lunares y Nevos',
            'Dermatología Infantil',
            'Terapia Láser',
            'Caída del Cabello'
        ],
        requisitos: 'Asiste sin maquillaje y, si consultas por las uñas, sin esmalte. Trae el listado de los productos y medicamentos que usas en la piel y los exámenes previos si los tienes.',
        politicaCancelacion: 'Cancelar con mínimo 24 horas de anticipación. Reagendar sin costo.',
        agendaUrl: 'https://reservas.clinios.cl/cialo/reservar/consulta-dermatologia',
        servicioReservo: 'Consulta dermatológica',
        seo: {
            metaTitle: 'Consulta Dermatológica en Los Ángeles | Clínica CIALO',
            metaDescription: 'Agenda tu consulta dermatológica en Los Ángeles con la Dra. Sorangel Lugo: acné, rosácea, manchas, lunares y salud capilar. Atención de adultos y niños desde recién nacidos.',
            keywords: [
                'consulta dermatologica los angeles',
                'dermatologo los angeles',
                'dermatologa los angeles',
                'dermatologo infantil los angeles',
                'dermatologia biobio'
            ]
        }
    },
    {
        id: 'evaluacion-maxilofacial',
        categoria: 'Cirugía Maxilofacial',
        iconPath: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        nombre: 'Evaluación Maxilofacial',
        descripcion: 'Evaluación integral del esqueleto facial, tejidos blandos y funcionalidad. Diagnóstico de alteraciones estructurales, asimetrías y envejecimiento facial, además del ámbito dentoalveolar e implantológico. Incluye análisis clínico y fotogramétrico para planificar intervenciones.',
        valor: 30000,
        valorTexto: 'Desde $30.000',
        duracion: '30-45 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Dra. Scarlet Novoa Jara',
                especialidad: 'Cirujana Maxilofacial',
                disponibilidad: 'Según agenda online'
            },
            {
                nombre: 'Dr. Luis Pérez Lagos',
                especialidad: 'Cirujano Maxilofacial',
                disponibilidad: 'Viernes y Sábados (Flexible)'
            }
        ],
        tratamientosAsociados: [
            'Bichectomía',
            'Mentoplastía',
            'Implantes de Mentón y Mandibulares',
            'Implantes Malares y Paranasales',
            'Blefaroplastía Superior',
            'Blefaroplastía Inferior',
            'Otoplastía',
            'Liplift',
            'Lifting Cervical',
            'Lipoaspiración Cervicofacial',
            'Cirugía Ortognática',
            'Implantes Dentales',
            'Injertos Óseos y Regeneración',
            'Elevación de Seno Maxilar',
            'Desinclusión de Terceros Molares',
            'Cirugía de ATM',
            'Frenectomía Labial y Lingual',
            'Quistes y Tumores Maxilofaciales'
        ],
        requisitos: 'Traer fotos previas si desea comparar resultados.',
        politicaCancelacion: 'Cancelar con mínimo 24 horas. El costo de evaluación puede descontarse en cirugía.',
        // Agenda general de reservo — la reserva online agenda con la Dra. Novoa
        agendaUrl: 'https://reservas.clinios.cl/cialo/reservar/evaluacion-maxilofacial'
    },
    {
        id: 'evaluacion-estetica-facial',
        categoria: 'Medicina Estética Facial',
        iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
        nombre: 'Evaluación Estética Facial',
        descripcion: 'Evaluación avanzada del rostro con análisis clínico del envejecimiento y uso de tecnología Evelab Insight con IA. Se diseña un plan terapéutico no quirúrgico integral personalizado.',
        valor: null,
        valorTexto: 'GRATUITA*',
        duracion: '20-30 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Dr. Nicolás Laucirica',
                especialidad: 'Medicina Estética Facial Avanzada',
                disponibilidad: 'Los Ángeles: L-Ma-J-V 08:30-19:30, Sáb 08:00-14:30',
                condicionGratuidad: 'GRATUITA solo L-Ma-J-V a las 09:00, 12:00 y 15:00 hrs. Otros horarios: $30.000'
            },
            {
                nombre: 'Dra. Mariane Kiss Molina',
                especialidad: 'Armonización Orofacial',
                disponibilidad: 'Miércoles y Jueves 10:00-19:00 hrs',
                condicionGratuidad: 'GRATUITA en cualquier horario disponible'
            }
        ],
        tratamientosAsociados: [
            'Toxina Botulínica',
            'Rellenos con Ácido Hialurónico',
            'Sculptra',
            'Radiesse',
            'Hilos Tensores',
            'Morpheus 8 Facial',
            'HIFU Ultraformer III',
            'Láser CO₂ Resurfacing'
        ],
        requisitos: 'Sin maquillaje para mejor evaluación. Traer fotos si desea comparar.',
        politicaCancelacion: '*Gratuita en horarios 09:00, 12:00 y 15:00 (L-V). Otros horarios: $30.000 (se descuenta del tratamiento).'
    },
    {
        id: 'consulta-medica-integral',
        categoria: 'Medicina Estética Corporal',
        iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        nombre: 'Consulta Médica Estética Integral',
        descripcion: 'Atención médica orientada al diagnóstico integral del envejecimiento cutáneo y armonía corporal. Evaluación completa de piel, tejidos y proporciones con diseño de planes personalizados.',
        valor: 30000,
        valorTexto: '$30.000',
        duracion: '30 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Dra. Elga Viviana Peña',
                especialidad: 'Médico Cirujano - Medicina Estética Corporal',
                disponibilidad: 'L 12:00-17:00, Mi-J-V 09:00-16:00, Sáb 09:00-15:00'
            },
            {
                // Sin agenda online en reservo: se agenda por WhatsApp.
                nombre: 'Dra. Mauriluz Atencio Cardozo',
                especialidad: 'Médica Cirujana - Medicina Estética Facial y Corporal',
                disponibilidad: 'Agenda por WhatsApp +56 9 8202 8473'
            }
        ],
        tratamientosAsociados: [
            'Mesoterapia NCTF HA 135',
            'Rejuvenecimiento de Escote',
            'Rejuvenecimiento de Manos',
            'Hiperhidrosis Axilar con Botox',
            'Reafirmación Glúteos con Sculptra',
            'Morpheus 8 Corporal',
            'HIFU Corporal'
        ],
        requisitos: 'Sin preparación especial.',
        politicaCancelacion: 'Cancelar con mínimo 24 horas de anticipación.',
        agendaUrl: 'https://reservas.clinios.cl/cialo/reservar/consulta-medica-integral'
    },
    {
        id: 'consulta-flebologia',
        categoria: 'Flebología',
        iconPath: 'M4.5 12h3l3-9 3 18 3-9h3',
        nombre: 'Consulta Médica – Flebología y Cirugía Vascular',
        descripcion: 'Evaluación integral de patologías venosas y arteriales de extremidades. Incluye estudio hemodinámico con Ecografía Doppler. Planificación de tratamientos para várices y telangiectasias.',
        valor: 50000,
        valorTexto: '$50.000',
        duracion: '20-30 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Dra. Francisca González Saldivia',
                especialidad: 'Cirujana Vascular Periférico y Endovascular',
                disponibilidad: 'Sábados AM o días de semana post 17:00 hrs'
            }
        ],
        tratamientosAsociados: [
            'Escleroterapia para Telangiectasias',
            'Escleroterapia de Ejes Safenos',
            'Láser Vascular',
            'Ecografía Doppler Vascular'
        ],
        requisitos: 'Consulta incluye ecografía vascular. Traer exámenes previos si los tiene.',
        politicaCancelacion: 'Sin convenios Fonasa/Isapre. Cancelar con 24 horas de anticipación.',
        agendaUrl: 'https://reservas.clinios.cl/cialo/reservar/consulta-flebologia'
    },
    {
        id: 'consulta-tricologia',
        categoria: 'Tricología',
        iconPath: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z',
        nombre: 'Consulta Médica – Tricología',
        descripcion: 'Evaluación clínica especializada del cuero cabelludo y salud folicular para diagnóstico de alopecias. Incluye análisis de densidad y miniaturización con tricoscopio.',
        valor: 40000,
        valorTexto: '$40.000',
        duracion: '40-45 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Dra. Javiera Paola Araya Medina',
                especialidad: 'Tricóloga y Cirugía Capilar',
                disponibilidad: 'Lunes todo el día, Martes AM ocasional'
            }
        ],
        tratamientosAsociados: [
            'Mesoterapia con Dutasteride',
            'Mesoterapia con Triamcinolona',
            'Plasma Rico en Plaquetas (PRP) Capilar',
            'Regenera - Células Madre Capilares',
            'Injerto Capilar',
            'Injerto de Cejas'
        ],
        requisitos: 'Traer exámenes hormonales si los tiene. Control: $20.000.',
        politicaCancelacion: 'Cancelar con 24 horas de anticipación.',
        agendaUrl: 'https://reservas.clinios.cl/cialo/reservar/consulta-tricologia'
    },
    {
        id: 'consulta-ginecologia',
        categoria: 'Ginecología',
        iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        nombre: 'Consulta Médica – Ginecología',
        descripcion: 'Atención integral en ginecología general, perimenopausia y menopausia. Enfoque avanzado en ginecología regenerativa, funcional y estética.',
        valor: 40000,
        valorTexto: '$40.000',
        duracion: '30-45 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Dra. María Laura Villarroel Reyes',
                especialidad: 'Ginecóloga - Ginecoestética',
                disponibilidad: 'Por confirmar'
            }
        ],
        tratamientosAsociados: [
            'Rejuvenecimiento Vaginal Láser',
            'Ninfoplastia (Labioplastia) Láser',
            'Lifting Vulvar Láser',
            'Blanqueamiento Genital Láser'
        ],
        requisitos: 'Traer exámenes ginecológicos previos si los tiene.',
        politicaCancelacion: 'Cancelar con mínimo 24 horas de anticipación.',
        agendaUrl: 'https://reservas.clinios.cl/cialo/reservar/consulta-ginecologia',
        seo: {
            metaTitle: "Ginecólogo Los Ángeles: Clínica Cialo",
            metaDescription: "Agenda tu consulta ginecológica en Los Ángeles. Especialistas en rejuvenecimiento vaginal, ginecoestética y salud íntima integral.",
            keywords: [
                "ginecologo los angeles",
                "ginecologo en los angeles",
                "ginecologo obstetra los angeles",
                "ginecologa los angeles",
                "clínica de la mujer los angeles",
                "ginecología los angeles",
                "ginecólogos en los angeles"
            ]
        }
    },
    {
        id: 'consulta-matrona',
        categoria: 'Matronería',
        iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        nombre: 'Control Ginecológico con Matrona',
        descripcion: 'Atención integral en salud sexual y reproductiva con enfoque preventivo y educativo. Incluye control ginecológico, inserción/retiro de anticonceptivos y ginecoestética.',
        valor: 30000,
        valorTexto: '$30.000',
        duracion: '30-40 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Stefania Leticia Kuncar Ferrón',
                especialidad: 'Matrona - Ginecoestética y Rejuvenecimiento Íntimo',
                disponibilidad: 'L-J-V-Sáb todo el día, Martes desde 16:00'
            }
        ],
        tratamientosAsociados: [
            'Rejuvenecimiento Íntimo Láser CO2',
            'Control Ginecológico',
            'Inserción de Implante Anticonceptivo',
            'Inserción DIU Hormonal',
            'Inserción T de Cobre'
        ],
        requisitos: 'Control ginecológico: sin exámenes incluidos. PAP requiere citofijador.',
        politicaCancelacion: 'Cancelar con 24 horas de anticipación. Controles post-procedimiento incluidos.',
        agendaUrl: 'https://reservas.clinios.cl/cialo/reservar/consulta-matrona',
        seo: {
            metaTitle: "Matrona en Los Ángeles | Control Ginecológico | Clínica Cialo",
            metaDescription: "Atención integral con Matrona en Los Ángeles. Control ginecológico, anticonceptivos, y salud sexual y reproductiva en Clínica Cialo.",
            keywords: [
                "matrona los angeles",
                "matrona en los angeles",
                "matronas en los angeles",
                "control ginecologico los angeles",
                "insercion diu los angeles",
                "implanon los angeles",
                "salud reproductiva los angeles"
            ]
        }
    },
    {
        id: 'evaluacion-corporal',
        categoria: 'Kinesiología Estética',
        iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        nombre: 'Evaluación Corporal Integral',
        descripcion: 'Valoración funcional y estética del contorno corporal. Diagnóstico de adiposidad localizada, flacidez, celulitis y estado del sistema linfático con tecnologías avanzadas.',
        valor: null,
        valorTexto: 'GRATUITA',
        duracion: '30-45 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Klga. Keren Hapuc Matus Islas',
                especialidad: 'Kinesióloga Dermatofuncional',
                disponibilidad: 'L-V 09:00-14:00 y 16:00-20:00'
            },
            {
                nombre: 'Klga. Katalina Neumann',
                especialidad: 'Kinesióloga Dermatofuncional',
                disponibilidad: 'Según agenda online'
            },
            {
                nombre: 'EU. María Jesús Contreras Merino',
                especialidad: 'Enfermera - Aparatología Estética',
                disponibilidad: 'Lunes a Sábado'
            }
        ],
        tratamientosAsociados: [
            'Depilación Láser Soprano Titanium',
            'Criolipólisis Clatuu Alpha',
            'Scizer - HIFU Corporal',
            'Morpheus 8 Corporal',
            'Exilis Corporal',
            'EmBody - Tonificación Muscular',
            'HydraFacial MD'
        ],
        requisitos: 'Idealmente en ayunas para mediciones. Ropa cómoda.',
        politicaCancelacion: 'Cancelar con 24 horas de anticipación.',
        agendaUrl: 'https://reservas.clinios.cl/cialo/reservar/evaluacion-corporal'
    },
    {
        id: 'evaluacion-nutricional',
        categoria: 'Nutrición',
        iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        nombre: 'Evaluación Nutricional Integral',
        descripcion: 'Evaluación nutricional integral con enfoque clínico, deportivo y metabólico. Incluye medición avanzada de composición corporal con InBody 970 y opción de Calorimetría Indirecta.',
        valor: 40000,
        valorTexto: '$40.000',
        duracion: '45-60 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Valentina Andrea Verdejo Merino',
                especialidad: 'Nutricionista Clínica Deportiva',
                disponibilidad: 'Mi PM, J AM-PM, V PM, Sáb AM (2 al mes)'
            },
            {
                nombre: 'Rosella Zaffiri Gutiérrez',
                especialidad: 'Nutricionista - Especialista en Cirugía Bariátrica',
                disponibilidad: 'Lunes a Sábado'
            },
            {
                nombre: 'Walter Sebastián Zaror Maza',
                especialidad: 'Nutricionista Deportivo',
                disponibilidad: 'L-J 10:00-16:00, Sábados AM'
            }
        ],
        tratamientosAsociados: [
            'Consulta Nutricional Integral con InBody 970',
            'Examen InBody 970',
            'Calorimetría Indirecta',
            'Seguimiento Nutricional'
        ],
        requisitos: 'Idealmente en ayunas para InBody. Sin ejercicio intenso 24 hrs antes.',
        politicaCancelacion: 'Cancelar con 24 horas de anticipación. Control cada 4-6 semanas recomendado.',
        agendaUrl: 'https://reservas.clinios.cl/cialo/reservar/nutricion'
    },
    {
        id: 'consulta-psicologia',
        categoria: 'Psicología',
        iconPath: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
        nombre: 'Consulta Psicológica',
        descripcion: 'Consulta psicológica individual en Los Ángeles con la Psic. Fanny Cea Veloz: atención clínica basada en evidencia, especializada en trastornos de la conducta alimentaria (TCA), obesidad y acompañamiento psicológico en cirugía bariátrica. Sesión de 30 minutos con evaluación y plan terapéutico.',
        valor: 50000,
        valorTexto: '$50.000',
        duracion: '30 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Psic. Fanny Cea Veloz',
                especialidad: 'Psicóloga Clínica - TCA y Obesidad',
                disponibilidad: 'Según agenda online'
            }
        ],
        tratamientosAsociados: [
            'Acompañamiento en Cirugía Bariátrica',
            'Tratamiento de TCA',
            'Manejo Psicológico de la Obesidad'
        ],
        requisitos: 'Sin preparación especial.',
        politicaCancelacion: 'Cancelar con mínimo 24 horas de anticipación.',
        agendaUrl: 'https://reservas.clinios.cl/cialo/reservar/fanny-cea-veloz',
        // La agenda también tiene "Consulta psicológica - control"; la web solo vende esta.
        servicioReservo: 'Consulta psicológica',
        seo: {
            metaTitle: 'Psicóloga en Los Ángeles | TCA, Obesidad y Bariátrica | CIALO',
            metaDescription: 'Consulta psicológica en Los Ángeles con la Psic. Fanny Cea Veloz, especialista en TCA, obesidad y cirugía bariátrica. Sesión de 30 min, $50.000. Agenda online.',
            keywords: [
                'psicologa los angeles',
                'psicologo los angeles',
                'consulta psicologica los angeles',
                'psicologa los angeles biobio',
                'psicologa tca los angeles',
                'trastornos de la conducta alimentaria los angeles',
                'psicologa obesidad los angeles',
                'evaluacion psicologica cirugia bariatrica',
                'fanny cea veloz'
            ]
        }
    },
    {
        id: 'consulta-psiquiatria',
        categoria: 'Psiquiatría',
        iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0013.5 19.5h-3a3.374 3.374 0 00-1.49-2.79l-.548-.547z',
        nombre: 'Consulta Psiquiátrica',
        descripcion: 'Evaluación psiquiátrica integral e individualizada: diagnóstico, plan de tratamiento personalizado y seguimiento farmacológico cuando corresponde, considerando los aspectos biológicos, psicológicos y contextuales de cada paciente. Atención confidencial en un entorno clínico privado.',
        valor: 85000,
        valorTexto: '$85.000',
        duracion: '60 min',
        reembolsable: false,
        profesionales: [
            {
                nombre: 'Dra. Analith Cuba Zenzano',
                especialidad: 'Psiquiatra de Adultos - Magíster en Salud Pública',
                disponibilidad: 'Según agenda online'
            }
        ],
        tratamientosAsociados: [
            'Evaluación Diagnóstica Integral',
            'Tratamiento Farmacológico',
            'Neuropsiquiatría y Demencias',
            'Psiquiatría de Enlace',
            'Controles de Seguimiento'
        ],
        requisitos: 'Traer exámenes o informes previos si los tiene.',
        politicaCancelacion: 'Cancelar con mínimo 24 horas de anticipación.',
        agendaUrl: 'https://reservas.clinios.cl/cialo/reservar/psicologia-y-psiquiatria',
        // La reserva online agenda siempre el bloque de ingreso (60 min)
        servicioReservo: 'Consulta Psiquiátrica Ingreso',
        seo: {
            metaTitle: 'Psiquiatra en Los Ángeles | Consulta Psiquiátrica | Clínica CIALO',
            metaDescription: 'Agenda tu consulta psiquiátrica en Los Ángeles. Evaluación diagnóstica, tratamiento y seguimiento con la Dra. Analith Cuba en Clínica CIALO.',
            keywords: [
                'psiquiatra los angeles',
                'psiquiatra en los angeles',
                'consulta psiquiatrica los angeles'
            ]
        }
    }
];

// Funciones auxiliares

export const getCategoriasConsultas = (): string[] => {
    return [...new Set(consultasData.map(c => c.categoria))].sort();
};

export const getConsultaById = (id: string): Consulta | undefined => {
    return consultasData.find(c => c.id === id);
};

export const getConsultasByCategoria = (categoria: string): Consulta[] => {
    return consultasData.filter(c => c.categoria === categoria);
};

export const getConsultasGratuitas = (): Consulta[] => {
    return consultasData.filter(c => c.valor === null);
};

export const getConsultasPagadas = (): Consulta[] => {
    return consultasData.filter(c => c.valor !== null);
};

export const formatPrecioConsulta = (consulta: Consulta): string => {
    return consulta.valorTexto;
};
