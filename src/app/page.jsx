import CardCategory from "@/components/CardCategory";
import Carousel from "@/components/Carousel"
import Catalogo from "@/components/Catalogo"
import Lapislazuli from "@/components/Lapislazuli";


const HomePage = () => {

  const imageUrl = 'https://www.corsojewelry.com/cdn/shop/articles/16-LAPISLAZULI.jpg?v=1715104454';
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
