import Carousel from "../components/Carousel"
import Welcome from "../components/Welcome"

export default function Index() {

  const images = [
    'https://i.postimg.cc/4ypFdH6G/electro.jpg',
    'https://i.postimg.cc/65NmPzKp/home-products.jpg',
    'https://i.postimg.cc/J7XFKv9F/tools.webp',
    'https://i.postimg.cc/4ypFdH6G/electro.jpg',
  ];

  return (
    <div className="bg-gray-200">
      <Carousel images={images}/>
      <Welcome />
      
    </div>
  )
}