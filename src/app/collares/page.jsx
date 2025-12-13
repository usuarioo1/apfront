import FranjaInformativa from "@/components/WholeSale";
import ListaDeCollares from "./ListaDeCollares";

export const metadata = {
  title: "Collares de Lapislázuli - Joyería Artesanal Chilena",
  description: "Descubre nuestra exclusiva colección de collares de lapislázuli. Diseños únicos y artesanales hechos con piedras preciosas de Chile. Venta por mayor y menor.",
  keywords: ["collares lapislázuli", "collares artesanales", "joyería chilena", "collares piedra natural", "comprar collares lapislázuli"],
  openGraph: {
    title: "Collares de Lapislázuli | Artesanías Pachy",
    description: "Collares artesanales de lapislázuli chileno. Diseños únicos y elegantes.",
    images: [{
      url: "https://www.corsojewelry.com/cdn/shop/articles/16-LAPISLAZULI.jpg?v=1715104454",
      width: 1200,
      height: 630,
      alt: "Collares de Lapislázuli"
    }]
  },
  alternates: {
    canonical: "https://www.artesaniaspachy.cl/collares"
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
                <span className="relative">Collares</span>
            </div>
            <FranjaInformativa />
            <ListaDeCollares/>
        </div>
    )
}

export default page
