export interface ZonaDepilacion {
    zona: string;
    tamano: string;
    precio: number;
    packSesiones?: number;
    packPrecio?: number;
}

export interface Tratamiento {
    id: string;
    categoria: string;
    subcategoria: string;
    nombre: string;
    descripcion: string;
    profesional: string;
    valorDesde: number | null;
    valorHasta: number | null;
    duracion: string;
    tags: string[];
    zonas?: ZonaDepilacion[]; // Para tratamientos con múltiples zonas/precios
    planes?: { nombre: string; precio: number }[]; // Planes o packs asociados
    agendaUrl?: string; // URL interna para agendar evaluación (ej: /consultas/consulta-tricologia)

    // Control de compra online
    requiereEvaluacion?: boolean; // true = no se puede comprar online, debe agendar consulta primero
    // Si no se especifica, se asume true para tratamientos con precio variable (valorHasta != null)

    // Campos SEO opcionales
    slug?: string; // URL de la landing page ej: "toxina-botulinica-tercio-superior-los-angeles"
    landingPage?: boolean; // true si tiene página dedicada
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };
    beneficios?: string[];
    contraindicaciones?: string[];
    efectosSecundarios?: string[];
    cuidadosPosteriores?: string[];
    tecnologia?: string; // ID de la tecnología asociada (referencia a tecnologias.ts)
    faqs?: { pregunta: string; respuesta: string }[];
    videoUrls?: string[];
    relatedLinks?: { text: string; url: string }[];
    imagenExplicativa?: string; // URL de la imagen explicativa (ej: gráfico comparativo)
    sinergias?: { nombre: string; descripcion: string; url?: string }[]; // Tratamientos combinados recomendados
    problematicas?: string[]; // Problemas que resuelve el tratamiento
    imagenHero?: string; // Imagen para la cabecera de la página de tratamiento
    galeria?: string[]; // Galería de imágenes del tratamiento (procedimiento/resultados)
}

