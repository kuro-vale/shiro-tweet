/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
        screens: {
            'md': {'max': '1000px'},
            'sm': {'max': '600px'},
            'xs': {'max': '500px'},
            'ht': {'raw': '(max-height: 800px)'}
        }
    },
    plugins: [],
}

