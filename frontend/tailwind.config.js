/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "phone": "576px",
        "tablet": "744px",
        "desktop": "1280px",
      },

      colors: {
        'bg-color': '#0B202F',
        'bg-input': '#DAE8F2',
        'text-grey': '#FFFFFF',
        'btn-color': '#004E86',
        'btn-google': '#4280ef',
        'text-gradient1': '#004E86',
        'text-gradient2': '#00D6E6',
      },

      fontFamily: {
        body: ['inter'],
      },

      fontWeight: {
          thin: '100',
          extralight: '200',
          light: '300',
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700',
          extrabold: '800',
          black: '900',
      }
    },
  },
  plugins: [],
};
