// Usar la API interna para no exponer variables de entorno
export async function getCadenas() {
    const res = await fetch('/api/cadenas');
    const data = await res.json();
    if (!data.success && data.error) {
        throw new Error(data.error);
    }
    return data.info;
}

export const getCadenasById = async (id) => {
    try {
        const response = await fetch(`/api/cadenas/${id}`);
        const data = await response.json();
        if (data && data.success && data.info) {
            return data.info;
        } else {
            console.error('Cadena no encontrada en la respuesta');
            return null;
        }
    } catch (error) {
        console.error('Error fetching Cadena by id:', error);
        return null;
    }
};