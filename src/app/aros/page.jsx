import FranjaInformativa from "@/components/WholeSale";
import ListaDeAros from "./ListaDeAros";

export const metadata = {
  title: "Aros de Lapislázuli - Elegancia y Estilo Artesanal",
  description: "Explora nuestra colección de aros de lapislázuli chileno. Diseños elegantes y únicos, perfectos para cualquier ocasión. Joyería artesanal de calidad superior.",
  keywords: ["aros lapislázuli", "aros artesanales", "pendientes lapislázuli", "joyería chilena", "comprar aros lapislázuli"],
  openGraph: {
    title: "Aros de Lapislázuli | Artesanías Pachy",
    description: "Aros artesanales de lapislázuli chileno. Elegancia en cada diseño.",
    images: [{
      url: "https://www.corsojewelry.com/cdn/shop/articles/16-LAPISLAZULI.jpg?v=1715104454",
      width: 1200,
      height: 630,
      alt: "Aros de Lapislázuli"
    }]
  },
  alternates: {
    canonical: "https://www.artesaniaspachy.cl/aros"
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
                <span className="relative">Aros</span>
            </div>
            <FranjaInformativa />
            <ListaDeAros />
        </div>
    )
}

export default page
