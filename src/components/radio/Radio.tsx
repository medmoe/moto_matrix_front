import React from "react";

interface RadioProps {
    id: string,
    name?: string,
    value?: string,
}

export function Radio({id="", name, value}: RadioProps) {
    return (
        <div>
            <input type="radio" id={id} name={name} value={value} required/>
            <label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</label>
        </div>
    )
}