import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Consulta los términos y condiciones de uso del sitio web y servicios de Clínica Cialo.",
  alternates: {
    canonical: '/terminos/',
  },
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-light text-[#1b1a18] mb-2">
            Términos y Condiciones
          </h1>


          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                1. Información General
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Estos términos y condiciones rigen el uso del sitio web de Clínica Cialo
                (en adelante &quot;la Clínica&quot;), ubicada en Bulnes 220, Of. 509, Los Ángeles, Chile.
                Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos
                y condiciones, así como a nuestra política de privacidad.
              </p>
              <p className="text-gray-600 leading-relaxed">
                La Clínica se reserva el derecho de modificar estos términos en cualquier momento.
                Las modificaciones entrarán en vigor desde su publicación en el sitio web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                2. Servicios Ofrecidos
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Clínica Cialo ofrece servicios de medicina estética y productos relacionados
                con el cuidado de la piel. Todos los tratamientos son realizados por profesionales
                calificados y certificados.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Los resultados de los tratamientos pueden variar, ya que <strong>cada paciente puede responder de manera individual</strong>. No se garantizan resultados específicos. Antes de cualquier procedimiento, se realizará una evaluación médica para determinar la idoneidad del tratamiento.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                3. Compras en Línea
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Al realizar una compra a través de nuestro sitio web, usted declara que:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Es mayor de 18 años o cuenta con autorización de un tutor legal.</li>
                <li>La información proporcionada es veraz y completa.</li>
                <li>Tiene capacidad legal para celebrar contratos vinculantes.</li>
                <li>Acepta estos términos y condiciones en su totalidad.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Los precios mostrados en el sitio web están expresados en pesos chilenos (CLP)
                e incluyen IVA cuando corresponda. La Clínica se reserva el derecho de modificar
                los precios sin previo aviso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                4. Tratamientos - Términos Específicos
              </h2>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                <p className="text-amber-800 font-medium">Importante</p>
              </div>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Validez:</strong> Los tratamientos adquiridos deben ser agendados y
                  realizados dentro de los 90 días siguientes a la fecha de compra.
                </li>
                <li>
                  <strong>Coordinación de citas:</strong> Es responsabilidad del cliente contactar
                  a la clínica para agendar su cita dentro del plazo establecido.
                </li>
                <li>
                  <strong>Confirmación de citas:</strong> Toda cita debe ser confirmada por el
                  paciente. La clínica lo contactará al menos el día previo a la atención —por
                  WhatsApp y/o llamado telefónico— para confirmar su asistencia. Si el paciente no
                  confirma dentro del plazo indicado, la clínica se reserva el derecho de cancelar
                  la cita y liberar el cupo para otro paciente.
                </li>
                <li>
                  <strong>Cancelación:</strong> Las citas pueden cancelarse o reagendarse con al
                  menos 24 horas de anticipación sin costo adicional.
                </li>
                <li>
                  <strong>Política de reembolso:</strong> Si la clínica cancela la atención o hubo un
                  error en el cobro, se devuelve el 100%. Si el cliente decide no realizarse el
                  tratamiento avisando con al menos 24 horas de anticipación, puede reagendar sin costo
                  o recibir la devolución descontando solo la comisión del medio de pago. Las compras a
                  distancia tienen derecho a retracto dentro de 10 días corridos sin haber usado el
                  servicio. <strong>No se realizan devoluciones de sesiones ya ejecutadas.</strong> El
                  detalle está en la <a href="/politica-pagos/" className="text-[#b8935f] underline">Política de Pagos y Devoluciones</a>.
                </li>
                <li>
                  <strong>Controles:</strong> Los controles posteriores al tratamiento son obligatorios. Es responsabilidad del paciente cancelar el control y reagendarlo lo antes posible presentando justificativo.
                </li>
                <li>
                  <strong>No presentación:</strong> Si el cliente no asiste a su cita sin previo
                  aviso, se considerará esa sesión como utilizada, sin derecho a reembolso. Si cancela
                  con menos de 24 horas de anticipación, se reembolsa el 50% del valor de esa sesión.
                </li>
                <li>
                  <strong>Intransferibilidad:</strong> Los tratamientos son personales e intransferibles.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                5. Productos - Términos Específicos
              </h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Retiro en tienda:</strong> Los productos deben ser retirados en Clínica
                  Cialo dentro de los 30 días siguientes a la compra, presentando el código de
                  retiro enviado por correo electrónico.
                </li>
                <li>
                  <strong>Verificación:</strong> Al momento del retiro, se verificará la identidad
                  del comprador mediante cédula de identidad.
                </li>
                <li>
                  <strong>Productos no retirados:</strong> Pasados los 30 días sin retiro, el
                  cliente deberá contactar a la clínica para coordinar una nueva fecha.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                6. Propiedad Intelectual
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos,
                diseños y software, es propiedad de Clínica Cialo o de sus proveedores de
                contenido y está protegido por las leyes de propiedad intelectual. Queda
                prohibida su reproducción, distribución o modificación sin autorización expresa.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                7. Limitación de Responsabilidad
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Clínica Cialo no será responsable por daños indirectos, incidentales o
                consecuentes que puedan surgir del uso del sitio web o de los servicios
                contratados. La información proporcionada en el sitio web tiene carácter
                informativo y no constituye consejo médico.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                8. Ley Aplicable
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Estos términos y condiciones se rigen por las leyes de la República de Chile.
                Cualquier controversia será sometida a los tribunales ordinarios de la ciudad
                de Los Ángeles, Región del Biobío.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                9. Contacto
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Para consultas sobre estos términos y condiciones, puede contactarnos a través de:
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
