# Practice Frontend

Aplicación web construida con **Next.js 16 (App Router)**, **React 19** y **Tailwind CSS v4**.  
Interfaz en español, con soporte para múltiples vistas de marca (Elektra / Shopinbaz), entrada de texto por voz y tracking con Google Tag Manager.

## Tecnologías

| Categoría | Stack |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Componentes accesibles | Headless UI |
| Testing | Vitest + Testing Library + jsdom |
| Analítica | Google Tag Manager (`@next/third-parties`) |
| Tipado | TypeScript (strict) |
| Gestor de paquetes | pnpm |

## Scripts

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Iniciar build de producción |
| `pnpm lint` | Ejecutar ESLint |
| `pnpm test` | Ejecutar tests (vitest run) |
| `pnpm test:watch` | Tests en modo watch |
| `pnpm test:coverage` | Tests con reporte de cobertura |

## Features

- **Multi-marca**: Soporte para vistas Elektra (`?num=2`) y Shopinbaz (`?num=1`) vía query params, con logos, títulos y colores por marca.
- **Entrada por voz**: Dictado de texto usando la Web Speech API del navegador.
- **Validación de nombre**: Mínimo 4 caracteres, feedback visual de error en tiempo real.
- **Protección de rutas**: Middleware que redirige a `/login` si no hay `session_token` en rutas protegidas (`/dashboard`, `/admin`, `/profile`).
- **GTM Analytics**: Eventos `theme_loaded`, `name_input` y `name_displayed` con tracking seguro.
- **Tema dark/light**: Variables CSS configuradas con Tailwind v4 (`@theme`).
- **Security headers**: CSP, X-Frame-Options, HSTS, Permissions-Policy y más en `next.config.ts`.

## Testing

Tests unitarios y de integración con **Vitest** + **@testing-library/react** + **jsdom**.  
Cada módulo tiene su archivo de test colocalizado (`*.test.ts` o `*.test.tsx`).

```bash
pnpm test            # una sola ejecución
pnpm test:coverage   # con reporte de cobertura
```

## Decisiones

Registro de decisiones técnicas tomadas durante el desarrollo.  

  ### version 19.2.6 de React

  **Descripción**: A finales de 2025 se reportaron en foros de programación y seguridad vulnerabilidades críticas relacionadas 
                   con React Server Components (RSC) que afectaban a las primeras versiones de React 19 y a frameworks dependientes.
                   La versión 19.2.6 solventa estos fallos e introduce endurecimiento de tipos (type hardening) junto con mejoras de rendimiento.


  ### version 16.2.6 de Next.js

  **Descripción**: Soporte Nativo de React 19: Diseñado específicamente para aprovechar las características estables de React 19 (como Server Actions,
                   Suspense optimizado y componentes del servidor) de manera nativa y sin conflictos de dependencias de pares (peer dependencies)

  **Puntos a considerar**:
  - Soprte nativo para SSR - carga rapida, creacion de html de lado del servidor, menos carga para el cliente
  - Nos ayuda a brindar capa de seguridad como permisos en el navegador, X-Frame-Options para evitar que sea embebido etc.


  ### version 4.3.0 de tailwind

  **Descripción**: Soporte nativo para React 19 y elimina por completo el archivo tailwind.config.js. Ahora, toda la configuración del framework se maneja directamente usando variables nativas de CSS y la directiva @theme en tu archivo global de estilos, lo cual es una ventaja para trabajar con temas light o dark en la aplicacion.


  ### pnpm 

  **Descripción**: Usar pnpm es una excelente decisión estratégica para proteger la cadena de suministro de software (Software  Supply Chain).Una de sus principales caracteristicas es evitar accesos fantasmas: un paquete malicioso que sea una dependencia secundaria de otra librería no podrá ser importado directamente en tu código si no lo declaraste explícitas y directamente en tu package.json.

  **Puntos a considerar**:
  - Rápido
  - Ahorro en disco por eficiencia de manejar libreias
  - Nos permite agregar una capa de seguridad por ejemplo bloquear la ejecución automática de scripts, validar que los paquetes no se hayan publicando recientemente el recomendado es esperar 72 horas mínimo 

  ### uso de API voz 

  **Descripción**:

  ### vitest para prueba unitarias 

  **Descripción**: Se considero como la mejor debido a que resuelve de forma nativa los problemas de configuración, velocidad y compatibilidad con JavaScript moderno.

**Puntos a considerar**:
- Velocidad
- jsdom - entorno de DOM simulado ligero, más rápido que un headless browser real.
- Watch mode inteligente — solo re-ejecuta tests de archivos que cambiaron, basado en el grafo de dependencias de Vite.



                   


<!--
  Plantilla para nuevas decisiones:

  ### Título de la decisión (ej. React 19)

  **Descripción**: ¿Por qué se tomó esta decisión? Contexto y motivación.

  **Puntos a considerar**:
  - Punto importante 1
  - Punto importante 2
  - ...
-->


