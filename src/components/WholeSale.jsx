import React from 'react';

const FranjaInformativa = () => {
    return (
        <div className="bg-white py-4 shadow-md">
            <p className="text-center text-gray-800 font-semibold">
                <span className="block">
                    Los precios por mayor serán aplicados en compras superiores a <span className="text-blue-600">$100.000</span>.
                </span>
                <span className="block mt-2">
                    ¡Y en compras superiores a <span className="text-green-600">$150.000</span> el envío es <span className="text-red-600 font-bold">GRATIS</span>!
                </span>
            </p>
        </div>
    );
};

export default FranjaInformativa;
