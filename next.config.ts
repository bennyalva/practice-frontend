import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://www.google-analytics.com https://*.google-analytics.com;
  font-src 'self';
  connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com;
  frame-src 'self' https://app.netlify.com;
  frame-ancestors 'self' https://app.netlify.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();


const nextConfig: NextConfig = {
  // Habilita rutas tipadas para mayor seguridad de tipos en enlaces y navegación
  typedRoutes: true,

  // En Next.js 13.5+ viene habilitado por defecto, pero forzarlo previene comportamientos inseguros en componentes React
  reactStrictMode: true,

  // Deshabilita el encabezado que expone que estás usando Next.js para mitigar el reconocimiento de huella tecnológica (Fingerprinting)
  poweredByHeader: false,

  // Inyección de Cabeceras de Seguridad HTTP obligatorias
  async headers() {
    return [
      {
        // Aplica estas cabeceras a todas las rutas de la aplicación
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Fuerza al navegador a respetar el Content-Type enviado (previene inyección de scripts MIME)
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Protege la privacidad de tus usuarios al navegar hacia enlaces externos
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload', // Fuerza conexiones HTTPS estrictas durante un año
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // Filtro XSS heredado activo para navegadores antiguos
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(self), geolocation=()', // Restringe el acceso a las APIs nativas del hardware del usuario por defecto
          }
        ],
      },
    ];
  },
};

export default nextConfig;