export const tratamientosData: Tratamiento[] = [
    {
        id: "cool-peel",
        categoria: "Facial",
        subcategoria: "Láser",
        nombre: "Cool Peel (Láser CO₂)",
        descripcion:
            "Láser de CO₂ fraccionado exclusivo del sistema TetraPro de DEKA. Estimula la regeneración rápida de la piel con mínima carga térmica, sin dolor ni tiempo de inactividad. Potenciado con exosomas Purasome NutriComplex. Valor Evaluación: $30.000 (Si se realiza el tratamiento, este valor se descuenta del costo total).",
        profesional: "Dr. Nicolás Laucirica / Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/nicolas-laucirica",
        valorDesde: 200000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Láser CO2", "Exosomas", "Rejuvenecimiento", "Sin Dolor"],
        problematicas: ["Arrugas y líneas de expresión", "Cicatrices", "Manchas y textura", "Poros dilatados"],
        requiereEvaluacion: true,
        videoUrls: [
            "https://www.instagram.com/reel/DJR3SOygP-H/embed/"
        ],
        beneficios: [
            "Mejora visiblemente textura, poros, líneas finas y luminosidad.",
            "Sin dolor ni tiempo de inactividad garantizado.",
            "Recuperación extraordinariamente rápida.",
            "Piel más firme, uniforme y revitalizada.",
            "Induce la regeneración de colágeno sin dañar estructuras profundas."
        ],
        faqs: [
            {
                pregunta: "¿Qué es Cool Peel?",
                respuesta: "Es una tecnología exclusiva de láser CO₂ que permite una renovación superficial precisa de la piel sin la agresividad ni el tiempo de recuperación de los láseres tradicionales."
            },
            {
                pregunta: "¿Qué función cumplen los exosomas?",
                respuesta: "Incorporamos Purasome NutriComplex, ricos en factores de crecimiento, para disminuir la inflamación y acelerar la regeneración de la piel."
            },
            {
                pregunta: "¿Duele el tratamiento?",
                respuesta: "No, Cool Peel se caracteriza por ser un procedimiento confortable y sin dolor."
            }
        ],
        galeria: [
            "/resultados/laser-rejuvenecimiento/1.webp",
            "/resultados/laser-rejuvenecimiento/2.webp",
            "/resultados/laser-rejuvenecimiento/3.webp",
            "/resultados/laser-rejuvenecimiento/4.webp",
            "/resultados/cicatrices/1.webp",
            "/resultados/cicatrices/2.webp",
            "/resultados/cicatrices/3.webp",
            "/resultados/cicatrices/4.webp",
            "/resultados/cicatrices/5.webp",
        ]
    },
    {
        id: "toxina-tercio-superior",
        categoria: "Facial",
        subcategoria: "Toxina Botulínica",
        nombre: "Toxina Botulínica Tercio Superior",
        descripcion:
            "Tratamiento médico no quirúrgico que relaja temporalmente la musculatura facial para suavizar arrugas dinámicas en frente, entrecejo y patas de gallo. Resultados naturales que preservan la expresión. Valor Evaluación: $30.000 (Si se realiza el tratamiento, este valor se descuenta del costo total).",
        profesional: "Dr. Nicolás Laucirica / Dra. Mariane Kiss / Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        valorDesde: 210000,
        valorHasta: null,
        duracion: "20 min",
        tags: ["Arrugas", "Preventivo", "Rejuvenecimiento", "Botox"],
        problematicas: ["Arrugas y líneas de expresión"],
        requiereEvaluacion: true,
        // Campos SEO
        slug: "toxina-botulinica-tercio-superior-los-angeles",
        landingPage: true,
        seo: {
            metaTitle: "Toxina Botulínica Tercio Superior Los Ángeles | Botox Frente | Clínica Cialo",
            metaDescription: "Tratamiento con toxina botulínica para arrugas de frente, entrecejo y patas de gallo en Los Ángeles. Valor: $210.000. Resultados naturales.",
            keywords: ["botox los ángeles", "toxina botulínica frente", "patas de gallo", "arrugas frente"]
        },
        beneficios: [
            "Mirada Descansada: Elimina el aspecto de cansancio o enojo.",
            "Acción Preventiva: Evita la formación de surcos profundos.",
            "Rápido y Seguro: Procedimiento de 20 minutos sin tiempo de recuperación.",
            "Piel Más Lisa: Mejora visiblemente la textura de la piel.",
            "Resultados Naturales: Mantiene tu expresividad facial."
        ],
        contraindicaciones: [
            "Embarazo o periodo de lactancia.",
            "Infección activa o inflamación en la zona de aplicación.",
            "Enfermedades neuromusculares (ej: Miastenia Gravis, ELA).",
            "Alergia conocida a la albúmina o a la toxina botulínica."
        ],
        faqs: [
            {
                pregunta: "¿Cómo actúa la Toxina Botulínica en el rostro?",
                respuesta: "Bloquea temporalmente las señales nerviosas que provocan la contracción muscular. Al relajar músculos específicos, la piel se alisa y las arrugas dinámicas desaparecen."
            },
            {
                pregunta: "¿Qué debo hacer antes del tratamiento?",
                respuesta: "Para minimizar el riesgo de hematomas, recomendamos suspender suplementos de Omega-3, Vitamina E y aspirina (si no es prescripción médica) 5 días antes."
            },
            {
                pregunta: "¿Elimina todas las arrugas?",
                respuesta: "La toxina es ideal para arrugas dinámicas (al gesticular). Las arrugas estáticas profundas (marcadas en reposo) pueden requerir tratamientos complementarios como ácido hialurónico o láser CO2."
            },
            {
                pregunta: "¿Cuánto dura el efecto?",
                respuesta: "Los resultados son óptimos entre 3 a 6 meses. Recomendamos controles periódicos para mantener el efecto rejuvenecedor."
            },
            {
                pregunta: "¿El procedimiento es doloroso?",
                respuesta: "Es mínimamente invasivo y prácticamente indoloro. Utilizamos agujas ultra finas para asegurar el confort del paciente."
            },
            {
                pregunta: "¿Quedaré con la cara sin expresión?",
                respuesta: "No. Nuestro enfoque médico busca resultados naturales, atenuando arrugas pero preservando la capacidad de expresión facial."
            }
        ]
    },
    {
        id: "toxina-bruxismo",
        categoria: "Facial",
        subcategoria: "Toxina Botulínica",
        nombre: "Toxina Bruxismo (Maseteros)",
        descripcion:
            "Tratamiento funcional que relaja el músculo masetero para aliviar el bruxismo, proteger la dentadura y reducir el dolor mandibular. Como efecto secundario, produce un afinamiento del tercio inferior del rostro. Valor Evaluación: $30.000 (Si se realiza el tratamiento, este valor se descuenta del costo total).",
        profesional: "Dr. Nicolás Laucirica / Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/nicolas-laucirica",
        valorDesde: 200000,
        valorHasta: null,
        duracion: "20 min",
        tags: ["Salud", "Afinamiento", "Bruxismo", "Botox"],
        problematicas: ["Bruxismo", "Flacidez facial"],
        requiereEvaluacion: true,
        faqs: [
            {
                pregunta: "¿Afecta mi capacidad de morder?",
                respuesta: "No. La dosis se calcula para relajar la hiperactividad muscular sin comprometer la función masticatoria normal."
            },
            {
                pregunta: "¿Cuándo se nota el afinamiento facial?",
                respuesta: "El alivio del dolor es notable a los 10-15 días, mientras que el efecto estético de afinamiento (V-Shape) se aprecia al mes de tratamiento."
            }
        ]
    },
    {
        id: "toxina-full-face",
        categoria: "Facial",
        subcategoria: "Toxina Botulínica",
        nombre: "Toxina Botulínica Full Face",
        descripcion:
            "Tratamiento integral para relajar arrugas en todo el rostro: frente, entrecejo, ojos, nariz, mentón y cuello. Valor Evaluación: $30.000 (Si se realiza el tratamiento, este valor se descuenta del costo total).",
        profesional: "Dr. Nicolás Laucirica / Dra. Mariane Kiss / Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        valorDesde: 329000,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Rejuvenecimiento", "Completo", "Botox"],
        problematicas: ["Arrugas y líneas de expresión", "Flacidez facial"],
        requiereEvaluacion: true,
        seo: {
            metaTitle: "Botox Los Ángeles | Rejuvenecimiento Facial | Clínica Cialo",
            metaDescription: "Aplicación de Toxina Botulínica (Botox) Full Face en Los Ángeles. Elimina arrugas en frente, entrecejo y patas de gallo con resultados naturales.",
            keywords: [
                "botox los angeles",
                "botox en los angeles chile",
                "toxina botulinica los angeles",
                "rejuvenecimiento facial los angeles",
                "eliminar arrugas",
                "medicina estetica los angeles",
                "medico estetico los angeles"
            ]
        }
    },
    {
        id: "toxina-hiperhidrosis",
        categoria: "Facial",
        subcategoria: "Toxina Botulínica",
        nombre: "Hiperhidrosis (Toxina Botulínica)",
        descripcion:
            "Tratamiento para sudoración excesiva en axilas, palmas de manos o plantas de pies. Bloquea temporalmente las glándulas sudoríparas para reducir la transpiración.",
        profesional: "Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: 330000,
        valorHasta: 450000,
        duracion: "30 min",
        tags: ["Hiperhidrosis", "Sudoración", "Médico", "Botox"],
        problematicas: ["Sudoración excesiva"],
        requiereEvaluacion: true,
        beneficios: [
            "Reduce hasta el 90% de la sudoración",
            "Resultados desde la primera semana",
            "Duración de 6-12 meses",
            "Procedimiento ambulatorio sin recuperación",
            "Mejora significativa en calidad de vida"
        ],
        contraindicaciones: [
            "Embarazo o lactancia",
            "Alergia a toxina botulínica",
            "Enfermedades neuromusculares",
            "Infección activa en zona de aplicación"
        ]
    },
    {
        id: "rinomodelacion",
        categoria: "Facial",
        subcategoria: "Ácido Hialurónico",
        nombre: "Rinomodelación",
        descripcion:
            "Corrección de imperfecciones nasales (caballete, punta caída) utilizando Ácido Hialurónico de alta densidad y alto G-Prime para dar soporte estructural y definición precisa. Valor Evaluación: $30.000 (Si se realiza el tratamiento, este valor se descuenta del costo total).",
        profesional: "Dr. Nicolás Laucirica / Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/nicolas-laucirica",
        valorDesde: 240000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Perfil", "Sin Cirugía", "Alta Densidad"],
        problematicas: ["Arrugas y líneas de expresión"],
        requiereEvaluacion: true,
        seo: {
            metaTitle: "Rinomodelación Los Ángeles | Nariz sin Cirugía | Clínica Cialo",
            metaDescription: "Rinomodelación con Ácido Hialurónico en Los Ángeles, Chile. Corrección de nariz sin cirugía, resultados inmediatos y perfil armónico.",
            keywords: [
                "rinomodelacion los angeles",
                "rinomodelacion chile",
                "rinomodelacion con acido hialuronico",
                "nariz sin cirugia los angeles",
                "armonizacion facial los angeles",
                "ácido hialurónico nariz"
            ]
        },
        faqs: [
            {
                pregunta: "¿Es un procedimiento seguro?",
                respuesta: "La nariz es una zona compleja. En Cialo utilizamos cánulas y ecografía Doppler para asegurar la integridad vascular y minimizar riesgos."
            },
            {
                pregunta: "¿Cuánto dura el resultado?",
                respuesta: "Entre 12 a 18 meses. Al ser una zona de poco movimiento mecánico, el producto de alta densidad se integra y mantiene su forma por más tiempo."
            }
        ],
        galeria: [
            "/resultados/rinomodelacion/1.webp",
            "/resultados/rinomodelacion/2.webp",
            "/resultados/rinomodelacion/3.webp",
            "/resultados/rinomodelacion/4.webp",
            "/resultados/rinomodelacion/5.webp",
            "/resultados/rinomodelacion/6.webp",
        ]
    },
    {
        id: "labios-ah",
        categoria: "Facial",
        subcategoria: "Ácido Hialurónico",
        nombre: "Relleno de Labios",
        descripcion:
            "Definición, volumen e hidratación profunda con Ácido Hialurónico de reología dinámica (flexible), diseñado para acompañar el movimiento natural de tus labios al hablar y sonreír. Valor Evaluación: $30.000 (Si se realiza el tratamiento, este valor se descuenta del costo total).",
        profesional: "Dr. Nicolás Laucirica / Dra. Mariane Kiss / Dra. Elga Viviana Peña",
        valorDesde: 180000,
        valorHasta: 240000,
        duracion: "30 min",
        tags: ["Volumen", "Hidratación", "Naturalidad"],
        problematicas: ["Arrugas y líneas de expresión"],
        requiereEvaluacion: true,
        faqs: [
            {
                pregunta: "¿Quedarán muy hinchados?",
                respuesta: "Es normal una inflamación leve las primeras 24-48 horas. El resultado definitivo y natural se aprecia a partir de los 10 días."
            },
            {
                pregunta: "¿Puedo lograr mucho volumen en una sesión?",
                respuesta: "Priorizamos la seguridad y la naturalidad. Si buscas un aumento considerable, recomendamos construir el volumen en sesiones progresivas para evitar la migración del producto ('boca de pato')."
            }
        ],
        galeria: [
            "/resultados/relleno-labial/1.webp",
            "/resultados/relleno-labial/2.webp",
            "/resultados/relleno-labial/3.webp",
            "/resultados/relleno-labial/4.webp",
            "/resultados/relleno-labial/5.webp",
            "/resultados/relleno-labial/6.webp",
            "/resultados/relleno-labial/7.webp",
        ]
    },
    {
        id: "sculptra",
        categoria: "Facial",
        subcategoria: "Bioestimuladores",
        nombre: "Sculptra®",
        descripcion:
            "Bioestimulador de colágeno PLLA. Mejora firmeza y calidad de piel a largo plazo. Valor Evaluación: $30.000 (Si se realiza el tratamiento, este valor se descuenta del costo total).",
        profesional: "Dr. Nicolás Laucirica / Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/nicolas-laucirica",
        valorDesde: 480000,
        valorHasta: 500000,
        duracion: "40 min",
        tags: ["Colágeno", "Firmeza"],
        problematicas: ["Flacidez facial", "Arrugas y líneas de expresión"],
        requiereEvaluacion: true,
        imagenExplicativa: "/tratamientos/biostimuladores-vs-ah.png",
        beneficios: [
            "Resultados duraderos (hasta 2 años)",
            "Apariencia 100% natural y gradual",
            "Mejora la calidad y firmeza de la piel",
            "Aumenta el grosor dérmico"
        ],
        faqs: [
            {
                pregunta: "¿Cuándo veré los resultados?",
                respuesta: "A diferencia del Ácido Hialurónico (volumen inmediato), Sculptra funciona estimulando tu propio colágeno. Los resultados comienzan a ser visibles a las 6 semanas y alcanzan su máximo a los 3-4 meses."
            },
            {
                pregunta: "¿Qué es la regla 5-5-5?",
                respuesta: "Es fundamental para el éxito del tratamiento: Debes masajear la zona tratada durante 5 minutos, 5 veces al día, por 5 días consecutivos para asegurar una distribución uniforme del producto."
            }
        ]
    },
    {
        id: "radiesse",
        categoria: "Facial",
        subcategoria: "Bioestimuladores",
        nombre: "Radiesse®",
        descripcion:
            "Hidroxiapatita de calcio. Efecto lifting inmediato y producción de colágeno. Valor Evaluación: $30.000 (Si se realiza el tratamiento, este valor se descuenta del costo total).",
        profesional: "Dr. Nicolás Laucirica / Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/nicolas-laucirica",
        valorDesde: 400000,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Lifting", "Definición"],
        problematicas: ["Flacidez facial", "Arrugas y líneas de expresión"],
        requiereEvaluacion: true,
        imagenExplicativa: "/tratamientos/biostimuladores-vs-ah.png",
        faqs: [
            {
                pregunta: "¿Cuál es la diferencia con Sculptra?",
                respuesta: "Radiesse ofrece un efecto de 'lifting' y volumen moderado inmediato gracias a su matriz de gel, mientras continúa estimulando colágeno a largo plazo. Sculptra es puramente bioestimulador (volumen gradual)."
            }
        ]
    },
    {
        id: "ellanse",
        categoria: "Facial",
        subcategoria: "Bioestimuladores",
        nombre: "Ellansé™",
        descripcion:
            "Bioestimulador de doble acción (Relleno + Estimulación) compuesto por microesferas de policaprolactona. Restaura el volumen inmediatamente y regenera colágeno para resultados de larga duración. Valor Evaluación: $30.000 (Si se realiza el tratamiento, este valor se descuenta del costo total).",
        profesional: "Dr. Nicolás Laucirica / Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/nicolas-laucirica",
        valorDesde: 450000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Volumen Inmediato", "Duración", "Colágeno"],
        problematicas: ["Flacidez facial", "Arrugas y líneas de expresión"],
        requiereEvaluacion: true,
        imagenExplicativa: "/tratamientos/biostimuladores-vs-ah.png",
        faqs: [
            {
                pregunta: "¿Qué hace único a Ellansé?",
                respuesta: "Combina lo mejor de dos mundos: recupera el volumen perdido desde el momento de la aplicación (como un relleno) y estimula producción de colágeno tipo I de alta calidad a largo plazo."
            },
            {
                pregunta: "¿Cuánto dura el efecto?",
                respuesta: "Dependiendo de la versión utilizada (S, M), los resultados pueden mantenerse estables por 18 a 24 meses."
            }
        ]
    },
    {
        id: "hydrafacial",
        categoria: "Facial",
        subcategoria: "Dermatofuncional",
        nombre: "HydraFacial MD (Limpieza Facial Profunda)",
        descripcion:
            "El tratamiento facial de 3 pasos que limpia, exfolia, extrae e hidrata la piel simultáneamente usando tecnología Vortex patentada. Resultados inmediatos sin tiempo de inactividad.",
        profesional: "María Jesús Contreras / Keren Matus / Katalina Neumann / Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar",
        valorDesde: 80000,
        valorHasta: null,
        duracion: "60 min",
        tags: ["Glow", "Limpieza Profunda", "Hidratación", "Vortex-Fusion"],
        problematicas: ["Manchas y textura", "Poros dilatados", "Piel apagada"],
        requiereEvaluacion: false,
        seo: {
            metaTitle: "Limpieza Facial Los Ángeles con HydraFacial MD | Clínica Cialo",
            metaDescription: "La mejor Limpieza Facial en Los Ángeles. HydraFacial MD limpia, exfolia e hidrata profundamente tu piel con tecnología Vortex patentada. Resultados inmediatos.",
            keywords: [
                "limpieza facial los angeles",
                "hydrafacial los angeles",
                "limpieza de cutis profunda los angeles",
                "limpieza facial",
                "hidratacion facial los angeles"
            ]
        },
        beneficios: [
            "Limpieza profunda y suave mediante tecnología Vortex.",
            "Extracción de impurezas sin dolor (puntos negros, exceso de sebo).",
            "Hidratación intensiva con serums personalizados (antioxidantes y péptidos).",
            "Resultados inmediatos, dejando una piel con efecto 'Glow' instantáneo."
        ],
        faqs: [
            {
                pregunta: "¿Qué hace HydraFacial?",
                respuesta: "Es una limpieza facial profunda que en 3 pasos limpia, exfolia, extrae impurezas e hidrata la piel con serums personalizados."
            },
            {
                pregunta: "¿Cada cuánto debo hacerme HydraFacial?",
                respuesta: "Para mantener una piel sana y luminosa, recomendamos realizarlo una vez al mes o antes de eventos importantes donde requieras un boost instantáneo de luminosidad."
            },
            {
                pregunta: "¿Es apto para pieles sensibles?",
                respuesta: "Sí. HydraFacial es muy gentil y los serums se pueden ajustar para pieles sensibles. Es una de las limpiezas más suaves y efectivas disponibles."
            }
        ]
    },
    {
        id: "limpieza-facial-manual",
        categoria: "Facial",
        subcategoria: "Dermatofuncional",
        nombre: "Limpieza Facial Manual",
        descripcion:
            "Limpieza de cutis tradicional y personalizada. Incluye vaporización, exfoliación, extracción manual cuidadosa de comedones e impurezas, y aplicación de mascarilla hidroplástica calmante.",
        profesional: "María Jesús Contreras / Keren Matus / Katalina Neumann / Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar",
        valorDesde: 40000,
        valorHasta: null,
        duracion: "60 min",
        tags: ["Extracción Manual", "Higiene Facial", "Puntos Negros", "Descongestión"],
        problematicas: ["Manchas y textura", "Poros dilatados", "Piel apagada", "Acné activo/comedones"],
        requiereEvaluacion: false,
        seo: {
            metaTitle: "Limpieza Facial Los Ángeles: Extracción Manual Profunda | Clínica Cialo",
            metaDescription: "Reserva tu Limpieza Facial en Los Ángeles con Clínica Cialo. Extracción profunda de puntos negros e impurezas con vaporización y mascarillas calmantes.",
            keywords: [
                "limpieza facial los angeles",
                "limpieza de cutis profunda",
                "extraccion de puntos negros",
                "higiene facial",
                "tratamiento anti acne",
                "limpieza facial manual",
                "dermatofuncional los angeles"
            ]
        },
        faqs: [
            {
                pregunta: "¿Duele la extracción manual?",
                respuesta: "Se utiliza vapor y productos desincrustantes para ablandar los poros, haciendo que la extracción sea muy tolerable. Puede haber una leve molestia dependiendo de la sensibilidad de tu piel."
            },
            {
                pregunta: "¿Qué diferencia tiene con HydraFacial?",
                respuesta: "Esta limpieza se realiza enteramente de forma manual (ideal para extracciones profundas y muy localizadas), mientras que HydraFacial utiliza una máquina con tecnología Vacuum y Vortex-Fusion para extraer e infundir sueros de manera automatizada."
            }
        ]
    },
    {
        id: "hollywood-peel",
        categoria: "Facial",
        subcategoria: "Láser",
        nombre: "Hollywood Peel",
        descripcion:
            "Láser carbón activado para poros, luminosidad y efecto porcelana inmediato.",
        profesional: "María Jesús Contreras / Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar",
        valorDesde: 80000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Eventos", "Luminosidad"],
        problematicas: ["Manchas y textura", "Poros dilatados"],
        requiereEvaluacion: false,
    },
    {
        id: "morpheus8-facial",
        categoria: "Facial",
        subcategoria: "Radiofrecuencia",
        nombre: "Morpheus 8 Facial",
        descripcion:
            "Radiofrecuencia fraccionada profunda para tensado de piel y remodelación grasa. Valor Evaluación: $30.000 (Si se realiza el tratamiento, este valor se descuenta del costo total).",
        profesional: "Dr. Nicolás Laucirica / Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/nicolas-laucirica",
        valorDesde: 300000,
        valorHasta: 600000,
        duracion: "60 min",
        tags: ["Tensado", "Cicatrices"],
        problematicas: ["Flacidez facial", "Cicatrices", "Arrugas y líneas de expresión"],
        requiereEvaluacion: true,
        planes: [
            { nombre: "Plan Morpheus8 4 sesiones", precio: 700000 },
        ]
    },

    // ==================== CORPORAL ====================
    {
        id: "clatuu-alpha",
        categoria: "Corporal",
        subcategoria: "Reductivos",
        nombre: "Criolipólisis Clatuu Alpha",
        descripcion:
            "Tecnología avanzada de enfriamiento envolvente de 360° que elimina la grasa localizada resistente mediante apoptosis (muerte celular programada), sin cirugía ni tiempos de recuperación.",
        profesional: "Keren Matus / Katalina Neumann / María Jesús Contreras",
        valorDesde: 180000,
        valorHasta: 1800000,
        duracion: "60 - 90 min",
        tags: ["Grasa Localizada", "Frío", "Lipo sin Cirugía"],
        problematicas: ["Grasa localizada"],
        requiereEvaluacion: true,
        // Campos SEO
        slug: "clatuu-alpha-los-angeles",
        seo: {
            metaTitle: "Criolipólisis Clatuu Alpha Los Ángeles | Lipo Sin Cirugía | Clínica Cialo",
            metaDescription: "Elimina grasa localizada con frío. Tecnología 360° Clatuu Alpha en Los Ángeles. Lipo sin cirugía, alternativa a la liposucción y lipoláser. Agenda evaluación.",
            keywords: [
                "criolipólisis los ángeles",
                "clatuu alpha biobío",
                "lipo sin cirugía",
                "reducción grasa",
                "liposuccion los angeles",
                "lipolaser los angeles",
                "lipoescultura",
                "lipo los angeles",
                "criolipolisis"
            ]
        },
        beneficios: [
            "Reducción Definitiva: Elimina hasta un 30% de la grasa en la zona tratada.",
            "Tecnología 360°: Enfriamiento envolvente para resultados homogéneos y superiores.",
            "Versatilidad: Trata papada, brazos, abdomen, flancos, muslos y espalda.",
            "No Invasivo: Sin agujas, sin anestesia y sin tiempo de recuperación."
        ],
        contraindicaciones: [
            "Crioglobulinemia o Hemoglobinuria paroxística.",
            "Urticaria por frío o Enfermedad de Raynaud.",
            "Embarazo o periodo de lactancia.",
            "Hernias o heridas recientes en la zona a tratar.",
            "Dispositivos electrónicos implantados (marcapasos)."
        ],
        efectosSecundarios: [
            "<strong>Durante la sesión:</strong> Sensación de tirón, presión, pinzamiento, hormigueo, ardor o calambres (estas sensaciones disminuyen rápidamente cuando la zona se adormece por el frío).",
            "<strong>Después del tratamiento:</strong> Enrojecimiento, palidez temporal, hinchazón, moretones (hematomas), sensibilidad al tacto, dolor leve, entumecimiento o picazón moderada.",
            "<strong>Efectos muy raros:</strong> Hiperplasia adiposa paradójica (que podría requerir cirugía), dolor tardío o espasmos musculares."
        ],
        cuidadosPosteriores: [
            "<strong>Faja Compresiva:</strong> Uso obligatorio de por lo menos 6 horas diarias durante 45 días pos-sesión.",
            "<strong>Actividad Física:</strong> Realizar actividad moderada (ej. caminar o trotar 30 min) dentro de las primeras 24 a 48 horas.",
            "<strong>Precauciones:</strong> Evitar golpes, calor excesivo o masajes no indicados médicamente en la zona durante 48 horas.",
            "<strong>Suplementos Clínicos Recomendados:</strong> Omega 3 (2000-3000 mg/día) para regular la inflamación, Berberina (1500 mg/día) como preventivo y Coenzima Q10 (200 mg)."
        ],
        faqs: [
            {
                pregunta: "¿Es doloroso el tratamiento?",
                respuesta: "Al inicio se siente una succión firme y frío intenso, que desaparece a los 5-10 minutos cuando la zona se adormece. Es muy tolerable y los pacientes suelen leer o descansar durante la sesión."
            },
            {
                pregunta: "¿Cómo optimizo los resultados?",
                respuesta: "Es altamente recomendable realizar masajes de drenaje linfático post-sesión para facilitar la eliminación de las células grasas tratadas. Además, mantener una hidratación abundante (2-3 litros de agua) es clave."
            },
            {
                pregunta: "¿Debo hacer ejercicio?",
                respuesta: "Sí. La actividad física ligera a moderada ayuda a metabolizar los lípidos liberados. No se requiere reposo, por lo que puedes retomar tu rutina inmediatamente."
            },
            {
                pregunta: "¿Cuándo se ven los resultados?",
                respuesta: "Los primeros cambios son visibles a las 3 semanas, pero el resultado definitivo se aprecia a los 3 meses, tiempo que tarda el cuerpo en metabolizar las células grasas eliminadas."
            },
            {
                pregunta: "¿La grasa vuelve a aparecer?",
                respuesta: "No, las células grasas eliminadas por apoptosis no se regeneran. Sin embargo, es importante mantener un peso estable para que las células restantes no aumenten de tamaño."
            },
            {
                pregunta: "¿Cuántas sesiones necesito?",
                respuesta: "Depende del grosor del panículo adiposo. Generalmente se recomiendan de 1 a 3 sesiones por zona, con intervalos de 30 a 60 días."
            }
        ],
        sinergias: [
            {
                nombre: "Embody (HIFEM)",
                descripcion: "Transformación total: Una vez reducida la grasa, tonifica y define la musculatura subyacente para lograr un aspecto atlético.",
                url: "/tratamientos/embody"
            },
            {
                nombre: "Exilis Ultra 360",
                descripcion: "Combate la flacidez post-reducción. Ideal para tensar la piel que podría quedar suelta tras eliminar el volumen graso.",
                url: "/tratamientos/exilis-corporal"
            }
        ]
    },
    {
        id: "embody",
        categoria: "Corporal",
        subcategoria: "Tonificación",
        nombre: "Embody (HIFEM)",
        descripcion:
            "20.000 contracciones en 30 min. Tonifica músculo y quema grasa.",
        profesional: "Keren Matus / Katalina Neumann / María Jesús Contreras",
        valorDesde: 80000,
        valorHasta: 500000,
        duracion: "30 min",
        tags: ["Músculo", "Fitness"],
        problematicas: ["Flacidez corporal", "Celulitis"],
        requiereEvaluacion: false,
        planes: [
            { nombre: "(PACK) 6 SESIONES EMBODY ABDOMEN", precio: 280002 },
            { nombre: "(PACK) 6 SESIONES EMBODY GLUTEOS", precio: 280002 },
            { nombre: "(PACK) 8 SESIONES EMBODY", precio: 400000 },
            { nombre: "(PACK) 10 SESIONES EMBODY", precio: 500000 },
        ],
        sinergias: [
            {
                nombre: "Clatuu Alpha",
                descripcion: "¿Grasa cubriendo el músculo? Elimínala primero con criolipólisis para que tu definición muscular ('six-pack') sea realmente visible.",
                url: "/tratamientos/clatuu-alpha"
            }
        ]
    },
    {
        id: "exilis-corporal",
        categoria: "Corporal",
        subcategoria: "Radiofrecuencia",
        nombre: "Exilis Ultra 360",
        descripcion:
            "Exilis Ultra 360 es un dispositivo médico estético de radiofrecuencia monopolar que suministra energía controlada a la capa dérmica y subcutánea de la piel. Su objetivo es estimular la producción de colágeno y elastina, mejorar la calidad de la piel, reducir la flacidez y, en zonas corporales, contribuir a la disminución de grasa localizada de forma no invasiva, sin cirugía ni tiempo de recuperación.",
        profesional: "Keren Matus / Katalina Neumann / María Jesús Contreras",
        valorDesde: 150000,
        valorHasta: 480000,
        duracion: "45 min",
        tags: ["Flacidez", "Tensado"],
        problematicas: ["Flacidez corporal", "Celulitis"],
        requiereEvaluacion: false,
        seo: {
            metaTitle: "Scizer Los Ángeles | Lipo sin Cirugía | Clínica Cialo",
            metaDescription: "Reduce grasa localizada y tensa la piel sin cirugía con Scizer (HIFU Corporal). Quema grasa abdominal y mejora tu figura en Clínica Cialo, Los Ángeles.",
            keywords: [
                "scizer",
                "scizer que es",
                "scizer funciona",
                "hifu corporal",
                "quemar grasa sin cirugia",
                "hifu los angeles",
                "scizer contraindicaciones"
            ]
        },
        beneficios: [
            "Mejora la firmeza y la elasticidad de la piel.",
            "Reducción progresiva de arrugas y líneas finas.",
            "Efecto tensor en rostro, cuello y cuerpo.",
            "Disminución de flacidez cutánea en diferentes áreas.",
            "Ayuda en la remodelación corporal al actuar sobre depósitos de grasa localizada.",
            "Tratamiento cómodo, ambulatorio, sin necesidad de anestesia ni reposo.",
            "Resultados visibles que continúan mejorando durante los meses posteriores a las sesiones."
        ],
        contraindicaciones: [
            "Embarazo o lactancia.",
            "Presencia de marcapasos, desfibrilador u otros implantes electrónicos.",
            "Implantes metálicos en la zona a tratar.",
            "Cáncer activo o antecedentes recientes de radioterapia.",
            "Infecciones activas en la piel, heridas abiertas, quemaduras o inflamación aguda.",
            "Enfermedades cardiovasculares graves, insuficiencia renal o hepática.",
            "Enfermedades autoinmunes o patologías activas del colágeno (ej.: esclerodermia).",
            "Neuralgias, neuropatías o trastornos de sensibilidad en la zona.",
            "Uso de isotretinoína en los últimos 12 meses.",
            "Eccema, rosácea o trastornos hemorrágicos.",
            "Se recomienda siempre informar al profesional tratante sobre enfermedades actuales, uso de medicamentos o procedimientos estéticos recientes."
        ],
        efectosSecundarios: [
            "Eritema (enrojecimiento) transitorio en la zona tratada.",
            "Sensación de calor intenso durante o después del procedimiento.",
            "Dolor leve o molestia temporal.",
            "Sequedad o sensibilidad en la piel tratada.",
            "En casos poco frecuentes: aparición de pequeñas quemaduras superficiales, alteraciones de la sensibilidad o resultados menores a lo esperado."
        ],
        cuidadosPosteriores: [
            "Mantener una alimentación saludable para favorecer los resultados.",
            "Puede retomar inmediatamente sus actividades habituales.",
            "Mantener una adecuada hidratación (agua y cremas emolientes).",
            "Evitar exposición solar directa y utilizar fotoprotección SPF 50+.",
            "No aplicar calor adicional (saunas, baños muy calientes) durante 24-48 horas.",
            "Evitar consumo excesivo de alcohol y tabaco para optimizar resultados.",
            "Seguir el número de sesiones recomendado por el profesional."
        ],
        planes: [
            { nombre: "(PACK) 8 SESIONES DE EXILIS 360", precio: 480000 },
            { nombre: "(PACK) Dos zonas Exilis 8 Sesiones", precio: 800000 },
        ],
        sinergias: [
            {
                nombre: "Embody (HIFEM)",
                descripcion: "Al mejorar la firmeza de la dermis con Exilis, el tono muscular logrado con Embody se luce mucho más.",
                url: "/tratamientos/embody"
            }
        ]
    },
    {
        id: "scizer",
        categoria: "Corporal",
        subcategoria: "Reductivos",
        nombre: "Scizer HIFU",
        descripcion:
            "SCIZER es un tratamiento de remodelación corporal no invasivo que utiliza tecnología de ultrasonido macrofocalizado de alta intensidad (HIFU) para reducir la grasa localizada. El tratamiento actúa sobre la capa grasa subcutánea sin dañar la piel ni los tejidos circundantes, mediante cartuchos específicos que permiten personalizar la profundidad y la zona a tratar, lo que resulta en una reducción de volumen y un contorno corporal más definido.",
        profesional: "Keren Matus / Katalina Neumann / María Jesús Contreras",
        valorDesde: 200000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Abdomen", "Potente"],
        problematicas: ["Grasa localizada"],
        requiereEvaluacion: true,
        beneficios: [
            "Reducción de grasa localizada en zonas resistentes a dieta y ejercicio.",
            "Definición y modelado corporal sin cirugía ni tiempo de recuperación.",
            "Tratamiento personalizado según zona y características del paciente.",
            "Resultados progresivos visibles a partir de pocas semanas. Reducción visible desde la 3ra y 6ta semana, con mejoría continua hasta 3 meses."
        ],
        contraindicaciones: [
            "Embarazo o lactancia.",
            "Heridas abiertas, lesiones cutáneas o infecciones en la zona.",
            "Acné severo o quístico en el área a tratar.",
            "Implantes metálicos, eléctricos o bioabsorbibles en la zona.",
            "Trastornos hemorrágicos o de coagulación.",
            "Hernias, cicatrices grandes o pliegues cutáneos redundantes.",
            "Enfermedades graves de la piel, cáncer de piel, lupus o herpes activo.",
            "Uso de anticoagulantes, enfermedades cardíacas o epilepsia."
        ],
        efectosSecundarios: [
            "Enrojecimiento (eritema).",
            "Hinchazón (edema).",
            "Sensibilidad o dolor leve en la zona tratada.",
            "Moretones (equimosis).",
            "Adormecimiento o cosquilleo transitorio."
        ],
        cuidadosPosteriores: [
            "Evitar la exposición directa al sol o fuentes de calor intensas en las primeras 24 horas.",
            "Mantener hidratación adecuada.",
            "No realizar masajes intensos ni aplicar presión fuerte en la zona tratada por 48 horas.",
            "Mantener una alimentación equilibrada y hábitos saludables para potenciar los resultados.",
            "Informar al especialista ante cualquier síntoma inusual o prolongado."
        ],
        planes: [
            { nombre: "(PACK) 2 S SCIZER + 4 S EXILIS ULTRA", precio: 640000 },
        ]
    },
    {
        id: "ah-gluteo",
        categoria: "Corporal",
        subcategoria: "Relleno",
        nombre: "Aumento Glúteo con Ácido Hialurónico",
        descripcion:
            "Proyección y modelado de glúteos sin cirugía. De 60 a 240 ml según evaluación médica.",
        profesional: "Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: 600000,
        valorHasta: 1900000,
        duracion: "90 min",
        tags: ["Volumen", "Glúteos"],
        problematicas: ["Flacidez corporal"],
        requiereEvaluacion: true,
        galeria: [
            "/resultados/gluteos/1.webp",
        ]
    },
    {
        id: "sculptra-corporal",
        categoria: "Corporal",
        subcategoria: "Bioestimuladores",
        nombre: "Sculptra Corporal",
        descripcion:
            "Bioestimulador de colágeno para restaurar volumen y mejorar la calidad de piel en diversas zonas corporales. Resultados progresivos y naturales que duran hasta 2 años.",
        profesional: "Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: 500000,
        valorHasta: null,
        duracion: "60 min",
        tags: ["Bioestimulador", "Colágeno", "Corporal"],
        problematicas: ["Flacidez corporal", "Celulitis"],
        requiereEvaluacion: true,
        beneficios: [
            "Estimula producción natural de colágeno",
            "Resultados progresivos (3-6 meses)",
            "Duración hasta 2 años",
            "Mejora textura y firmeza de la piel",
            "Tratamiento personalizado por zonas"
        ],
        contraindicaciones: [
            "Embarazo o lactancia",
            "Enfermedades autoinmunes activas",
            "Infección en zona de aplicación",
            "Queloides o cicatrización anormal"
        ]
    },
    {
        id: "radiesse-manos",
        categoria: "Corporal",
        subcategoria: "Bioestimuladores",
        nombre: "Radiesse Manos",
        descripcion:
            "Rejuvenecimiento de manos con Radiesse (hidroxiapatita de calcio). Restaura el volumen perdido, disimula venas y tendones prominentes, y mejora la calidad de la piel.",
        profesional: "Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: 400000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Rejuvenecimiento", "Manos", "Bioestimulador"],
        problematicas: ["Flacidez corporal", "Manchas y textura"],
        requiereEvaluacion: true,
        beneficios: [
            "Resultados inmediatos + bioestimulación",
            "Disimula venas y tendones visibles",
            "Mejora textura y elasticidad",
            "Duración de 12-18 meses",
            "Procedimiento rápido sin recuperación"
        ],
        contraindicaciones: [
            "Embarazo o lactancia",
            "Infección activa en manos",
            "Trastornos de coagulación",
            "Alergia a componentes"
        ]
    },
    {
        id: "manos-ah-laser",
        categoria: "Corporal",
        subcategoria: "Bioestimuladores",
        nombre: "Rejuvenecimiento de Manos (AH + Láser CO2)",
        descripcion:
            "Tratamiento avanzado que combina Ácido Hialurónico para restaurar volumen y Láser CO2 (Cool Peel) para mejorar la textura, eliminar manchas y rejuvenecer globalmente la piel de las manos.",
        profesional: "Dr. Nicolás Laucirica",
        valorDesde: 380000,
        valorHasta: 560000,
        duracion: "60 min",
        tags: ["Rejuvenecimiento", "Manos", "AH", "Láser CO2"],
        problematicas: ["Flacidez corporal", "Manchas y textura"],
        requiereEvaluacion: true,
        planes: [
            { nombre: "2 ml AH + Láser CO2", precio: 380000 },
            { nombre: "3 ml AH + Láser CO2", precio: 480000 },
            { nombre: "4 ml AH + Láser CO2", precio: 560000 },
        ],
        beneficios: [
            "Restauración inmediata de volumen con Ácido Hialurónico",
            "Eliminación de manchas y mejora de textura con Láser CO2",
            "Estimulación de colágeno a largo plazo",
            "Disimula venas y tendones prominentes",
            "Piel más firme, uniforme y revitalizada"
        ],
        cuidadosPosteriores: [
            "Evitar exposición solar directa en las manos",
            "Uso constante de protector solar SPF 50+",
            "Hidratación intensiva",
            "Evitar calor excesivo (saunas, baños calientes) por 48 horas"
        ],
        galeria: [
            "/resultados/manos/1.webp",
        ]
    },
    {
        id: "depilacion-laser",
        categoria: "Corporal",
        subcategoria: "Depilación Láser",
        nombre: "Depilación Láser Soprano Titanium",
        descripcion:
            "Depilación definitiva con tecnología Soprano Titanium. Indolora, segura y efectiva para todo tipo de piel. Precio por zona individual o packs.",
        profesional: "Keren Matus / Katalina Neumann / María Jesús Contreras",
        valorDesde: 14400,
        valorHasta: 35000,
        duracion: "15-60 min",
        tags: ["Depilación", "Definitiva", "Indolora"],
        problematicas: ["Vello no deseado"],
        requiereEvaluacion: false,
        seo: {
            metaTitle: "Depilación Láser Los Ángeles | Tratamiento Definitivo | Clínica Cialo",
            metaDescription: "Reserva tu Depilación Láser Definitiva en Los Ángeles con tecnología Soprano Titanium. Tratamiento seguro, casi indoloro y apto para todo tipo de piel en Clínica Cialo.",
            keywords: [
                "depilacion laser los angeles",
                "depilacion laser en los angeles",
                "depilacion definitiva los angeles chile",
                "clinica depilacion laser chile",
                "depilacion laser rebaje",
                "soprano titanium los angeles"
            ]
        },
        zonas: [
            // Rostro (8 sesiones)
            { zona: "Pómulos", tamano: "Pequeña", precio: 17600, packSesiones: 8, packPrecio: 72000 },
            { zona: "Entrecejo / Perfilado de Cejas", tamano: "Mini", precio: 14400, packSesiones: 8, packPrecio: 56000 },
            { zona: "Patillas", tamano: "Pequeña", precio: 17600, packSesiones: 8, packPrecio: 72000 },
            { zona: "Mentón", tamano: "Pequeña", precio: 17600, packSesiones: 8, packPrecio: 72000 },
            { zona: "Bozo", tamano: "Mini", precio: 14400, packSesiones: 8, packPrecio: 72000 },
            { zona: "Mejillas", tamano: "Pequeña", precio: 17600, packSesiones: 8, packPrecio: 104000 },
            { zona: "Frente", tamano: "Pequeña", precio: 17600, packSesiones: 8, packPrecio: 104000 },
            { zona: "Cuello Anterior", tamano: "Pequeña", precio: 17600, packSesiones: 8, packPrecio: 104000 },
            { zona: "Orejas", tamano: "Mini", precio: 14400, packSesiones: 8, packPrecio: 56000 },
            { zona: "Perfilado de Barba (Pómulos y Cuello)", tamano: "Mediana", precio: 24000, packSesiones: 8, packPrecio: 112000 },
            { zona: "Barba Completa", tamano: "Grande", precio: 28000, packSesiones: 8, packPrecio: 144000 },
            { zona: "Rostro Completo sin Cuello", tamano: "Grande", precio: 28000, packSesiones: 8, packPrecio: 152000 },
            { zona: "Medio Rostro", tamano: "Mediana", precio: 24000, packSesiones: 8, packPrecio: 112000 },
            { zona: "Rostro Completo (Frente a Cuello)", tamano: "Grande", precio: 28000, packSesiones: 8, packPrecio: 168000 },
            // Torso (6 sesiones)
            { zona: "Tórax Completo", tamano: "Extra Grande", precio: 32000, packSesiones: 6, packPrecio: 132000 },
            { zona: "Abdomen Completo", tamano: "Extra Grande", precio: 32000, packSesiones: 6, packPrecio: 132000 },
            { zona: "Tórax + Abdomen", tamano: "Super Grande", precio: 35000, packSesiones: 6, packPrecio: 180000 },
            { zona: "Línea Alba", tamano: "Pequeña", precio: 17600, packSesiones: 6, packPrecio: 54000 },
            { zona: "Areola de Pezón", tamano: "Pequeña", precio: 17600, packSesiones: 6, packPrecio: 54000 },
            // Espalda (6 sesiones)
            { zona: "Espalda Completa", tamano: "Super Grande", precio: 35000, packSesiones: 6, packPrecio: 180000 },
            { zona: "Espalda Superior", tamano: "Extra Grande", precio: 32000, packSesiones: 6, packPrecio: 132000 },
            { zona: "Espalda Baja", tamano: "Grande", precio: 28000, packSesiones: 6, packPrecio: 132000 },
            { zona: "Cuello Posterior", tamano: "Mediana", precio: 24000, packSesiones: 6, packPrecio: 78000 },
            // Brazos (6 sesiones)
            { zona: "Brazos Completos (Incluye Manos)", tamano: "Grande", precio: 28000, packSesiones: 6, packPrecio: 180000 },
            { zona: "Medio Brazo", tamano: "Mediana", precio: 24000, packSesiones: 6, packPrecio: 108000 },
            { zona: "Axilas", tamano: "Pequeña", precio: 17600, packSesiones: 6, packPrecio: 78000 },
            { zona: "Manos y Dedos", tamano: "Pequeña", precio: 17600, packSesiones: 6, packPrecio: 78000 },
            // Piernas (6 sesiones)
            { zona: "Piernas Completas (Incluye Pies y Dedos)", tamano: "Extra Grande", precio: 60000, packSesiones: 6, packPrecio: 300000 },
            { zona: "Media Pierna", tamano: "Grande", precio: 28000, packSesiones: 6, packPrecio: 132000 },
            { zona: "Pies y Dedos", tamano: "Pequeña", precio: 17600, packSesiones: 6, packPrecio: 78000 },
            // Glúteos e Íntima (6 sesiones)
            { zona: "Glúteos", tamano: "Grande", precio: 28000, packSesiones: 6, packPrecio: 108000 },
            { zona: "Rebaje Completo", tamano: "Mediana", precio: 24000, packSesiones: 6, packPrecio: 120000 },
            { zona: "Rebaje Bikini", tamano: "Pequeña", precio: 17600, packSesiones: 6, packPrecio: 84000 },
            { zona: "Interglúteo", tamano: "Pequeña", precio: 17600, packSesiones: 6, packPrecio: 84000 },
            { zona: "Rebaje Completo + Interglúteo", tamano: "Mediana", precio: 28000, packSesiones: 6, packPrecio: 144000 },
            { zona: "Rebaje Normal", tamano: "Mediana", precio: 24000, packSesiones: 6, packPrecio: 120000 },
            // Packs Completos (6 sesiones)
            { zona: "Cuerpo Completo (Piernas, Brazos, Rebaje, Axilas y Bozo)", tamano: "Full", precio: 100000, packSesiones: 6, packPrecio: 480000 },
            { zona: "Cuerpo Completo Full (Rostro a Pies)", tamano: "Full Premium", precio: 130000, packSesiones: 6, packPrecio: 624000 },
        ],
        planes: [
            { nombre: "PLAN DEPILACIÓN CUERPO COMPLETO (PIERNAS COMPLETAS, BRAZOS COMPLETOS, REBAJE COMPLETO, AXILAS Y BOZO", precio: 480000 },
            { nombre: "PLAN 6 SESIONES DE  DEPILACIÓN CUERPO COMPLETO FULL (DESDE ROSTRO HASTA LOS PIES)", precio: 624000 },
            { nombre: "(PACK) POMULOS", precio: 90000 },
            { nombre: "PLAN 8 SESIONES DE DEPILACIÓN POMULOS", precio: 72000 },
            { nombre: "PLAN 8 SESIONES DE DEPILACIÓN ENTRECEJO/PERFILADO DE CEJAS", precio: 56000 },
            { nombre: "PLAN 8 SESIONES DE DEPILACIÓN PATILLAS", precio: 72000 },
            { nombre: "PLAN 8 SESIONES DE DEPILACIÓN MENTÓN", precio: 72000 },
            { nombre: "PLAN 8 SESIONES DE DEPILACION BOZO", precio: 72000 },
            { nombre: "PLAN 8 SESIONES DE DEPILACIÓN MEJILLAS", precio: 104000 },
            { nombre: "PLAN 8 SESIONES DE DEPILACIÓN FRENTE", precio: 104000 },
            { nombre: "PLAN 8 SESIONES DEPILACIÓN CUELLO ANTERIOR", precio: 104000 },
            { nombre: "PLAN 8 SESIONES DE DEPILACIÓN OREJAS", precio: 56000 },
            { nombre: "PLAN 8 SESIONES DE DEPILACIÒN PERFILADO BARBA (POMULOS Y CUELLO)", precio: 112000 },
            { nombre: "PLAN 8 SESIONES DEPILACIÒN BARBA COMPLETA", precio: 144000 },
            { nombre: "PLAN 8 SESIONES DE MEDIO ROSTRO", precio: 112000 },
            { nombre: "PLAN 8 SESIONES ROSTRO COMPLETO (FRENTE A CUELLO)", precio: 21000 },
            { nombre: "PLAN 6 SESIONES DEPILACIÒN TORAX COMPLETO", precio: 132000 },
            { nombre: "PLAN 6 SESIONES DEPILACIÒN ABDOMEN COMPLETO", precio: 132000 },
            { nombre: "PLAN 6 SESIONES DEPILACIÒN TORAX + ABDOMEN", precio: 180000 },
            { nombre: "PLAN 6 SESIONES DEPILACIÒN LINEA ALBA", precio: 54000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION AREOLA DE PEZON", precio: 54000 },
            { nombre: "PLAN 6 SESIONES DEPILACION DE ESPALDA COMPLETA", precio: 180000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION ESPALDA SUPERIOR", precio: 132000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION ESPALDA BAJA", precio: 132000 },
            { nombre: "PLAN 6 SESIONES DE CUELLO POSTERIOR", precio: 78000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION BRAZOS COMPLETOS (INCLUYE MANOS)", precio: 180000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION MEDIO BRAZO", precio: 108000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION AXILAS", precio: 78000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION MANOS Y DEDOS", precio: 78000 },
            { nombre: "PLAN 6 SESIONES DE PIERNAS COMPLETAS (INCLUYE PIES Y DEDOS)", precio: 300000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION MEDIA PIERNA", precio: 132000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION GLUTEOS", precio: 108000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION REBAJE COMPLETO", precio: 120000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION REBAJE BIKINI", precio: 84000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION INTERGLUTEO", precio: 84000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION REBAJE COMPLETO + INTERGLUTEO", precio: 144000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION REBAJE NORMAL", precio: 132000 },
            { nombre: "PLAN 6 SESIONES DE DEPILACION PIES Y DEDOS", precio: 78000 },
        ],
        faqs: [
            {
                pregunta: "¿Por qué necesito entre 6 y 10 sesiones?",
                respuesta: "El láser solo es efectivo en pelos que están en fase ANÁGENA (crecimiento activo). Como solo un 15-20% de tu vello está en esta fase simultáneamente, requerimos varias sesiones para eliminarlo todo progresivamente a medida que entra en esta etapa."
            },
            {
                pregunta: "¿Qué pasa en las otras fases?",
                respuesta: "En fases Catágena (transición) y Telógena (reposo), el pelo no tiene buena conexión con la raíz, por lo que el láser no logra destruir el folículo. Debemos esperar a que ese folículo vuelva a generar un pelo nuevo (fase Anágena) para eliminarlo."
            },
            {
                pregunta: "¿Es doloroso?",
                respuesta: "Soprano Titanium es famoso por ser prácticamente indoloro gracias a su cabezal frío ICE Plus que mantiene la piel a -3°C, haciendo la experiencia muy confortable incluso en zonas sensibles."
            },
            {
                pregunta: "¿Es definitivo para siempre?",
                respuesta: "Se considera una reducción permanente del 80-90% del vello. El vello residual será muy fino y claro. Pueden requerirse mantenimientos anuales esporádicos por cambios hormonales naturales."
            }
        ]
    },
    {
        id: "onicomicosis-laser-co2",
        categoria: "Corporal",
        subcategoria: "Láser",
        nombre: "Onicomicosis (Hongos en Uñas) con Láser CO2",
        descripcion:
            "Tratamiento efectivo y seguro para la eliminación de hongos en las uñas. El láser CO2 penetra la placa ungueal destruyendo el patógeno por efecto térmico. *El valor final depende de la evaluación del profesional.*",
        profesional: "María Jesús Contreras",
        valorDesde: 70000,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Salud", "Láser", "Hongos"],
        problematicas: ["Hongos"],
        requiereEvaluacion: false,
        faqs: [
            {
                pregunta: "¿Cuántas sesiones son necesarias?",
                respuesta: "Depende del grado de afectación, generalmente se recomiendan entre 3 a 6 sesiones con intervalos mensuales."
            },
            {
                pregunta: "¿Es doloroso?",
                respuesta: "Se siente una sensación de calor tolerable. En casos de mayor sensibilidad, se puede aplicar anestesia tópica o local."
            }
        ],
        galeria: [
            "/resultados/onicomicosis/1.webp",
        ]
    },
    {
        id: "borrado-tatuajes",
        categoria: "Corporal",
        subcategoria: "Láser",
        nombre: "Borrado de Tatuajes",
        descripcion:
            "Eliminación de tinta de tatuajes mediante tecnología láser Q-Switched, que fragmenta el pigmento para que el cuerpo lo elimine naturalmente. *El valor final y número de sesiones depende del color, tamaño y antigüedad del tatuaje.*",
        profesional: "Equipo Cialo",
        valorDesde: 60000,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Tatuaje", "Láser", "Q-Switched"],
        problematicas: ["Tatuajes no deseados"],
        requiereEvaluacion: true,
        slug: "borrado-de-tatuajes-los-angeles",
        landingPage: true,
        seo: {
            metaTitle: "Borrado de Tatuajes en Los Ángeles | Clínica Cialo",
            metaDescription: "Borrado de tatuajes con láser Q-Switched en Los Ángeles. Eliminación segura de tinta sin cicatrices. Resultados profesionales. ¡Agenda tu evaluación hoy!",
            keywords: ["borrado de tatuajes los angeles", "eliminacion de tatuajes los angeles", "quitar tatuajes con laser", "laser Q-Switched"]
        },
        beneficios: [
            "Eliminación segura y progresiva de pigmentos.",
            "Tecnología láser Q-Switched de última generación.",
            "Minimiza el riesgo de lesiones en la piel.",
            "Tratamiento personalizado según el tipo de tatuaje.",
            "Atención por profesionales certificados."
        ],
        faqs: [
            {
                pregunta: "¿Cuántas sesiones necesito?",
                respuesta: "Es variable. Tatuajes amateur pueden requerir 4-6 sesiones, mientras que profesionales con tintas densas o colores difíciles podrían necesitar 10 o más."
            },
            {
                pregunta: "¿Queda cicatriz?",
                respuesta: "El láser Q-Switched es muy seguro y específico para el pigmento, minimizando el riesgo de cicatrices si se siguen los cuidados post-tratamiento correctamente."
            }
        ],
        galeria: [
            "/resultados/borrado-tatuajes/1.webp",
            "/resultados/borrado-tatuajes/2.webp",
            "/resultados/borrado-tatuajes/3.webp",
            "/resultados/borrado-tatuajes/4.webp",
            "/resultados/borrado-tatuajes/5.webp",
            "/resultados/borrado-tatuajes/6.webp",
            "/resultados/borrado-tatuajes/7.webp",
            "/resultados/borrado-tatuajes/8.webp",
        ]
    },

    // ==================== CAPILAR ====================
    {
        id: "consulta-tricologia",
        categoria: "Capilar",
        subcategoria: "Consulta",
        nombre: "Consulta Tricológica",
        descripcion:
            "Evaluación con tricoscopia digital para diagnosticar causas de alopecia.",
        profesional: "Dra. Javiera Araya",
        valorDesde: 40000,
        valorHasta: null,
        duracion: "40 min",
        tags: ["Diagnóstico", "Caída"],
        problematicas: ["Caída del cabello"],
        requiereEvaluacion: false,
    },
    {
        id: "mesoterapia-dutasteride",
        categoria: "Capilar",
        subcategoria: "Tratamiento",
        nombre: "Mesoterapia Dutasteride",
        descripcion:
            "Microinyecciones directas al folículo para frenar la caída androgenética.",
        profesional: "Dra. Javiera Araya",
        valorDesde: 110000,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Alopecia", "Frenado"],
        problematicas: ["Caída del cabello"],
        requiereEvaluacion: true,
        planes: [
            { nombre: "(PLAN) 3 SESIONES DUTASTERIDE", precio: 300000 },
            { nombre: "(PLAN) 6 DUTASTERIDE", precio: 589998 },
            { nombre: "(PLAN) 3 MESOTERAPIA + CORTICOIDE", precio: 300000 },
            { nombre: "(PLAN) 6 MESOTERAPIA + CORTICOIDE", precio: 589998 },
        ]
    },
    {
        id: "injerto-capilar-fue",
        categoria: "Capilar",
        subcategoria: "Cirugía",
        nombre: "Injerto Capilar FUE Zafiro",
        descripcion:
            "Trasplante pelo a pelo. Técnica Zafiro para mayor densidad y naturalidad.",
        profesional: "Dra. Javiera Araya",
        valorDesde: 1900000,
        valorHasta: 5460000,
        duracion: "6-10 hrs",
        tags: ["Definitivo", "Pelo"],
        requiereEvaluacion: true,
    },
    {
        id: "regenera-activa",
        categoria: "Capilar",
        subcategoria: "Regenerativo",
        nombre: "Regenera Activa",
        descripcion:
            "Microinjertos autólogos de células progenitoras para densidad capilar.",
        profesional: "Dra. Javiera Araya",
        valorDesde: 1250000,
        valorHasta: null,
        duracion: "90 min",
        tags: ["Células Madre", "Innovación"],
        requiereEvaluacion: true,
        planes: [
            { nombre: "(PLAN) 1 REGENERA + 4 TRICOPAT", precio: 2000000 },
            { nombre: "(PLAN) 1 REGENERA + 6 TRICOPAT + 3 DUTASTERIDE", precio: 2400000 },
            { nombre: "(PLAN) 1 REGENERA + 4 Tricopat + 2 Dutasteride", precio: 2150000 },
        ]
    },
    {
        id: "tricopat",
        categoria: "Capilar",
        subcategoria: "Tecnología",
        nombre: "Tricopat",
        descripcion: "Tecnología de restauración capilar que combina microdermoabrasión, ondas de presión, iontoforesis y fotostimulación.",
        profesional: "Dra. Javiera Araya",
        valorDesde: 250000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Tecnología", "Restauración"],
        requiereEvaluacion: true,
        planes: [
            { nombre: "(PLAN) Tricopat 4 Sesiones", precio: 1000000 },
            { nombre: "(PLAN) Tricopat 4 Sesiones + 2 de Dutasteride", precio: 1150000 },
            { nombre: "(PLAN) Tricopat 6 Sesiones + 3 Sessiones de Dutasteride", precio: 1500000 },
        ],
        beneficios: [
            "Estimula la microcirculación y el metabolismo celular",
            "Favorece la absorción de principios activos",
            "Indoloro y sin agujas",
            "Resultados visibles desde las primeras sesiones",
            "Tecnología patentada Skin Patting"
        ],
        contraindicaciones: [
            "Infecciones o heridas abiertas en el cuero cabelludo",
            "Dermatitis severa en zona a tratar",
            "Embarazo (consultar)"
        ],
        faqs: [
            {
                pregunta: "¿Qué es Tricopat?",
                respuesta: "Es un dispositivo innovador que combina microdermoabrasión controlada, ondas de presión y electroestimulación para mejorar la salud capilar sin inyecciones."
            },
            {
                pregunta: "¿Para quién está indicado?",
                respuesta: "Es ideal para hombres y mujeres con alopecia androgenética, efluvio telógeno o afinamiento capilar que buscan alternativas no invasivas."
            }
        ]
    },
    {
        id: "prp-capilar",
        categoria: "Capilar",
        subcategoria: "Regenerativo",
        nombre: "Plasma Rico en Plaquetas (PRP)",
        descripcion: "Factores de crecimiento autólogos para estimular el folículo piloso.",
        profesional: "Dra. Javiera Araya",
        valorDesde: 120000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["PRP", "Natural"],
        requiereEvaluacion: true,
        planes: [
            { nombre: "(PLAN) PRP 3 SESIONES (plasma rico en plaquetas)", precio: 300000 },
            { nombre: "(PLAN) PRP 6 SESIONES (plasma rico en plaquetas)", precio: 589998 },
        ],
        beneficios: [
            "Estimula el crecimiento de cabello nuevo",
            "Aumenta la densidad y grosor capilar",
            "Frena la caída del cabello",
            "Tratamiento autólogo 100% natural",
            "Sin riesgo de rechazo o alergias"
        ],
        contraindicaciones: [
            "Trombocitopenia (plaquetas bajas)",
            "Infecciones activas en cuero cabelludo",
            "Enfermedades autoinmunes severas",
            "Cáncer o quimioterapia activa"
        ],
        faqs: [
            {
                pregunta: "¿Qué es el PRP Capilar?",
                respuesta: "Es un tratamiento que utiliza tu propia sangre para obtener un concentrado de factores de crecimiento plaquetario. Al inyectarlo en el cuero cabelludo, estimula los folículos pilosos y promueve la regeneración celular."
            },
            {
                pregunta: "¿Cuándo se ven los resultados?",
                respuesta: "Los resultados suelen ser visibles a partir de la tercera sesión, observándose una disminución en la caída y una mejora en la calidad del cabello existente."
            },
            {
                pregunta: "¿Es doloroso?",
                respuesta: "El procedimiento es mínimamente invasivo. Se utiliza anestesia tópica o local para minimizar las molestias de las microinyecciones."
            }
        ]
    },

    // ==================== UROLOGÍA / GINECOLOGÍA ====================
    {
        id: "bioplastia-pene",
        categoria: "Urología",
        subcategoria: "Estética Masculina",
        nombre: "Engrosamiento Peneano",
        descripcion:
            "Aumento de circunferencia con ácido hialurónico. Ambulatorio y seguro.",
        profesional: "Dr. Guillermo Contreras / Dr. Frank Ulloa",
        valorDesde: 500000,
        valorHasta: 800000,
        duracion: "60 min",
        tags: ["Íntimo", "Masculino"],
        requiereEvaluacion: true,
    },
    {
        id: "rejuvenecimiento-vaginal",
        categoria: "Ginecoestética",
        subcategoria: "Láser",
        nombre: "Láser CO2 Vaginal",
        descripcion:
            "Trata sequedad, laxitud e incontinencia leve. Rejuvenecimiento funcional.",
        profesional: "Dra. María Laura Villarroel / Matrona Stefania Kuncar",
        valorDesde: 250000,
        valorHasta: 350000,
        duracion: "45 min",
        tags: ["Funcional", "Íntimo"],
        requiereEvaluacion: true,
    },
    {
        id: "peeling-intimo",
        categoria: "Ginecoestética",
        subcategoria: "Estética",
        nombre: "Blanqueamiento Íntimo",
        descripcion:
            "Tratamiento médico-estético diseñado para aclarar y unificar el tono de la piel en la zona genital y anal mediante la combinación de peelings químicos específicos y tecnología láser. Ideal para tratar la hiperpigmentación de forma segura y discreta.",
        profesional: "Dra. María Laura Villarroel / Matrona Stefania Kuncar",
        valorDesde: 130000,
        valorHasta: 150000,
        duracion: "30 min",
        tags: ["Estética", "Aclarado", "Ginecoestética"],
        requiereEvaluacion: true,
        slug: "blanqueamiento-intimo-los-angeles",
        landingPage: true,
        seo: {
            metaTitle: "Blanqueamiento Íntimo Los Ángeles | Peeling Vaginal | Clínica Cialo",
            metaDescription: "Tratamiento de blanqueamiento íntimo en Los Ángeles, Chile. Despigmentación de zona genital y anal con peeling y tecnología segura. Resultados efectivos en Clínica Cialo.",
            keywords: ["blanqueamiento intimo los angeles", "peeling vaginal los angeles", "aclaramiento genital", "ginecoestetica los angeles"]
        },
        beneficios: [
            "Aclara significativamente el tono de la piel en zonas íntimas.",
            "Procedimiento seguro y controlado por especialistas.",
            "Mejora la confianza y comodidad personal.",
            "Resultados visibles progresivos.",
            "Sin tiempo de inactividad prolongado."
        ]
    },
    {
        id: "blanqueamiento-axilas",
        categoria: "Corporal",
        subcategoria: "Peeling Químico",
        nombre: "Blanqueamiento de Axilas",
        descripcion:
            "Tratamiento especializado para aclarar y unificar el tono de la piel en las axilas mediante la técnica de Peeling Químico. Este procedimiento elimina las células pigmentadas y estimula la renovación celular para una piel más clara y suave.",
        profesional: "María Jesús Contreras / Keren Matus / Katalina Neumann",
        valorDesde: 120000,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Despigmentación", "Peeling", "Corporal"],
        requiereEvaluacion: true,
        slug: "blanqueamiento-de-axilas-los-angeles",
        landingPage: true,
        seo: {
            metaTitle: "Blanqueamiento de Axilas Los Ángeles | Peeling Químico Axilas | Clínica Cialo",
            metaDescription: "Elimina manchas y aclara tus axilas con nuestro tratamiento de blanqueamiento en Los Ángeles. Técnica de peeling químico especializada para una piel uniforme.",
            keywords: ["blanqueamiento de axilas los angeles", "peeling quimico axilas los angeles", "aclarar axilas", "despigmentacion axilas"]
        },
        beneficios: [
            "Reduce visiblemente las manchas oscuras en las axilas.",
            "Unifica el tono de la piel.",
            "Procedimiento rápido y ambulatorio.",
            "Resultados duraderos con el cuidado adecuado.",
            "Mejora la estética y textura de la zona."
        ]
    },

    // ==================== VASCULAR / NUTRICIÓN ====================
    {
        id: "escleroterapia",
        categoria: "Vascular",
        subcategoria: "Tratamiento",
        nombre: "Escleroterapia (Arañitas)",
        descripcion:
            "Procedimiento médico mínimamente invasivo para la eliminación de várices y telangiectasias (arañitas) en las piernas. Consiste en microinyecciones de una sustancia esclerosante que cierra la vena afectada, haciendo que desaparezca gradualmente.",
        profesional: "Dra. Francisca González",
        valorDesde: 80000,
        valorHasta: 500000,
        duracion: "30 min",
        tags: ["Piernas", "Salud", "Sin Cirugía"],
        requiereEvaluacion: true,
        relatedLinks: [
            { text: "Ver Landing Page Completa de Escleroterapia", url: "/escleroterapia-los-angeles" },
            { text: "Conoce a la Dra. Francisca González", url: "/dra-francisca-gonzalez" }
        ],
        beneficios: [
            "Elimina arañitas y várices sin cirugía.",
            "Procedimiento ambulatorio, sin reposo.",
            "Mejora la estética y reduce síntomas como pesadez.",
            "Resultados visibles progresivos.",
            "Realizado por cirujana vascular especialista."
        ],
        contraindicaciones: [
            "Embarazo y lactancia.",
            "Trombosis venosa profunda reciente.",
            "Infección activa en la zona.",
            "Alergia al esclerosante."
        ],
        faqs: [
            {
                pregunta: "¿Duele el tratamiento?",
                respuesta: "Es muy tolerable. Se siente un leve pinchazo y ardor momentáneo. No requiere anestesia."
            },
            {
                pregunta: "¿Cuántas sesiones necesito?",
                respuesta: "Varía según cada paciente, generalmente entre 1 a 3 sesiones para resultados óptimos, espaciadas cada 4-6 semanas."
            },
            {
                pregunta: "¿Qué cuidados debo tener?",
                respuesta: "Se recomienda uso de medias compresivas por 48-72 hrs y evitar sol directo en la zona tratada por unas semanas."
            }
        ]
    },
    {
        id: "consulta-nutricional",
        categoria: "Nutrición",
        subcategoria: "Consulta",
        nombre: "Consulta Nutricional + InBody 970",
        descripcion:
            "Evaluación completa que incluye escáner de composición corporal InBody. La primera sesión establece el diagnóstico y plan, las siguientes monitorean el progreso.",
        profesional: "Nutricionistas Cialo",
        valorDesde: 40000,
        valorHasta: 50000,
        duracion: "45 min",
        tags: ["Peso", "Salud"],
        requiereEvaluacion: false,
        seo: {
            metaTitle: "Consulta Nutricionista Los Ángeles | Clínica Cialo",
            metaDescription: "Agenda tu Consulta Nutricional en Los Ángeles con especialistas. Incluye evaluación con bioimpedancia InBody 970 para planes de alimentación exactos.",
            keywords: [
                "nutricionista los angeles",
                "nutricionista en los angeles",
                "nutriologo los angeles",
                "nutriologa en los angeles",
                "dieta nutricionista los angeles",
                "consulta nutricional"
            ]
        },
        planes: [
            { nombre: "Consulta Inicial (Evaluación + InBody)", precio: 50000 },
            { nombre: "Consulta de Seguimiento (Control + InBody)", precio: 40000 },
        ]
    },
    {
        id: "examen-calorimetria",
        categoria: "Nutrición",
        subcategoria: "Examen",
        nombre: "Examen de Calorimetría",
        descripcion:
            "Medición precisa del metabolismo basal para conocer cuántas calorías quema tu cuerpo en reposo. Clave para pautas nutricionales personalizadas.",
        profesional: "Nutricionistas Cialo",
        valorDesde: 50000,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Metabolismo", "Salud"],
        requiereEvaluacion: false,
        seo: {
            metaTitle: "Examen de Calorimetría Indirecta Los Ángeles | Clínica Cialo",
            metaDescription: "Realiza tu examen de Calorimetría Basal e Indirecta en Los Ángeles para descubrir exactamente cuántas calorías quemas en reposo. Optimiza tu nutrición.",
            keywords: [
                "calorimetria indirecta",
                "calorimetria examen precio",
                "calorimetria basal",
                "calorimetria indirecta valor",
                "calorimetría examen",
                "calorimetria concepcion",
                "nutricionista los angeles"
            ]
        },
    },
    {
        id: "examen-inbody",
        categoria: "Nutrición",
        subcategoria: "Examen",
        nombre: "Examen InBody 970",
        descripcion:
            "Análisis detallado de masa muscular, porcentaje de grasa, agua corporal y grasa visceral mediante bioimpedancia de grado médico.",
        profesional: "Nutricionistas Cialo",
        valorDesde: 15000,
        valorHasta: null,
        duracion: "15 min",
        tags: ["Composición Corporal", "Salud"],
        requiereEvaluacion: false,
        seo: {
            metaTitle: "Examen InBody Los Ángeles | Composición Corporal | Clínica Cialo",
            metaDescription: "Examen InBody 970 en Los Ángeles. Mide tu porcentaje de grasa, masa muscular y agua corporal con el escáner más avanzado. Conoce tu valor InBody.",
            keywords: [
                "inbody los angeles",
                "inbody examen",
                "examen inbody",
                "inbody 970",
                "valor inbody",
                "examen inbody precio",
                "inbody 970 precio"
            ]
        }
    },

    // ==================== OTROS TRATAMIENTOS ====================
    {
        id: "xwave",
        categoria: "Corporal",
        subcategoria: "Celulitis",
        nombre: "XWave",
        descripcion: "Ondas acústicas para tratamiento de celulitis y modelado corporal.",
        profesional: "Keren Matus / Katalina Neumann / María Jesús Contreras",
        valorDesde: 50000,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Celulitis", "Ondas de Choque"],
        requiereEvaluacion: false,
        planes: [
            { nombre: "PLAN XWAVE 10 SESIONES 12000 DISPAROS", precio: 490000 },
            { nombre: "PLAN XWAVE 10 SESIONES 1000 DISPAROS", precio: 100000 },
            { nombre: "PLAN XWAVE 10 SESIONES 18000 DISPAROS", precio: 735000 },
            { nombre: "PLAN XWAVE 24000 DISPAROS", precio: 980000 },
            { nombre: "PLAN XWAVE 10 SESIONES 30000 DISPAROS", precio: 1225000 },
            { nombre: "PLAN XWAVE 36000 DISPAROS", precio: 1470000 },
        ],
        beneficios: [
            "Elimina la celulitis y piel de naranja",
            "Mejora la elasticidad y firmeza de la piel",
            "Estimula la circulación sanguínea y linfática",
            "Resultados visibles y duraderos",
            "No invasivo y sin tiempo de recuperación"
        ],
        contraindicaciones: [
            "Embarazo y lactancia",
            "Trastornos de coagulación",
            "Infecciones activas en la zona",
            "Uso de marcapasos"
        ],
        faqs: [
            {
                pregunta: "¿Cómo funciona XWave?",
                respuesta: "Utiliza ondas acústicas de alta energía que penetran en el tejido, rompiendo los septos fibrosos responsables de la celulitis y estimulando la producción de nuevo colágeno."
            },
            {
                pregunta: "¿Es doloroso?",
                respuesta: "No, el tratamiento es indoloro. Se percibe una vibración intensa pero tolerable, similar a un masaje profundo."
            }
        ]
    },
    {
        id: "drenaje-linfatico-avanzado",
        categoria: "Corporal",
        subcategoria: "Estética Corporal",
        nombre: "Drenaje Linfático (Aparatología Avanzada)",
        descripcion:
            "Tratamiento integral enfocado en la eliminación de toxinas, reducción de retención de líquidos y mejora de la circulación. Combina técnicas manuales con la tecnología más avanzada de la clínica (Exilis Ultra 360 y XWave) para potenciar los resultados en la textura de la piel y reducción de inflamación.",
        profesional: "Keren Matus / Katalina Neumann",
        valorDesde: 60000,
        valorHasta: null,
        duracion: "45-60 min",
        tags: ["Drenaje", "Exilis", "XWave", "Circulación"],
        requiereEvaluacion: true,
        slug: "drenaje-linfatico-avanzado-los-angeles",
        landingPage: false,
        seo: {
            metaTitle: "Drenaje Linfático Los Ángeles | Exilis y XWave | Clínica Cialo",
            metaDescription: "Optimiza tu circulación y reduce la celulitis con nuestro Drenaje Linfático en Los Ángeles. Combinamos técnicas manuales con tecnología Exilis Ultra 360 y XWave para resultados superiores.",
            keywords: ["drenaje linfatico los angeles", "exilis los angeles", "xwave los angeles", "drenaje linfatico btl", "reducir inflamacion corporal"]
        },
        beneficios: [
            "Estimula la eliminación de toxinas y líquidos retenidos.",
            "Potencia la circulación linfática y sanguínea.",
            "Mejora visiblemente la textura de la piel y reduce celulitis (XWave).",
            "Tensado cutáneo y reducción de grasa localizada (Exilis 360).",
            "Tratamiento no invasivo con resultados progresivos."
        ]
    },
    {
        id: "peeling-quimico",
        categoria: "Facial",
        subcategoria: "Dermatofuncional",
        nombre: "Peeling Químico",
        descripcion: "Renovación celular mediante ácidos específicos para mejorar textura y manchas.",
        profesional: "Equipo Cialo / Dra. Elga Viviana Peña",
        valorDesde: 165000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Piel", "Renovación"],
        requiereEvaluacion: true,
        planes: [
            { nombre: "PLAN PEELING QUIMICO 3 SESIONES FOTOTIPO I A IV", precio: 490002 },
        ],
        beneficios: [
            "Renueva la capa superficial de la piel",
            "Reduce manchas y unifica el tono",
            "Suaviza arrugas finas y poros dilatados",
            "Controla el acné y sus secuelas",
            "Aporta luminosidad inmediata"
        ],
        contraindicaciones: [
            "Exposición solar reciente o quemaduras",
            "Herpes activo",
            "Embarazo o lactancia (según tipo de ácido)",
            "Pieles extremadamente sensibles o con rosácea activa"
        ]
    },
    {
        id: "laser-q-switched",
        categoria: "Facial",
        subcategoria: "Láser",
        nombre: "Láser Q-Switched",
        descripcion: "Tratamiento láser específico para manchas y despigmentación.",
        profesional: "Equipo Cialo / Dra. Elga Viviana Peña",
        valorDesde: 80000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Manchas", "Láser"],
        requiereEvaluacion: true,
        planes: [
            { nombre: "PLAN LASER Q-SWITCHED 3 SESIONES FOTOTIPO V-VI", precio: 225000 },
        ],
        beneficios: [
            "Elimina manchas solares y melasma",
            "Trata lesiones pigmentadas profundas",
            "Mejora la calidad y tono de la piel",
            "Seguro para fototipos altos (pieles oscuras)",
            "Sin tiempo de inactividad"
        ],
        contraindicaciones: [
            "Bronceado reciente",
            "Embarazo",
            "Uso de medicamentos fotosensibilizantes",
            "Infecciones cutáneas activas"
        ]
    },
    {
        id: "laser-vascular",
        categoria: "Vascular",
        subcategoria: "Láser",
        nombre: "Láser Vascular",
        descripcion: "Tratamiento láser para telangiectasias y lesiones vasculares.",
        profesional: "Dra. Francisca González / Dra. Mauriluz Atencio",
        valorDesde: 150000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Vascular", "Láser"],
        requiereEvaluacion: true,
        seo: {
            metaTitle: "Láser Vascular Los Ángeles: Cirujano Vascular | Clínica Cialo",
            metaDescription: "Tratamiento Láser Vascular en Los Ángeles por Médico Cirujano Vascular certificada. Elimina arañitas y telangiectasias con tecnología segura y resultados visibles.",
            keywords: [
                "cirujano vascular los angeles",
                "laser vascular los angeles",
                "tratamiento arañitas los angeles",
                "medico vascular",
                "eliminar varices sin cirugia"
            ]
        },
        planes: [
            { nombre: "Plan Láser Vascular 4 sesiones", precio: 560000 },
        ],
        beneficios: [
            "Elimina arañitas vasculares y telangiectasias",
            "Trata puntos rubí y angiomas",
            "Procedimiento rápido y eficaz",
            "Resultados visibles desde la primera sesión",
            "Mejora estética inmediata de las piernas"
        ],
        contraindicaciones: [
            "Piel bronceada recientemente",
            "Embarazo",
            "Trastornos de coagulación",
            "Historial de queloides"
        ],
        faqs: [
            {
                pregunta: "¿Cómo elimina las venitas?",
                respuesta: "La energía del láser es absorbida selectivamente por la hemoglobina de la sangre, coagulando el vaso sanguíneo que luego es reabsorbido por el cuerpo."
            }
        ]
    },
    {
        id: "enzimas-lipoliticas",
        categoria: "Corporal",
        subcategoria: "Reductivos",
        nombre: "Enzimas Lipolíticas",
        descripcion: "Microinyecciones de enzimas para reducción de grasa localizada.",
        profesional: "Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: 200000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Grasa", "Inyectable"],
        requiereEvaluacion: true,
        planes: [
            { nombre: "(PLAN) Lipolíticos quemadores de grasa", precio: 500000 },
        ],
        beneficios: [
            "Reducción de grasa localizada rebelde",
            "Mejora el contorno corporal",
            "Tratamiento mínimamente invasivo",
            "Sin cirugía ni reposo",
            "Combate celulitis adiposa"
        ],
        contraindicaciones: [
            "Embarazo y lactancia",
            "Alergia a los componentes",
            "Enfermedades hepáticas o renales",
            "Infecciones en la zona de aplicación"
        ]
    },
    // ==================== NUEVOS TRATAMIENTOS DRA. PEÑA ====================
    {
        id: "reseccion-lunares",
        categoria: "Facial",
        subcategoria: "Cirugía Menor",
        nombre: "Resección de Lunares",
        descripcion: "Eliminación de nevus por salud o estética mediante Plexr o cirugía.",
        profesional: "Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: 120000,
        valorHasta: null,
        duracion: "30-45 min",
        tags: ["Salud", "Estética", "Plexr", "Cirugía"],
        requiereEvaluacion: true,
        beneficios: [
            "Eliminación definitiva de lesiones pigmentadas o molestas",
            "Procedimiento seguro y ambulatorio",
            "Incluye biopsia si el médico lo indica (costo extra)"
        ],
        contraindicaciones: [
            "Infección activa en la zona",
            "Tendencia a formar queloides"
        ],
        cuidadosPosteriores: [
            "Uso de mupirosina",
            "Evitar exposición solar",
            "Retiro de puntos entre 7-10 días (si aplica)"
        ],
        faqs: [
            {
                pregunta: "¿Qué cuidados debo tener antes del tratamiento?",
                respuesta: "No aplicar cremas en la zona y es fundamental informar al médico si usas anticoagulantes."
            }
        ]
    },
    {
        id: "eliminacion-verrugas",
        categoria: "Facial",
        subcategoria: "Cirugía Menor",
        nombre: "Eliminación de Verrugas",
        descripcion: "Remoción de verrugas o acrocordones con tecnología Plexr.",
        profesional: "Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: 120000,
        valorHasta: null,
        duracion: "20-30 min",
        tags: ["Verrugas", "Acrocordones", "Plexr"],
        requiereEvaluacion: true,
        beneficios: [
            "Eliminación rápida y eficaz de verrugas virales o fibromas blandos",
            "Tratamiento en rostro, cuello y axilas"
        ],
        contraindicaciones: [
            "Diabetes descompensada"
        ],
        cuidadosPosteriores: [
            "Aplicar mupirosina según indicación médica",
            "No arrancar las costras formadas"
        ]
    },
    {
        id: "exeresis-lipomas",
        categoria: "Corporal",
        subcategoria: "Cirugía Menor",
        nombre: "Exéresis de Lipomas",
        descripcion: "Extracción quirúrgica de depósitos de grasa encapsulada.",
        profesional: "Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: 300000,
        valorHasta: null,
        duracion: "60 min",
        tags: ["Lipomas", "Cirugía Menor", "Grasa Encapsulada"],
        requiereEvaluacion: true,
        beneficios: [
            "Eliminación definitiva de masas de grasa subcutánea móviles"
        ],
        contraindicaciones: [
            "Coagulopatías graves"
        ],
        cuidadosPosteriores: [
            "Uso de vendaje compresivo",
            "Reposo deportivo por 1 semana"
        ],
        faqs: [
            {
                pregunta: "¿Qué necesito antes del procedimiento?",
                respuesta: "Se requiere una ecografía previa para confirmar el tamaño. Además, podría requerirse ayuno y la suspensión de medicamentos como la aspirina."
            }
        ]
    },
    {
        id: "sculptra-pena",
        categoria: "Facial",
        subcategoria: "Bioestimulador",
        nombre: "Sculptra®",
        descripcion: "Estimulación de colágeno profunda para volumen y firmeza corporal y facial.",
        profesional: "Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: null,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Sculptra", "Flacidez", "Colágeno"],
        requiereEvaluacion: true,
        beneficios: [
            "Trata la flacidez y pérdida de soporte facial",
            "Aplicable en rostro, glúteos y brazos",
            "Resultados visibles a los 2-3 meses de forma gradual"
        ],
        contraindicaciones: [
            "Embarazo o lactancia",
            "Enfermedades autoinmunes"
        ],
        cuidadosPosteriores: [
            "Masaje 5-5-5 (5 min, 5 veces al día, por 5 días)",
            "Evitar exposición solar directa"
        ],
        faqs: [
            {
                pregunta: "¿Debo tomar precauciones previas?",
                respuesta: "Sí, se recomienda no tomar antiinflamatorios 3 días antes del tratamiento."
            }
        ]
    },
    {
        id: "radiesse-pena",
        categoria: "Facial",
        subcategoria: "Bioestimulador",
        nombre: "Radiesse®",
        descripcion: "Bioestimulación con Hidroxiapatita de Calcio para generar tensión y mejorar la calidad de la piel.",
        profesional: "Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: null,
        valorHasta: null,
        duracion: "40 min",
        tags: ["Radiesse", "Tensión", "Contorno Facial"],
        requiereEvaluacion: true,
        beneficios: [
            "Tratamiento para flacidez leve/moderada",
            "Mejora la definición del contorno facial",
            "Puede usarse hiperdiluido para mejorar calidad de piel",
            "Aplicable en rostro, manos y cuello"
        ],
        contraindicaciones: [
            "Infección en la zona de aplicación"
        ],
        cuidadosPosteriores: [
            "Evitar ejercicio intenso por 48 horas"
        ]
    },
    {
        id: "lanluma",
        categoria: "Corporal",
        subcategoria: "Bioestimulador",
        nombre: "Lanluma",
        descripcion: "Bioestimulación de gran volumen ideal para remodelación de glúteos y corrección de depresiones.",
        profesional: "Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: null,
        valorHasta: null,
        duracion: "60 min",
        tags: ["Lanluma", "Glúteos", "Remodelación"],
        requiereEvaluacion: true,
        beneficios: [
            "Ideal para celulitis, remodelación de glúteos y flacidez",
            "Excelente para corregir depresiones trocantéreas",
            "Efectivo en glúteos, muslos y otras zonas corporales"
        ],
        contraindicaciones: [
            "Alergia conocida a los componentes"
        ],
        cuidadosPosteriores: [
            "Realizar masajes circulares en la zona tratada"
        ],
        faqs: [
            {
                pregunta: "¿Hay alguna recomendación para el día de la sesión?",
                respuesta: "Se solicita al paciente no asistir con ropa ajustada."
            }
        ]
    },
    {
        id: "juvelook",
        categoria: "Facial",
        subcategoria: "Bioestimulador",
        nombre: "Juvelook",
        descripcion: "Bioestimulador híbrido diseñado especialmente para la redensificación de la delicada área de las ojeras.",
        profesional: "Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: null,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Juvelook", "Ojeras", "Rejuvenecimiento Mirada"],
        galeria: [
            "/tratamientos/juvelook/1.webp",
            "/tratamientos/juvelook/2.webp",
            "/tratamientos/juvelook/3.webp",
        ],
        requiereEvaluacion: true,
        beneficios: [
            "Trata ojeras hundidas y piel fina periorbitaria",
            "Aplicación segura en ojeras y párpados"
        ],
        contraindicaciones: [
            "Rellenos previos no reabsorbibles en la zona"
        ],
        cuidadosPosteriores: [
            "Uso de compresas frías post-tratamiento",
            "Evitar calor extremo en la zona"
        ],
        faqs: [
            {
                pregunta: "¿Qué cuidados debo tener antes de la sesión?",
                respuesta: "Es importante evitar el consumo de alcohol 24 horas antes."
            }
        ]
    },
    {
        id: "toxina-terapeutica",
        categoria: "Facial",
        subcategoria: "Toxina Botulínica",
        nombre: "Toxina Botulínica: Bruxismo/Maseteros",
        descripcion: "Relajación del músculo masetero para aliviar el dolor mandibular y lograr un afinamiento estético del rostro.",
        profesional: "Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: null,
        valorHasta: null,
        duracion: "20 min",
        tags: ["Bruxismo", "Salud Dental", "Afinamiento Facial"],
        requiereEvaluacion: true,
        beneficios: [
            "Tratamiento para hipertrofia de maseteros, dolor de mandíbula y cefalea",
            "Mejora el perfil facial afinando el tercio inferior"
        ],
        contraindicaciones: [
            "Miastenia Gravis"
        ],
        cuidadosPosteriores: [
            "No acostarse en las siguientes 4 horas",
            "No masajear la zona tratada"
        ]
    },
    {
        id: "toxina-nefertiti",
        categoria: "Facial",
        subcategoria: "Toxina Botulínica",
        nombre: "Toxina Botulínica: Diseño Facial / Nefertiti",
        descripcion: "Armonización facial y tratamiento avanzado de bandas platismales (cuello de Nefertiti).",
        profesional: "Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: null,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Nefertiti", "Armonización", "Arrugas", "Sonrisa Gingival"],
        requiereEvaluacion: true,
        beneficios: [
            "Trata arrugas, sonrisa gingival y el cuello (Técnica Nefertiti)",
            "Mejora notablemente la definición del ángulo mandibular",
            "Se aplica en frente, cuello, mentón y nariz según evaluación"
        ],
        contraindicaciones: [
            "Embarazo y Lactancia"
        ],
        cuidadosPosteriores: [
            "No realizar ejercicio intenso por 24 horas"
        ],
        faqs: [
            {
                pregunta: "¿Hay alguna contraindicación previa?",
                respuesta: "Se debe suspender el consumo de suplementos como el Omega 3 antes del tratamiento."
            }
        ]
    },
    {
        id: "morpheus8-pena",
        categoria: "Facial",
        subcategoria: "Tecnología Avanzada",
        nombre: "Morpheus8",
        descripcion: "Radiofrecuencia fraccionada para tratar estrías, celulitis profunda y flacidez extrema.",
        profesional: "Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: null,
        valorHasta: null,
        duracion: "60 min",
        tags: ["Morpheus8", "Estrías", "Flacidez Extrema"],
        requiereEvaluacion: true,
        beneficios: [
            "Tratamiento estrella para la retracción de la piel",
            "Aplicable tanto en rostro como en todo el cuerpo"
        ],
        contraindicaciones: [
            "Uso de marcapasos",
            "Implantes metálicos en la zona a tratar"
        ],
        cuidadosPosteriores: [
            "Fotoprotección estricta",
            "Uso de cremas reparadoras indicadas"
        ],
        faqs: [
            {
                pregunta: "¿El procedimiento duele?",
                respuesta: "Para minimizar molestias, se aplica anestesia tópica 45 minutos antes de iniciar el tratamiento."
            }
        ]
    },
    {
        id: "ultrasonido-corporal",
        categoria: "Corporal",
        subcategoria: "Tecnología Avanzada",
        nombre: "Exilis / Scizer",
        descripcion: "Reducción de grasa y tensión cutánea mediante tecnología de calor controlado.",
        profesional: "Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: null,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Exilis", "Scizer", "Reducción Grasa", "Celulitis"],
        requiereEvaluacion: true,
        beneficios: [
            "Trata grasa localizada, flacidez corporal y celulitis",
            "Se utiliza en abdomen, muslos y papada",
            "Scizer se recomienda específicamente para adiposidad mayor a 1.3cm"
        ],
        contraindicaciones: [
            "Insuficiencia renal o hepática"
        ],
        cuidadosPosteriores: [
            "Continuar con hidratación abundante",
            "Se recomienda caminar 30 minutos post-sesión"
        ],
        faqs: [
            {
                pregunta: "¿Qué debo hacer antes de mi sesión?",
                respuesta: "Es fundamental una hidratación abundante, beber al menos 2 litros de agua antes de la sesión."
            }
        ]
    },
    {
        id: "enzimas-pena",
        categoria: "Corporal",
        subcategoria: "Lipolíticos",
        nombre: "Enzimas Recombinantes",
        descripcion: "Disolución de grasa localizada y fibrosis post-quirúrgica mediante microinyecciones.",
        profesional: "Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: null,
        valorHasta: null,
        duracion: "40 min",
        tags: ["Papada", "Fibrosis", "PB Serum", "Celulitis"],
        requiereEvaluacion: true,
        beneficios: [
            "Trata papada, grasa localizada, celulitis y fibrosis post-quirúrgica",
            "Altamente efectivo en la reducción de papada y compactación de tejidos",
            "Aplicable en abdomen y muslos"
        ],
        contraindicaciones: [
            "Alergia a las enzimas utilizadas"
        ],
        cuidadosPosteriores: [
            "Beber abundante agua",
            "Mantener una dieta baja en grasas"
        ]
    },
    {
        id: "manejo-sobrepeso",
        categoria: "Nutrición",
        subcategoria: "Manejo Metabólico",
        nombre: "Manejo de Sobrepeso",
        descripcion: "Tratamiento médico metabólico integral con uso de fármacos inyectables.",
        profesional: "Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: null,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Metabolismo", "Ozempic", "Saxenda", "Obesidad"],
        requiereEvaluacion: true,
        beneficios: [
            "Enfoque sistémico para obesidad y sobrepeso con comorbilidades",
            "Requiere controles médicos periódicos"
        ],
        contraindicaciones: [
            "Antecedentes personales o familiares de cáncer de tiroides medular"
        ],
        cuidadosPosteriores: [
            "Seguimiento nutricional y modificación profunda de hábitos"
        ],
        faqs: [
            {
                pregunta: "¿Qué se necesita antes de iniciar este tratamiento?",
                respuesta: "Se requieren exámenes de sangre actualizados, incluyendo perfil lipídico y hepático."
            }
        ]
    },
    {
        id: "relleno-ah-pena",
        categoria: "Facial",
        subcategoria: "Rellenos",
        nombre: "Relleno con Ácido Hialurónico",
        descripcion: "Procedimiento de volumetría para labios, mentón, pómulos y rejuvenecimiento de manos.",
        profesional: "Dra. Elga Viviana Peña",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: null,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Volumen", "Ácido Hialurónico", "Perfilado"],
        requiereEvaluacion: true,
        beneficios: [
            "Corrige la pérdida de volumen, mejora ojeras y perfilado de labios",
            "Duración estimada de 9 a 18 meses según el producto",
            "Aplicable en rostro, manos y glúteos"
        ],
        contraindicaciones: [
            "Enfermedades autoinmunes activas"
        ],
        cuidadosPosteriores: [
            "No usar labiales (si el tratamiento fue en labios) por 24 horas",
            "Evitar la exposición directa al calor"
        ],
        faqs: [
            {
                pregunta: "¿Debo suspender algún medicamento antes de ir a mi sesión?",
                respuesta: "Sí, se debe evitar tomar aspirina o anticoagulantes, siempre previa consulta con tu médico tratante."
            }
        ],
        galeria: [
            "/resultados/relleno-ojeras/1.webp",
            "/resultados/relleno-ojeras/2.webp",
            "/resultados/relleno-ojeras/3.webp",
            "/resultados/relleno-ojeras/4.webp",
            "/resultados/relleno-ojeras/5.webp",
            "/resultados/relleno-ojeras/6.webp",
            "/resultados/fosa-temporal/1.webp",
            "/resultados/angulo-mandibular/1.webp",
            "/resultados/menton/1.webp",
            "/resultados/menton/2.webp",
            "/resultados/menton/3.webp",
        ]
    },
    {
        id: "vitaminas-mesoterapia",
        categoria: "Facial",
        subcategoria: "Mesoterapia",
        nombre: "Vitaminas / Mesoterapia",
        descripcion: "Nutrición e hidratación profunda tanto facial como corporal.",
        profesional: "Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena",
        valorDesde: null,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Vitaminas", "Hidratación", "Revitalización", "NCTF"],
        requiereEvaluacion: true,
        beneficios: [
            "Combate la opacidad, la deshidratación y las líneas finas de expresión",
            "Se puede realizar mediante técnica manual o utilizando Dermapen",
            "Ideal para rejuvenecer rostro, cuello y escote"
        ],
        contraindicaciones: [
            "Infección cutánea activa en la zona a tratar"
        ],
        cuidadosPosteriores: [
            "Evitar el uso de maquillaje durante al menos las 12 horas posteriores"
        ],
        faqs: [
            {
                pregunta: "¿Qué condición debe tener mi piel antes de la mesoterapia?",
                respuesta: "La piel debe estar completamente limpia, se realizará una higiene facial previa al tratamiento."
            }
        ]
    },
    {
        id: "test-mercado-pago",
        categoria: "Corporal",
        subcategoria: "Test",
        nombre: "Tratamiento de Prueba",
        descripcion: "Tratamiento de prueba exclusivo para verificar la integración con Mercado Pago y revisar los nuevos front-ends interactivos sin afectar la base de datos de producción real. Los resultados son simulados.",
        profesional: "Dr. Nicolás Laucirica",
        valorDesde: 50,
        valorHasta: null,
        duracion: "15 min",
        tags: ["Test", "Simulación", "Premium", "Interactivo"],
        requiereEvaluacion: false,
        imagenExplicativa: "/tratamientos/biostimuladores-vs-ah.png",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar/nicolas-laucirica",
        beneficios: [
            "Permite pre-visualizar el flujo y experiencia del usuario completo.",
            "Testea todos los puntos visuales (Hero, Tags, Acordeones).",
            "Simula una compra o un agendamiento en el sistema base."
        ],
        contraindicaciones: [
            "No debe ser agendado por clientes reales.",
            "No reemplaza a un tratamiento médico verificado."
        ],
        faqs: [
            {
                pregunta: "¿Este tratamiento es real?",
                respuesta: "No, este tratamiento ha sido creado exclusivamente con fines de prueba para la plataforma, permitiendo a los administradores probar las interfaces de usuario (UI), Mercado Pago y el agendamiento vía Reservo de manera segura."
            },
            {
                pregunta: "¿Por qué veo este diseño distinto?",
                respuesta: "Estamos implementando distintos 'Layouts' y este tratamiento específico ha sido configurado para cargar la v2 del diseño premium para validar su estética con casos de uso en producción."
            },
            {
                pregunta: "¿Si compro esto se cobra de mi tarjeta?",
                respuesta: "Si el entorno de Mercado Pago está en producción, sí se realizará un cobro real por el monto nominal configurado ($50)."
            }
        ]
    },
    {
        id: "laser-vascular-varices",
        categoria: "Vascular",
        subcategoria: "Láser",
        nombre: "Láser Vascular para Várices",
        descripcion: "Tratamiento láser vascular único en Los Ángeles para eliminar várices y arañas vasculares de forma no invasiva. Tecnología de última generación que cierra las venas dilatadas sin cirugía, sin cicatrices y con recuperación inmediata.",
        profesional: "Dra. Francisca González / Dra. Mauriluz Atencio",
        valorDesde: 150000,
        valorHasta: null,
        duracion: "45-60 min",
        tags: ["Láser Vascular", "Várices", "Sin Cirugía", "Único en Los Ángeles"],
        problematicas: ["Várices", "Arañas vasculares", "Insuficiencia venosa leve", "Piernas cansadas"],
        requiereEvaluacion: true,
        slug: "laser-vascular-varices-los-angeles",
        landingPage: true,
        seo: {
            metaTitle: "Láser Vascular para Várices Los Ángeles | Único en la zona | Clínica Cialo",
            metaDescription: "Tratamiento láser vascular único en Los Ángeles para eliminar várices sin cirugía. Tecnología avanzada, sin cicatrices ni tiempo de recuperación. Agenda tu evaluación.",
            keywords: ["láser vascular Los Ángeles", "tratamiento várices Los Ángeles", "eliminar várices sin cirugía", "arañas vasculares tratamiento", "láser para várices Biobío"]
        },
        beneficios: [
            "Elimina várices y arañas vasculares sin cirugía",
            "Sin cicatrices ni tiempo de inactividad",
            "Resultados visibles desde la primera sesión",
            "Procedimiento ambulatorio de 45-60 minutos",
            "Tecnología única en Los Ángeles"
        ],
        contraindicaciones: [
            "Embarazo o lactancia",
            "Insuficiencia venosa severa",
            "Trastornos de coagulación",
            "Infecciones activas en la zona"
        ],
        faqs: [
            {
                pregunta: "¿Cómo funciona el láser vascular?",
                respuesta: "El láser emite una luz específica que es absorbida por la hemoglobina de la vena, calentando y sellando la pared vascular. La vena tratada se reabsorbe gradualmente por el cuerpo en las semanas siguientes."
            },
            {
                pregunta: "¿Cuántas sesiones necesito?",
                respuesta: "Depende del tamaño y cantidad de várices. Generalmente se requieren entre 1 y 3 sesiones espaciadas cada 4-6 semanas para obtener resultados óptimos."
            },
            {
                pregunta: "¿Es doloroso?",
                respuesta: "No. El tratamiento es bien tolerado. Se siente una ligera sensación de calor o pinchazo. Aplicamos gel refrigerante para mayor confort."
            }
        ]
    },
    {
        id: "vasectomia-sin-bisturi",
        categoria: "Urología",
        subcategoria: "Cirugía",
        nombre: "Vasectomía sin Bisturí con BONO PAD FONASA",
        descripcion: "Vasectomía sin bisturí técnica sin aguja ni bisturí, método definitivo de planificación familiar. Procedimiento rápido, seguro y con recuperación inmediata. Aceptamos BONO PAD FONASA.",
        profesional: "Dr. Guillermo Contreras / Dr. Frank Ulloa",
        valorDesde: 490000,
        valorHasta: 890000,
        duracion: "20-30 min",
        tags: ["Vasectomía", "Sin Bisturí", "FONASA", "Planificación Familiar"],
        problematicas: ["Planificación familiar", "Anticoncepción definitiva"],
        requiereEvaluacion: true,
        slug: "vasectomia-sin-bisturi-los-angeles",
        landingPage: true,
        seo: {
            metaTitle: "Vasectomía sin Bisturí Los Ángeles | BONO PAD FONASA | Clínica Cialo",
            metaDescription: "Vasectomía sin bisturí en Los Ángeles. Método sin aguja ni bisturí con BONO PAD FONASA. Procedimiento seguro, rápido y definitivo. Agenda tu evaluación urológica.",
            keywords: ["vasectomía Los Ángeles", "vasectomía sin bisturí", "vasectomía FONASA", "planificación familiar Los Ángeles", "vasectomía BONO PAD"]
        },
        beneficios: [
            "Sin aguja ni bisturí",
            "Procedimiento ambulatorio de 20-30 minutos",
            "Recuperación inmediata",
            "Aceptamos BONO PAD FONASA",
            "Método anticonceptivo definitivo"
        ],
        contraindicaciones: [
            "No reconsiderar método definitivo",
            "Infecciones activas en zona genital",
            "Trastornos de coagulación"
        ],
        faqs: [
            {
                pregunta: "¿Qué es la vasectomía sin bisturí?",
                respuesta: "Es una técnica moderna que no requiere incisiones quirúrgicas. Se accede al conducto deferente a través de una pequeña punción que se cierra sin puntos."
            },
            {
                pregunta: "¿Cuánto dura la recuperación?",
                respuesta: "La recuperación es inmediata. La mayoría de pacientes retorna a sus actividades normales en 24-48 horas."
            },
            {
                pregunta: "¿Es efectiva de inmediato?",
                respuesta: "No. Se requieren al menos 20 eyaculaciones o 3 meses para confirmar la ausencia de espermatozoides mediante un espermograma."
            }
        ]
    },
    {
        id: "cistoscopia",
        categoria: "Urología",
        subcategoria: "Endoscopia",
        nombre: "Cistoscopia Diagnóstica",
        descripcion: "Cistoscopia diagnóstica en Los Ángeles. Procedimiento endoscópico que permite visualizar el interior de la vejiga urinaria y la uretra para diagnosticar infecciones recurrentes, sangrado, tumores o alteraciones de la micción.",
        profesional: "Dr. Frank Ulloa",
        valorDesde: 250000,
        valorHasta: null,
        duracion: "15-30 min",
        tags: ["Cistoscopia", "Diagnóstico Urológico", "Vejiga", "Endoscopia"],
        problematicas: ["Infecciones urinarias recurrentes", "Sangrado en orina", "Dolor al orinar", "Micción frecuente"],
        requiereEvaluacion: true,
        slug: "cistoscopia-los-angeles",
        landingPage: true,
        seo: {
            metaTitle: "Cistoscopia Los Ángeles | Diagnóstico Urológico | Clínica Cialo",
            metaDescription: "Cistoscopia diagnóstica en Los Ángeles. Visualización endoscópica de vejiga y uretra para diagnóstico preciso. Urólogo especialista. Agenda tu consulta.",
            keywords: ["cistoscopia Los Ángeles", "cistoscopia diagnóstica", "urólogo Los Ángeles", "vejiga diagnóstico", "endoscopia urológica"]
        },
        beneficios: [
            "Diagnóstico preciso de patologías vesicales",
            "Procedimiento ambulatorio rápido",
            "Visualización directa del tracto urinario inferior",
            "Permite detectar tumores, cálculos y anomalías",
            "Recuperación inmediata"
        ],
        contraindicaciones: [
            "Infección urinaria activa",
            "Estrechamiento uretral severo",
            "Trastornos de coagulación"
        ],
        faqs: [
            {
                pregunta: "¿Qué es una cistoscopia?",
                respuesta: "Es un procedimiento endoscópico que introduce un cistoscopio (tubo delgado con cámara) por la uretra para visualizar el interior de la vejiga urinaria."
            },
            {
                pregunta: "¿Es dolorosa?",
                respuesta: "Se realiza con anestesia local en gel. Puede causar molestia leve o sensación de ardor al orinar durante 24-48 horas posteriores."
            },
            {
                pregunta: "¿Necesito preparación especial?",
                respuesta: "Generalmente se solicita orina limpia antes del procedimiento. En algunos casos se administra antibiótico profiláctico."
            }
        ]
    },
    {
        id: "rosacea-tratamiento",
        categoria: "Facial",
        subcategoria: "Dermatología",
        nombre: "Tratamiento para Rosácea",
        descripcion: "Tratamiento especializado para rosácea en Los Ángeles. Controla el enrojecimiento, las venitas visibles y las lesiones inflamatorias. Protocolos médicos personalizados que mejoran la calidad de vida y la apariencia de la piel.",
        profesional: "Dr. Nicolás Laucirica / Dra. Mariane Kiss / Dra. Mauriluz Atencio",
        valorDesde: 120000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Rosácea", "Enrojecimiento", "Dermatología", "Los Ángeles"],
        problematicas: ["Rosácea", "Enrojecimiento facial", "Venitas visibles", "Piel sensible"],
        requiereEvaluacion: true,
        slug: "rosacea-los-angeles",
        landingPage: true,
        seo: {
            metaTitle: "Tratamiento Rosácea Los Ángeles | Control del Enrojecimiento | Clínica Cialo",
            metaDescription: "Tratamiento especializado para rosácea en Los Ángeles. Controla el enrojecimiento, venitas y lesiones. Protocolos médicos personalizados. Agenda tu evaluación.",
            keywords: ["rosácea Los Ángeles", "tratamiento rosácea", "enrojecimiento facial tratamiento", "rosácea Biobío", "dermatología Los Ángeles"]
        },
        beneficios: [
            "Reduce enrojecimiento y flushing",
            "Disminuye venitas visibles (telangiectasias)",
            "Controla lesiones inflamatorias",
            "Mejora la textura y calidad de la piel",
            "Protocolos personalizados según tipo de rosácea"
        ],
        contraindicaciones: [
            "Embarazo o lactancia",
            "Infecciones activas en la piel",
            "Fotosensibilidad extrema"
        ],
        faqs: [
            {
                pregunta: "¿Qué tipo de rosácea se puede tratar?",
                respuesta: "Tratamos todos los subtipos: eritematotelangiectásica (enrojecimiento), papulopustulosa (granitos), fimatosa (engrosamiento) y ocular."
            },
            {
                pregunta: "¿Cuántas sesiones necesito?",
                respuesta: "Depende de la severidad. Generalmente se recomiendan 4-6 sesiones mensuales para resultados óptimos, con mantenimiento trimestral."
            },
            {
                pregunta: "¿El tratamiento duele?",
                respuesta: "No. Los procedimientos son tolerables. Utilizamos tecnología avanzada con sistemas de enfriamiento para mayor confort."
            }
        ],
        galeria: [
            "/resultados/rosacea/1.webp",
            "/resultados/rosacea/2.webp",
            "/resultados/rosacea/3.webp",
        ]
    },
    {
        id: "melasma-tratamiento",
        categoria: "Facial",
        subcategoria: "Dermatología",
        nombre: "Tratamiento para Melasma",
        descripcion: "Tratamiento especializado para melasma en Los Ángeles. Aborda las manchas hormonales y solares con protocolos médicos que unifican el tono de la piel de forma segura y efectiva.",
        profesional: "Dr. Nicolás Laucirica / Dra. Elga Viviana Peña",
        valorDesde: 150000,
        valorHasta: null,
        duracion: "45-60 min",
        tags: ["Melasma", "Manchas", "Dermatología", "Los Ángeles"],
        problematicas: ["Melasma", "Manchas hormonales", "Hiperpigmentación", "Manchas solares"],
        requiereEvaluacion: true,
        slug: "melasma-los-angeles",
        landingPage: true,
        seo: {
            metaTitle: "Tratamiento Melasma Los Ángeles | Elimina Manchas | Clínica Cialo",
            metaDescription: "Tratamiento especializado para melasma en Los Ángeles. Elimina manchas hormonales y solares con protocolos médicos seguros. Agenda tu evaluación dermatológica.",
            keywords: ["melasma Los Ángeles", "tratamiento melasma", "manchas hormonales", "hiperpigmentación tratamiento", "eliminar manchas cara Los Ángeles"]
        },
        beneficios: [
            "Reduce manchas de melasma y hiperpigmentación",
            "Unifica el tono de la piel",
            "Previene la recurrencia con tratamiento de mantenimiento",
            "Protocolos seguros para todo tipo de piel",
            "Resultados progresivos y naturales"
        ],
        contraindicaciones: [
            "Embarazo o lactancia",
            "Uso de fotosensibilizantes",
            "Piel con heridas abiertas"
        ],
        faqs: [
            {
                pregunta: "¿El melasma tiene cura?",
                respuesta: "El melasma es una condición crónica que se puede controlar y mejorar significativamente. Con tratamiento médico adecuado se logra aclarar las manchas y prevenir recaídas."
            },
            {
                pregunta: "¿Qué tratamientos incluye?",
                respuesta: "Combinamos peelings médicos, láser específico, despigmentantes tópicos y fotoprotección estricta según el tipo de melasma y fototipo de piel."
            },
            {
                pregunta: "¿Cuánto tiempo tarda en verse resultados?",
                respuesta: "Generalmente se observan mejoras desde las 4-6 semanas de tratamiento. Los resultados óptimos se alcanzan entre 3-6 meses."
            }
        ],
        galeria: [
            "/resultados/melasma/1.webp",
            "/resultados/melasma/2.webp",
            "/resultados/melasma/3.webp",
            "/resultados/manchas/1.webp",
            "/resultados/manchas/2.webp",
            "/resultados/manchas/3.webp",
            "/resultados/manchas/4.webp",
            "/resultados/despigmentacion/1.webp",
            "/resultados/despigmentacion/2.webp",
            "/resultados/despigmentacion/3.webp",
            "/resultados/despigmentacion/4.webp",
        ]
    },
    {
        id: "cicatrices-acne-tratamiento",
        categoria: "Facial",
        subcategoria: "Dermatología",
        nombre: "Tratamiento para Cicatrices de Acné",
        descripcion: "Tratamiento especializado para cicatrices de acné en Los Ángeles. Mejora la textura de la piel, reduce hoyos y marcas con tecnología láser, bioestimulación y peelings médicos.",
        profesional: "Dr. Nicolás Laucirica / Dra. Elga Viviana Peña / Dra. Mauriluz Atencio",
        valorDesde: 180000,
        valorHasta: null,
        duracion: "45-60 min",
        tags: ["Cicatrices Acné", "Láser", "Rejuvenecimiento", "Los Ángeles"],
        problematicas: ["Cicatrices de acné", "Hoyos en la piel", "Textura irregular", "Marcas post-acné"],
        requiereEvaluacion: true,
        slug: "cicatrices-acne-los-angeles",
        landingPage: true,
        seo: {
            metaTitle: "Tratamiento Cicatrices de Acné Los Ángeles | Elimina Hoyos | Clínica Cialo",
            metaDescription: "Tratamiento especializado para cicatrices de acné en Los Ángeles. Tecnología láser, bioestimulación y peelings médicos. Mejora la textura de tu piel. Agenda tu evaluación.",
            keywords: ["cicatrices acné Los Ángeles", "tratamiento hoyos cara", "eliminar marcas acné", "láser cicatrices Los Ángeles", "rejuvenecimiento facial"]
        },
        beneficios: [
            "Reduce hoyos y marcas de acné",
            "Mejora la textura y suavidad de la piel",
            "Estimula producción de colágeno",
            "Tecnología láser de última generación",
            "Resultados progresivos y duraderos"
        ],
        contraindicaciones: [
            "Acné activo severo",
            "Embarazo o lactancia",
            "Keloides"
        ],
        faqs: [
            {
                pregunta: "¿Qué tipos de cicatrices se pueden tratar?",
                respuesta: "Tratamos cicatrices en hundimiento (atróficas), elevadas (hipertróficas), de caja, onduladas y marcas post-inflamatorias."
            },
            {
                pregunta: "¿Cuántas sesiones se necesitan?",
                respuesta: "Depende de la severidad. Generalmente 4-6 sesiones espaciadas cada 4-6 semanas para resultados significativos."
            },
            {
                pregunta: "¿Hay tiempo de recuperación?",
                respuesta: "Depende del tratamiento. Láser puede tener 2-5 días de enrojecimiento leve. Bioestimulación y peelings tienen recuperación inmediata o 24-48 horas."
            }
        ],
        galeria: [
            "/resultados/cicatrices-acne/1.webp",
            "/resultados/cicatrices-acne/2.webp",
            "/resultados/cicatrices-acne/3.webp",
            "/resultados/cicatrices-acne/4.webp",
            "/resultados/cicatrices-acne/5.webp",
            "/resultados/cicatrices-acne/6.webp",
            "/resultados/cicatrices-acne/7.webp",
        ]
    },
    {
        id: "drenaje-linfatico",
        categoria: "Corporal",
        subcategoria: "Masaje",
        nombre: "Drenaje Linfático Manual y Postoperatorio",
        descripcion: "Drenaje linfático manual en Los Ángeles para retención de líquidos, celulitis y recuperación postoperatoria. Técnica especializada que mejora la circulación linfática, reduce edemas y acelera la recuperación después de cirugías.",
        profesional: "Keren Hapuc Matus / Katalina Neumann",
        valorDesde: 35000,
        valorHasta: null,
        duracion: "60 min",
        tags: ["Drenaje Linfático", "Postoperatorio", "Celulitis", "Los Ángeles"],
        problematicas: ["Retención de líquidos", "Celulitis", "Edema postoperatorio", "Mala circulación"],
        requiereEvaluacion: false,
        slug: "drenaje-linfatico-los-angeles",
        landingPage: true,
        seo: {
            metaTitle: "Drenaje Linfático Los Ángeles | Postoperatorio y Estético | Clínica Cialo",
            metaDescription: "Drenaje linfático manual en Los Ángeles. Tratamiento para retención de líquidos, celulitis y recuperación postoperatoria. Agenda tu sesión hoy.",
            keywords: ["drenaje linfático Los Ángeles", "masaje linfático", "drenaje postoperatorio", "celulitis tratamiento", "retención líquidos Los Ángeles"]
        },
        beneficios: [
            "Reduce retención de líquidos y edemas",
            "Mejora la circulación linfática y sanguínea",
            "Acelera la recuperación postoperatoria",
            "Reduce celulitis y adiposidad localizada",
            "Sensación de piernas ligeras y descansadas"
        ],
        contraindicaciones: [
            "Infecciones activas",
            "Trombosis o tromboflebitis",
            "Insuficiencia cardíaca",
            "Cáncer activo"
        ],
        faqs: [
            {
                pregunta: "¿En qué consiste el drenaje linfático?",
                respuesta: "Es una técnica de masaje suave y rítmica que sigue el recorrido de los vasos linfáticos para estimular el drenaje de líquidos y toxinas acumuladas."
            },
            {
                pregunta: "¿Cuántas sesiones necesito?",
                respuesta: "Para retención de líquidos: 5-10 sesiones. Postoperatorio: 10-15 sesiones según el procedimiento quirúrgico. Celulitis: 10-15 sesiones combinado con otras terapias."
            },
            {
                pregunta: "¿Cuándo puedo comenzar el drenaje postoperatorio?",
                respuesta: "Generalmente se inicia entre el día 3-7 post-cirugía, previa autorización del cirujano. Cada caso es individual según el tipo de cirugía."
            }
        ]
    },

    // ===== Lipoláser / Endoláser =====
    // Precio según evaluación: sin valor publicado, se agenda la Consulta Médica
    // Estética Integral (ver getConsultaEvaluacion, subcategoría "Lipoláser").
    {
        id: "lipolaser-corporal",
        categoria: "Corporal",
        subcategoria: "Lipoláser",
        nombre: "Lipoláser Corporal (Liposucción con Láser)",
        descripcion: "Liposucción asistida con láser para eliminar grasa localizada en abdomen, flancos, espalda, brazos, muslos y rodillas. El láser licúa la grasa antes de aspirarla y estimula la retracción de la piel, con una recuperación más rápida que la liposucción tradicional.",
        profesional: "Dra. Elga Viviana Peña",
        valorDesde: null,
        valorHasta: null,
        duracion: "1 - 3 hrs según zonas",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar",
        tags: ["Lipoláser", "Liposucción", "Grasa Localizada", "Contorno Corporal"],
        problematicas: ["Grasa localizada", "Rollos en abdomen y flancos", "Grasa en brazos y muslos", "Flacidez leve tras bajar de peso"],
        seo: {
            metaTitle: "Lipoláser en Los Ángeles | Liposucción con Láser | Clínica CIALO",
            metaDescription: "Lipoláser en Los Ángeles: liposucción asistida con láser para abdomen, flancos, brazos y muslos. Menos inflamación y retracción de piel. Agenda tu evaluación médica.",
            keywords: [
                "lipolaser los angeles",
                "liposuccion con laser los angeles",
                "liposuccion los angeles",
                "lipolaser abdomen",
                "lipolaser precio",
                "lipo laser biobio",
                "eliminar grasa localizada los angeles"
            ]
        },
        beneficios: [
            "Elimina grasa localizada resistente a dieta y ejercicio",
            "El láser favorece la retracción de la piel tratada",
            "Menor inflamación y hematomas que la liposucción tradicional",
            "Procedimiento ambulatorio",
            "Retorno a actividades habituales en pocos días"
        ],
        contraindicaciones: [
            "Embarazo o lactancia",
            "Trastornos de coagulación o uso de anticoagulantes sin indicación médica",
            "Infección activa en la zona a tratar",
            "Enfermedades descompensadas (diabetes, hipertensión, cardiopatías)",
            "Expectativa de bajar de peso: no es un tratamiento para obesidad"
        ],
        cuidadosPosteriores: [
            "Uso de faja de compresión según indicación médica",
            "Drenaje linfático en las semanas siguientes",
            "Evitar ejercicio intenso y exposición solar en la zona los primeros días",
            "Controles con tu médico tratante"
        ],
        faqs: [
            {
                pregunta: "¿Qué diferencia hay entre lipoláser y liposucción tradicional?",
                respuesta: "En el lipoláser, una fibra láser licúa la grasa antes de aspirarla y calienta la piel desde adentro, lo que favorece su retracción. Suele producir menos inflamación y hematomas, y una recuperación más rápida que la liposucción tradicional."
            },
            {
                pregunta: "¿Cuánto cuesta el lipoláser?",
                respuesta: "El valor depende de las zonas y del volumen de grasa a tratar, por lo que se define en la evaluación médica, donde recibes un presupuesto personalizado."
            },
            {
                pregunta: "¿Cuándo se ven los resultados?",
                respuesta: "Se aprecian cambios desde las primeras semanas, a medida que baja la inflamación. El resultado definitivo y la retracción de la piel se consolidan entre los 3 y 6 meses."
            },
            {
                pregunta: "¿Sirve para bajar de peso?",
                respuesta: "No. El lipoláser es para remodelar zonas con grasa localizada en personas cercanas a su peso ideal. Si buscas bajar de peso, te orientamos con nuestro equipo de nutrición."
            }
        ],
        sinergias: [
            { nombre: "Drenaje Linfático", descripcion: "Acelera la recuperación y reduce la inflamación post procedimiento." },
            { nombre: "Exilis / Scizer", descripcion: "Complementa la reafirmación de la piel en las semanas posteriores." }
        ]
    },
    {
        id: "lipo-lifting",
        categoria: "Corporal",
        subcategoria: "Lipoláser",
        nombre: "Lipo Lifting con Láser",
        descripcion: "Combina la eliminación de grasa localizada con láser y el tensado de la piel en la misma intervención. Indicado cuando, además de grasa, hay flacidez leve a moderada en abdomen, brazos, muslos o rodillas.",
        profesional: "Dra. Elga Viviana Peña",
        valorDesde: null,
        valorHasta: null,
        duracion: "1 - 3 hrs según zonas",
        agendaUrl: "https://reservas.clinios.cl/cialo/reservar",
        tags: ["Lipo Lifting", "Lipoláser", "Flacidez", "Tensado de Piel"],
        problematicas: ["Grasa localizada con flacidez", "Piel suelta tras bajar de peso", "Flacidez en brazos y muslos", "Abdomen flácido"],
        seo: {
            metaTitle: "Lipo Lifting con Láser en Los Ángeles | Grasa y Flacidez | CIALO",
            metaDescription: "Lipo lifting con láser en Los Ángeles: elimina grasa localizada y tensa la piel en un solo procedimiento. Abdomen, brazos y muslos. Agenda tu evaluación médica.",
            keywords: [
                "lipo lifting los angeles",
                "lipolifting laser",
                "lipoláser flacidez",
                "tensado de piel con laser",
                "flacidez brazos tratamiento los angeles",
                "lipo lifting precio"
            ]
        },
        beneficios: [
            "Reduce grasa y mejora la flacidez en un solo procedimiento",
            "Estimula la producción de colágeno en la zona tratada",
            "Alternativa menos invasiva a cirugías de resección de piel en casos leves a moderados",
            "Procedimiento ambulatorio"
        ],
        contraindicaciones: [
            "Embarazo o lactancia",
            "Trastornos de coagulación",
            "Infección activa en la zona a tratar",
            "Flacidez severa con gran exceso de piel (requiere cirugía de resección)"
        ],
        cuidadosPosteriores: [
            "Uso de prenda de compresión según indicación médica",
            "Drenaje linfático en las semanas siguientes",
            "Evitar ejercicio intenso y sol directo en la zona los primeros días",
            "Controles con tu médico tratante"
        ],
        faqs: [
            {
                pregunta: "¿En qué se diferencia del lipoláser corporal?",
                respuesta: "El lipo lifting pone el foco en tensar la piel además de eliminar grasa. Se indica cuando la zona tiene flacidez, por ejemplo después de bajar de peso o en brazos y abdomen."
            },
            {
                pregunta: "¿Cuánto cuesta el lipo lifting?",
                respuesta: "El valor depende de las zonas, la cantidad de grasa y el grado de flacidez, y se define en la evaluación médica con un presupuesto personalizado."
            },
            {
                pregunta: "¿Reemplaza a una abdominoplastia?",
                respuesta: "No en todos los casos. Con flacidez leve a moderada da muy buenos resultados; cuando hay gran exceso de piel, la cirugía de resección sigue siendo la indicación. Lo definimos en la evaluación."
            }
        ],
        sinergias: [
            { nombre: "Drenaje Linfático", descripcion: "Acelera la recuperación y reduce la inflamación." },
            { nombre: "Morpheus8 Corporal", descripcion: "Refuerza el tensado de la piel en las semanas posteriores." }
        ]
    },
    {
        id: "lipopapada-laser",
        categoria: "Facial",
        subcategoria: "Lipoláser",
        nombre: "Lipopapada con Láser",
        descripcion: "Eliminación de la grasa de la papada con láser, que a la vez tensa la piel del cuello y define el ángulo mandibular. Procedimiento ambulatorio con resultados visibles y duraderos en el perfil.",
        profesional: "Dr. Nicolás Laucirica / Dra. Scarlet Novoa / Dr. Luis Pérez Lagos / Dra. Elga Viviana Peña",
        valorDesde: null,
        valorHasta: null,
        duracion: "45 - 90 min",
        tags: ["Papada", "Lipoláser", "Contorno Mandibular", "Perfil"],
        problematicas: ["Papada o doble mentón", "Falta de definición mandibular", "Flacidez leve de cuello", "Grasa submentoniana"],
        seo: {
            metaTitle: "Lipopapada con Láser en Los Ángeles | Eliminar Papada | CIALO",
            metaDescription: "Lipopapada con láser en Los Ángeles: elimina la papada, tensa la piel del cuello y define la mandíbula. Procedimiento ambulatorio. Agenda tu evaluación médica.",
            keywords: [
                "lipopapada los angeles",
                "lipopapada con laser",
                "eliminar papada los angeles",
                "lipolaser papada",
                "doble menton tratamiento",
                "lipopapada precio",
                "definir mandibula los angeles"
            ]
        },
        beneficios: [
            "Elimina la grasa de la papada de forma definitiva",
            "Tensa la piel del cuello",
            "Define el contorno mandibular y mejora el perfil",
            "Procedimiento ambulatorio y de recuperación rápida"
        ],
        contraindicaciones: [
            "Embarazo o lactancia",
            "Trastornos de coagulación",
            "Infección activa en la zona",
            "Papada de origen glandular o muscular (se evalúa otra alternativa)"
        ],
        cuidadosPosteriores: [
            "Uso de mentonera de compresión según indicación médica",
            "Dormir con la cabeza levemente elevada los primeros días",
            "Evitar ejercicio intenso y sol directo en la zona",
            "Controles con tu médico tratante"
        ],
        faqs: [
            {
                pregunta: "¿La papada vuelve después de la lipopapada?",
                respuesta: "Las células de grasa eliminadas no se regeneran. Manteniendo un peso estable, el resultado es duradero."
            },
            {
                pregunta: "¿Cuánto cuesta la lipopapada con láser?",
                respuesta: "El valor se define en la evaluación médica según la cantidad de grasa y el estado de la piel, con un presupuesto personalizado."
            },
            {
                pregunta: "¿Cuánto dura la recuperación?",
                respuesta: "La mayoría de los pacientes vuelve a sus actividades en pocos días. La inflamación disminuye progresivamente y el resultado final se aprecia entre los 3 y 6 meses."
            },
            {
                pregunta: "¿Qué diferencia tiene con la criolipólisis de papada?",
                respuesta: "La criolipólisis no es invasiva y reduce grasa en varias sesiones. La lipopapada con láser elimina más grasa en una sola intervención y además tensa la piel."
            }
        ],
        sinergias: [
            { nombre: "Endoláser Facial", descripcion: "Mejora la definición del óvalo facial junto con la papada." },
            { nombre: "Toxina Botulínica", descripcion: "Relaja las bandas del cuello para un perfil más armónico." }
        ]
    },
    {
        id: "endolaser-facial",
        categoria: "Facial",
        subcategoria: "Lipoláser",
        nombre: "Endoláser Facial",
        descripcion: "Láser subdérmico que, a través de una fibra muy fina, tensa la piel desde adentro y reduce pequeños depósitos de grasa. Redefine el óvalo facial, mejora la flacidez de mejillas, papada y cuello, y estimula colágeno sin cirugía.",
        profesional: "Dr. Nicolás Laucirica / Dra. Scarlet Novoa / Dr. Luis Pérez Lagos / Dra. Elga Viviana Peña",
        valorDesde: null,
        valorHasta: null,
        duracion: "45 - 90 min",
        tags: ["Endoláser", "Flacidez Facial", "Óvalo Facial", "Lifting sin Cirugía"],
        problematicas: ["Flacidez facial", "Pérdida de definición del óvalo", "Papada leve", "Mejillas caídas"],
        seo: {
            metaTitle: "Endoláser Facial en Los Ángeles | Lifting sin Cirugía | CIALO",
            metaDescription: "Endoláser facial en Los Ángeles: tensa la piel desde adentro, redefine el óvalo y mejora la papada sin cirugía. Resultados progresivos. Agenda tu evaluación médica.",
            keywords: [
                "endolaser los angeles",
                "endolaser facial",
                "endolift los angeles",
                "lifting sin cirugia los angeles",
                "flacidez facial tratamiento",
                "endolaser precio",
                "definir ovalo facial"
            ]
        },
        beneficios: [
            "Tensa la piel desde adentro sin cirugía",
            "Redefine el óvalo facial y el ángulo mandibular",
            "Estimula colágeno: el resultado sigue mejorando por meses",
            "Sin cicatrices visibles",
            "Recuperación rápida"
        ],
        contraindicaciones: [
            "Embarazo o lactancia",
            "Trastornos de coagulación",
            "Infección o herida activa en la zona",
            "Flacidez severa con gran exceso de piel (requiere lifting quirúrgico)"
        ],
        cuidadosPosteriores: [
            "Aplicar frío local los primeros días si hay inflamación",
            "Evitar sol directo, sauna y ejercicio intenso la primera semana",
            "Usar protector solar diario",
            "Controles con tu médico tratante"
        ],
        faqs: [
            {
                pregunta: "¿Qué es el endoláser?",
                respuesta: "Es un láser que se aplica bajo la piel mediante una fibra muy fina. El calor tensa los tejidos, reduce pequeños depósitos de grasa y estimula la producción de colágeno."
            },
            {
                pregunta: "¿Cuánto cuesta el endoláser facial?",
                respuesta: "El valor depende de las zonas a tratar y se define en la evaluación médica, con un presupuesto personalizado."
            },
            {
                pregunta: "¿Cuándo se ven los resultados?",
                respuesta: "Hay un efecto tensor desde las primeras semanas y el resultado sigue mejorando durante 3 a 6 meses, a medida que se forma colágeno nuevo."
            },
            {
                pregunta: "¿Es lo mismo que la lipopapada?",
                respuesta: "No. La lipopapada se enfoca en eliminar la grasa de la papada; el endoláser se enfoca en tensar la piel del rostro y el cuello. Muchas veces se combinan."
            }
        ],
        sinergias: [
            { nombre: "Lipopapada con Láser", descripcion: "Elimina la grasa de la papada mientras el endoláser tensa el rostro." },
            { nombre: "Bioestimuladores (Sculptra / Radiesse)", descripcion: "Suman volumen y calidad de piel al efecto tensor." }
        ]
    },
    // ─── Podología Clínica (Claudia Tello Ibarra) ───
    {
        id: "quiropodia",
        categoria: "Podología",
        subcategoria: "Podología Clínica",
        nombre: "Quiropodia",
        descripcion:
            "Atención podológica integral: corte y limado de uñas, eliminación de durezas, callosidades y helomas, con material estéril. Ideal como control periódico y para pacientes con pie diabético.",
        profesional: "Claudia Tello Ibarra",
        valorDesde: 23000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Podología", "Pie Diabético"],
    },
    {
        id: "tratamiento-onicomicosis-podologia",
        categoria: "Podología",
        subcategoria: "Podología Clínica",
        nombre: "Tratamiento Onicomicosis (Podología)",
        descripcion:
            "Tratamiento podológico de hongos en las uñas: desbridamiento de la lámina afectada y aplicación de antifúngicos, con seguimiento personalizado.",
        profesional: "Claudia Tello Ibarra",
        valorDesde: 25000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Podología", "Hongos"],
        problematicas: ["Hongos"],
    },
    {
        id: "curaciones-podologia",
        categoria: "Podología",
        subcategoria: "Podología Clínica",
        nombre: "Curaciones",
        descripcion:
            "Curación de heridas y lesiones del pie en condiciones de esterilidad, incluidas las de pacientes con pie diabético.",
        profesional: "Claudia Tello Ibarra",
        valorDesde: 15000,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Podología", "Pie Diabético"],
    },
    {
        id: "una-incarnada-sin-anestesia",
        categoria: "Podología",
        subcategoria: "Uña Incarnada",
        nombre: "Uña Incarnada sin Anestesia",
        descripcion:
            "Retiro de la espícula de la uña incarnada (onicocriptosis) en casos leves, sin necesidad de anestesia.",
        profesional: "Claudia Tello Ibarra",
        valorDesde: 30000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Podología", "Uña Incarnada"],
    },
    {
        id: "una-incarnada-con-anestesia",
        categoria: "Podología",
        subcategoria: "Uña Incarnada",
        nombre: "Uña Incarnada con Anestesia",
        descripcion:
            "Tratamiento de uña incarnada con anestesia local para casos dolorosos o inflamados. *Valor por borde.*",
        profesional: "Claudia Tello Ibarra",
        valorDesde: 60000,
        valorHasta: null,
        duracion: "60 min",
        tags: ["Podología", "Uña Incarnada"],
    },
    {
        id: "una-incarnada-definitivo",
        categoria: "Podología",
        subcategoria: "Uña Incarnada",
        nombre: "Tratamiento Definitivo Uña Incarnada",
        descripcion:
            "Matricectomía química con técnica fenol alcohol para evitar que la uña vuelva a encarnarse. *Valor por surco.*",
        profesional: "Claudia Tello Ibarra",
        valorDesde: 200000,
        valorHasta: null,
        duracion: "60 min",
        tags: ["Podología", "Uña Incarnada"],
    },
    {
        id: "extraccion-papiloma-plantar",
        categoria: "Podología",
        subcategoria: "Podología Clínica",
        nombre: "Extracción Papiloma Plantar",
        descripcion:
            "Extracción de verruga plantar (papiloma por VPH) en la planta del pie, con anestesia y material estéril.",
        profesional: "Claudia Tello Ibarra",
        valorDesde: 80000,
        valorHasta: null,
        duracion: "60 min",
        tags: ["Podología", "Verrugas"],
    },
    {
        id: "reconstruccion-ungueal-surco",
        categoria: "Podología",
        subcategoria: "Reconstrucción Ungueal",
        nombre: "Reconstrucción Ungueal (por surco)",
        descripcion:
            "Reconstrucción parcial de la uña para proteger el lecho ungueal y guiar su crecimiento. *Valor por surco.*",
        profesional: "Claudia Tello Ibarra",
        valorDesde: 20000,
        valorHasta: null,
        duracion: "30 min",
        tags: ["Podología", "Uñas"],
    },
    {
        id: "reconstruccion-ungueal-completa",
        categoria: "Podología",
        subcategoria: "Reconstrucción Ungueal",
        nombre: "Reconstrucción Ungueal Completa",
        descripcion:
            "Reconstrucción completa de la uña dañada o ausente, con resultado estético y funcional.",
        profesional: "Claudia Tello Ibarra",
        valorDesde: 28000,
        valorHasta: null,
        duracion: "45 min",
        tags: ["Podología", "Uñas"],
    },
];

