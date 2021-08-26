import React from "react";

export default function Input({type, placeholder, label}) {
    return (
        <>
            <label className="text-darkCoffee">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="handWritten mb-4 pl-1 text-2xl text-coffee-dark rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-coffee focus:ring-offset-foam"
            />
        </>
    )
};