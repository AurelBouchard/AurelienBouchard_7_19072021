const colors = require('tailwindcss/colors');

module.exports = {
    purge: [],

    darkMode: false, // or 'media' or 'class'

    theme: {
        extend: {
            cursor:{
                thumb:'thumb'
            },

            colors: {
                coffee: {
                    DEFAULT: '#5c2c00',
                    dark: '#400602',
                },
                foam:'#e3b182',
                cream:'#f0e9d7',
            },

            fontFamily: {
                EXO: "'Exo 2', sans",
                SCRIPT: "'Caveat', sans"
            }
        },
    },

    variants: {
        extend: {
            backgroundColor:["active", "focus", "hover"],
            textColor:["active", "focus", "hover"],
            translate:['active'],
            boxShadow:['hover'],

            colors: {
                darkCoffee:'#400602',
                coffee:'#5c2c00',
                foam:'#e3b182',
                cream:'#f0e9d7',
            },
        },
    },

    plugins: [],
}