export const getCategorias = (): string[] => {
    return [...new Set(tratamientosData.map((t) => t.categoria))].sort();
};

export const getTratamientoById = (id: string): Tratamiento | undefined => {
    return tratamientosData.find((t) => t.id === id);
};

export const getTratamientosRelacionados = (tratamiento: Tratamiento, limit: number = 3): Tratamiento[] => {
    return tratamientosData
        .filter((t) => t.id !== tratamiento.id && t.categoria === tratamiento.categoria)
        .slice(0, limit);
};

export const formatPrice = (
    desde: number | null,
    hasta: number | null
): string => {
    if (!desde) return "Evaluación";
    const f = (n: number) => "$" + n.toLocaleString("es-CL");
    if (hasta) return `${f(desde)} - ${f(hasta)}`;
    return f(desde);
};

/**
 * AGENDAS — enlaces de reserva de ClíniOS (Configuración › Reservas online). Los
 * vigentes se pueden ver en https://reservas.clinios.cl/api/publico/cialo/sitio-web.
 * La hora y su pago se resuelven en ClíniOS: este sitio solo enlaza.
 * getAgendaUrl() asigna a cada tratamiento la agenda correcta según su tipo.
 */
const AG = {
    laucirica:    "https://reservas.clinios.cl/cialo/reservar/nicolas-laucirica", // Dr. Nicolás Laucirica
    pena:         "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena", // Dra. Viviana Peña
    kerenMatus:   "https://reservas.clinios.cl/cialo/reservar", // Klga. Keren Matus
    kuncar:       "https://reservas.clinios.cl/cialo/reservar/stefania-kuncar", // Matrona Stefania Kuncar
    contrerasMJ:  "https://reservas.clinios.cl/cialo/reservar/maria-jesus-contreras", // Enf. María Jesús Contreras
    kinesiologia: "https://reservas.clinios.cl/cialo/reservar/kinesiologia", // Kinesiología: drenaje, Emsella y evaluación dermatofuncional
    guillermo:    "https://reservas.clinios.cl/cialo/reservar/guillermo-contreras", // Dr. Guillermo Contreras
    araya:        "https://reservas.clinios.cl/cialo/reservar/javiera-araya", // Dra. Javiera Araya (capilar)
    gonzalez:     "https://reservas.clinios.cl/cialo/reservar/francisca-gonzalez", // Dra. Francisca González (vascular)
    villarroel:   "https://reservas.clinios.cl/cialo/reservar/maria-laura-villarroel", // Dra. María Laura Villarroel (gineco)
    urologia:     "https://reservas.clinios.cl/cialo/reservar/consulta-urologia", // Consulta Urológica (Contreras + Ulloa)
    nutricion:    "https://reservas.clinios.cl/cialo/reservar/nutricion", // Nutrición: la paciente elige evaluación inicial o control
    inbody:       "https://reservas.clinios.cl/cialo/reservar/nutricion", // InBody 970 (dentro de Nutrición)
    calorimetria: "https://reservas.clinios.cl/cialo/reservar/nutricion", // Calorimetría (dentro de Nutrición)
    hydrafacial:  "https://reservas.clinios.cl/cialo/reservar/limpieza-hydrafacial", // Hydrafacial
    limpieza:     "https://reservas.clinios.cl/cialo/reservar/limpieza-facial", // Limpieza facial convencional
    hollywood:    "https://reservas.clinios.cl/cialo/reservar/hollywood-peel", // Hollywood peel
    depilacion:   "https://reservas.clinios.cl/cialo/reservar/depilacion-laser", // Depilación láser: la paciente elige la zona
    estetica:     "https://reservas.clinios.cl/cialo/reservar/consulta-medica-integral", // Consulta Médica Estética Integral
    corporal:     "https://reservas.clinios.cl/cialo/reservar/evaluacion-corporal", // Evaluación Corporal Integral
    completa:     "https://reservas.clinios.cl/cialo/reservar", // Agenda Completa (fallback)
};

