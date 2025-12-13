import About from '@/components/About'
import React from 'react'

export const metadata = {
  title: "Sobre Nosotros - Artesanías Pachy",
  description: "Conoce la historia de Artesanías Pachy, expertos en joyería artesanal de lapislázuli chileno. Más de años creando piezas únicas con piedras preciosas de calidad superior.",
  keywords: ["sobre nosotros", "artesanías pachy", "joyería chilena", "lapislázuli chile", "historia artesanías"],
  openGraph: {
    title: "Sobre Nosotros | Artesanías Pachy",
    description: "Conoce nuestra historia y pasión por el lapislázuli chileno"
  },
  alternates: {
    canonical: "https://www.artesaniaspachy.cl/about"
  }
}

const page = () => {
  return (
    <div>
      <About />
    </div>
  )
}

export default page
