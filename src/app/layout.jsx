import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import { CartContextProvider } from "@/contexts/CartContext";
import FloatingWhatsAppButton from "@/components/WhatsappButton";
import FacebookPixel from "@/components/FacebookPixel";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://www.artesaniaspachy.cl'),
  title: {
    default: "Artesanías Pachy - Joyas de Lapislázuli Chileno | Joyería Artesanal",
    template: "%s | Artesanías Pachy"
  },
  description: "Descubre la belleza del lapislázuli chileno en Artesanías Pachy. Ofrecemos una selección exclusiva de joyas artesanales: anillos, collares, aros, pulseras y más. Joyería única elaborada con piedras preciosas de calidad superior.",
  keywords: [
    "lapislázuli", 
    "joyas artesanales", 
    "anillos de lapislázuli", 
    "collares de lapislázuli",
    "aros de lapislázuli",
    "pulseras de lapislázuli",
    "Artesanías Pachy", 
    "joyería chilena",
    "piedras preciosas chile",
    "joyas de lapislázuli",
    "joyería artesanal",
    "comprar lapislázuli",
    "joyas naturales"
  ],
  authors: [{ name: "Artesanías Pachy" }],
  creator: "Artesanías Pachy",
  publisher: "Artesanías Pachy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.artesaniaspachy.cl",
    siteName: "Artesanías Pachy",
    title: "Artesanías Pachy - Joyas de Lapislázuli Chileno",
    description: "Encuentra joyas únicas hechas de lapislázuli en Artesanías Pachy. Explora nuestra selección artesanal en anillos, collares, aros, pulseras y más.",
    images: [
      {
        url: "https://res.cloudinary.com/dpbpyzl96/image/upload/v1728514810/apweb/logo/pb5gdsfxr9kmgcuyewe6.png",
        width: 464,
        height: 30,
        alt: "Artesanías Pachy - Joyas de Lapislázuli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artesanías Pachy - Joyas de Lapislázuli Chileno",
    description: "Descubre joyas artesanales únicas de lapislázuli chileno",
    images: ["https://res.cloudinary.com/dpbpyzl96/image/upload/v1728514810/apweb/logo/pb5gdsfxr9kmgcuyewe6.png"],
  },
  verification: {
    google: "google-site-verification-code", // Reemplazar con código real de Google Search Console
  },
  alternates: {
    canonical: "https://www.artesaniaspachy.cl",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Artesanías Pachy",
    "image": "https://res.cloudinary.com/dpbpyzl96/image/upload/v1728514810/apweb/logo/pb5gdsfxr9kmgcuyewe6.png",
    "description": "Joyería artesanal de lapislázuli chileno. Anillos, collares, aros, pulseras y más.",
    "url": "https://www.artesaniaspachy.cl",
    "telephone": "+56938677974",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CL",
      "addressLocality": "Chile"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "CL"
    },
    "sameAs": [
      "https://www.facebook.com/artesaniaspachy",
      "https://www.instagram.com/artesaniaspachy"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+56938677974",
      "contactType": "customer service",
      "availableLanguage": ["Spanish"]
    }
  };

  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
        <link rel="canonical" href="https://www.artesaniaspachy.cl" />
        {/* Facebook Pixel debe ir en el head */}
        <FacebookPixel />
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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