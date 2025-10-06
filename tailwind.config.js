/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            colors: {
                'when-accent': '#6a5af9',
                'when-accent-light': '#00c6ff',
                'when-error': '#f87171',
            },
        },
    },
    plugins: [],
}

