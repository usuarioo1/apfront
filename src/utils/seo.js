// Hook personalizado para manejar SEO en componentes client
'use client';
import { useEffect } from 'react';

export function useProductSEO(product, productType, productId) {
  useEffect(() => {
    if (product && typeof window !== 'undefined') {
      // Actualizar título
      document.title = `${product.name} - ${productType} de Lapislázuli | Artesanías Pachy`;
      
      // Actualizar meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          'content', 
          product.descripcion || `${product.name} - ${productType} artesanal de lapislázuli chileno de alta calidad. Precio: $${product.precio}`
        );
      }

      // Actualizar Open Graph
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${product.name} | Artesanías Pachy`);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', product.descripcion || `${product.name} - ${productType} artesanal de lapislázuli`);
      }

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage && product.img) {
        ogImage.setAttribute('content', product.img);
      }

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', `https://www.artesaniaspachy.cl/${productType.toLowerCase()}/${productId}`);
      }

      // Agregar JSON-LD para el producto
      const existingScript = document.getElementById('product-schema');
      if (existingScript) {
        existingScript.remove();
      }

      const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.img,
        "description": product.descripcion || `${product.name} - ${productType} artesanal de lapislázuli chileno`,
        "sku": product.codigo || product._id,
        "brand": {
          "@type": "Brand",
          "name": "Artesanías Pachy"
        },
        "offers": {
          "@type": "Offer",
          "url": `https://www.artesaniaspachy.cl/${productType.toLowerCase()}/${productId}`,
          "priceCurrency": "CLP",
          "price": product.precio,
          "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      };

      const script = document.createElement('script');
      script.id = 'product-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(productJsonLd);
      document.head.appendChild(script);
    }
  }, [product, productType, productId]);
}
