/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#5FBA80",
                secondary: "#D8DFDA",
                accent: "#9CECBC",
                dark: "#232723",
                bright: "#f1faee",
                darkAccent: "#2B7044",

                joy: "#FBCA88",
                sadness: "#5793C1",
                disgust: "#67A150",
                fear: "#C49DC5",
                anger: "#D4262A",

                text: "#222222",
                error: "#D4262A",
            },
        },
    },
    plugins: [],
};
