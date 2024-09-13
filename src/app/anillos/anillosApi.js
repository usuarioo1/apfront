export async function getAnillos() {
  const res = await fetch('http://localhost:4000/anillos');
  const data = await res.json();
  return data.info; // Accede a la propiedad "info"
}
