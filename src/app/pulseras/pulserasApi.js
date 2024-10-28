import { apiPulseras } from "@/utils/api";

export async function getPulseras() {
    const res = await fetch(apiPulseras);
    const data = await res.json();
    return data.info; // Accede a la propiedad "info"
}

// anillosApi.js
export const getPulseraById = async (id) => {
    try {
        const response = await fetch(`${apiPulseras}/${id}`);  // Ajusta la ruta según tu backend
        const data = await response.json();

        // Asegurarse de que la propiedad 'info' existe en el objeto de respuesta
        if (data && data.success && data.info) {
            return data.info;  // Retorna el objeto 'info', que contiene los detalles del anillo
        } else {
            console.error('figura no encontrado en la respuesta');
            return null;
        }
    } catch (error) {
        console.error('Error fetching figura by id:', error);
        return null;
    }
};