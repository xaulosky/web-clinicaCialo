// FAQs estructuradas por tratamiento para SEO y componentes
// Cada tratamiento puede tener múltiples FAQs para rich snippets

export interface FAQ {
    pregunta: string;
    respuesta: string;
}

export interface TratamientoFAQs {
    tratamientoId: string;
    tratamientoNombre: string;
    faqs: FAQ[];
}

export const faqsTratamientos: TratamientoFAQs[] = [
    {
        tratamientoId: "toxina-tercio-superior",
        tratamientoNombre: "Toxina Botulínica Tercio Superior",
        faqs: [
            {
                pregunta: "¿Cuánto dura el efecto del Botox en el tercio superior?",
                respuesta: "Los resultados duran entre 3 a 6 meses, dependiendo de tu metabolismo, fuerza muscular y grado de gesticulación. Con aplicaciones regulares, la duración tiende a prolongarse."
            },
            {
                pregunta: "¿Cuándo veo los resultados de la toxina botulínica?",
                respuesta: "El efecto comienza a notarse entre 3-5 días y alcanza su máximo resultado a los 10-14 días. Incluimos un control a los 15 días para evaluar y realizar retoques si es necesario."
            },
            {
                pregunta: "¿Puedo quedar con cara congelada?",
                respuesta: "No. En Clínica Cialo priorizamos resultados naturales. Técnicas modernas permiten relajar arrugas manteniendo la expresividad facial. Solo tratamos lo necesario."
            },
            {
                pregunta: "¿El procedimiento duele?",
                respuesta: "Las molestias son mínimas. Usamos agujas ultrafinas y la mayoría de pacientes describe la sensación como un pequeño pinchazo. El procedimiento dura solo 15-20 minutos."
            },
            {
                pregunta: "¿A qué edad puedo empezar con Botox?",
                respuesta: "Se puede usar como tratamiento preventivo desde los 25-30 años, cuando empiezan a aparecer las primeras líneas de expresión. Prevenir es más efectivo que corregir."
            }
        ]
    },
    {
        tratamientoId: "relleno-labios",
        tratamientoNombre: "Relleno de Labios",
        faqs: [
            {
                pregunta: "¿Cuánto dura el relleno de labios?",
                respuesta: "El ácido hialurónico en labios dura entre 6-12 meses dependiendo del metabolismo y la cantidad aplicada. Se puede hacer retoques para mantener el resultado."
            },
            {
                pregunta: "¿El relleno de labios duele?",
                respuesta: "Aplicamos anestesia tópica antes del procedimiento. La mayoría de pacientes describe solo presión leve. Además, muchos rellenos contienen lidocaína integrada."
            },
            {
                pregunta: "¿Puedo quedar con labios muy grandes?",
                respuesta: "Nuestro enfoque es naturalidad. La cantidad de producto se decide contigo en la evaluación. Se puede agregar gradualmente en varias sesiones si lo deseas."
            },
            {
                pregunta: "¿Qué cuidados debo tener después?",
                respuesta: "Evitar ejercicio intenso 24h, no presionar los labios, no exponerse al sol directo. La hinchazón inicial es normal y baja en 2-3 días."
            }
        ]
    },
    {
        tratamientoId: "sculptra",
        tratamientoNombre: "Sculptra",
        faqs: [
            {
                pregunta: "¿Cómo funciona Sculptra?",
                respuesta: "Sculptra contiene ácido poli-L-láctico (PLLA) que estimula al cuerpo a producir su propio colágeno. Los resultados son graduales y naturales, durando hasta 2 años."
            },
            {
                pregunta: "¿Cuántas sesiones de Sculptra necesito?",
                respuesta: "Generalmente se recomiendan 2-3 sesiones espaciadas cada 4-6 semanas. El número exacto depende del grado de pérdida de volumen."
            },
            {
                pregunta: "¿Cuándo veo resultados con Sculptra?",
                respuesta: "Los resultados son progresivos. Comienzan a verse a las 4-6 semanas y continúan mejorando durante varios meses a medida que se produce nuevo colágeno."
            },
            {
                pregunta: "¿Sculptra es seguro?",
                respuesta: "Sí, Sculptra tiene más de 20 años de uso clínico y está aprobado por FDA. Es biocompatible y se absorbe completamente por el cuerpo."
            }
        ]
    },
    {
        tratamientoId: "depilacion-laser",
        tratamientoNombre: "Depilación Láser",
        faqs: [
            {
                pregunta: "¿Cuántas sesiones de depilación láser necesito?",
                respuesta: "Generalmente se necesitan entre 6 a 8 sesiones para obtener resultados permanentes. El número exacto depende del tipo de piel, color del vello y la zona."
            },
            {
                pregunta: "¿La depilación láser duele?",
                respuesta: "Con Soprano Titanium y su sistema ICE™ de enfriamiento, el tratamiento es prácticamente indoloro. La mayoría describe solo una sensación de calor suave."
            },
            {
                pregunta: "¿Funciona en piel morena o bronceada?",
                respuesta: "Sí. Soprano Titanium con tecnología 3D es seguro para todos los fototipos (I-VI), incluyendo pieles oscuras y bronceadas."
            },
            {
                pregunta: "¿Qué cuidados debo tener?",
                respuesta: "No exponerse al sol 2 semanas antes y después, no depilarse con cera entre sesiones (solo rasurar), usar protector solar en zonas expuestas."
            }
        ]
    },
    {
        tratamientoId: "rinomodelacion",
        tratamientoNombre: "Rinomodelación",
        faqs: [
            {
                pregunta: "¿Cuánto dura la rinomodelación?",
                respuesta: "Los resultados duran entre 12-18 meses con ácido hialurónico. Se puede mantener con retoques anuales."
            },
            {
                pregunta: "¿Es doloroso el procedimiento?",
                respuesta: "Se aplica anestesia tópica antes. La mayoría de pacientes siente solo presión. El procedimiento dura 15-30 minutos."
            },
            {
                pregunta: "¿Qué problemas puede corregir?",
                respuesta: "Puede corregir dorso irregular, punta caída, asimetrías leves y perfil cóncavo. No puede reducir el tamaño de la nariz."
            },
            {
                pregunta: "¿Puedo volver a trabajar después?",
                respuesta: "Sí. No hay tiempo de recuperación significativo. Puede haber hinchazón leve que baja en 1-2 días."
            }
        ]
    },
    {
        tratamientoId: "criolipolisis",
        tratamientoNombre: "Criolipólisis",
        faqs: [
            {
                pregunta: "¿Cómo funciona la criolipólisis?",
                respuesta: "Enfría las células de grasa a una temperatura que las cristaliza y destruye. Tu cuerpo las elimina naturalmente en las semanas siguientes."
            },
            {
                pregunta: "¿Cuánta grasa puedo perder?",
                respuesta: "Cada sesión puede reducir hasta un 25% de la grasa en la zona tratada. Los resultados son permanentes si mantienes un peso estable."
            },
            {
                pregunta: "¿Es segura la criolipólisis?",
                respuesta: "Sí. Clatuu Alpha es una tecnología aprobada y segura. Solo afecta las células de grasa, no otros tejidos."
            },
            {
                pregunta: "¿Cuándo veo los resultados?",
                respuesta: "Los primeros cambios se notan a las 3-4 semanas. Los resultados óptimos se ven a las 8-12 semanas cuando el cuerpo ha eliminado las células."
            }
        ]
    },
    {
        tratamientoId: "escleroterapia",
        tratamientoNombre: "Escleroterapia",
        faqs: [
            {
                pregunta: "¿Qué es la escleroterapia?",
                respuesta: "Es un tratamiento que inyecta una solución esclerosante en arañitas vasculares y várices pequeñas, haciéndolas colapsar y desaparecer gradualmente."
            },
            {
                pregunta: "¿Cuántas sesiones necesito?",
                respuesta: "Depende de la cantidad de vasos a tratar. Generalmente 2-4 sesiones espaciadas cada 3-4 semanas para resultados óptimos."
            },
            {
                pregunta: "¿Es doloroso?",
                respuesta: "Las agujas son muy finas. La mayoría siente solo un pequeño pinchazo. No requiere anestesia."
            },
            {
                pregunta: "¿Cuándo desaparecen las arañitas?",
                respuesta: "Las arañitas comienzan a desvanecerse en 3-6 semanas. Algunos vasos requieren más de una sesión."
            }
        ]
    },
    {
        tratamientoId: "hydrafacial",
        tratamientoNombre: "HydraFacial",
        faqs: [
            {
                pregunta: "¿Qué hace HydraFacial?",
                respuesta: "Es una limpieza facial profunda que en 3 pasos limpia, exfolia, extrae impurezas e hidrata la piel con serums personalizados."
            },
            {
                pregunta: "¿Cada cuánto debo hacerme HydraFacial?",
                respuesta: "Para mantenimiento, una vez al mes es ideal. Antes de eventos especiales, puedes hacerlo hasta 3 días antes."
            },
            {
                pregunta: "¿Puedo maquillarme después?",
                respuesta: "Sí. No hay downtime. Puedes retomar tus actividades y maquillarte inmediatamente si lo deseas."
            },
            {
                pregunta: "¿Es apto para piel sensible?",
                respuesta: "Sí. HydraFacial es muy gentil y los serums se pueden ajustar para pieles sensibles. Es una de las limpiezas más suaves disponibles."
            }
        ]
    }
];

// Helper functions
export const getFAQsByTratamientoId = (id: string): FAQ[] => {
    const tratamiento = faqsTratamientos.find(t => t.tratamientoId === id);
    return tratamiento?.faqs || [];
};

export const getAllFAQs = (): FAQ[] => {
    return faqsTratamientos.flatMap(t => t.faqs);
};

export const getJSONLDFAQPage = (tratamientoId: string) => {
    const faqs = getFAQsByTratamientoId(tratamientoId);
    if (faqs.length === 0) return null;

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.pregunta,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.respuesta
            }
        }))
    };
};
