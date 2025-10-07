// Usar la API interna para no exponer variables de entorno
export async function getFiguras() {
    const res = await fetch('/api/figuras');
    const data = await res.json();
    if (!data.success && data.error) {
        throw new Error(data.error);
    }
    return data.info;
}

export const getFiguraById = async (id) => {
    try {
        const response = await fetch(`/api/figuras/${id}`);
        const data = await response.json();
        if (data && data.success && data.info) {
            return data.info;
        } else {
            console.error('Figura no encontrada en la respuesta');
            return null;
        }
    } catch (error) {
        console.error('Error fetching Figura by id:', error);
        return null;
    }
};
