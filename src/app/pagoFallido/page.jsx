import Link from 'next/link';

export const metadata = {

    title: "Pago Fallido"
}


const ErrorTransaccion = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Transacción Fallida</h1>
                <p className="text-gray-700 mb-6">
                    Hubo un error al procesar su transacción. Por favor, inténtelo de nuevo más tarde o contacte con el soporte si el problema persiste.
                </p>
                <Link href="/">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                        Volver al inicio
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ErrorTransaccion;
