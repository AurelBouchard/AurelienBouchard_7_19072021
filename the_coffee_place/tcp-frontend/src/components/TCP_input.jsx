import React from "react";


/**
 * Styled input.
 *
 * @param type
 * @param placeholder
 * @param label
 * @param value
 * @returns {JSX.Element}
 * @constructor
 */
export default function Input({type, placeholder, label, value}) {
    return (
        <>
            <label className="text-darkCoffee">{label}</label>
            <input
                value={value}
                type={type}
                placeholder={placeholder}
                className='handWritten mb-4 pl-1 text-2xl rounded
                focus:outline-none focus:ring focus:ring-offset-2 focus:ring-prim focus:ring-offset-white'
            />
        </>
    )
};