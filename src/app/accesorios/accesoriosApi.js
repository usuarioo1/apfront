import { apiAccesorios } from "@/utils/api";

export async function getAccesorios(){
    const res = await fetch(apiAccesorios);
    const data = res.json();
    return data.info; //accedo a info que es la categoria superior de la categoria
}

export const getAccesoriosById = async(id) => {
    try {
        const responde = await fetch(`${apiAccesorios}/${id}`);
        const data = await responde.json();

        if (data && data.success && data.info) {
            return data.info;  // Retorna el objeto 'info', que contiene los detalles del anillo
        } else {
            console.error('Accesorio no encontrado en la respuesta');
            return null;
        }
    } catch (error) {
        console.error('Error fetching Accesorio by id:', error);
        return null;
    }
}