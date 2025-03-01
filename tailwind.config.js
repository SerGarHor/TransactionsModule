/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}" // Asegura que Tailwind analice todos los archivos HTML y TypeScript
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F5F5', // Fondo principal
        primary: '#0047AB',    // Color principal (encabezados y elementos clave)
        secondary: '#0A192F',  // Color secundario (bordes y elementos de apoyo)
        interactive: '#00D084', // Color interactivo (botones secundarios y enlaces)
        action: '#FF6B00',     // Color de acción (botones principales y llamados a la acción)
        mainbutton: '#54FFDD',
        maintitle: '#1B3083'
      },
    },
  },
  plugins: [],
};
