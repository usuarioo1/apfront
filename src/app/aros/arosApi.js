// Usar la API interna para no exponer variables de entorno
export async function getAros() {
    const res = await fetch('/api/aros');
    const data = await res.json();
    if (!data.success && data.error) {
        throw new Error(data.error);
    }
    return data.info;
}

export const getArosById = async (id) => {
    try {
        const response = await fetch(`/api/aros/${id}`);
        const data = await response.json();
        if (data && data.success && data.info) {
            return data.info;
        } else {
            console.error('Aro no encontrado en la respuesta');
            return null;
        }
    } catch (error) {
        console.error('Error fetching Aro by id:', error);
        return null;
    }
};