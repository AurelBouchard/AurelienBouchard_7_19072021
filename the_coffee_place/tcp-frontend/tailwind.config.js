const colors = require('tailwindcss/colors');

module.exports = {
    purge: [],

    darkMode: false, // or 'media' or 'class'

    theme: {
        extend: {
            cursor:{
                thumb:'thumb',
                warning: 'warning'
            },

            colors: {
                prim: {
                    light: '#598cde',
                    med: '#2a5292',
                    DEFAULT: '#091f43',
                },
                sec: {
                    light: '#ffd7d7',
                    med: '#fe785d',
                    DEFAULT: '#fd2d01',
                },
                ter: {
                    light: '#e0e0e0',
                    DEFAULT: '#d4d4d4',
                    dark: '#afafaf',
                }
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
            cursor:['hover', 'focus'],


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
