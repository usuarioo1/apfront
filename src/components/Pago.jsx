import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

const Pago = ({ total }) => {  // Recibe el total como prop
    const [preferenceId, setPreferenceId] = useState(null);

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:5000/create_preference", {
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
        <div>
            <button onClick={handleBuy}>Comprar</button>
            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        </div>
    );
};

export default Pago;