// === Agendas combinadas (multi-profesional) ===
// En ClíniOS son los enlaces por categoría: la paciente elige el tratamiento o la
// evaluación y después con quién, entre quienes lo hacen.
const AG_INYECTABLES: string = "https://reservas.clinios.cl/cialo/reservar/estetica-facial";   // Inyectables / Estética facial (Nicolás, Peña, Kiss, Atencio)
const AG_APARATO: string = "https://reservas.clinios.cl/cialo/reservar/estetica-corporal";      // Aparatología corporal (M.J. Contreras, K. Neumann): Exilis, Embody y evaluación corporal
// Si alguna quedara vacía, esos tratamientos van a WhatsApp.
const INYECTABLES: string | null = AG_INYECTABLES || null;
const APARATO: string | null = AG_APARATO || null;
const WSP = null; // depende del caso → derivar a WhatsApp

/**
 * Mapeo explícito por tratamiento (según revisión de la clínica).
 * null = a WhatsApp. Lo que no esté aquí cae a las reglas por tipo.
 */
const AGENDA_POR_ID: Record<string, string | null> = {
    // Facial — profesional único
    "cool-peel": AG.laucirica, "rinomodelacion": AG.laucirica, "labios-ah": AG.laucirica,
    "relleno-ah-pena": AG.laucirica, "borrado-tatuajes": AG.laucirica,
    "toxina-hiperhidrosis": AG.pena, "reseccion-lunares": AG.pena, "eliminacion-verrugas": AG.pena,
    "juvelook": AG.pena, "vitaminas-mesoterapia": AG.pena, "morpheus8-pena": AG.pena,
    "peeling-quimico": AG.kuncar,
    "hollywood-peel": AG.hollywood, "hydrafacial": AG.hydrafacial, "limpieza-facial-manual": AG.limpieza,
    "rosacea-tratamiento": AG.estetica, "melasma-tratamiento": AG.estetica,
    // Facial — depende → WhatsApp
    "radiesse": WSP, "radiesse-pena": WSP, "laser-q-switched": WSP,
    // Facial — INYECTABLES (combinada, por crear)
    "toxina-tercio-superior": INYECTABLES, "toxina-bruxismo": INYECTABLES, "toxina-full-face": INYECTABLES,
    "toxina-terapeutica": INYECTABLES, "toxina-nefertiti": INYECTABLES, "ellanse": INYECTABLES,
    "morpheus8-facial": INYECTABLES, "cicatrices-acne-tratamiento": INYECTABLES,
    "sculptra": INYECTABLES, "sculptra-pena": INYECTABLES,
    // Corporal — profesional único
    "ah-gluteo": AG.pena, "sculptra-corporal": AG.pena, "radiesse-manos": AG.pena,
    "manos-ah-laser": AG.pena, "enzimas-lipoliticas": AG.pena, "exeresis-lipomas": AG.pena,
    "lanluma": AG.pena, "enzimas-pena": AG.pena,
    "blanqueamiento-axilas": AG.kuncar,
    "depilacion-laser": AG.depilacion,
    "onicomicosis-laser-co2": AG.contrerasMJ, "drenaje-linfatico-avanzado": AG.kinesiologia, "drenaje-linfatico": AG.kinesiologia,
    // Corporal — APARATOLOGÍA (combinada, por crear)
    "clatuu-alpha": APARATO, "embody": APARATO, "exilis-corporal": APARATO,
    "scizer": APARATO, "xwave": APARATO, "ultrasonido-corporal": APARATO,
    // Capilar → Dra. Araya
    "consulta-tricologia": AG.araya, "mesoterapia-dutasteride": AG.araya, "injerto-capilar-fue": AG.araya,
    "regenera-activa": AG.araya, "tricopat": AG.araya, "prp-capilar": AG.araya,
    // Urología
    "bioplastia-pene": AG.urologia, "cistoscopia": AG.urologia, "vasectomia-sin-bisturi": AG.guillermo,
    // Ginecoestética (Villarroel; falta sumar a Stefania Kuncar en Reservo)
    "rejuvenecimiento-vaginal": AG.villarroel, "peeling-intimo": AG.villarroel,
    // Vascular → Dra. González
    "escleroterapia": AG.gonzalez, "laser-vascular": AG.gonzalez, "laser-vascular-varices": AG.gonzalez,
    // Lipoláser (Dra. Peña): se evalúa en la consulta médica
    "lipolaser-corporal": AG.estetica, "lipo-lifting": AG.estetica,
    // Nutrición
    "consulta-nutricional": AG.nutricion, "examen-inbody": AG.inbody, "examen-calorimetria": AG.calorimetria,
    "manejo-sobrepeso": AG.pena,
    // Podología (Claudia Tello) — sin agenda en Reservo todavía → WhatsApp
    "quiropodia": WSP, "tratamiento-onicomicosis-podologia": WSP, "curaciones-podologia": WSP,
    "una-incarnada-sin-anestesia": WSP, "una-incarnada-con-anestesia": WSP, "una-incarnada-definitivo": WSP,
    "extraccion-papiloma-plantar": WSP, "reconstruccion-ungueal-surco": WSP, "reconstruccion-ungueal-completa": WSP,
};

