import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Términos y Condiciones - Artesanías Pachy",
  description: "Conoce los términos y condiciones de uso del sitio web de Artesanías Pachy. Información sobre compras, envíos y políticas de la tienda.",
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://www.artesaniaspachy.cl/terminos"
  }
};

const Page = () => {
  return (
    <div className="p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Términos y Condiciones</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Identificación de la Empresa</h2>
          <p>Artesanías Pachy es una empresa chilena dedicada a la creación y venta de joyería artesanal de alta calidad, especializada en piezas de plata y lapislázuli. Para cualquier consulta o contacto, puedes comunicarte a través del formulario disponible en nuestro sitio web: <Link href="/contacto" className="text-blue-600 underline">Contacto</Link>.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Objeto de los Términos y Condiciones</h2>
          <p>Los presentes Términos y Condiciones regulan el acceso y uso del sitio web artesaniaspachy.cl, así como las relaciones comerciales derivadas de la compra de productos a través de este. Al utilizar nuestro sitio web y/o realizar una compra, aceptas estos términos en su totalidad.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Uso del Sitio Web</h2>
          <p>El sitio web de Artesanías Pachy está disponible para cualquier persona que desee explorar o adquirir nuestros productos. No es necesario registrarse ni tener una cuenta para navegar por la página, sin embargo, para realizar una compra, se solicitarán los datos del cliente necesarios para el despacho del pedido.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Propiedad Intelectual</h2>
          <p>Todos los derechos sobre el contenido de la página web, incluidas las imágenes, textos, diseños y productos mostrados, pertenecen a Artesanías Pachy. Las imágenes de nuestros productos son de uso exclusivo para la exhibición en nuestro sitio web y no podrán ser utilizadas con otros fines sin nuestro consentimiento previo y por escrito.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Productos Ofrecidos</h2>
          <p>En Artesanías Pachy ofrecemos piezas artesanales de alta calidad, con un enfoque en el uso de lapislázuli y plata. Cada pieza es elaborada con dedicación, garantizando un producto único y especial para nuestros clientes.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Precios y Disponibilidad</h2>
          <p>Los precios y la disponibilidad de los productos ofrecidos en el sitio web se manejan en tiempo real. Sin embargo, los valores de los artículos pueden estar sujetos a cambios sin previo aviso. En caso de una modificación de precio posterior a la compra, se respetará el valor pagado en el momento de la transacción.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Formas de Pago</h2>
          <p>Aceptamos las siguientes formas de pago:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Transferencias bancarias</li>
            <li>Tarjetas de crédito y débito</li>
            <li>Cuenta de Mercado Pago</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Envíos</h2>
          <p>El costo del envío será asumido por el comprador y se gestionará como <strong>envío por pagar</strong> a través de las empresas de transporte Chilexpress o Starken. Una vez realizada la compra, el comprador recibirá un correo electrónico con la información de seguimiento del envío. Artesanías Pachy no se hace responsable por retrasos o problemas ocasionados por las empresas de transporte.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">9. Devoluciones y Garantía</h2>
          <p>Todos nuestros productos cuentan con una garantía de <strong>3 meses</strong> en caso de defectos de fabricación, como el desprendimiento de una piedra o una desoldadura. Para realizar una devolución, el cliente deberá enviar el producto a la dirección proporcionada por correo electrónico, junto con la boleta de compra o una fotografía de la misma.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">10. Propiedad Intelectual</h2>
          <p>Artesanías Pachy es una marca registrada. Todas las imágenes, logotipos y descripciones de productos mostrados en el sitio web son propiedad exclusiva de Artesanías Pachy y no pueden ser reproducidos, copiados o utilizados sin nuestro consentimiento expreso.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">11. Recolección de Datos Personales</h2>
          <p>La información personal recolectada en el sitio, como nombre, dirección, RUT y correo electrónico, será utilizada exclusivamente para la gestión de envíos y para contactar al comprador en caso de contratiempos relacionados con la compra. Garantizamos que los datos proporcionados serán tratados de manera confidencial y no serán compartidos con terceros sin el consentimiento previo del cliente.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">12. Ley Aplicable y Jurisdicción</h2>
          <p>Estos Términos y Condiciones se rigen por las leyes de la República de Chile. Cualquier conflicto o controversia que surja en relación con el uso del sitio web o la compra de productos se resolverá bajo la jurisdicción de los tribunales competentes de Chile.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">13. Contacto</h2>
          <p>Si necesitas ponerte en contacto con nosotros para cualquier consulta, duda o reclamo, puedes hacerlo a través del formulario disponible en nuestro sitio web <a href="https://www.artesaniaspachy.cl" className="text-blue-600 underline">artesaniaspachy.cl</a>.</p>
        </section>
      </div>
    </div>
  );
}

export default Page;
