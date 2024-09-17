export async function getAnillos() {
  const res = await fetch('http://localhost:4000/anillos');
  const data = await res.json();
  return data.info; // Accede a la propiedad "info"
}

// anillosApi.js
export const getAnilloById = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/anillos/${id}`);  // Ajusta la ruta según tu backend
    const data = await response.json();

    // Asegurarse de que la propiedad 'info' existe en el objeto de respuesta
    if (data && data.success && data.info) {
      return data.info;  // Retorna el objeto 'info', que contiene los detalles del anillo
    } else {
      console.error('Anillo no encontrado en la respuesta');
      return null;
    }
  } catch (error) {
    console.error('Error fetching anillo by id:', error);
    return null;
  }
};