// ✅ AHORA: Llamamos a nuestras propias API routes (seguras)
// ❌ ANTES: Llamábamos directamente a apback.onrender.com (inseguro)

export async function getAccesorios() {
    // Llamamos a NUESTRA API route en lugar del backend directamente
    const res = await fetch('/api/accesorios');
    const data = await res.json();
    
    // Verificamos que la respuesta sea exitosa
    if (!data.success && data.error) {
        throw new Error(data.error);
    }
    
    return data.info; // Retornamos los datos como antes
}

export const getAccesoriosById = async(id) => {
    try {
        // Llamamos a NUESTRA API route con el ID
        const response = await fetch(`/api/accesorios/${id}`);
        const data = await response.json();

        if (data && data.success && data.info) {
            return data.info;  // Retorna el objeto 'info'
        } else {
            console.error('Accesorio no encontrado en la respuesta');
            return null;
        }
    } catch (error) {
        console.error('Error fetching Accesorio by id:', error);
        return null;
    }
}
