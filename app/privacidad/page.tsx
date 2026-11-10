import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Información detallada sobre cómo protegemos y tratamos tus datos personales en Clínica Cialo.",
  alternates: {
    canonical: '/privacidad/',
  },
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-light text-[#1b1a18] mb-2">
            Política de Privacidad
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Última actualización: Enero 2026
          </p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                1. Introducción
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                En Clínica Cialo nos comprometemos a proteger su privacidad y sus datos personales. 
                Esta política describe cómo recopilamos, usamos, almacenamos y protegemos su 
                información personal de acuerdo con la Ley N° 19.628 sobre Protección de la Vida 
                Privada de Chile.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Al utilizar nuestro sitio web y servicios, usted acepta las prácticas descritas 
                en esta política de privacidad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                2. Información que Recopilamos
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Recopilamos los siguientes tipos de información:
              </p>
              
              <h3 className="text-lg font-medium text-[#1b1a18] mb-2 mt-4">
                2.1 Información proporcionada directamente
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Nombre completo y apellidos</li>
                <li>RUT (Rol Único Tributario)</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Información de pago (procesada de forma segura por Transbank)</li>
                <li>Historial médico relevante para los tratamientos</li>
              </ul>

              <h3 className="text-lg font-medium text-[#1b1a18] mb-2 mt-4">
                2.2 Información recopilada automáticamente
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Dirección IP</li>
                <li>Tipo de navegador y dispositivo</li>
                <li>Páginas visitadas y tiempo de navegación</li>
                <li>Cookies y tecnologías similares</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                3. Uso de la Información
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Utilizamos su información personal para:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Procesar y gestionar sus compras de productos y tratamientos</li>
                <li>Coordinar y agendar citas médicas</li>
                <li>Enviar confirmaciones de compra y códigos de retiro</li>
                <li>Proporcionar atención al cliente y responder consultas</li>
                <li>Mantener registros médicos según la normativa sanitaria</li>
                <li>Enviar comunicaciones sobre promociones y novedades (con su consentimiento)</li>
                <li>Mejorar nuestros servicios y experiencia de usuario</li>
                <li>Cumplir con obligaciones legales y tributarias</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                4. Compartición de Información
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                No vendemos ni alquilamos su información personal a terceros. 
                Solo compartimos información en los siguientes casos:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Procesadores de pago:</strong> Transbank procesa las transacciones 
                  de pago de forma segura según sus propias políticas de privacidad.
                </li>
                <li>
                  <strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar 
                  el sitio web (hosting, email), bajo estrictas obligaciones de confidencialidad.
                </li>
                <li>
                  <strong>Requerimientos legales:</strong> Cuando sea requerido por ley, 
                  orden judicial o autoridad competente.
                </li>
                <li>
                  <strong>Profesionales de salud:</strong> En caso de derivaciones médicas 
                  necesarias, con su consentimiento previo.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                5. Seguridad de los Datos
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Implementamos medidas de seguridad técnicas y organizativas para proteger 
                su información personal, incluyendo:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Encriptación SSL/TLS para la transmisión de datos</li>
                <li>Almacenamiento seguro de información sensible</li>
                <li>Acceso restringido a datos personales solo a personal autorizado</li>
                <li>Monitoreo regular de nuestros sistemas de seguridad</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Los pagos son procesados directamente por Transbank, certificado bajo 
                estándares PCI DSS, garantizando la máxima seguridad en transacciones.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                6. Cookies
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Utilizamos cookies para mejorar su experiencia en el sitio web. Las cookies son 
                pequeños archivos de texto que se almacenan en su dispositivo y nos permiten:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Recordar sus preferencias y carrito de compras</li>
                <li>Analizar el tráfico del sitio web</li>
                <li>Personalizar el contenido mostrado</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Puede configurar su navegador para rechazar cookies, aunque esto puede afectar 
                algunas funcionalidades del sitio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                7. Sus Derechos
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                De acuerdo con la ley chilena, usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Acceso:</strong> Solicitar información sobre los datos personales 
                  que tenemos sobre usted.
                </li>
                <li>
                  <strong>Rectificación:</strong> Solicitar la corrección de datos inexactos 
                  o incompletos.
                </li>
                <li>
                  <strong>Eliminación:</strong> Solicitar la eliminación de sus datos personales, 
                  salvo cuando exista obligación legal de conservarlos.
                </li>
                <li>
                  <strong>Oposición:</strong> Oponerse al tratamiento de sus datos para fines 
                  de marketing directo.
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Para ejercer estos derechos, contáctenos a contacto@cialo.cl con una copia de 
                su cédula de identidad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                8. Retención de Datos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Conservamos sus datos personales durante el tiempo necesario para cumplir con 
                los fines descritos en esta política, o según lo requiera la ley. Los registros 
                médicos se conservan por un mínimo de 15 años según la normativa sanitaria chilena.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                9. Menores de Edad
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Nuestro sitio web y servicios están dirigidos a personas mayores de 18 años. 
                No recopilamos intencionalmente información de menores. Los tratamientos para 
                menores de edad requieren autorización y acompañamiento de un tutor legal.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                10. Cambios en la Política
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Podemos actualizar esta política de privacidad periódicamente. Los cambios 
                significativos serán notificados a través de nuestro sitio web o por correo 
                electrónico. Le recomendamos revisar esta página regularmente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                11. Contacto
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Si tiene preguntas sobre esta política de privacidad o sobre el tratamiento 
                de sus datos personales, puede contactarnos:
              </p>
              <ul className="list-none mt-4 text-gray-600 space-y-2">
                <li>📧 Email: contacto@cialo.cl</li>
                <li>📞 Teléfono: +56 9 8202 8473</li>
                <li>📍 Dirección: Bulnes 220, Of. 509, Los Ángeles, Chile</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
