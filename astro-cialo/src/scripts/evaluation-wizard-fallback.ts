import { STEPS, getRecommendedConsultation, getRecommendedTreatments } from "@/lib/recommendationLogic";
import { formatPrice } from "@/data/tratamientos";

type Answers = Record<string, string>;

const isEvaluationPage = () => window.location.pathname.startsWith("/evaluacion-tratamientos");

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const optionIcon = (path?: string) =>
  path
    ? `
      <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:scale-110 group-hover:border-[#d4c1a0]/30 transition-all duration-300 relative z-10">
        <svg class="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-[#d4c1a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="${escapeHtml(path)}"></path>
        </svg>
      </div>
    `
    : "";

const findWizardRoot = () => {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>("main .shadow-2xl, main .max-w-6xl"));

  return candidates.find((element) => {
    const text = element.textContent ?? "";
    return (
      text.includes("Paso 1") ||
      text.includes("Rostro") ||
      text.includes("Tu Plan Personalizado") ||
      text.includes("Descubre tu Tratamiento Ideal")
    );
  });
};

const renderStep = (stepId: string, history: string[]) => {
  const step = STEPS[stepId];
  const currentStepIndex = history.length;
  const progressPercentage = Math.min((currentStepIndex / 4) * 100, 100);

  return `
    <div data-cialo-evaluator="true" data-step="${escapeHtml(stepId)}" class="bg-white p-5 md:p-12 rounded-lg shadow-2xl max-w-3xl mx-auto min-h-[450px] flex flex-col relative overflow-hidden transition-all">
      <div class="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
        <div class="h-full bg-gradient-to-r from-[#d4c1a0] to-[#eaddcf] transition-all duration-700 ease-out" style="width: ${progressPercentage}%"></div>
      </div>

      <div class="mb-2 flex justify-between items-center text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest mt-2">
        <span>Paso ${currentStepIndex}</span>
        ${
          currentStepIndex > 1
            ? `<button type="button" data-cialo-evaluator-back="true" class="hover:text-[#1d1d1d] transition-colors flex items-center gap-1">← Volver</button>`
            : ""
        }
      </div>

      <div class="animate-slide-up flex-grow flex flex-col justify-center py-2 md:py-4">
        <h2 class="text-xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1d1d1d] mb-6 md:mb-10 text-center leading-snug">
          ${escapeHtml(step.question)}
        </h2>

        <div class="grid grid-cols-2 gap-3 md:gap-4">
          ${step.options
            .map(
              (option) => `
                <button
                  type="button"
                  data-cialo-evaluator-option="true"
                  data-value="${escapeHtml(option.value)}"
                  data-next-step="${escapeHtml(option.nextStep ?? "results")}"
                  class="w-full text-left p-3 md:p-6 border border-gray-200 rounded-xl hover:border-[#d4c1a0] hover:bg-[#faf7f2] hover:shadow-lg transition-all group flex flex-col items-center justify-center gap-2 md:gap-4 text-center h-full min-h-[120px] md:min-h-[160px] relative overflow-hidden"
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  ${optionIcon(option.icon)}
                  <span class="font-medium text-sm md:text-lg text-[#4f4f51] group-hover:text-[#1d1d1d] relative z-10 leading-tight">${escapeHtml(option.label)}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
};

const treatmentUrl = (treatment: { id: string; slug?: string }) =>
  treatment.slug ? `/${treatment.slug}/` : `/tratamientos/${treatment.id}/`;

