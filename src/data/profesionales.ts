export interface Video {
    id: string;
    titulo: string;
    youtubeUrl: string;
    youtubeId: string;
    descripcion?: string;
}

export interface Profesional {
    id: string;
    nombre: string;
    apellido: string;
    titulo: string;
    subtitulo: string;
    categoria: string; // For filtering
    isPrincipal?: boolean; // For "Dr. Principal" badge
    imagen: string; // "" = sin foto → se muestran sus iniciales
    agendaUrl: string;
    /**
     * Id del profesional en reservo. OBLIGATORIO cuando la agenda es
     * COMPARTIDA (varios profesionales bajo el mismo token): sin él no se
     * puede saber a quién corresponde la reserva y el flujo propio se
     * desactiva. Si la agenda tiene un solo profesional, se deduce solo.
     */
    reservoId?: string;
    /**
     * Si la agenda de reservo es COMPARTIDA (agenda general), acota qué
     * servicios ofrece la reserva propia de este profesional (por nombre,
     * comparado sin tildes/mayúsculas). Sin este campo se muestran todos
     * los servicios online de su agenda.
     */
    serviciosOnline?: string[];
    agendaNotice: string;
    perfil: string;
    ubicacion?: {
        titulo: string;
        descripcion: string;
    };
    certificaciones: {
        nombre: string;
        descripcion: string;
    }[];
    habilidades: string[];
    idiomas: {
        idioma: string;
        nivel: string;
    }[];
    trayectoria: {
        lugar: string;
        periodo: string;
        descripcion: string;
    }[];
    formacion: {
        titulo: string;
        badge?: string;
        descripcion: string;
    }[];
    especializaciones: {
        titulo: string;
        descripcion: string;
    }[];
    videos?: Video[];
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };
}

