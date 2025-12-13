import FranjaInformativa from "@/components/WholeSale";
import ListaDeColgantes from "./ListaDeColgantes";

export const metadata = {
  title: "Colgantes de Lapislázuli - Belleza Natural Artesanal",
  description: "Explora nuestra selección de colgantes de lapislázuli chileno. Piezas únicas talladas a mano con piedras naturales. Perfectos para regalar o lucir con estilo.",
  keywords: ["colgantes lapislázuli", "dijes lapislázuli", "colgantes artesanales", "joyería natural", "comprar colgantes lapislázuli"],
  openGraph: {
    title: "Colgantes de Lapislázuli | Artesanías Pachy",
    description: "Colgantes artesanales de lapislázuli. Belleza natural en cada pieza."
  },
  alternates: {
    canonical: "https://www.artesaniaspachy.cl/colgantes"
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
                <span className="relative">Colgantes</span>
            </div>
            <FranjaInformativa />
            <ListaDeColgantes/>
        </div>
    )
}

export default page
