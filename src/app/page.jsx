import CardCategory from "@/components/CardCategory";
import Carousel from "@/components/Carousel"
import Catalogo from "@/components/Catalogo"
import Lapislazuli from "@/components/Lapislazuli";

export const metadata = {
  title: "Inicio - Joyas de Lapislázuli Chileno",
  description: "Bienvenido a Artesanías Pachy. Descubre nuestra exclusiva colección de joyas artesanales de lapislázuli: anillos, collares, aros, pulseras, colgantes y más. Calidad y belleza en cada pieza.",
  keywords: ["joyas lapislázuli", "artesanías chile", "comprar joyas online", "lapislázuli chileno", "joyería artesanal"],
  openGraph: {
    title: "Artesanías Pachy - Joyas de Lapislázuli Chileno",
    description: "Descubre nuestra exclusiva colección de joyas artesanales de lapislázuli chileno",
    images: [
      {
        url: "https://res.cloudinary.com/dpbpyzl96/image/upload/v1729386317/apweb/b4anjv95ulg2sqkmc9cj.jpg",
        width: 1200,
        height: 630,
        alt: "Artesanías Pachy - Joyas de Lapislázuli",
      },
    ],
  },
};

const HomePage = () => {

  const imageUrl = 'https://res.cloudinary.com/dpbpyzl96/image/upload/v1729386317/apweb/b4anjv95ulg2sqkmc9cj.jpg';
  return (
    <div>
      <Carousel />
      
      <Lapislazuli />
      <Catalogo  imageUrl={imageUrl} />
      
      <CardCategory />
      
    </div>
  )
}

export default HomePage
