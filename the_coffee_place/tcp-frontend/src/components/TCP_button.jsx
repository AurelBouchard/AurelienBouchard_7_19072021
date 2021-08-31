import React from "react";

export default function Button({text, type, disabled, onSubmit, onClick, className}) {
    return (
            <button
                type={type}
                disabled={disabled}
                //onSubmit={onSubmit}
                onClick={onClick}
                /*onClick={(e) => {e.preventDefault}}*/
                className={`bg-coffee text-cream p-4 pt-3 mb-2 font-EXO italic rounded-lg
                hover:bg-coffee-dark hover:text-foam

                hover:shadow-xl

                active:translate-y-1 transform transition
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-coffee focus:ring-offset-foam `+className}
            >{text}</button>
    )
};