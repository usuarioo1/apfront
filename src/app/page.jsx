import CardCategory from "@/components/CardCategory";
import Carousel from "@/components/Carousel"
import Catalogo from "@/components/Catalogo"
import Lapislazuli from "@/components/Lapislazuli";


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
