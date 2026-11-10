import TreatmentWizard from '@/app/components/evaluator/TreatmentWizard';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata = {
    title: 'Evaluador de Tratamientos | Clínica Cialo',
    description: 'Descubre qué tratamiento es ideal para ti con nuestro evaluador interactivo inteligente. Resultados personalizados en segundos.',
};

export default function EvaluacionTratamientosPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#faf6ef] to-gray-200">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                            Asistente Virtual
                        </span>
                        <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                            Descubre tu Tratamiento Ideal
                        </h1>
                        <p className="text-[#6f6a5c] text-lg max-w-2xl mx-auto">
                            Responde unas breves preguntas y te recomendaremos los procedimientos médicos y estéticos que mejor se adaptan a tus objetivos.
                        </p>
                    </div>

                    <TreatmentWizard />
                </div>
            </main>

            <Footer />
        </div>
    );
}
