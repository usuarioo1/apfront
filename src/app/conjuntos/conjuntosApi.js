// Usar la API interna para no exponer variables de entorno
export async function getConjuntos() {
    const res = await fetch('/api/conjuntos');
    const data = await res.json();
    if (!data.success && data.error) {
        throw new Error(data.error);
    }
    return data.info;
}

export const getConjuntoById = async (id) => {
    try {
        const response = await fetch(`/api/conjuntos/${id}`);
        const data = await response.json();
        if (data && data.success && data.info) {
            return data.info;
        } else {
            console.error('Conjunto no encontrado en la respuesta');
            return null;
        }
    } catch (error) {
        console.error('Error fetching Conjunto by id:', error);
        return null;
    }
};