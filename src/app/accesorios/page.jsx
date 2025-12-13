import ListaDeAccesorios from "./ListaDeAccesorios";

export const metadata = {
  title: "Accesorios de Lapislázuli - Complementos Únicos",
  description: "Explora nuestra variedad de accesorios artesanales de lapislázuli chileno. Piezas únicas que complementan tu estilo con elegancia natural.",
  keywords: ["accesorios lapislázuli", "complementos lapislázuli", "accesorios artesanales", "joyería complementaria"],
  openGraph: {
    title: "Accesorios de Lapislázuli | Artesanías Pachy",
    description: "Accesorios artesanales de lapislázuli. Complementos únicos."
  },
  alternates: {
    canonical: "https://www.artesaniaspachy.cl/accesorios"
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
                <span className="relative">Accesorios</span>
            </div>
            <ListaDeAccesorios />
        </div>
    )
}

export default page