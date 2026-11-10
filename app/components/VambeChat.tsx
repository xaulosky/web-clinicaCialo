'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function VambeChat() {
    const pathname = usePathname();

    // No mostrar en rutas de admin
    const isAdminRoute = pathname?.startsWith('/admin');

    if (isAdminRoute) return null;

    return (
        <>
            <Script id="vambe-config" strategy="lazyOnload">
                {`
                    window.embeddedWebchatConfig = {
                        clientId: "0c06f58f-1595-439c-bf2d-178eee8557b7",
                        channelId: "1173ad70-ae29-4db4-af42-c0757961725e",
                        askForPhoneNumber: true,
                        askForEmail: true,
                        askForName: true,
                        primaryColor: "#25d366",
                        language: "es",
                        xPosition: 20,
                        yPosition: 20,
                        chatWithUsText: "¿Necesitas ayuda?",
                        agentName: "Cialo AI",
                        suggestedQuestions: [
                            "¿Qué tratamientos ofrecen?",
                            "¿Cuáles son los precios?",
                            "¿Cómo puedo agendar una cita?",
                            "¿Dónde están ubicados?"
                        ]
                    };
                `}
            </Script>
            <Script
                src="https://vambeai.com/webchat.js"
                strategy="lazyOnload"
            />
        </>
    );
}