export const profesionalesData: Profesional[] = [
    {
        id: "nicolas-laucirica",
        nombre: "Nicolás",
        apellido: "Laucirica",
        titulo: "Dr.",
        subtitulo: "Director Clínico | Medicina Estética Facial Avanzada",
        categoria: "Medicina Estética",
        isPrincipal: true,
        imagen: "/profesionales/clinica-cialo_Nicolas_Laucirica.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/nicolas-laucirica",
        agendaNotice: "Agenda tu evaluación facial personalizada",
        seo: {
            metaTitle: "Dr. Nicolás Laucirica | Médico Estético Los Ángeles | Clínica Cialo",
            metaDescription: "Agenda con el Dr. Nicolás Laucirica, referente en Medicina Estética Facial Avanzada en Los Ángeles. Especialista en Rinomodelación, Botox y Armonización.",
            keywords: [
                "dr nicolas laucirica",
                "nicolas laucirica",
                "medico estetico los angeles",
                "medicina estetica los angeles",
                "armonizacion facial los angeles",
                "medico botox los angeles"
            ]
        },
        perfil: `El Dr. Nicolás Laucirica es cirujano dentista chileno, director y fundador de Clínica Cialo, centro médico de alto estándar dedicado a la medicina estética facial avanzada, tratamientos regenerativos y tecnologías de última generación.

Su práctica clínica se caracteriza por un enfoque anatómico, científico y personalizado, orientado a la armonización facial, la regeneración cutánea y el envejecimiento saludable, integrando procedimientos mínimamente invasivos con dispositivos de alta complejidad, siempre bajo criterios de seguridad, naturalidad y evidencia científica.

Como fundador y director de Clínica Cialo, lidera un modelo de atención basado en evaluación clínica detallada, selección precisa de tratamientos, comunicación clara con expectativas realistas, y resultados armónicos, naturales y sostenibles en el tiempo.

Clínica Cialo nace con la visión de consolidarse como un referente en medicina estética avanzada, combinando excelencia clínica, innovación tecnológica y una experiencia de atención de alto nivel.`,
        ubicacion: {
            titulo: "Clínica Cialo",
            descripcion: "Bulnes 220, Of. 509, Edificio Puerto Mayor II, Los Ángeles, Biobío",
        },
        certificaciones: [
            { nombre: "Training in Anatomy and Facial Rejuvenation", descripcion: "Harvard University, Boston, Estados Unidos" },
            { nombre: "Especialista en Dermocosmética", descripcion: "Universidad de Barcelona, España" },
            { nombre: "Diplomado en Anatomía de Cabeza, Cuello y Sistema Nervioso", descripcion: "Pontificia Universidad Católica de Chile" },
            { nombre: "Diplomado en Medicina Estética", descripcion: "Universidad de Buenos Aires, Argentina" },
        ],
        habilidades: [
            "Armonización Facial",
            "Toxina Botulínica",
            "Rellenos con Ácido Hialurónico",
            "Bioestimulación y Regeneración Cutánea",
            "Rinomodelación",
            "Dispositivos Energéticos (Láser, RF)",
            "Protocolos Combinados",
            "Manejo de Complicaciones",
        ],
        idiomas: [
            { idioma: "Español", nivel: "Nativo" },
            { idioma: "Inglés", nivel: "Avanzado" },
        ],
        trayectoria: [
            { lugar: "Clínica Cialo", periodo: "2025 - Presente", descripcion: "Director y Fundador. Centro médico de alto estándar dedicado a la medicina estética facial avanzada." },
            { lugar: "Formación Internacional", periodo: "2018 - 2025", descripcion: "Entrenamientos clínicos en Estados Unidos, Mónaco, Francia, Italia, Perú, Panamá, Argentina, Brasil, Colombia y España." },
        ],
        formacion: [
            { titulo: "Training in Anatomy and Facial Rejuvenation", badge: "Harvard", descripcion: "Harvard University, Boston, Estados Unidos" },
            { titulo: "Especialista en Dermocosmética", badge: "Barcelona", descripcion: "Universidad de Barcelona, España" },
            { titulo: "Diplomado en Anatomía de Cabeza, Cuello y Sistema Nervioso", descripcion: "Pontificia Universidad Católica de Chile" },
            { titulo: "Diplomado en Medicina Estética", descripcion: "Universidad de Buenos Aires, Argentina" },
            { titulo: "Diplomado en Rejuvenecimiento Facial", descripcion: "Universidad del Desarrollo, Chile" },
            { titulo: "Diplomado en Cirugía Menor en Dermatoestética", descripcion: "Sociedad Chilena de Medicina Estética" },
        ],
        especializaciones: [
            { titulo: "Armonización Facial", descripcion: "Diseño integral del rostro para resultados naturales y armónicos." },
            { titulo: "Toxina Botulínica Avanzada", descripcion: "Tratamiento de arrugas dinámicas, lifting no quirúrgico y bruxismo." },
            { titulo: "Rellenos con Ácido Hialurónico", descripcion: "Volumización, contorno facial, labios y ojeras." },
            { titulo: "Bioestimulación y Regeneración", descripcion: "Protocolos de rejuvenecimiento con inductores de colágeno y PRP." },
            { titulo: "Rinomodelación", descripcion: "Corrección del perfil nasal sin cirugía." },
            { titulo: "Tecnologías Energéticas", descripcion: "Láser, radiofrecuencia y dispositivos de última generación." },
        ],
        videos: [
            {
                id: "nl-1",
                titulo: "¿Qué es la Armonización Facial?",
                youtubeUrl: "https://youtube.com/shorts/placeholder",
                youtubeId: "placeholder",
                descripcion: "El Dr. Laucirica explica los principios de la armonización facial moderna."
            },
        ],
    },
    {
        id: "sorangel-lugo",
        nombre: "Sorangel",
        apellido: "Lugo Mosquera",
        titulo: "Dra.",
        subtitulo: "Dermatología de Adultos y Niños | Tricología",
        categoria: "Dermatología",
        imagen: "/profesionales/clinica-cialo_Sorangel_Lugo.webp",
        // Agenda general de reservo (id de la Dra.: 112474). Como la agenda es
        // compartida, serviciosOnline acota qué servicios ofrece SU reserva propia.
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/sorangel-lugo",
        reservoId: "112474",
        serviciosOnline: ["Consulta dermatológica"],
        agendaNotice: "Consulta de Dermatología y Tricología",
        seo: {
            metaTitle: "Dra. Sorangel Lugo | Dermatóloga y Tricóloga Los Ángeles | Clínica CIALO",
            metaDescription: "Agenda con la Dra. Sorangel Lugo, Médico especialista en Dermatología General y Tricología en Los Ángeles. Salud de la piel, el cabello y el cuero cabelludo en Clínica CIALO.",
            keywords: [
                "dermatologo los angeles",
                "dermatologa los angeles",
                "tricologo los angeles",
                "tricologia los angeles",
                "salud capilar los angeles",
                "sorangel lugo",
                "dermatologia los angeles"
            ]
        },
        perfil: `La Dra. Sorangel Lugo Mosquera es especialista en Dermatología de adultos y niños, con formación complementaria en Tricología, Terapia Láser, Medicina Estética e Implante Capilar.

Al contar además con la especialidad en Pediatría, atiende la piel desde recién nacidos. En Chile la dermatología suele recibir pacientes desde los 13 o 15 años, por lo que su formación pediátrica le permite acompañar a las familias completas, sin límite de edad hacia abajo.

Su práctica integra el diagnóstico dermatológico con el cuidado de la salud del cabello y el cuero cabelludo, apoyándose en dermatoscopía y en protocolos basados en evidencia científica.

Es autora y coautora de múltiples trabajos y casos clínicos publicados en revistas de dermatología de Argentina y Colombia, y coautora de un Atlas de Dermatoscopía. Mantiene una formación continua a través de diplomaturas y cursos internacionales en tricología, láser y medicina estética.`,
        ubicacion: {
            titulo: "Clínica Cialo",
            descripcion: "Bulnes 220, Of. 509, Edificio Puerto Mayor II, Los Ángeles, Biobío",
        },
        certificaciones: [
            { nombre: "Especialidad en Dermatología General", descripcion: "Universidad de Carabobo, Venezuela" },
            { nombre: "Especialidad en Pediatría y Puericultura", descripcion: "Universidad Nacional Experimental Francisco de Miranda, Venezuela" },
            { nombre: "Diplomatura en Tricología", descripcion: "CILAD — Colegio Ibero-Latinoamericano de Dermatología" },
            { nombre: "Diplomatura en Láser", descripcion: "CILAD — Colegio Ibero-Latinoamericano de Dermatología (en curso)" },
            { nombre: "Diplomatura en Medicina Estética", descripcion: "SOCHIMCE · Universidad de Chile" },
        ],
        habilidades: [
            "Dermatología General",
            "Tricología",
            "Dermatoscopía",
            "Terapia Láser",
            "Implante Capilar",
            "Medicina Estética",
            "Manejo de Alopecias",
        ],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Clínica Cialo", periodo: "2026 — Presente", descripcion: "Dermatología general y tricología: diagnóstico y tratamiento de la piel, el cabello y el cuero cabelludo." },
            { lugar: "Ejercicio clínico en Dermatología y Tricología", periodo: "2018 — Presente", descripcion: "Atención en dermatología de adultos y niños con foco en salud capilar, apoyada en dermatoscopía." },
        ],
        formacion: [
            { titulo: "Médico Cirujano", descripcion: "Universidad Nacional Experimental Francisco de Miranda, Venezuela (2004–2010)" },
            { titulo: "Especialidad en Pediatría y Puericultura", descripcion: "Universidad Nacional Experimental Francisco de Miranda, Venezuela (2013–2015)" },
            { titulo: "Especialidad en Dermatología General", descripcion: "Universidad de Carabobo, Venezuela (2016–2018)" },
            { titulo: "Diplomatura en Tricología", badge: "CILAD", descripcion: "Colegio Ibero-Latinoamericano de Dermatología (2025)" },
            { titulo: "Diplomatura en Láser", badge: "CILAD", descripcion: "Colegio Ibero-Latinoamericano de Dermatología (en curso)" },
            { titulo: "Diplomatura en Medicina Estética", descripcion: "SOCHIMCE · Universidad de Chile (2020)" },
            { titulo: "Formación en Implante Capilar", descripcion: "Argentina (2024)" },
        ],
        especializaciones: [
            { titulo: "Dermatología de Adultos y Niños", descripcion: "Diagnóstico y tratamiento de las enfermedades de la piel en todas las edades, desde recién nacidos gracias a su especialidad en Pediatría." },
            { titulo: "Tricología", descripcion: "Estudio y manejo de las alopecias y de las enfermedades del cabello y el cuero cabelludo." },
            { titulo: "Implante Capilar", descripcion: "Evaluación y acompañamiento en el ámbito de la restauración capilar." },
            { titulo: "Dermatoscopía", descripcion: "Evaluación de lesiones melanocíticas y no melanocíticas; coautora de un atlas de dermatoscopía." },
            { titulo: "Terapia Láser", descripcion: "Tratamiento con láser de manchas, lesiones vasculares y otras indicaciones dermatológicas, con formación en láser por CILAD." },
        ],
    },
    {
        id: "scarlet-novoa",
        nombre: "Scarlet",
        apellido: "Novoa Jara",
        titulo: "Dra.",
        subtitulo: "Cirujana Maxilofacial | Cirugía Ortognática, Estética Facial y Reconstructiva",
        categoria: "Facial",
        imagen: "/profesionales/clinica-cialo_Scarlet_Novoa.webp",
        // Agenda general de reservo (id de la Dra.: 104904). Como la agenda es
        // compartida, serviciosOnline acota su reserva a su propia evaluación.
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/scarlet-novoa",
        reservoId: "104904",
        serviciosOnline: ["Evaluación maxilofacial Dra. Novoa"],
        agendaNotice: "Evaluación Maxilofacial",
        seo: {
            metaTitle: "Dra. Scarlet Novoa | Cirujana Maxilofacial Los Ángeles | Clínica CIALO",
            metaDescription: "Agenda tu evaluación maxilofacial en Los Ángeles con la Dra. Scarlet Novoa, Cirujana Maxilofacial de Clínica CIALO. Diagnóstico del esqueleto facial y cirugía facial.",
            keywords: [
                "cirujano maxilofacial los angeles",
                "cirujana maxilofacial los angeles",
                "maxilofacial los angeles",
                "evaluacion maxilofacial los angeles",
                "scarlet novoa",
                "bichectomia los angeles",
            ],
        },
        // Cartera clínica confirmada por la Dra. (2026-08-20).
        // PENDIENTE: su CV académico (formación y certificaciones); esas
        // secciones quedan vacías y no se renderizan en el perfil.
        perfil: `La Dra. Scarlet Novoa es Cirujana Maxilofacial y forma parte del equipo de Clínica CIALO en Los Ángeles.

Su práctica abarca el territorio maxilofacial completo: cirugía ortognática y corrección de deformidades dentofaciales, cirugía estética del contorno facial y cervicofacial, traumatología maxilofacial, cirugía de la articulación temporomandibular, patología oral y maxilofacial, y cirugía reconstructiva e implantológica.

Toda atención comienza con una evaluación maxilofacial integral: el análisis del esqueleto facial, los tejidos blandos y la funcionalidad, para diagnosticar alteraciones estructurales, asimetrías y signos de envejecimiento facial, y planificar el tratamiento que corresponda en cada caso.`,
        ubicacion: {
            titulo: "Clínica Cialo",
            descripcion: "Bulnes 220, Of. 509, Edificio Puerto Mayor II, Los Ángeles, Biobío",
        },
        certificaciones: [],
        habilidades: [
            "Cirugía Ortognática",
            "Cirugía Estética Facial",
            "Bichectomía",
            "Implantes Dentales",
            "Blefaroplastía",
            "Traumatología Maxilofacial",
            "Cirugía de ATM",
            "Patología Oral y Maxilofacial",
        ],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            {
                lugar: "Clínica Cialo",
                periodo: "Presente",
                descripcion: "Evaluación maxilofacial y procedimientos quirúrgicos faciales.",
            },
        ],
        formacion: [],
        especializaciones: [
            {
                titulo: "Cirugía Ortognática y Deformidades Dentofaciales",
                descripcion: "Mentoplastía de avance, de reducción, de descenso y ósea personalizada; expansión maxilar quirúrgicamente asistida (SARPE) y tratamiento quirúrgico de asimetrías faciales.",
            },
            {
                titulo: "Cirugía Estética Facial",
                descripcion: "Contorno facial con implantes de mentón, de cuerpo y ángulos mandibulares, malares y paranasales; bichectomía; blefaroplastía superior e inferior; otoplastía y liplift.",
            },
            {
                titulo: "Contorno Cervicofacial",
                descripcion: "Lipoaspiración submentoniana y cervicofacial, submentoplastía, platismoplastía y lifting cervical, en técnica única o combinadas.",
            },
            {
                titulo: "Traumatología Maxilofacial",
                descripcion: "Tratamiento quirúrgico de fracturas mandibulares, del tercio medio facial y orbitarias, y retiro de material de osteosíntesis.",
            },
            {
                titulo: "Articulación Temporomandibular (ATM)",
                descripcion: "Artrocentesis, artroscopia, condilectomía y cirugía reconstructiva de la articulación temporomandibular.",
            },
            {
                titulo: "Patología Oral y Maxilofacial",
                descripcion: "Biopsias de tejidos blandos y óseas; manejo de fibromas, papilomas, mucoceles y granulomas piógenos; y tratamiento quirúrgico de quistes y tumores odontogénicos y maxilofaciales.",
            },
            {
                titulo: "Cirugía Reconstructiva e Implantológica",
                descripcion: "Regeneración ósea guiada, injertos óseos (autógeno, alógeno, xenógeno, particulado y en bloque), elevación de seno maxilar, concentrados plaquetarios (PRF e i-PRF) e instalación de implantes dentales.",
            },
            {
                titulo: "Cirugía Preprotésica",
                descripcion: "Alveoloplastía, regularización y preservación del reborde alveolar, y reconstrucción de defectos óseos maxilares.",
            },
            {
                titulo: "Cirugía Oral Complementaria",
                descripcion: "Cierre de comunicación bucosinusal, tratamiento de la sinusitis maxilar de origen odontógeno y manejo quirúrgico de osteonecrosis y osteomielitis de los maxilares.",
            },
            {
                titulo: "Cirugía Dentoalveolar",
                descripcion: "Desinclusión de terceros molares, dientes supernumerarios y otros dientes incluidos, y fenestración quirúrgica de dientes retenidos.",
            },
            {
                titulo: "Cirugía de Tejidos Blandos e Infecciones",
                descripcion: "Frenectomía labial y lingual, escisión de lesiones benignas de tejidos blandos, drenaje de infecciones odontógenas y aseo quirúrgico.",
            },
        ],
    },
    {
        id: "analith-cuba",
        nombre: "Analith",
        apellido: "Cuba Zenzano",
        titulo: "Dra.",
        subtitulo: "Psiquiatra de Adultos | Magíster en Salud Pública",
        categoria: "Psiquiatría",
        imagen: "/profesionales/clinica-cialo_Analith_Cuba.webp",
        // Agenda general de reservo (id de la Dra.: 112478). Como la agenda es
        // compartida, serviciosOnline acota qué servicios ofrece SU reserva propia.
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/analith-cuba",
        reservoId: "112478",
        serviciosOnline: ["Consulta Psiquiátrica Ingreso"],
        agendaNotice: "Consulta Psiquiátrica",
        seo: {
            metaTitle: "Dra. Analith Cuba | Psiquiatra en Los Ángeles | Clínica CIALO",
            metaDescription: "Agenda tu consulta psiquiátrica en Los Ángeles con la Dra. Analith Cuba, Psiquiatra de Adultos y Magíster en Salud Pública. Evaluación integral y tratamiento basado en evidencia.",
            keywords: [
                "psiquiatra los angeles",
                "psiquiatra en los angeles",
                "consulta psiquiatrica los angeles",
                "analith cuba",
                "salud mental los angeles",
                "psiquiatra adultos los angeles",
            ],
        },
        perfil: `La Dra. Analith Cuba Zenzano es Médica especialista en Psiquiatría de Adultos, con formación de postgrado y perfeccionamiento continuo en distintas áreas de la especialidad.

Cuenta con un Diplomado en Esquizofrenia por la Universidad de Chile y un Curso de Psicofarmacología en Psiquiatría de Enlace y Poblaciones Especiales, realizado en la Pontificia Universidad Católica de Chile. Ha complementado su formación con perfeccionamiento internacional en Neuropsiquiatría y Demencias en Harvard Medical School, además de formación en Salud Pública y Sistemas de Salud en Harvard T.H. Chan School of Public Health, Boston.

Posee experiencia clínica tanto en el ámbito hospitalario como ambulatorio, incluyendo Psiquiatría de Enlace, Urgencias Psiquiátricas, Unidad de Adicciones, Unidad de Corta Estadía y atención especializada en un Centro de Demencias, además de docencia y supervisión en escenarios clínicos.

Su práctica clínica se sustenta en una evaluación integral e individualizada y en tratamientos basados en evidencia, considerando los aspectos biológicos, psicológicos y contextuales de cada paciente.`,
        ubicacion: {
            titulo: "Clínica Cialo",
            descripcion: "Bulnes 220, Of. 509, Edificio Puerto Mayor II, Los Ángeles, Biobío",
        },
        certificaciones: [
            { nombre: "Especialidad en Psiquiatría de Adultos", descripcion: "Universidad Mayor" },
            { nombre: "Magíster en Salud Pública, mención Gestión", descripcion: "Formación de postgrado en gestión y sistemas de salud" },
            { nombre: "Diplomado en Esquizofrenia", descripcion: "Universidad de Chile" },
            { nombre: "Neuropsiquiatría y Demencias", descripcion: "Harvard Medical School" },
        ],
        habilidades: [
            "Psiquiatría de Adultos",
            "Psicofarmacología",
            "Neuropsiquiatría y Demencias",
            "Psiquiatría de Enlace",
            "Adicciones",
            "Salud Pública",
        ],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Clínica Cialo", periodo: "Presente", descripcion: "Consulta psiquiátrica de adultos: evaluación integral, diagnóstico y tratamiento basado en evidencia." },
            { lugar: "Centro de Demencias", periodo: "Experiencia clínica", descripcion: "Atención especializada en deterioro cognitivo y demencias." },
            { lugar: "Ámbito hospitalario", periodo: "Experiencia clínica", descripcion: "Psiquiatría de Enlace, Urgencias Psiquiátricas, Unidad de Adicciones y Unidad de Corta Estadía." },
            { lugar: "Docencia clínica", periodo: "Experiencia académica", descripcion: "Enseñanza y supervisión de estudiantes en escenarios clínicos." },
        ],
        formacion: [
            { titulo: "Especialidad en Psiquiatría de Adultos", descripcion: "Universidad Mayor" },
            { titulo: "Magíster en Salud Pública, mención Gestión", descripcion: "Gestión y sistemas de salud" },
            { titulo: "Diplomado en Esquizofrenia", descripcion: "Universidad de Chile" },
            { titulo: "Curso de Psicofarmacología en Psiquiatría de Enlace y Poblaciones Especiales", descripcion: "Pontificia Universidad Católica de Chile" },
            { titulo: "Neuropsiquiatría y Demencias", badge: "Harvard", descripcion: "Harvard Medical School, Boston" },
            { titulo: "Salud Pública y Sistemas de Salud", badge: "Harvard", descripcion: "Harvard T.H. Chan School of Public Health, Boston" },
        ],
        especializaciones: [
            { titulo: "Psiquiatría de Adultos", descripcion: "Evaluación integral e individualizada, diagnóstico y tratamiento de los trastornos de salud mental en la adultez." },
            { titulo: "Psicofarmacología", descripcion: "Indicación y seguimiento de tratamiento farmacológico, con formación específica en poblaciones especiales." },
            { titulo: "Neuropsiquiatría y Demencias", descripcion: "Evaluación del deterioro cognitivo y manejo de los síntomas neuropsiquiátricos asociados." },
            { titulo: "Psiquiatría de Enlace", descripcion: "Atención de la salud mental en el contexto de enfermedades médicas y hospitalización." },
        ],
    },
    {
        id: "maria-laura-villarroel",
        nombre: "María Laura",
        apellido: "Villarroel Reyes",
        titulo: "Dra.",
        subtitulo: "Ginecóloga y Obstetra | Especialista CONACEM",
        categoria: "Ginecología",
        imagen: "/profesionales/clinica-cialo_Maria_Laura_Villarroel.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/maria-laura-villarroel",
        agendaNotice: "Consulta de Ginecología y Obstetricia",
        seo: {
            metaTitle: "Ginecólogo Los Ángeles: Dra. María Laura Villarroel | Clínica Cialo",
            metaDescription: "Agenda tu consulta con la Dra. María Laura Villarroel, Ginecóloga Obstetra en Los Ángeles, Edificio Puerto Mayor. Especialista en ginecoestética y alto riesgo.",
            keywords: [
                "ginecologo los angeles",
                "ginecologa los angeles",
                "ginecologo puerto mayor los ángeles",
                "ginecologo en los angeles",
                "ginecologo obstetra los angeles",
                "ginecologo angeles",
                "maria laura villarroel reyes",
                "ginecologos en los angeles"
            ]
        },
        perfil: "Médico Especialista en Ginecología y Obstetricia con doble certificación por CONACEM y la Universidad del Zulia. Con una sólida trayectoria en atención de urgencias de maternidad y manejo de pacientes de alto riesgo obstétrico (ARO), la Dra. Villarroel integra técnicas quirúrgicas de mínima invasión y ginecoestética láser avanzada para ofrecer soluciones integrales a la salud femenina.",
        certificaciones: [
            { nombre: "CONACEM", descripcion: "Especialista certificada en Chile (2021)." },
            { nombre: "EUNACOM", descripcion: "Aprobación nacional para el ejercicio médico." },
        ],
        habilidades: ["GINECOLOGÍA", "OBSTETRICIA", "CIRUGÍA VULVAR", "HISTEROSCOPIA", "ALTO RIESGO"],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Clínica Sanatorio Alemán", periodo: "2021 — Actualidad", descripcion: "Encargada de Urgencia de Maternidad, procedimientos quirúrgicos complejos y cesáreas de emergencia." },
            { lugar: "Hospital Dr. Guillermo Grant Benavente", periodo: "2018 — Actualidad", descripcion: "Residente del Servicio de Obstetricia y Ginecología. Residente de Urgencia Obstétrica y Alto Riesgo." },
            { lugar: "Experiencia Internacional", periodo: "Venezuela", descripcion: "Médico en la Unidad de la Mujer (Centro Claret) y Residente Asistencial en Ginecología (Hospital Militar Valbuena)." },
        ],
        formacion: [
            { titulo: "Especialista en Obstetricia y Ginecología", badge: "Postgrado", descripcion: "Universidad del Zulia, Venezuela (2014-2018) / Certificación CONACEM Chile." },
            { titulo: "Título de Médico Cirujana", descripcion: "Universidad del Zulia, Facultad de Medicina, Maracaibo." },
        ],
        especializaciones: [
            { titulo: "Cirugía Vulvar", descripcion: "Curso Intensivo y Práctico: Sociedad Iberoamericana de Patología Vulvar y Vaginal (Aprobación, 2025)." },
            { titulo: "Histeroscopia", descripcion: "Capacitación avanzada acreditada por la Universidad de Chile LATAM (2024)." },
            { titulo: "Videolaparoscopia", descripcion: "Certificación técnica por la Pontificia Universidad Católica de Chile (2023)." },
            { titulo: "Ginecoestética Láser", descripcion: "Especialista en Labioplastia Segura (WSCG) y Rejuvenecimiento Vaginal." },
            { titulo: "Ultrasonografía Anual", descripcion: "Certificación por la Sociedad Argentina de Ultrasonografía." },
            { titulo: "Trauma Obstétrico", descripcion: "Manejo avanzado de piso pélvico en urgencia obstétrica (Clínica Alemana)." },
        ],
    },
    {
        id: "valentina-verdejo",
        nombre: "Valentina Andrea",
        apellido: "Verdejo Merino",
        titulo: "",
        subtitulo: "Nutricionista Dietista | Licenciada en Nutrición",
        categoria: "Nutrición",
        imagen: "/profesionales/clinica-cialo_Valentina_Verdejo.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/valentina-verdejo",
        agendaNotice: "Evaluación Nutricional Integral",
        seo: {
            metaTitle: "Nutricionista Los Ángeles: Valentina Verdejo | Clínica Cialo",
            metaDescription: "Agenda tu consulta con Valentina Verdejo, Nutricionista Clínica y Deportiva en Los Ángeles. Evaluación InBody, planes personalizados y recomposición corporal.",
            keywords: [
                "nutricionista los angeles",
                "nutricionista en los angeles",
                "nutriologo los angeles",
                "nutriologa en los angeles",
                "dieta nutricionista los angeles",
                "evaluacion nutricional"
            ]
        },
        perfil: "Nutricionista Clínica Deportiva con 6 años de experiencia especializada en procesos de recomposición corporal. Su enfoque integra la salud familiar con las últimas tendencias en nutrigenómica y nutrición fitness, permitiendo un abordaje integral que optimiza tanto el rendimiento físico como el bienestar metabólico del paciente.",
        ubicacion: { titulo: "Atención Presencial", descripcion: "Los Ángeles, Región del Biobío, Chile." },
        certificaciones: [
            { nombre: "Licenciatura", descripcion: "Licenciada en Nutrición, Universidad Santo Tomás." },
        ],
        habilidades: ["PROACTIVIDAD", "TRABAJO EN EQUIPO", "RESOLUTIVA", "NUTRICIÓN DEPORTIVA"],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Clínica VitaPlus", periodo: "2022 — 2025", descripcion: "Consulta Nutricional Integral, Los Ángeles." },
            { lugar: "CESFAM Tucapel / Salud Rural", periodo: "2019 — 2022", descripcion: "Encargada de programas Vida Sana (PVS) y Modelo de Atención Integral (MAIS). Gestión de PNAC/PACAM." },
            { lugar: "Centro Kinésico Balance&Health", periodo: "2018 — 2019", descripcion: "Consulta Nutricional Integral." },
        ],
        formacion: [
            { titulo: "Nutrición Deportiva y Fitness", badge: "Postítulo", descripcion: "Diplomado eClass Universidad de los Andes." },
            { titulo: "Nutrigenómica", badge: "Postítulo", descripcion: "Diplomado Universidad Tecnológica TECH, México." },
            { titulo: "Salud Familiar", badge: "Postítulo", descripcion: "Diplomado Facultad de Medicina, Universidad de Chile." },
            { titulo: "Licenciatura en Nutrición", descripcion: "Universidad Santo Tomás, Los Ángeles." },
        ],
        especializaciones: [
            { titulo: "Auriculoterapia Clínica", descripcion: "Amulen Capacitaciones, Concepción. Herramientas complementarias para el manejo metabólico." },
            { titulo: "Nutrición y Obesidad", descripcion: "Control de sobrepeso (Coursera). Especialización en manejo clínico." },
            { titulo: "Soporte Nutricional", descripcion: "Plataforma Edoome, Vive Sano. Atención nutricional del paciente crítico." },
            { titulo: "Salud Escolar", descripcion: "Universidad de Chile. Prevención de la obesidad escolar." },
            { titulo: "Terapia Floral Bach", descripcion: "Apoyo emocional complementario en la consulta nutricional." },
            { titulo: "Modelo Salud Familiar", descripcion: "Capacitación en el Modelo Comunitario de Salud." },
        ],
    },
    {
        id: "guillermo-contreras",
        nombre: "Guillermo",
        apellido: "Contreras Rodríguez",
        titulo: "Dr.",
        subtitulo: "Urólogo | Especialista en Estética Íntima Masculina",
        categoria: "Urología",
        imagen: "/profesionales/clinica-cialo_Guillermo_Contreras.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/guillermo-contreras",
        agendaNotice: "Consulta de Urología y Estética Masculina",
        perfil: "Médico Urólogo con amplia trayectoria en cirugía mínimamente invasiva y especialista en cirugía estética íntima masculina. Con formación de postgrado en instituciones de referencia en Venezuela y Chile, su práctica se centra en la excelencia quirúrgica y el abordaje integral de la salud urológica, respaldado por certificaciones internacionales y nacionales (CONACEM).",
        certificaciones: [
            { nombre: "EUNACOM", descripcion: "Chile Certificado." },
            { nombre: "CONACEM", descripcion: "Urología Chile Certificado." },
        ],
        habilidades: ["CIRUGÍA UROLÓGICA", "ESTÉTICA ÍNTIMA", "MÍNIMA INVASIÓN"],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Hospital Mauricio Heyerman Torres", periodo: "2018 — Presente", descripcion: "Médico Urólogo. Angol, Región de la Araucanía, Chile." },
            { lugar: "Instituto Docente de Urología (IDU)", periodo: "Valencia, Venezuela", descripcion: "Especialista clínico y quirúrgico urológico." },
            { lugar: "Experiencia Hospitalaria Internacional", periodo: "Venezuela", descripcion: "HUAL Dr. Ángel Larralde, Ciudad Hospitalaria Dr. Enrique Tejera (CHET) y Hospital Cruz Roja." },
            { lugar: "Práctica Privada de Alta Complejidad", periodo: "Valencia, Venezuela", descripcion: "Centro Policlínico Valencia, Policlínica La Viña y Clínica ELOHIM." },
        ],
        formacion: [
            { titulo: "Especialista en Urología", badge: "Postgrado", descripcion: "Universidad de Carabobo / Instituto Docente de Urología (IDU), Venezuela." },

            { titulo: "Título de Médico Cirujano", descripcion: "Universidad de Carabobo, Valencia, Venezuela." },
        ],
        especializaciones: [
            { titulo: "Estética Íntima Masculina", descripcion: "Remodelación y cirugía estética genital con enfoque funcional." },
            { titulo: "Cirugía Mínima Invasión", descripcion: "Técnicas avanzadas urológicas para una recuperación acelerada." },
            { titulo: "Urología Oncológica", descripcion: "Manejo quirúrgico integral de patologías del tracto genitourinario." },
            { titulo: "Certificación CONACEM", descripcion: "Especialidad de Urología reconocida y validada por el estado chileno." },
        ],
        videos: [
            {
                id: "engrosamiento-acido-hialuronico",
                titulo: "Aumenta hasta 5 cm de grosor de forma segura | Ácido Hialurónico",
                youtubeUrl: "https://youtube.com/shorts/kamPMEEd2ik",
                youtubeId: "kamPMEEd2ik",
                descripcion: "El Dr. Guillermo Contreras te explica cómo funciona el tratamiento con Ácido Hialurónico: rápido, con resultados naturales y duraderos.",
            },
        ],
    },
    {
        id: "javiera-araya",
        nombre: "Javiera",
        apellido: "Araya Medina",
        titulo: "Dra.",
        subtitulo: "Médico Cirujano | Urgencia Pediátrica & Estética Capilar",
        categoria: "Capilar",
        imagen: "/profesionales/clinica-cialo_Javiera_Araya.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/javiera-araya",
        agendaNotice: "Consulta Médica & Estética Capilar",
        perfil: "Médico Cirujana egresada de la Universidad San Sebastián con destacada experiencia en Urgencia Pediátrica y coordinación de equipos de alta complejidad. Se caracteriza por su capacidad de liderazgo, excelencia técnica y un enfoque empático en la atención integral. Actualmente, integra su formación clínica con una especialización avanzada en Estética Capilar (Técnica FUE), brindando soluciones de vanguardia en salud y estética.",
        ubicacion: { titulo: "Atención Presencial", descripcion: "Concepción y Talcahuano, Chile." },
        certificaciones: [
            { nombre: "EUNACOM", descripcion: "Certificación nacional para el ejercicio médico en Chile." },
        ],
        habilidades: ["TRICOLOGÍA", "TRATAMIENTOS ALOPECIA", "INJERTO CAPILAR", "PATOLOGÍA DE CUERO CABELLUDO"],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Clínica Sanatorio Alemán", periodo: "2022 — Presente", descripcion: "Médico Urgencia Pediátrica y Coordinadora de Urgencia (2024). Gestión de logística, horas médicas y resolución de problemas en centros de alta complejidad." },
            { lugar: "Clínica Andes Salud", periodo: "2021 — 2023", descripcion: "Médico Urgencia Pediátrica. Atención ambulatoria y hospitalaria de pacientes de 0 a 15 años bajo altos estándares de calidad." },
            { lugar: "Servicio de Salud Talcahuano", periodo: "2021 — 2022", descripcion: "Médico Programa Ruta Médica. Atención integral y preventiva a pacientes en condición de calle en coordinación con la red asistencial pública." },
        ],
        formacion: [
            { titulo: "Título Profesional Médico Cirujana", badge: "2021", descripcion: "Universidad San Sebastián, Concepción." },
            { titulo: "EUNACOM Aprobado", descripcion: "Certificación nacional para el ejercicio médico en Chile." },
        ],
        especializaciones: [
            { titulo: "Técnica FUE Avanzada", descripcion: "Hands on FUE: From the Basics. CAMTC, Buenos Aires, Argentina (2024)." },
            { titulo: "Implantes Capilares", descripcion: "Curso Online: CACE - Consejo Argentino de Ciencias Estéticas (2024)." },
            { titulo: "Trivellini Long FUE", descripcion: "Trivellini - Caicedo Academy, Málaga, España (2024). Especialización en técnica Long Hair." },
            { titulo: "Equipamiento de Vanguardia", descripcion: "Propietaria de sistema Trivellini Long FUE (Modelo 2024) para cirugías capilares de alta precisión." },
        ],
        videos: [
            {
                id: "prp-capilar",
                titulo: "¿Qué es el PRP Capilar? Frena la caída del cabello con tu propia sangre",
                youtubeUrl: "https://youtu.be/bhW-9NCTK4E",
                youtubeId: "bhW-9NCTK4E",
                descripcion: "Descubre cómo el tratamiento de PRP Capilar puede ayudarte a frenar la caída del cabello y estimular el crecimiento de nuevos folículos.",
            },
            {
                id: "injerto-capilar",
                titulo: "Injerto Capilar: La solución definitiva para recuperar tu densidad",
                youtubeUrl: "https://youtube.com/shorts/8przMs40LC4",
                youtubeId: "8przMs40LC4",
                descripcion: "La Dra. Araya te cuenta cómo funciona el injerto capilar: pelo 100% tuyo y natural, proceso mínimamente invasivo con anestesia local.",
            },
        ],
    },
    {
        id: "keren-matus",
        nombre: "Keren Hapuc",
        apellido: "Matus Islas",
        titulo: "",
        subtitulo: "Kinesióloga | Especialista en Estética & Rehabilitación",
        categoria: "Corporal",
        imagen: "https://ui-avatars.com/api/?name=Keren+Matus&background=d4c1a0&color=1d1d1d&size=300&bold=true",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar",
        serviciosOnline: ["Evaluación corporal integral", "Evaluación kinesiología dermatofuncional"],
        agendaNotice: "Evaluación Kinésica y Estética",
        perfil: "Kinesióloga con habilidades destacadas en proactividad y adaptación clínica, enfocada en brindar un cuidado integral y personalizado. Con experiencia en dirección técnica y manejo de tecnología estética de alta gama (BTL), integra el conocimiento anatómico-funcional con tratamientos de vanguardia. Comprometida con el aprendizaje continuo y la excelencia en el trato humanizado del paciente.",
        ubicacion: { titulo: "Atención Presencial", descripcion: "Los Ángeles, Región del Biobío, Chile." },
        certificaciones: [
            { nombre: "Kinesióloga", descripcion: "Universidad de Las Américas, Concepción." },
        ],
        habilidades: ["ADAPTACIÓN", "PROACTIVIDAD", "DISCIPLINA", "TRABAJO MULTIDISCIPLINARIO"],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Directora Técnica - Estética Ruz", periodo: "2024 — 2025", descripcion: "Los Ángeles, Chile. Liderazgo técnico y supervisión de protocolos clínicos." },
            { lugar: "Kinesióloga Jefa de Sucursal - Clínica KineGlam", periodo: "2022 — 2023", descripcion: "Los Ángeles, Chile. Gestión administrativa y aplicación de tratamientos con equipos BTL (Exilis Ultra 360, Emsculpt, X-Wave)." },
            { lugar: "Experiencia en Internado Clínico", periodo: "2021", descripcion: "CESFAM La Floresta (Concepción), Hogar San Juan (Los Ángeles), Escuela Florecer Down y ELEAM Club de Leones." },
        ],
        formacion: [
            { titulo: "Kinesióloga", badge: "Título", descripcion: "Universidad de Las Américas, Concepción." },
            { titulo: "Rehabilitación Post-Cirugía Plástica", badge: "Diplomado", descripcion: "Universidad Andrés Bello (UNAB). Especialización en manejo reconstructivo y estético." },
            { titulo: "Rehabilitación Músculo Esquelética", badge: "Diplomado en curso", descripcion: "Técnicas especializadas de intervención física." },
        ],
        especializaciones: [
            { titulo: "Tecnología Estética BTL", descripcion: "Experiencia avanzada en Exilis Ultra 360, Emsculpt, X-Wave y depilación láser." },
            { titulo: "Salud Respiratoria (IRA/ERA)", descripcion: "Estrategias de tratamiento en atención primaria para adultos y niños." },
            { titulo: "Kinesiología Oncológica", descripcion: "Curso de Prescripción de Ejercicio en el Paciente Oncológico (En curso)." },
            { titulo: "Dermapen & Microneedle", descripcion: "Certificación técnica en MedAcademy para tratamientos de inducción de colágeno." },
        ],
    },
    {
        id: "katalina-neumann",
        nombre: "Katalina",
        apellido: "Neumann",
        titulo: "",
        subtitulo: "Kinesióloga Dermatofuncional | Magíster en Pedagogía",
        categoria: "Corporal",
        imagen: "https://ui-avatars.com/api/?name=Katalina+Neumann&background=d4c1a0&color=1d1d1d&size=300&bold=true",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/katalina-neumann",
        serviciosOnline: ["Evaluación corporal integral", "Evaluación kinesiología dermatofuncional"],
        agendaNotice: "Evaluación Kinésica y Estética",
        perfil: "Kinesióloga con extensa trayectoria en Kinesiología Dermatofuncional y Medicina Estética. Cuenta con un Magíster en Pedagogía Aplicada a la Educación Superior, reflejando su profunda vocación académica tras más de una década como docente universitaria en áreas de salud y anatomía. Su enfoque clínico integra el conocimiento anatómico-funcional con la aplicación de tecnologías de vanguardia como Trilaser Diodo y HIFU Corporal, brindando tratamientos seguros, efectivos y personalizados.",
        ubicacion: { titulo: "Atención Presencial", descripcion: "Los Ángeles, Región del Biobío, Chile." },
        certificaciones: [
            { nombre: "Trilaser Diodo", descripcion: "Certificación en manejo avanzado de Trilaser Diodo (2024)." },
            { nombre: "HIFU", descripcion: "Certificación Internacional de manejo de Ultrasonido Micro y Macro Focalizado de alta intensidad (2023)." },
            { nombre: "Kinesiología Dermatofuncional", descripcion: "Diplomado Internacional en Kinesiología Dermatofuncional (2022)." },
            { nombre: "Factores de Riesgo Psicosocial", descripcion: "Diplomado de Evaluación de Factores de Riesgo Psicosocial (2017)." },
        ],
        habilidades: ["KINESIOLOGÍA DERMATOFUNCIONAL", "TECNOLOGÍA LÁSER", "HIFU CORPORAL", "DOCENCIA UNIVERSITARIA", "ANATOMÍA"],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Centro de Medicina y Estética Dermactiva", periodo: "2020 - 2026", descripcion: "Atención clínica especializada y tratamientos dermatofuncionales." },
            { lugar: "Centro de Medicina y Estética Nutriage", periodo: "2018 - 2020", descripcion: "Atención de pacientes en el área estética." },
            { lugar: "Docencia Universitaria en Salud", periodo: "2012 - 2019", descripcion: "Docente en U. La República, INACAP, U. Santo Tomás y U. Bolivariana en asignaturas como Anatomía, Fisiopatología, Ergonomía y Atención Pre-hospitalaria." },
            { lugar: "Clínica de Medicina Estética Lipoderma", periodo: "2013 - 2015", descripcion: "Atención de pacientes en el área estética." },
        ],
        formacion: [
            { titulo: "Kinesióloga", badge: "Título", descripcion: "Egresada y Titulada en Kinesiología, Universidad Santo Tomás, Los Ángeles (2010-2011)." },
            { titulo: "Magíster en Pedagogía", badge: "Postgrado", descripcion: "Magíster en Pedagogía Aplicada a la Educación Superior (2017-2019)." },
            { titulo: "Diplomado en Educación Superior", descripcion: "Formación en docencia universitaria (2017)." },
            { titulo: "Diplomado en Kinesiología Dermatofuncional", badge: "Especialidad", descripcion: "Diplomado Internacional (2022)." },
        ],
        especializaciones: [
            { titulo: "Kinesiología Dermatofuncional", descripcion: "Tratamientos estéticos corporales y faciales avanzados." },
            { titulo: "Tecnología HIFU", descripcion: "Manejo experto de ultrasonido micro y macro focalizado de alta intensidad." },
            { titulo: "Láser Diodo", descripcion: "Depilación definitiva y tratamientos con manejo avanzado de Trilaser." },
            { titulo: "Docencia en Salud", descripcion: "Amplia experiencia formando profesionales de salud y estética corporal." },
        ],
    },
    {
        id: "stefania-kuncar",
        nombre: "Stefania",
        apellido: "Kuncar Ferrón",
        titulo: "",
        subtitulo: "Matrona & Licenciada en Obstetricia",
        categoria: "Ginecología",
        imagen: "/profesionales/clinica-cialo_Stefania_Kuncar.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/stefania-kuncar",
        agendaNotice: "Control Ginecológico con Matrona",
        perfil: "Matrona egresada con distinción Magna Cum Laude de la Universidad Andrés Bello. Especialista en salud sexual y reproductiva con formación avanzada en ginecoestética y medicina estética oncológica. Su integración con el marketing digital le permite liderar procesos de atención centrados en la excelencia y la comunicación efectiva con el paciente.",
        ubicacion: { titulo: "Atención Presencial", descripcion: "Los Ángeles, Región del Biobío, Chile." },
        certificaciones: [
            { nombre: "Magna Cum Laude", descripcion: "Universidad Andrés Bello, Concepción." },
        ],
        habilidades: ["PROACTIVIDAD", "LIDERAZGO", "GINECOESTÉTICA", "MARKETING DIGITAL"],
        idiomas: [
            { idioma: "Español", nivel: "Nativo" },
            { idioma: "Inglés", nivel: "Avanzado (B2 Cambridge)" },
        ],
        trayectoria: [
            { lugar: "CEO Matronas Chile", periodo: "Actualidad", descripcion: "Gestión estratégica y atención clínica especializada." },
            { lugar: "Atención Primaria (CESFAM)", periodo: "2023 — 2024", descripcion: "Experiencia en salud pública integral y comunitaria." },
        ],
        formacion: [
            { titulo: "Obstetricia & Puericultura", badge: "Magna Cum Laude", descripcion: "Universidad Andrés Bello, Concepción." },
            { titulo: "Diplomado Marketing Digital", descripcion: "Estrategias de comunicación y fidelización del paciente." },
        ],
        especializaciones: [
            { titulo: "Ginecoestética Médica", descripcion: "Universidad EUNEIZ. Técnicas médico-estéticas en el ámbito ginecológico." },
            { titulo: "Medicina Estética Oncológica", descripcion: "Universidad EUNEIZ. Especialización en abordaje integral oncoestético." },
            { titulo: "Female Sexual Wellness", descripcion: "Harvard Medical School. Salud sexual femenina avanzada." },
            { titulo: "Tecnología Láser CO2", descripcion: "Certificación Técnica: Rejuvenecimiento íntimo y facial." },
            { titulo: "Dispositivos Intrauterinos", descripcion: "Inserción de Mirena, Kyleena y Asertia." },
            { titulo: "Rehabilitación Piso Pélvico", descripcion: "Bases funcionales y recuperación de la salud íntima." },
        ],
        videos: [
            {
                id: "manchas-zona-intima",
                titulo: "¿Manchas en tu zona íntima? Mejora el tono y uniformidad de forma segura",
                youtubeUrl: "https://youtu.be/tuX64FL9AfE",
                youtubeId: "tuX64FL9AfE",
                descripcion: "Conoce los tratamientos para mejorar el tono de la piel en la zona íntima de forma segura y efectiva.",
            },
            {
                id: "laser-co2-rejuvenecimiento",
                titulo: "Láser CO2 Fraccionado: Rejuvenecimiento y Salud Íntima Femenina",
                youtubeUrl: "https://youtu.be/t7lvu65ScK0",
                youtubeId: "t7lvu65ScK0",
                descripcion: "Descubre cómo el Láser CO2 Fraccionado puede ayudarte a rejuvenecer y mejorar la salud íntima femenina.",
            },
        ],
    },
    {
        id: "francisca-gonzalez",
        nombre: "Francisca Andrea",
        apellido: "González Saldivia",
        titulo: "Dra.",
        subtitulo: "Cirujana Vascular y Endovascular | Especialista U. de Chile",
        categoria: "Vascular",
        imagen: "/profesionales/clinica-cialo_Francisca_Gonzalez.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/francisca-gonzalez",
        agendaNotice: "Agendar Consulta Vascular",
        seo: {
            metaTitle: "Dra. Francisca González | Cirujano Vascular Los Ángeles | Clínica Cialo",
            metaDescription: "Agenda tu hora con la Dra. Francisca González, Médico Cirujano Vascular y Endovascular en Los Ángeles. Especialista U. de Chile en várices y patologías vasculares.",
            keywords: [
                "cirujano vascular los angeles",
                "medico vascular los angeles",
                "cirujano vascular",
                "especialista en varices los angeles",
                "flebologo los angeles"
            ]
        },
        perfil: "Médico Cirujano de la Universidad Austral de Chile con subespecialidad en Cirugía Vascular Periférica y Endovascular por la Universidad de Chile. Con amplia experiencia en el tratamiento de patologías vasculares, desde várices hasta isquemia crítica. Reconocida como Mejor Egresado del Programa de Cirugía General 2013-2016, combina excelencia académica con formación internacional en Dartmouth-Hitchcock Medical Center (EEUU).",
        ubicacion: { titulo: "Atención Presencial", descripcion: "Angol y Los Ángeles, Región de La Araucanía y Biobío." },
        certificaciones: [
            { nombre: "Cirugía Vascular y Endovascular", descripcion: "Universidad de Chile. Registro Superintendencia de Salud (2020)." },
            { nombre: "Cirugía General", descripcion: "Universidad de Chile. Mejor Egresado 2013-2016." },
            { nombre: "Médico Cirujano", descripcion: "Universidad Austral de Chile. Calificación Nacional: 6,32." },
        ],
        habilidades: ["CIRUGÍA VASCULAR", "ENDOVASCULAR", "ESCLEROTERAPIA", "VÁRICES", "CIRUGÍA GENERAL"],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Hospital Mauricio Heyermann, Angol", periodo: "2020 — Presente", descripcion: "Cirujana Vascular. Cirujana de Turno en Unidad de Emergencias." },
            { lugar: "Hospital Salvador, Santiago", periodo: "2018 — 2020", descripcion: "Residente de Cirugía Vascular y Endovascular. Universidad de Chile." },
            { lugar: "Hospital de Angol", periodo: "2016 — 2018", descripcion: "Cirujano General Adultos. Turnos en Unidad de Emergencias." },
            { lugar: "Hospital Clínico U. de Chile", periodo: "2013 — 2016", descripcion: "Residencia en Cirugía General. Reconocida como Mejor Egresado del programa." },
            { lugar: "Sociedad de Cirujanos de Chile", periodo: "2014 — 2015", descripcion: "Presidenta Seccional de Residentes." },
        ],
        formacion: [
            { titulo: "Subespecialidad en Cirugía Vascular Periférica y Endovascular", badge: "2018-2020", descripcion: "Universidad de Chile. Registro Superintendencia de Salud 2020." },
            { titulo: "Especialización en Cirugía General", badge: "2013-2016", descripcion: "Hospital Clínico U. de Chile. Mención: Mejor Egresado del Programa." },
            { titulo: "Médico Cirujano", badge: "2006-2012", descripcion: "Universidad Austral de Chile. Licenciado en Medicina." },
            { titulo: "Diplomado en Gestión Estratégica de Unidades Clínicas", badge: "2015", descripcion: "Universidad de Chile." },
        ],
        especializaciones: [
            { titulo: "Cirugía Endovascular", descripcion: "Tratamientos mínimamente invasivos para patología vascular compleja." },
            { titulo: "Escleroterapia con Espuma", descripcion: "Tratamiento efectivo y ambulatorio para várices." },
            { titulo: "Isquemia Crítica", descripcion: "Manejo avanzado basado en angiografía convencional." },
            { titulo: "Formación Internacional", descripcion: "Vascular Surgery Observation Stay, Dartmouth-Hitchcock Medical Center, EEUU (2016)." },
            { titulo: "Cirugía Laparoscópica", descripcion: "Curso IRCAD en Laparoscopic General Surgery, Brasil (2015)." },
            { titulo: "ACLS Certificado", descripcion: "Advanced Cardiovascular Life Support (2018)." },
        ],
        videos: [
            {
                id: "escleroterapia-espuma",
                titulo: "¿Qué es la Escleroterapia con Espuma? El Tratamiento Efectivo para tus Várices",
                youtubeUrl: "https://youtu.be/vFpPFBTD_MU",
                youtubeId: "vFpPFBTD_MU",
                descripcion: "Conoce cómo la escleroterapia con espuma puede ayudarte a eliminar las várices de forma efectiva y sin cirugía.",
            },
        ],
    },
    {
        id: "maria-jesus-contreras",
        nombre: "María Jesús",
        apellido: "Contreras Merino",
        titulo: "Enf.",
        subtitulo: "Enfermera Universitaria | Especialista en Gestión Clínica y Estética Corporal",
        categoria: "Corporal",
        imagen: "/profesionales/clinica-cialo_Maria_Jesus_Contreras.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/maria-jesus-contreras",
        serviciosOnline: ["Evaluación corporal integral"],
        agendaNotice: "Evaluación Corporal y Tratamientos Estéticos",
        perfil: "Enfermera con sólida vocación de servicio y experiencia en gestión clínica. Destaca por liderar equipos, optimizar procesos y asegurar el cumplimiento normativo, garantizando una atención segura y de calidad. Comprometida, proactiva y orientada a resultados, aporta liderazgo positivo y excelencia operativa para mejorar el desempeño de los equipos y el bienestar de los pacientes.",
        ubicacion: {
            titulo: "Los Ángeles / Concepción",
            descripcion: "Costanera Quilque Norte 820, Condominio Santa Ana oriente. Torre Olivo 403, Los Ángeles.",
        },
        certificaciones: [
            { nombre: "IAAS", descripcion: "Infecciones Asociadas a la Atención de la Salud, UDD." },
            { nombre: "RCP Avanzado", descripcion: "Reanimación Cardio-Pulmonar avanzado, UDD." },
        ],
        habilidades: ["GESTIÓN CLÍNICA", "ESTÉTICA CORPORAL", "LIDERAZGO", "IAAS", "CRIOLIPÓLISIS"],
        idiomas: [
            { idioma: "Español", nivel: "Nativo" },
            { idioma: "Inglés", nivel: "Intermedio" },
        ],
        trayectoria: [
            { lugar: "Clínica Dermoestética Skin+", periodo: "2022 - 2025", descripcion: "Enfermera Jefe. Gestión de RRHH, supervisión normativa y coordinación de equipos clínicos." },
            { lugar: "Posta Rural Trupán, Tucapel", periodo: "2023", descripcion: "Enfermera de reemplazo. Ejecución de procedimientos, control niño sano y programas cardiovasculares." },
            { lugar: "Alerta Salud en Casa", periodo: "2024", descripcion: "Programa GORE. Educación y monitorización de adultos mayores en patologías crónicas." },
        ],
        formacion: [
            { titulo: "Enfermería", badge: "UDD", descripcion: "Universidad del Desarrollo, sede Concepción (2017-2022)." },
            { titulo: "Diplomado Gestión y Liderazgo", badge: "PUC", descripcion: "Pontificia Universidad Católica de Chile." },
            { titulo: "Ingeniería en Administración", badge: "UDD", descripcion: "Universidad del Desarrollo (2022 - Presente)." },
        ],
        especializaciones: [
            { titulo: "Criolipólisis Clatuu Alpha", descripcion: "Especialista en eliminación de grasa localizada con tecnología de succión 360°." },
            { titulo: "Scizer HIFU Corporal", descripcion: "Reducción de grasa profunda y tonificación cutánea con ultrasonido de alta intensidad." },
            { titulo: "Gestión de Recursos Humanos", descripcion: "Coordinación y supervisión de cumplimiento normativo ley 20.584." },
            { titulo: "Thetahealing", descripcion: "Seminarios de indagación profunda y anatomía intuitiva (2024-2025)." },
        ],
        videos: [
            {
                id: "clatuu-alpha",
                titulo: "Clatuu Alpha en Clínica Cialo | Tecnología avanzada para reducción de grasa sin cirugía",
                youtubeUrl: "https://youtu.be/KYAOSg9EoaY",
                youtubeId: "KYAOSg9EoaY",
                descripcion: "Descubre cómo Clatuu Alpha puede ayudarte a reducir grasa localizada sin cirugía ni tiempo de recuperación.",
            },
            {
                id: "scizer-hifu",
                titulo: "Scizer HIFU: Elimina la grasa localizada que no baja con nada",
                youtubeUrl: "https://youtube.com/shorts/tnPD48lufPQ",
                youtubeId: "tnPD48lufPQ",
                descripcion: "La Enf. María Jesús te presenta Scizer, el HIFU corporal que calienta y elimina la grasa de forma profunda y segura. Moldea tu figura sin tiempo de recuperación.",
            },
        ],
    },
    {
        id: "elga-viviana-pena",
        nombre: "Elga Viviana",
        apellido: "Peña",
        titulo: "Dra.",
        subtitulo: "Médico Cirujano | Especialista en Cirugía General | Máster en Medicina Estética y Regenerativa",
        categoria: "Corporal",
        imagen: "/profesionales/clinica-cialo_Elga_Pena.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        agendaNotice: "Consulta de Medicina Estética",
        perfil: "Médico Cirujano con más de 10 años de experiencia en Medicina Estética. Cuenta con especialización en Cirugía General y Máster en Medicina Estética y Regenerativa por la Universidad Complutense de Madrid. Certificada por EUNACOM para el ejercicio médico en Chile. Experta en tratamientos no quirúrgicos faciales y corporales, incluyendo toxina botulínica, bioestimuladores y rellenos con ácido hialurónico.",
        ubicacion: { titulo: "Atención Presencial", descripcion: "Los Ángeles, Región del Biobío, Chile." },
        certificaciones: [
            { nombre: "EUNACOM", descripcion: "Certificación para el ejercicio médico en Chile." },
            { nombre: "Máster en Medicina Estética y Regenerativa", descripcion: "Universidad Complutense de Madrid, España." },
        ],
        habilidades: [
            "CIRUGÍA MENOR", 
            "TOXINA BOTULÍNICA", 
            "BIOESTIMULADORES", 
            "ÁCIDO HIALURÓNICO", 
            "LIPOLÍTICOS", 
            "CONTROL DE PESO"
        ],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Clínica Cialo", periodo: "Actualidad", descripcion: "Especialista en tratamientos estéticos faciales y corporales. Cirugía menor, bioestimuladores y toxina." },
            { lugar: "Práctica en Medicina Estética", periodo: "2014 — Presente", descripcion: "Más de 10 años de experiencia en medicina estética, realizando miles de procedimientos con resultados naturales." },
            { lugar: "Formación Internacional", periodo: "España", descripcion: "Master en Cirugía Estética en la Universidad Complutense de Madrid." },
        ],
        formacion: [
            { titulo: "Médico Cirujano", badge: "Título", descripcion: "Formación médica integral universitaria." },
            { titulo: "Especialización en Cirugía General", badge: "Postgrado", descripcion: "Formación especializada en cirugía general." },
            { titulo: "Máster en Medicina Estética y Regenerativa", badge: "UCM Madrid", descripcion: "Universidad Complutense de Madrid, España." },
        ],
        especializaciones: [
            { titulo: "Cirugía Menor", descripcion: "Resección de lunares, eliminación de verrugas y exéresis de lipomas." },
            { titulo: "Toxina Botulínica", descripcion: "Tratamiento de arrugas, diseño facial (Nefertiti) y manejo de bruxismo." },
            { titulo: "Aumento de Glúteos y Bioestimulación", descripcion: "Bioestimuladores (Lanluma, Sculptra, Radiesse) para volumen y firmeza corporal/facial." },
            { titulo: "Tecnología Avanzada", descripcion: "Manejo de equipos como Morpheus8, Exilis y Scizer para tensado profundo." },
            { titulo: "Rellenos con Ácido Hialurónico", descripcion: "Volumen inmediato, armonización facial y corrección de imperfecciones." },
            { titulo: "Manejo Metabólico", descripcion: "Tratamiento de sobrepeso con fármacos de última generación." },
        ],
        videos: [
            {
                id: "gluteos-sin-cirugia",
                titulo: "Aumento de Glúteos sin Cirugía | Bioestimuladores vs Ácido Hialurónico",
                youtubeUrl: "https://youtube.com/shorts/PHmWGTXbIEI",
                youtubeId: "PHmWGTXbIEI",
                descripcion: "La Dra. Peña te cuenta las 2 mejores opciones médicas para aumentar o mejorar la forma de tus glúteos sin pasar por el quirófano.",
            },
        ],
    },

    {
        id: "frank-ulloa",
        nombre: "Frank",
        apellido: "Ulloa Carrasco",
        titulo: "Dr.",
        subtitulo: "Urólogo | Especialista en Cirugía Urológica",
        categoria: "Urología",
        imagen: "/profesionales/clinica-cialo_Frank_Ulloa.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/frank-ulloa",
        agendaNotice: "Consulta de Urología",
        seo: {
            metaTitle: "Urólogo Los Ángeles: Dr. Frank Ulloa | Clínica Cialo",
            metaDescription: "Agenda tu consulta con el Dr. Frank Ulloa, Médico Urólogo en Los Ángeles. Especialista en engrosamiento peneano, vasectomía y patologías del tracto urinario.",
            keywords: [
                "urologo los angeles",
                "urologo en los angeles",
                "urologo angeles",
                "frank ulloa urologo",
                "urologos en los angeles",
                "dr ulloa urologo",
                "medico urologo los angeles"
            ]
        },
        perfil: "Médico Urólogo con amplia experiencia en diagnóstico y tratamiento de patologías del tracto urinario. Especialista en procedimientos urológicos de alta complejidad incluyendo cistoscopía diagnóstica y engrosamiento peneano. Formación sólida en cirugía urológica con enfoque en técnicas mínimamente invasivas.",
        ubicacion: { titulo: "Atención Presencial", descripcion: "Los Ángeles, Región del Biobío, Chile." },
        certificaciones: [
            { nombre: "Urólogo", descripcion: "Especialista certificado en urología." },
            { nombre: "EUNACOM", descripcion: "Certificación para ejercicio médico en Chile." },
        ],
        habilidades: ["UROLOGÍA", "CISTOSCOPÍA", "CIRUGÍA UROLÓGICA", "ESTÉTICA MASCULINA"],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Clínica Cialo", periodo: "Actualidad", descripcion: "Consulta urológica y procedimientos estéticos masculinos." },
        ],
        formacion: [
            { titulo: "Especialista en Urología", badge: "Postgrado", descripcion: "Formación especializada en urología." },
            { titulo: "Médico Cirujano", descripcion: "Título de médico cirujano." },
        ],
        especializaciones: [
            { titulo: "Cistoscopía Diagnóstica", descripcion: "Evaluación endoscópica del tracto urinario." },
            { titulo: "Bioplastía de Engrosamiento", descripcion: "Procedimiento estético para aumento de grosor peneano." },
            { titulo: "Cirugía Urológica", descripcion: "Procedimientos quirúrgicos urológicos de diversa complejidad." },
        ],
    },
    {
        id: "mariane-kiss",
        nombre: "Mariane",
        apellido: "Kiss Molina",
        titulo: "Dra.",
        subtitulo: "Miss Universo Los Ángeles 2026 | Cirujano Dentista | Especialista en Armonización Orofacial",
        categoria: "Facial",
        imagen: "/profesionales/clinica-cialo_Mariane_Kiss.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/mariane-kiss",
        agendaNotice: "Evaluación de Armonización Orofacial",
        perfil: "Miss Universo Los Ángeles 2026 y Cirujano Dentista especializada en Armonización Orofacial. Experta en tratamientos estéticos faciales no quirúrgicos que integran la odontología con la medicina estética. Su formación combina el conocimiento profundo de la anatomía facial con técnicas avanzadas de rejuvenecimiento y armonización del rostro.",
        ubicacion: { titulo: "Atención Presencial", descripcion: "Los Ángeles, Región del Biobío, Chile." },
        certificaciones: [
            { nombre: "Cirujano Dentista", descripcion: "Título profesional en odontología." },
            { nombre: "Armonización Orofacial", descripcion: "Especialización en estética facial integrada." },
        ],
        habilidades: ["ARMONIZACIÓN FACIAL", "TOXINA BOTULÍNICA", "ÁCIDO HIALURÓNICO", "RINOMODELACIÓN"],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Clínica Cialo", periodo: "Actualidad", descripcion: "Especialista en armonización orofacial y tratamientos estéticos faciales." },
        ],
        formacion: [
            { titulo: "Cirujano Dentista", descripcion: "Formación integral en odontología." },
            { titulo: "Especialización en Armonización Orofacial", descripcion: "Formación avanzada en estética facial." },
        ],
        especializaciones: [
            { titulo: "Toxina Botulínica", descripcion: "Tratamiento de arrugas dinámicas y corrección de expresiones." },
            { titulo: "Rellenos con Ácido Hialurónico", descripcion: "Aumento de volumen y corrección de asimetrías faciales." },
            { titulo: "Rinomodelación", descripcion: "Corrección del perfil nasal sin cirugía." },
            { titulo: "Tratamiento de Bruxismo", descripcion: "Aplicación de toxina botulínica para alivio del bruxismo." },
        ],
    },

    {
        id: "fanny-cea-veloz",
        nombre: "Fanny",
        apellido: "Cea Veloz",
        titulo: "Psic.",
        subtitulo: "Psicóloga Clínica | Magíster en Psicología | Especialista en TCA y Obesidad",
        categoria: "Psicología",
        imagen: "/profesionales/clinica-cialo_Fanny_Cea.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/fanny-cea-veloz",
        // Su agenda tiene también un "control"; en la web solo se reserva la consulta.
        serviciosOnline: ["Consulta psicológica"],
        agendaNotice: "Agenda tu consulta psicológica",
        seo: {
            metaTitle: "Psicóloga Fanny Cea Veloz | TCA y Obesidad en Los Ángeles | CIALO",
            metaDescription: "Psicóloga clínica con 13 años de experiencia, Magíster UdeC. Especialista en TCA, obesidad y cirugía bariátrica en Los Ángeles. Consulta psicológica $50.000.",
            keywords: [
                "fanny cea veloz",
                "psicologa los angeles",
                "psicologa tca los angeles",
                "psicologa cirugia bariatrica",
                "magister psicologia udec",
                "psicologa obesos los angeles"
            ]
        },
        perfil: "Psicóloga con 13 años de experiencia, dedicada a la especialización continua en trastornos de la conducta alimentaria y obesidad. Con magísteres en Psicología e Investigación en Salud, y formación avanzada en terapias basadas en evidencia, acompaña activamente a pacientes en procesos complejos como la cirugía bariátrica. Su enfoque empático y científico garantiza un apoyo integral en salud mental.",
        certificaciones: [
            { nombre: "Magíster en Psicología", descripcion: "Universidad de Concepción" },
            { nombre: "Posgrado en Investigación en Salud", descripcion: "Universidad de la Frontera" },
            { nombre: "NPCO", descripcion: "Directorio nacional de psicólogos y psiquiatras en cirugía para la obesidad" },
        ],
        habilidades: [
            "Psicoterapia Evidencia Científica",
            "Terapia Cognitivo Conductual",
            "TCA (Trastornos Alimentarios)",
            "Psicología Bariátrica",
            "Manejo de Obesidad",
            "Trastornos de Personalidad"
        ],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Sociedad Chilena de Cirugía Bariátrica (SCCBM-IFSO)", periodo: "Actualidad", descripcion: "Parte del directorio nacional de NPCO." },
            { lugar: "Consulta Especializada", periodo: "2012 - Presente", descripcion: "Atención de alta complejidad en salud mental y conducta alimentaria." },
        ],
        formacion: [
            { titulo: "Título de Psicóloga", badge: "UdeC", descripcion: "Universidad de Concepción (2012)." },
            { titulo: "Magíster en Psicología", badge: "UdeC", descripcion: "Universidad de Concepción." },
            { titulo: "Magíster de Clínica de TCA y Alimentación", badge: "UAI", descripcion: "En proceso de tesis, Universidad Adolfo Ibáñez." },
            { titulo: "Posgrado en Investigación en Salud", badge: "UFRO", descripcion: "Universidad de la Frontera." },
        ],
        especializaciones: [
            { titulo: "Terapia Cognitivo Conductual", descripcion: "Abordaje basado en evidencia para trastornos complejos." },
            { titulo: "Conducta Alimentaria", descripcion: "Manejo especializado de TCA, obesidad y cirugía bariátrica." },
            { titulo: "Salud Mental de Alta Complejidad", descripcion: "Intervención en trastornos de personalidad, suicidio y adicciones." },
        ],
    },
    {
        id: "rosella-zaffiri",
        nombre: "Rosella",
        apellido: "Zaffiri Gutiérrez",
        titulo: "Nut.",
        subtitulo: "Nutricionista | Especialista en Cirugía Bariátrica",
        categoria: "Nutrición",
        imagen: "/profesionales/clinica-cialo_Rosella_Zaffiri.webp",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/rosella-zaffiri",
        agendaNotice: "Evaluación Nutricional Integral",
        seo: {
            metaTitle: "Nutricionista Rosella Zaffiri | Especialista en Cirugía Bariátrica | Clínica Cialo",
            metaDescription: "Agenda tu consulta con Rosella Zaffiri G., Nutricionista especializada en cirugía bariátrica y nutrición clínica. Experta en manejo dieto terapéutico y hábitos saludables.",
            keywords: ["nutricionista los angeles", "cirugia bariatrica nutricion", "rosella zaffiri", "nutricionista bariatrica", "evaluacion nutricional"]
        },
        perfil: "Nutricionista con un enfoque dieto terapéutico, dedicada a la educación y promoción de hábitos de vida saludables. Especializada en cirugía bariátrica, lidera con responsabilidad y compromiso el acompañamiento nutricional en todas las etapas del ciclo vital, asegurando un seguimiento adaptado a las necesidades específicas de cada paciente.",
        certificaciones: [
            { nombre: "Especialidad en Cirugía Bariátrica", descripcion: "Instituto Vive Sano Brasil (Certificación Internacional)" },
            { nombre: "IAAS", descripcion: "Curso infecciones asociadas a la atención de salud (120 hrs)" },
        ],
        habilidades: ["CIRUGÍA BARIÁTRICA", "NUTRICIÓN CLÍNICA", "DIETOTERAPIA", "HÁBITOS SALUDABLES"],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Clínica Los Andes", periodo: "2021 — Actualidad", descripcion: "Asesoría nutricional especializada en pacientes bariátricos y ciclo vital." },
            { lugar: "Constructora Alonso", periodo: "2021", descripcion: "Nutricionista supervisora de central de alimentación." },
            { lugar: "KLG Group", periodo: "2018 — 2019", descripcion: "Visitador médico para productos nutricionales." },
        ],
        formacion: [
            { titulo: "Título de Nutricionista", badge: "UVM", descripcion: "Universidad Viña del Mar (2018)." },
            { titulo: "Diplomado Nutrición Clínica Infantil", badge: "U. de los Andes", descripcion: "Diplomado en Nutrición clínica del niño y adolescente (2020-2021)." },
        ],
        especializaciones: [
            { titulo: "Cirugía Bariátrica", descripcion: "Certificación internacional en el manejo nutricional pre y post quirúrgico." },
            { titulo: "Nutrición Clínica", descripcion: "Enfoque dieto terapéutico adaptado a patologías y grupos etarios." },
            { titulo: "Gestión de Calidad", descripcion: "Capacitación en gestión de instituciones de salud y trato al usuario." },
        ],
    },
    {
        id: "mauriluz-atencio",
        nombre: "Mauriluz",
        apellido: "Atencio Cardozo",
        titulo: "Dra.",
        subtitulo: "Médica Cirujana",
        categoria: "Medicina General",
        imagen: "/profesionales/clinica-cialo_Mauriluz_Atencio.webp",
        agendaUrl: "https://wa.me/56982028473",
        agendaNotice: "Consulta Médica",
        perfil: "Médica Cirujana titulada por la Universidad del Zulia, con certificación EUNACOM. Cuenta con amplia experiencia en atención primaria de salud, coordinación de redes de urgencia y medicina laboral. Se destaca por su calidez humana, trabajo en equipo y liderazgo en la gestión clínica, respaldada por una formación continua en epidemiología, salud familiar y atención centrada en el paciente. Posee certificación en Sueroterapia y Suplementación Endovenosa, certificación en Manejo Integral de la Obesidad y Lipedema, y certificación en Manejo Avanzado de Armonización Orofacial. Su enfoque integra la medicina preventiva, el bienestar integral y la medicina estética, ofreciendo una atención personalizada orientada a mejorar la salud, calidad de vida y confianza de sus pacientes.",
        ubicacion: { titulo: "Atención Presencial", descripcion: "Los Ángeles, Región del Biobío, Chile." },
        certificaciones: [
            { nombre: "Médico Cirujano", descripcion: "Universidad del Zulia, Venezuela (2015)." },
            { nombre: "EUNACOM", descripcion: "Aprobado (2021)." },
            { nombre: "Registro Nacional de Prestadores", descripcion: "Inscripción N° 660293." },
            { nombre: "Sueroterapia y Suplementación Endovenosa", descripcion: "Certificación." },
            { nombre: "Manejo Integral de Obesidad y Lipedema", descripcion: "Certificación." },
            { nombre: "Armonización Orofacial Avanzada", descripcion: "Certificación en manejo avanzado." },
            { nombre: "Medicina Estética Avanzada", descripcion: "Formación avanzada líder — SAENI." }
        ],
        habilidades: ["ATENCIÓN PRIMARIA", "GESTIÓN CLÍNICA", "URGENCIAS", "LIDERAZGO", "TRABAJO EN EQUIPO"],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Red de Urgencia Servicio de Salud Biobío", periodo: "2021 - Presente", descripcion: "Coordinador Médico." },
            { lugar: "Atención Primaria de Salud, Biobío", periodo: "2019 - 2021", descripcion: "Médico de APS." }
        ],
        formacion: [
            { titulo: "Médica Cirujana", badge: "Título", descripcion: "Universidad del Zulia, Venezuela." },
            { titulo: "EUNACOM", badge: "Certificación", descripcion: "Aprobado." }
        ],
        especializaciones: [
            { titulo: "Salud Familiar y APS", descripcion: "Múltiples cursos y seminarios en salud familiar, epidemiología y modelo de atención primaria." },
            { titulo: "Gestión y Liderazgo", descripcion: "Formación en liderazgo, trabajo en equipo y programación en salud." },
            { titulo: "Medicina de Urgencia", descripcion: "Capacitación en urgencias y ACLS." }
        ]
    },
    {
        id: "claudia-tello",
        nombre: "Claudia",
        apellido: "Tello Ibarra",
        titulo: "",
        subtitulo: "Podóloga Clínica",
        categoria: "Podología",
        imagen: "",
        agendaUrl: "https://wa.me/56982028473",
        agendaNotice: "Atención Podológica",
        perfil: "Podóloga clínica con más de 9 años de experiencia en diagnóstico, tratamiento y seguimiento personalizado de patologías del pie. Su atención es rápida, integral, eficaz y amable, trabajando en condiciones de esterilidad con pacientes de todas las edades, desde deportistas hasta adultos mayores y personas con pie diabético. Se ha formado en técnicas de onicocriptosis (fenol alcohol), verruga plantar, anestesia en podología, ortonixia y reconstrucción ungueal.",
        ubicacion: { titulo: "Atención Presencial", descripcion: "Los Ángeles, Región del Biobío, Chile." },
        certificaciones: [
            { nombre: "Técnico de Nivel Superior en Podología Clínica", descripcion: "CFT Santo Tomás (2017). Aprobado con distinción · Registro N° 91362." },
            { nombre: "Registro Nacional de Prestadores", descripcion: "Prestador Individual de Salud, Superintendencia de Salud · N° 477014." },
            { nombre: "IV Seminario Hispano-Chileno", descripcion: "Actualizaciones en Podología — Magister Capacitaciones, Valdivia (2024)." },
            { nombre: "Onicocriptosis — Técnica Fenol Alcohol", descripcion: "Taller de tratamiento de uña incarnada (4 horas pedagógicas)." },
            { nombre: "Tratamiento de Verruga Plantar", descripcion: "Taller (4 horas pedagógicas)." },
            { nombre: "Anestesia en Podología", descripcion: "Taller (4 horas pedagógicas)." },
            { nombre: "Ortonixia y Reconstrucción Ungueal", descripcion: "Taller de ortonixia, reconstrucción ungueal y órtesis en silicona." }
        ],
        habilidades: ["PIE DIABÉTICO", "UÑA INCARNADA", "ONICOMICOSIS", "VERRUGA PLANTAR", "MATERIAL ESTÉRIL"],
        idiomas: [{ idioma: "Español", nivel: "Nativo" }],
        trayectoria: [
            { lugar: "Podología Claudia Tello Ibarra, Los Ángeles", periodo: "Actualidad", descripcion: "Consulta particular: quiropodia, uña incarnada, pie diabético, onicomicosis y verruga plantar." },
            { lugar: "Centro Podológico Los Ángeles", periodo: "2 años", descripcion: "Atención clínica podológica integral y tratamiento de patologías ungueales y de la piel." },
            { lugar: "Clínica Central Pie", periodo: "4 años", descripcion: "Quiropodia, pie diabético y tratamiento de onicocriptosis." },
            { lugar: "Podología Integral, Curicó", periodo: "1 año", descripcion: "Gestión y atención de consulta propia." }
        ],
        formacion: [
            { titulo: "Técnico en Podología Clínica", badge: "CFT Santo Tomás", descripcion: "Técnico de Nivel Superior, aprobado con distinción (2017)." },
            { titulo: "Actualización en Podología", badge: "Simposio", descripcion: "10 horas pedagógicas — Magister Capacitaciones (2024)." }
        ],
        especializaciones: [
            { titulo: "Pie Diabético", descripcion: "Atención y cuidado preventivo del pie diabético." },
            { titulo: "Patologías Ungueales", descripcion: "Uña incarnada, onicomicosis, ortonixia y reconstrucción ungueal." },
            { titulo: "Piel del Pie", descripcion: "Dermatomicosis, verruga plantar y evaluación biomecánica de la pisada." }
        ],
        seo: {
            metaTitle: "Podóloga en Los Ángeles | Claudia Tello Ibarra | Clínica Cialo",
            metaDescription: "Podóloga clínica en Los Ángeles con más de 9 años de experiencia: quiropodia, uña incarnada, pie diabético, onicomicosis y verruga plantar.",
            keywords: ["podologa los angeles", "podologia los angeles", "uña encarnada los angeles", "pie diabetico", "onicomicosis"]
        }
    },
];

export const getProfesionalById = (id: string): Profesional | undefined => {
    return profesionalesData.find((p) => p.id === id);
};

/** Iniciales (nombre + primer apellido) para profesionales sin foto. */
export const getIniciales = (p: Profesional): string =>
    `${p.nombre.charAt(0)}${p.apellido.charAt(0)}`.toUpperCase();

export const getAllVideos = (): Video[] => {
    return profesionalesData
        .filter((p) => p.videos && p.videos.length > 0)
        .flatMap((p) => p.videos!.map((v) => ({ ...v, profesional: `${p.titulo} ${p.nombre} ${p.apellido}`.trim() })));
};


