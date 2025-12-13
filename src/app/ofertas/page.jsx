import ListaDeAnillos from "./ListaDeAnillos";

export const metadata = {
  title: "Ofertas - Anillos de Lapislázuli en Promoción",
  description: "Aprovecha nuestras ofertas especiales en anillos de lapislázuli chileno. Joyas artesanales de calidad a precios increíbles. ¡No te pierdas estas oportunidades!",
  keywords: ["ofertas lapislázuli", "anillos en oferta", "promociones joyería", "descuentos lapislázuli", "anillos baratos"],
  openGraph: {
    title: "Ofertas Especiales | Artesanías Pachy",
    description: "Ofertas exclusivas en anillos de lapislázuli. Aprovecha ahora."
  },
  alternates: {
    canonical: "https://www.artesaniaspachy.cl/ofertas"
  }
};

const page = () => {



  const imageUrl = 'https://www.corsojewelry.com/cdn/shop/articles/16-LAPISLAZULI.jpg?v=1715104454';

  return (
    <div>
      <div className="relative w-full h-64 flex items-center justify-center text-white text-7xl font-bold">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <span className="relative">Ofertas</span>
    </div>
    <ListaDeAnillos />
    </div>
  )
}

export default page
