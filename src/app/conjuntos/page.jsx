import FranjaInformativa from "@/components/WholeSale";
import ListaDeConjuntos from "./ListaDeConjuntos";

export const metadata = {
  title: "Conjuntos de Lapislázuli - Sets Completos de Joyería",
  description: "Descubre nuestros conjuntos completos de joyería de lapislázuli chileno. Sets coordinados de collar, aros y más. Perfectos para ocasiones especiales.",
  keywords: ["conjuntos lapislázuli", "sets joyería", "joyería completa", "regalos lapislázuli", "conjuntos artesanales"],
  openGraph: {
    title: "Conjuntos de Lapislázuli | Artesanías Pachy",
    description: "Sets completos de joyería de lapislázuli. Armonía y elegancia."
  },
  alternates: {
    canonical: "https://www.artesaniaspachy.cl/conjuntos"
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
                <span className="relative">Conjuntos</span>
            </div>
            <FranjaInformativa />
            <ListaDeConjuntos/>
        </div>
    )
}

export default page
