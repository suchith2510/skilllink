/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Darker theme colors
        dark: {
          DEFAULT: '#030712', // Darker background
          lighter: '#111827', // Slightly lighter background
          light: '#1F2937',   // Card backgrounds
        },
        primary: {
          DEFAULT: '#8B5CF6', // Slightly muted purple
          dark: '#6D28D9',    // Deeper purple
          light: '#A78BFA',   // Lighter purple
        },
        accent: {
          purple: '#8B5CF6',
          pink: '#DB2777',    // Deeper pink
          blue: '#2563EB',    // Deeper blue
          cyan: '#0891B2',    // Deeper cyan
          green: '#059669',   // Deeper green
          orange: '#EA580C',  // Deeper orange
          red: '#DC2626',     // Deeper red
        },
        border: {
          DEFAULT: '#1F2937',
          light: '#374151',
          dark: '#111827',
        },
        foreground: {
          DEFAULT: '#F9FAFB',
          muted: '#9CA3AF',
          subtle: '#D1D5DB',
        },
        background: {
          DEFAULT: '#030712',
          muted: '#111827',
          subtle: '#1F2937',
        },
      },
      textColor: {
        foreground: '#F9FAFB',
        'foreground-muted': '#9CA3AF',
        'foreground-subtle': '#D1D5DB',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slide-in 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        'gradient-y': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'center top' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'center bottom' },
        },
        'gradient-xy': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left top' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right bottom' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
            textShadow: '0 0 10px rgba(139, 92, 246, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
            textShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
          },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 30px rgba(139, 92, 246, 0.5)',
      },
    },
  },
  plugins: [],
}
