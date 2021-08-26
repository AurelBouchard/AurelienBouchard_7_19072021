import React from "react";

export default function Button({text}) {
    return (
            <button
                /*onClick={(e) => {e.preventDefault}}*/
                className="bg-coffee text-cream p-4 pt-3 mb-2 font-EXO italic rounded-lg
                hover:bg-coffee-dark hover:text-foam

                hover:shadow-xl

                active:translate-y-1 transform transition
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-coffee focus:ring-offset-foam"
            >{text}</button>
    )
};