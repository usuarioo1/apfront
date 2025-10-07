// Usar la API interna para no exponer variables de entorno
export async function getCollares() {
    const res = await fetch('/api/collares');
    const data = await res.json();
    if (!data.success && data.error) {
        throw new Error(data.error);
    }
    return data.info;
}

export const getCollaresById = async (id) => {
    try {
        const response = await fetch(`/api/collares/${id}`);
        const data = await response.json();
        if (data && data.success && data.info) {
            return data.info;
        } else {
            console.error('Collar no encontrado en la respuesta');
            return null;
        }
    } catch (error) {
        console.error('Error fetching Collar by id:', error);
        return null;
    }
};