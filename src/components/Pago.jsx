import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { apiCreatePreference } from "@/utils/api";

const Pago = ({ total }) => {  // Recibe el total como prop
    const [preferenceId, setPreferenceId] = useState(null);

    const createPreference = async () => {
        try {
            const response = await axios.post(apiCreatePreference, {
                title: "Productos del carrito",
                quantity: 1,
                price: total  // Usa el total del carrito en lugar de un valor fijo
            });

            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuy = async () => {
        const id = await createPreference();

        if (id) {
            setPreferenceId(id);
        }
    };

    useEffect(() => {
        initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY, { locale: 'es-CL' });
    }, []);

    return (
        <div className="flex flex-col items-center">
            <button className="btn btn-wide text-white" onClick={handleBuy}>Pagar</button>
            {preferenceId && (
                <div className="mt-4"> {/* Añadido un margen superior para separación */}
                    <Wallet initialization={{ preferenceId: preferenceId }} />
                </div>
            )}
        </div>
    );
};

export default Pago;