/**
 * Agenda de Reservo para un tratamiento: 1) mapeo explícito por id (revisión de
 * la clínica; null = WhatsApp), 2) la propia del tratamiento, 3) reglas por tipo.
 */
export const getAgendaUrl = (t: Tratamiento): string | null => {
    if (Object.prototype.hasOwnProperty.call(AGENDA_POR_ID, t.id)) return AGENDA_POR_ID[t.id];
    if (t.agendaUrl) return t.agendaUrl;
    switch (t.categoria) {
        case "Facial": return AG.estetica;
        case "Corporal": return AG.corporal;
        case "Capilar": return AG.araya;
        case "Urología": return AG.urologia;
        case "Ginecoestética": return AG.villarroel;
        case "Vascular": return AG.gonzalez;
        case "Nutrición": return AG.nutricion;
        default: return AG.completa;
    }
};

/**
 * Mapea la categoría del tratamiento a la URL de consulta/evaluación correspondiente
 */
export const getAgendaUrlByCategoria = (categoria: string, subcategoria?: string): string => {
    const mapa: Record<string, string> = {
        'Facial': '/consultas/consulta-medica-integral',
        'Corporal': '/consultas/evaluacion-corporal',
        'Capilar': '/consultas/consulta-tricologia',
        'Íntimo Femenino': '/consultas/consulta-matrona',
        'Urología': '/consultas/consulta-urologia',
        'Vascular': '/consultas/consulta-flebologia',
    };

    // Caso especial para subcategorías
    if (subcategoria === 'Ginecología' || subcategoria === 'Ginecoestética') {
        return '/consultas/consulta-ginecologia';
    }

    return mapa[categoria] || '/consultas';
};

