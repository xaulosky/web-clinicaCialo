import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Pagos y Devoluciones",
  description: "Conoce nuestras políticas de pago, procesos de compra y condiciones de reembolso en Clínica Cialo.",
  alternates: {
    canonical: '/politica-pagos/',
  },
};

export default function PoliticaPagosPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-light text-[#1b1a18] mb-2">
            Política de Pagos y Devoluciones
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Última actualización: Noviembre 2026
          </p>

          <div className="prose prose-gray max-w-none">
            {/* Métodos de Pago */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                1. Métodos de Pago
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Clínica Cialo acepta los siguientes métodos de pago para compras en línea:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-medium text-[#1b1a18] mb-3">
                  💳 Webpay Plus (Transbank)
                </h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Tarjetas de crédito (Visa, Mastercard, American Express, Diners Club)</li>
                  <li>Tarjetas de débito (Redcompra)</li>
                  <li>Tarjetas de casas comerciales habilitadas</li>
                </ul>
                <p className="text-sm text-gray-500 mt-4">
                  Todas las transacciones son procesadas de forma segura por Transbank, 
                  certificado bajo estándares PCI DSS.
                </p>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Los precios están expresados en pesos chilenos (CLP) e incluyen IVA cuando corresponda.
              </p>
            </section>

            {/* Proceso de Compra */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                2. Proceso de Compra
              </h2>
              <ol className="list-decimal pl-6 text-gray-600 space-y-3">
                <li>Agregue los productos o tratamientos deseados al carrito de compras.</li>
                <li>Complete el formulario con sus datos personales.</li>
                <li>Revise el resumen de su pedido y el total a pagar.</li>
                <li>Será redirigido a Webpay para completar el pago de forma segura.</li>
                <li>Una vez aprobado el pago, recibirá un correo de confirmación con los detalles de su compra.</li>
              </ol>
            </section>

            {/* Confirmación de Compra */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                3. Confirmación de Compra
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tras completar su compra exitosamente, recibirá un correo electrónico con:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Número de orden</li>
                <li>Detalle de los productos y/o tratamientos adquiridos</li>
                <li>Código de retiro (para productos)</li>
                <li>Instrucciones para agendar citas (para tratamientos)</li>
                <li>Términos y condiciones aplicables</li>
              </ul>
            </section>

            {/* Política de Productos */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                4. Productos - Retiro y Devoluciones
              </h2>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                <h3 className="text-green-800 font-medium mb-2">📦 Retiro en Tienda</h3>
                <p className="text-green-700 text-sm">
                  Los productos se retiran exclusivamente en Clínica Cialo, Bulnes 220, Of. 509, Los Ángeles.
                </p>
              </div>

              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>
                  <strong>Plazo de retiro:</strong> 30 días desde la fecha de compra.
                </li>
                <li>
                  <strong>Requisitos:</strong> Presentar código de retiro y cédula de identidad.
                </li>
                <li>
                  <strong>Horario:</strong> Lunes a Viernes de 8:30 a 20:00 hrs.
                </li>
              </ul>

              <h3 className="text-lg font-medium text-[#1b1a18] mb-3 mt-6">
                Devoluciones de Productos
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Productos sellados:</strong> Se aceptan devoluciones dentro de los 10 días 
                  siguientes al retiro, siempre que el producto esté sellado y en perfectas condiciones.
                </li>
                <li>
                  <strong>Productos abiertos:</strong> No se aceptan devoluciones de productos 
                  dermocosméticos que hayan sido abiertos o usados, por razones de higiene y seguridad.
                </li>
                <li>
                  <strong>Productos defectuosos:</strong> Si recibe un producto defectuoso o dañado, 
                  contáctenos dentro de 48 horas para gestionar el cambio.
                </li>
              </ul>
            </section>

            {/* Política de Tratamientos */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                5. Tratamientos - Política de Reembolso
              </h2>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                <h3 className="text-amber-800 font-medium mb-2">⚠️ Información Importante</h3>
                <p className="text-amber-700 text-sm">
                  Esta política aplica a todas las consultas, tratamientos, sesiones y planes pagados en
                  Clínica Cialo, con cualquier medio de pago (tarjeta de débito o crédito, transferencia o
                  efectivo), y se informa antes de cada pago.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-200 mt-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 px-4 py-3 text-left text-[#1b1a18]">Situación</th>
                      <th className="border border-gray-200 px-4 py-3 text-left text-[#1b1a18]">Reembolso</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">
                        La clínica cancela o cambia tu hora, el profesional no está disponible, hubo un
                        cobro duplicado o erróneo, o la prestación no se realizó
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">
                        100% del valor pagado
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">
                        Retracto: pagaste por internet, link de pago o teléfono y te arrepientes dentro de
                        10 días corridos, sin haber usado el servicio
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">
                        100% del valor pagado
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">
                        Cancelas con al menos 24 horas de anticipación
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">
                        Reagendamiento sin costo, o devolución del 100% descontando solo la comisión del medio de pago*
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">
                        Cancelas con menos de 24 horas de anticipación
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-amber-600">
                        50% del valor de esa sesión
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">
                        No asistes sin aviso
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-red-600">
                        Sin reembolso de esa sesión
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3">
                        Plan de sesiones parcialmente usado
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-green-600">
                        Sesiones no realizadas, al valor del plan, descontando la comisión del medio de pago*
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">
                        Tratamiento vencido (más de 90 días sin agendar)
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-red-600">
                        Sin reembolso
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 mt-6">
                <h3 className="text-purple-800 font-medium mb-2">* Comisión del medio de pago</h3>
                <p className="text-purple-700 text-sm mb-3">
                  Solo se descuenta si pagaste con tarjeta y la devolución se hace por transferencia,
                  porque Transbank no devuelve la comisión que cobró. Es el porcentaje que Transbank aplica
                  a tu tarjeta (débito o crédito) más su IVA, calculado sobre el monto devuelto y redondeado
                  al peso. Nunca se descuentan impuestos de la clínica ni costos de transferencia.
                </p>
                <p className="text-purple-700 text-sm">
                  Si la transacción todavía puede anularse en Transbank, se anula y el dinero vuelve
                  completo a tu misma tarjeta, sin descuento.
                </p>
              </div>
            </section>

            {/* Proceso de Reembolso */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                6. Proceso de Reembolso
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Para solicitar un reembolso:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-4">
                <li>
                  Escríbanos a contacto@cialo.cl o al WhatsApp +56 9 8202 8473 indicando nombre, RUT,
                  fecha y monto del pago (o número de orden) y el motivo de la solicitud.
                </li>
                <li>Si corresponde devolución por transferencia, incluya los datos bancarios del titular del pago.</li>
                <li>Nuestro equipo evaluará su solicitud dentro de 48 horas hábiles.</li>
                <li>
                  De ser aprobada, la devolución se realiza dentro de 10 días corridos y le enviamos el
                  comprobante con el detalle del cálculo (monto pagado, descuento si aplica y monto devuelto).
                </li>
              </ol>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="text-blue-800 font-medium mb-2">💳 Método de Reembolso</h3>
                <p className="text-blue-700 text-sm">
                  Si pagó con tarjeta y la transacción aún puede anularse, el dinero vuelve a la misma tarjeta;
                  el tiempo de acreditación depende del banco emisor. En los demás casos (pagos por
                  transferencia o efectivo, o tarjetas fuera del plazo de anulación) se devuelve por
                  transferencia a la cuenta del titular del pago.
                </p>
              </div>
            </section>

            {/* Problemas con el Pago */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                7. Problemas con el Pago
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Si experimenta problemas durante el proceso de pago:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Verifique que los datos de su tarjeta estén correctos.</li>
                <li>Asegúrese de que su tarjeta tenga fondos disponibles o cupo suficiente.</li>
                <li>Compruebe que su tarjeta esté habilitada para compras en línea.</li>
                <li>Intente con otro navegador o dispositivo.</li>
                <li>Si el problema persiste, contacte a su banco o a nuestro equipo de soporte.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                En caso de que el pago sea rechazado y posteriormente se descuente de su cuenta, 
                el reverso se realizará automáticamente por Transbank en un plazo de 24-72 horas.
              </p>
            </section>

            {/* Facturación */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                8. Facturación
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Todas las compras incluyen boleta electrónica enviada al correo del comprador. 
                Si requiere factura:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Solicítela antes de completar el pago indicando los datos de facturación.</li>
                <li>Proporcione RUT de empresa, razón social, giro y dirección.</li>
                <li>La factura será enviada por correo electrónico.</li>
              </ul>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-xl font-semibold text-[#1b1a18] mb-4">
                9. Contacto
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Para consultas sobre pagos, reembolsos o cualquier aspecto de esta política:
              </p>
              <ul className="list-none mt-4 text-gray-600 space-y-2">
                <li>📧 Email: contacto@cialo.cl</li>
                <li>📞 Teléfono: +56 9 8202 8473</li>
                <li>💬 WhatsApp: +56 9 8202 8473</li>
                <li>📍 Dirección: Bulnes 220, Of. 509, Los Ángeles, Chile</li>
              </ul>
              <p className="text-gray-500 text-sm mt-4">
                Horario de atención: Lunes a Viernes de 8:30 a 20:00 hrs.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
