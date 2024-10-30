import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";
import { CartContextProvider } from "@/contexts/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Artesanías Pachy - Joyas de Lapislázuli",
  description: "Descubre la belleza del lapislázuli en Artesanías Pachy. Ofrecemos una selección exclusiva de joyas artesanales, cuidadosamente elaboradas con este mineral único de Chile. Encuentra anillos, collares y más, creados para resaltar la elegancia y mística del lapislázuli.",
  icon:[
    '/favicon.ico?v=1'
  ]
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <CartContextProvider>
      <body className={inter.className}><Navbar />{children}<Footer /></body>
      </CartContextProvider>
    </html>
  );
}
