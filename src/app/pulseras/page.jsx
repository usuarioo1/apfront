import FranjaInformativa from "@/components/WholeSale";
import ListaDePulseras from "./ListaDePulseras";

export const metadata = {
  title: "Pulseras de Lapislázuli - Diseños Únicos y Elegantes",
  description: "Descubre nuestra colección de pulseras artesanales de lapislázuli chileno. Diseños exclusivos que combinan belleza natural y elegancia. Venta por mayor y menor.",
  keywords: ["pulseras lapislázuli", "brazaletes lapislázuli", "pulseras artesanales", "joyería chilena", "comprar pulseras lapislázuli"],
  openGraph: {
    title: "Pulseras de Lapislázuli | Artesanías Pachy",
    description: "Pulseras artesanales de lapislázuli chileno. Diseños únicos para cada estilo."
  },
  alternates: {
    canonical: "https://www.artesaniaspachy.cl/pulseras"
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
                <span className="relative">Pulseras</span>
            </div>
            <FranjaInformativa />
            <ListaDePulseras/>
        </div>
    )
}

export default page
