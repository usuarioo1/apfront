// Usar la API interna para no exponer variables de entorno
export async function getPulseras() {
    const res = await fetch('/api/pulseras');
    const data = await res.json();
    if (!data.success && data.error) {
        throw new Error(data.error);
    }
    return data.info;
}

export const getPulseraById = async (id) => {
    try {
        const response = await fetch(`/api/pulseras/${id}`);
        const data = await response.json();
        if (data && data.success && data.info) {
            return data.info;
        } else {
            console.error('Pulsera no encontrada en la respuesta');
            return null;
        }
    } catch (error) {
        console.error('Error fetching Pulsera by id:', error);
        return null;
    }
};