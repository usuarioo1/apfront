// Usar la API interna para no exponer variables de entorno
export async function getColgantes() {
    const res = await fetch('/api/colgantes');
    const data = await res.json();
    if (!data.success && data.error) {
        throw new Error(data.error);
    }
    return data.info;
}

export const getColgantesById = async (id) => {
    try {
        const response = await fetch(`/api/colgantes/${id}`);
        const data = await response.json();
        if (data && data.success && data.info) {
            return data.info;
        } else {
            console.error('Colgante no encontrado en la respuesta');
            return null;
        }
    } catch (error) {
        console.error('Error fetching Colgante by id:', error);
        return null;
    }
};