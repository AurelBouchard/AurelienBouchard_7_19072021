import React from "react";

export default function Input({type, placeholder, label}) {
    return (
        <>
            <label className="">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="handWritten mb-4"
            />
        </>
    )
};