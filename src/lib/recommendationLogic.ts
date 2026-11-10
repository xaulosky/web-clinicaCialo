import { Tratamiento, tratamientosData } from "@/data/tratamientos";

export type QuestionStep = {
    id: string; // The key to store the answer
    question: string;
    options: { label: string; value: string; nextStep?: string; icon?: string }[];
};

export const getRecommendedTreatments = (answers: Record<string, string>): Tratamiento[] => {
    const { zona, preocupacion, tipo_arruga, zona_grasa, objetivo_capilar, zona_intima } = answers;

    return tratamientosData.filter(t => {
        // 1. Filtro Global por Categoría
        if (zona === 'facial' && t.categoria !== 'Facial') return false;
        if (zona === 'corporal' && t.categoria !== 'Corporal') return false;
        if (zona === 'capilar' && t.categoria !== 'Capilar') return false;
        if (zona === 'intimo' && !['Urología', 'Ginecoestética', 'Vascular'].includes(t.categoria)) return false;

        // 2. Lógica Detallada Facial
        if (zona === 'facial') {
            if (preocupacion === 'arrugas') {
                if (tipo_arruga === 'dinamicas') {
                    // Toxina
                    return t.subcategoria === 'Toxina Botulínica' || t.nombre.includes('Toxina');
                } else if (tipo_arruga === 'estaticas') {
                    // Rellenos, Bioestimuladores
                    return ['Bioestimuladores', 'Ácido Hialurónico'].includes(t.subcategoria);
                }
                // Si no especifica (no debería pasar), mostramos ambos
                return t.subcategoria === 'Toxina Botulínica' || t.subcategoria === 'Bioestimuladores';
            }
            if (preocupacion === 'flacidez') {
                return ['Bioestimuladores', 'Radiofrecuencia'].includes(t.subcategoria) || t.tags.includes('Tensado');
            }
            if (preocupacion === 'perfilado') { // Nariz, Mentón, Labios
                return t.subcategoria === 'Ácido Hialurónico' || t.tags.includes('Perfil');
            }
            if (preocupacion === 'calidad_piel') { // Manchas, poros
                return ['Dermatofuncional', 'Láser'].includes(t.subcategoria);
            }
            if (preocupacion === 'bruxismo') {
                return t.id === 'toxina-bruxismo';
            }
        }

        // 3. Lógica Detallada Corporal
        if (zona === 'corporal') {
            if (preocupacion === 'grasa') {
                if (zona_grasa === 'papada') return t.id === 'clatuu-alpha'; // Clatuu sirve para papada
                if (zona_grasa === 'abdomen_grande') return ['Reductivos'].includes(t.subcategoria);
                return t.subcategoria === 'Reductivos';
            }
            if (preocupacion === 'flacidez') {
                return ['Radiofrecuencia', 'Bioestimuladores'].includes(t.subcategoria);
            }
            if (preocupacion === 'musculo') {
                return t.id === 'embody';
            }
            if (preocupacion === 'celulitis') {
                // Scizer y Morpheus ayudan, Exilis también
                return t.tags.includes('Tensado') || t.subcategoria === 'Reductivos';
            }
        }

        // 4. Lógica Capilar
        if (zona === 'capilar') {
            if (objetivo_capilar === 'caida_inicial') return ['Tratamiento', 'Consulta'].includes(t.subcategoria);
            if (objetivo_capilar === 'calvicie_avanzada') return t.subcategoria === 'Cirugía' || t.subcategoria === 'Regenerativo';
        }

        // 5. Lógica Íntima
        if (zona === 'intimo') {
            if (zona_intima === 'hombre') return t.tags.includes('Masculino');
            if (zona_intima === 'mujer') return t.categoria === 'Ginecoestética';
            if (zona_intima === 'piernas') return t.categoria === 'Vascular';
        }

        return true;
    });
};

/**
 * Retorna la consulta recomendada basada en las respuestas del usuario
 */
export type ConsultaRecomendada = {
    id: string;
    nombre: string;
    descripcion: string;
    agendaUrl: string; // URL de Reservo para incrustar
    urlInterna: string; // URL interna de la página de consulta
};

