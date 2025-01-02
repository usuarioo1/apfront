import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import { CartContextProvider } from "@/contexts/CartContext";
import FloatingWhatsAppButton from "@/components/WhatsappButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Artesanías Pachy - Joyas de Lapislázuli",
  description: "Descubre la belleza del lapislázuli en Artesanías Pachy. Ofrecemos una selección exclusiva de joyas artesanales, cuidadosamente elaboradas con este mineral único de Chile. Encuentra anillos, collares y más, creados para resaltar la elegancia y mística del lapislázuli.",
  keywords: "lapislázuli, joyas artesanales, anillos de lapislázuli, collares de lapislázuli, Artesanías Pachy, joyería chilena",
  openGraph: {
    title: "Artesanías Pachy - Joyas de Lapislázuli",
    description: "Encuentra joyas únicas hechas de lapislázuli en Artesanías Pachy. Explora nuestra selección artesanal en anillos, collares y más.",
    type: "website",
    url: "https://www.artesaniaspachy.cl",  // Cambia esto a la URL de tu sitio
    images: [
      {
        url: "https://res.cloudinary.com/dpbpyzl96/image/upload/v1728514810/apweb/logo/pb5gdsfxr9kmgcuyewe6.png", // Cambia esto por la URL de una imagen representativa de tu página
        width:464,
        height: 30,
        alt: "Artesanías Pachy - Joyas de Lapislázuli",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width.toString()} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height.toString()} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.openGraph.title} />
        <meta name="twitter:description" content={metadata.openGraph.description} />
        <meta name="twitter:image" content={metadata.openGraph.images[0].url} />
        <title>{metadata.title}</title>
      </head>
      <CartContextProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
          
          <Footer />
          <FloatingWhatsAppButton 
          phoneNumber="+56938677974"
          message="Hola, me gustaría obtener más información."
        />
        </body>
      </CartContextProvider>
    </html>
  );
}