const renderResults = (answers: Answers) => {
  const recommendations = getRecommendedTreatments(answers);
  const recommendedConsultation = getRecommendedConsultation(answers);

  return `
    <div data-cialo-evaluator="true" data-results="true" class="animate-fade-in max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <span class="text-[#d4c1a0] uppercase tracking-widest text-xs font-bold mb-2 block">Evaluación Completada</span>
        <h2 class="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-[#1d1d1d] mb-4">Tu Plan Personalizado</h2>
      </div>

      ${
        recommendations.length > 0
          ? `
            <div class="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-100">
              <h3 class="text-lg font-bold text-[#1d1d1d] mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-[#d4c1a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Tratamientos Recomendados
              </h3>
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${recommendations
                  .slice(0, 6)
                  .map(
                    (treatment) => `
                      <a href="${escapeHtml(treatmentUrl(treatment))}" class="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:border-[#d4c1a0] hover:bg-[#faf7f2] transition-all group">
                        <div class="w-10 h-10 rounded-full bg-[#f5f5f5] group-hover:bg-[#d4c1a0]/20 flex items-center justify-center flex-shrink-0">
                          <svg class="w-5 h-5 text-gray-400 group-hover:text-[#d4c1a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                          </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-[#1d1d1d] group-hover:text-[#d4c1a0] truncate">${escapeHtml(treatment.nombre)}</p>
                          <p class="text-xs text-gray-400">${escapeHtml(formatPrice(treatment.valorDesde, null))}</p>
                        </div>
                        <svg class="w-4 h-4 text-gray-300 group-hover:text-[#d4c1a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    `
                  )
                  .join("")}
              </div>
            </div>
          `
          : ""
      }

      <div class="bg-gradient-to-br from-[#1d1d1d] to-[#2d2d2d] rounded-lg shadow-2xl overflow-hidden">
        <div class="p-6 md:p-8 text-center border-b border-white/10">
          <span class="inline-block bg-[#d4c1a0] text-[#1d1d1d] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Tu Siguiente Paso</span>
          <h3 class="text-xl md:text-2xl font-[family-name:var(--font-italiana)] text-white mb-2">${escapeHtml(recommendedConsultation.nombre)}</h3>
          <p class="text-white/70 text-sm max-w-lg mx-auto">${escapeHtml(recommendedConsultation.descripcion)}</p>
        </div>

        <div class="bg-white">
          <iframe
            src="${escapeHtml(recommendedConsultation.agendaUrl)}"
            class="w-full h-[600px] md:h-[700px] border-0"
            title="Agendar ${escapeHtml(recommendedConsultation.nombre)}"
            allow="payment"
          ></iframe>
        </div>
      </div>

      <div class="flex justify-center gap-4 mt-8">
        <button type="button" data-cialo-evaluator-back="true" class="text-gray-400 text-sm hover:text-gray-600 underline">Volver atrás</button>
        <button type="button" data-cialo-evaluator-reset="true" class="text-[#d4c1a0] text-sm font-medium hover:underline flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Empezar de nuevo
        </button>
      </div>
    </div>
  `;
};

const installFallback = () => {
  let history = ["start"];
  let answers: Answers = {};
  let managedRoot: HTMLElement | null = null;

  const replaceWizard = (html: string) => {
    const root = managedRoot ?? findWizardRoot();
    if (!root) return;

    root.outerHTML = html;
    managedRoot = document.querySelector<HTMLElement>("[data-cialo-evaluator='true']");
    managedRoot?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const startManaging = () => {
    if (!managedRoot) {
      managedRoot = findWizardRoot() ?? null;
    }
  };

  document.addEventListener(
    "click",
    (event) => {
      startManaging();
      if (!managedRoot) return;

      const button = (event.target as HTMLElement | null)?.closest("button");
      if (!button || !managedRoot.contains(button)) return;

      const step = STEPS[history[history.length - 1]];
      const text = (button.textContent ?? "").replace(/\s+/g, " ").trim();
      const option =
        step.options.find((item) => item.label === text || text.includes(item.label)) ??
        undefined;

      if (!option && !button.hasAttribute("data-cialo-evaluator-back") && !button.hasAttribute("data-cialo-evaluator-reset")) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (button.hasAttribute("data-cialo-evaluator-reset")) {
        history = ["start"];
        answers = {};
        replaceWizard(renderStep("start", history));
        return;
      }

      if (button.hasAttribute("data-cialo-evaluator-back")) {
        if (history.length > 1) {
          history = history.slice(0, -1);
          replaceWizard(renderStep(history[history.length - 1], history));
        }
        return;
      }

      if (!option) return;

      answers = {
        ...answers,
        [step.id]: option.value
      };

      if (option.nextStep === "results" || !option.nextStep) {
        replaceWizard(renderResults(answers));
        return;
      }

      history = [...history, option.nextStep];
      replaceWizard(renderStep(option.nextStep, history));
    },
    true
  );
};

if (isEvaluationPage()) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installFallback, { once: true });
  } else {
    installFallback();
  }
}