/**
 * Obtiene la URL de agenda para un tratamiento específico
 * Prioriza agendaUrl del tratamiento, si no usa el mapeo por categoría
 */
export const getTratamientoAgendaUrl = (tratamiento: Tratamiento): string => {
    if (tratamiento.agendaUrl) {
        return tratamiento.agendaUrl;
    }
    return getAgendaUrlByCategoria(tratamiento.categoria, tratamiento.subcategoria);
};

/**
 * Determina si un tratamiento requiere evaluación previa antes de poder comprarlo.
 *
 * Política actual: el pago/agenda directo está habilitado para TODOS los
 * tratamientos de precio fijo (no requieren consulta previa). Solo los
 * tratamientos con precio variable (rango "desde–hasta", valorHasta != null)
 * siguen requiriendo evaluación/cotización, porque no tienen un precio único
 * que cobrar online.
 */
export const tratamientoRequiereEvaluacion = (tratamiento: Tratamiento): boolean => {
    // Sin precio publicado => no hay nada que cobrar online: evaluación previa.
    // (Antes caía al botón de compra con precio $0.)
    if (tratamiento.valorDesde == null) {
        return true;
    }
    // Precio variable (rango) => requiere evaluación/cotización previa
    if (tratamiento.valorHasta !== null) {
        return true;
    }
    // Precio fijo => pago y agenda directo, sin consulta
    return false;
};

