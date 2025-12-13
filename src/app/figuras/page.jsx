import FranjaInformativa from "@/components/WholeSale";
import ListaDeFiguras from "./ListaDeFiguras";

export const metadata = {
  title: "Figuras de Lapislázuli - Arte en Piedra Natural",
  description: "Descubre nuestras figuras talladas en lapislázuli chileno. Piezas artesanales únicas que combinan arte y la belleza natural del lapislázuli.",
  keywords: ["figuras lapislázuli", "esculturas lapislázuli", "artesanías lapislázuli", "figuras talladas", "arte lapislázuli"],
  openGraph: {
    title: "Figuras de Lapislázuli | Artesanías Pachy",
    description: "Figuras artesanales talladas en lapislázuli. Arte en piedra natural."
  },
  alternates: {
    canonical: "https://www.artesaniaspachy.cl/figuras"
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
                <span className="relative">Figuras</span>
            </div>
            <FranjaInformativa />
            <ListaDeFiguras/>
        </div>
    )
}

export default page
