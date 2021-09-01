import React from "react";

export default function Button({text, type, disabled, onClick, className}) {
    return (
            <button
                type={type}
                disabled={disabled}
                onClick={onClick}
                className={`p-4 pt-3 mb-2 font-EXO italic rounded-lg
                bg-gradient-to-tl from-prim to-prim-light text-white
                hover:bg-none hover:bg-prim-light hover:underline hover:shadow-xl
                active:translate-y-1 transform transition
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-prim focus:ring-offset-white `+className}
            >{text}</button>
    )
};