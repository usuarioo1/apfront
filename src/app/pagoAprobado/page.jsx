import Link from 'next/link';

const ConfirmacionPago = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-green-500 mb-4">Pago Aprobado</h1>
                <p className="text-gray-700 mb-6">
                    Su pedido está en preparación. Recibirá un correo con el código de seguimiento cuando el pedido esté en camino.
                    Muchas Gracias por comprar en Artesanias Pachy.
                </p>
                <Link href="/">
                    <div className="btn btn-wide text-white">
                        Volver al inicio
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ConfirmacionPago;