/**
 * Obtiene la consulta de evaluación correspondiente para un tratamiento
 */
export const getConsultaEvaluacion = (tratamiento: Tratamiento): { nombre: string; url: string; precio: number } => {
    // Valores reales de cada consulta (ver consultas.ts). precio 0 = gratuita.
    const consultasPorCategoria: Record<string, { nombre: string; url: string; precio: number }> = {
        'Facial': { nombre: 'Evaluación Estética Facial', url: '/consultas/evaluacion-estetica-facial', precio: 30000 },
        'Corporal': { nombre: 'Evaluación Corporal Integral', url: '/consultas/evaluacion-corporal', precio: 0 },
        'Capilar': { nombre: 'Consulta Tricológica', url: '/consultas/consulta-tricologia', precio: 40000 },
        'Ginecoestética': { nombre: 'Control Ginecológico con Matrona', url: '/consultas/consulta-matrona', precio: 30000 },
        'Urología': { nombre: 'Consulta Médica – Urología', url: '/consultas/consulta-urologia', precio: 50000 },
        'Vascular': { nombre: 'Consulta de Flebología', url: '/consultas/consulta-flebologia', precio: 50000 },
        'Nutrición': { nombre: 'Evaluación Nutricional Integral', url: '/consultas/evaluacion-nutricional', precio: 40000 },
    };

    // Lipoláser y endoláser son procedimientos médicos: se evalúan en la consulta
    // médica, no en la evaluación gratuita de kinesiología/estética de su categoría.
    if (tratamiento.subcategoria === 'Lipoláser') {
        return { nombre: 'Consulta Médica Estética Integral', url: '/consultas/consulta-medica-integral', precio: 30000 };
    }

    return consultasPorCategoria[tratamiento.categoria] || {
        nombre: 'Consulta de Evaluación',
        url: '/consultas',
        precio: 0
    };
};
