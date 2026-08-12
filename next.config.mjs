/** @type {import('next').NextConfig} */
const nextConfig = {
  // Genera HTML/CSS/JS planos en /out para subir a public_html de Hostinger.
  output: 'export',
  // Hostinger no tiene el optimizador de imagenes de Next: se sirven tal cual.
  images: { unoptimized: true },
  // Cada ruta acaba en carpeta con index.html -> /privacidad/index.html
  trailingSlash: true,
  // El build no debe caerse por lint; el control de tipos va aparte (npm run typecheck).
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
