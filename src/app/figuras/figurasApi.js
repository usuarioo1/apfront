import { apiFiguras } from "@/utils/api";

export async function getFiguras() {
    const res = await fetch(apiFiguras);
    const data = await res.json();
    return data.info; // Accede a la propiedad "info"
}

// anillosApi.js
export const getFiguraById = async (id) => {
    try {
        const response = await fetch(`${apiFiguras}/${id}`);
        const data = await response.json();

        // Asegúrate de que la propiedad 'info' existe en el objeto de respuesta
        if (data && data.info) {
            return data.info;  // Retorna el objeto 'info', que contiene los detalles de la figura
        } else {
            console.error('Figura no encontrada en la respuesta');
            return null;
        }
    } catch (error) {
        console.error('Error fetching figura by id:', error);
        return null;
    }
};
