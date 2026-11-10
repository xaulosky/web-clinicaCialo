"use client";

import { useState } from "react";

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

const FAQS: FaqItem[] = [
  {
    pregunta: "¿Los tratamientos son seguros?",
    respuesta:
      "Sí. Clínica Cialo cuenta con autorización de la SEREMI de Salud y trabaja únicamente con tecnología certificada (FDA) y un equipo médico colegiado. Cada procedimiento parte de una evaluación clínica para indicar solo lo que tu caso necesita.",
  },
  {
    pregunta: "¿Duele? ¿Necesito tiempo de recuperación?",
    respuesta:
      "La mayoría de nuestros tratamientos son mínimamente invasivos y muy bien tolerados. Cuando corresponde aplicamos anestesia tópica para tu confort, y muchos procedimientos no requieren tiempo de inactividad: puedes retomar tu día de inmediato.",
  },
  {
    pregunta: "¿Tienen financiamiento o pago en cuotas?",
    respuesta:
      "Sí. Ofrecemos financiamiento de hasta 12 cuotas para que accedas a tu tratamiento con comodidad. En tu evaluación te entregamos un presupuesto claro y transparente, sin costos ocultos.",
  },
  {
    pregunta: "¿Necesito una evaluación previa antes de tratarme?",
    respuesta:
      "En la mayoría de los casos sí. La evaluación médica nos permite diseñar un plan a tu medida, anticipar resultados y garantizar tu seguridad. En varios tratamientos, el valor de la evaluación se descuenta del costo total si decides realizarlo.",
  },
  {
    pregunta: "¿Los resultados son naturales?",
    respuesta:
      "Nuestra filosofía es realzar tu belleza sin exageraciones. Trabajamos con protocolos medibles y dosis personalizadas para lograr resultados naturales, armónicos y proporcionados a tus rasgos.",
  },
  {
    pregunta: "¿Cómo agendo mi evaluación?",
    respuesta:
      "Puedes agendar tu evaluación en línea desde el botón \"Agendar mi evaluación\" o escribirnos directamente por WhatsApp. Te confirmamos día y hora a la brevedad y resolvemos todas tus dudas antes de tu visita.",
  },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.respuesta,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ul className="space-y-3">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          const panelId = `home-faq-panel-${i}`;
          const buttonId = `home-faq-button-${i}`;
          return (
            <li
              key={faq.pregunta}
              className="overflow-hidden rounded-2xl border border-ink/10 bg-white transition-colors duration-300 hover:border-gold/50"
            >
              <h3 className="m-0">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-ink transition-colors hover:text-gold-dark"
                >
                  <span>{faq.pregunta}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-gold-dark transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="px-6 pb-5 text-sm leading-relaxed text-olive"
              >
                {faq.respuesta}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