export const getRecommendedConsultation = (answers: Record<string, string>): ConsultaRecomendada => {
    const { zona, zona_intima } = answers;

    // Mapeo de respuestas a consultas
    const consultasMap: Record<string, ConsultaRecomendada> = {
        facial: {
            id: 'consulta-medica-integral',
            nombre: 'Consulta Médica Estética Integral',
            descripcion: 'Evaluación completa de piel, tejidos y proporciones con diseño de plan personalizado.',
            agendaUrl: 'https://reservas.clinios.cl/cialo/reservar',
            urlInterna: '/consultas/consulta-medica-integral'
        },
        corporal: {
            id: 'evaluacion-corporal',
            nombre: 'Evaluación Corporal Integral',
            descripcion: 'Diagnóstico de adiposidad, flacidez, celulitis con tecnologías avanzadas.',
            agendaUrl: 'https://reservas.clinios.cl/cialo/reservar',
            urlInterna: '/consultas/evaluacion-corporal'
        },
        capilar: {
            id: 'consulta-tricologia',
            nombre: 'Consulta Médica – Tricología',
            descripcion: 'Evaluación del cuero cabelludo con tricoscopio para diagnóstico de alopecias.',
            agendaUrl: 'https://reservas.clinios.cl/cialo/reservar',
            urlInterna: '/consultas/consulta-tricologia'
        },
        intimo_hombre: {
            id: 'consulta-urologia',
            nombre: 'Consulta Médica – Urología',
            descripcion: 'Evaluación urológica integral y salud sexual masculina.',
            agendaUrl: 'https://reservas.clinios.cl/cialo/reservar',
            urlInterna: '/consultas/consulta-urologia'
        },
        intimo_mujer: {
            id: 'consulta-matrona',
            nombre: 'Control Ginecológico con Matrona',
            descripcion: 'Atención en salud sexual, anticonceptivos y ginecoestética.',
            agendaUrl: 'https://reservas.clinios.cl/cialo/reservar',
            urlInterna: '/consultas/consulta-matrona'
        },
        intimo_piernas: {
            id: 'consulta-flebologia',
            nombre: 'Consulta Médica – Flebología',
            descripcion: 'Evaluación de patologías venosas con Ecografía Doppler.',
            agendaUrl: 'https://reservas.clinios.cl/cialo/reservar',
            urlInterna: '/consultas/consulta-flebologia'
        }
    };

    // Lógica de selección
    if (zona === 'intimo') {
        if (zona_intima === 'hombre') return consultasMap.intimo_hombre;
        if (zona_intima === 'mujer') return consultasMap.intimo_mujer;
        if (zona_intima === 'piernas') return consultasMap.intimo_piernas;
    }

    // Default por zona principal
    return consultasMap[zona] || consultasMap.facial;
};

export const STEPS: Record<string, QuestionStep> = {
    start: {
        id: 'zona',
        question: '¿Qué zona te gustaría mejorar hoy?',
        options: [
            {
                label: 'Rostro', value: 'facial', nextStep: 'facial_concern',
                icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            },
            {
                label: 'Cuerpo', value: 'corporal', nextStep: 'body_concern',
                icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            },
            {
                label: 'Cabello', value: 'capilar', nextStep: 'hair_concern',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z'
            },
            {
                label: 'Zona Íntima / Salud', value: 'intimo', nextStep: 'intimo_concern',
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            },
        ]
    },
    // --- RAMA FACIAL ---
    facial_concern: {
        id: 'preocupacion',
        question: '¿Cuál es tu principal inquietud facial?',
        options: [
            { label: 'Arrugas y Envejecimiento', value: 'arrugas', nextStep: 'facial_wrinkle_type', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Flacidez y Descolgamiento', value: 'flacidez', nextStep: 'results', icon: 'M5 11l7-7 7 7M5 19l7-7 7 7' },
            { label: 'Definición (Nariz, Labios, Mentón)', value: 'perfilado', nextStep: 'results', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
            { label: 'Calidad de Piel (Manchas, Poros)', value: 'calidad_piel', nextStep: 'results', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
            { label: 'Rostro Ancho / Bruxismo', value: 'bruxismo', nextStep: 'results', icon: 'M4 8V6a6 6 0 1112 0v2H4z' },
        ]
    },
    facial_wrinkle_type: {
        id: 'tipo_arruga',
        question: '¿Cuándo notas más estas arrugas?',
        options: [
            { label: 'Principalmente al gesticular (frente, ojos)', value: 'dinamicas', nextStep: 'results', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Están siempre presentes (surcos, caida)', value: 'estaticas', nextStep: 'results', icon: 'M19 14l-7 7m0 0l-7-7m7 7V3' }
        ]
    },

    // --- RAMA CORPORAL ---
    body_concern: {
        id: 'preocupacion',
        question: '¿Qué objetivo corporal persigues?',
        options: [
            { label: 'Eliminar Grasa Localizada', value: 'grasa', nextStep: 'body_fat_area', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
            { label: 'Tratar Flacidez de Piel', value: 'flacidez', nextStep: 'results', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
            { label: 'Tonificar y Marcar Músculo', value: 'musculo', nextStep: 'results', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { label: 'Depilación Definitiva', value: 'depilacion', nextStep: 'results', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
        ]
    },
    body_fat_area: {
        id: 'zona_grasa',
        question: '¿Cuál es la zona que más te molesta?',
        options: [
            { label: 'Abdomen, Espalda o Muslos', value: 'abdomen_grande', nextStep: 'results', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            { label: 'Papada (Grasa bajo el mentón)', value: 'papada', nextStep: 'results', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
        ]
    },

    // --- RAMA CAPILAR ---
    hair_concern: {
        id: 'objetivo_capilar',
        question: 'Describe la situación de tu cabello',
        options: [
            { label: 'Caída reciente / Debilitamiento', value: 'caida_inicial', nextStep: 'results', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
            { label: 'Alopecia Avanzada / Zonas calvas', value: 'calvicie_avanzada', nextStep: 'results', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
        ]
    },

    // --- RAMA ÍNTIMA ---
    intimo_concern: {
        id: 'zona_intima',
        question: 'Selecciona el tratamiento específico',
        options: [
            { label: 'Estética Peneana (Hombre)', value: 'hombre', nextStep: 'results', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            { label: 'Estética Vaginal / Láser', value: 'mujer', nextStep: 'results', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
            { label: 'Várices en Piernas', value: 'piernas', nextStep: 'results', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        ]
    }
};
