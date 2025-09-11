'use client';
import { useEffect } from 'react';
import Script from 'next/script';

const FacebookPixel = () => {
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  useEffect(() => {
    // Verificar que el pixel ID existe
    if (!pixelId) {
      console.error('Facebook Pixel ID no encontrado en las variables de entorno');
      return;
    }

    // Verificar que fbq está disponible después de cargar el script
    if (typeof window !== 'undefined' && window.fbq) {
      // Inicializar eventos adicionales después de que el pixel esté cargado
      console.log('Facebook Pixel inicializado correctamente');
    }
  }, [pixelId]);

  // Funciones para eventos específicos del ecommerce
  const trackEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters);
    }
  };

  // Exponer funciones globalmente para usar en otros componentes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.trackFacebookEvent = trackEvent;
    }
  }, []);

  if (!pixelId) {
    return null;
  }

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt="facebook pixel"
        />
      </noscript>
    </>
  );
};

export default FacebookPixel;