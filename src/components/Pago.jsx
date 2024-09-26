import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import axios from "axios";


const Pago = () => {

    const [preferenceId, setPreferenceId] = useState(null)

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:5000/create_preference", {
                title: "producto",
                quantity: 1,
                price: 100
            });

            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    }

    const handleBuy = async () => {
        const id = await createPreference();

        if (id) {

            setPreferenceId(id)
        }
    }

    useEffect(() => {
        initMercadoPago( process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY, { locale: 'es-CL' });
    }, []);

    return (
        <div>

            <button onClick={handleBuy}> comprar </button>
            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}

        </div>
    );
}

export default Pago
