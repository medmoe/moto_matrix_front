import React, {FormEvent} from "react";

interface RadioProps {
    id: string,
    name?: string,
    value?: string,
    handleChange?: (event: FormEvent) => void
}

export function Radio({id="", name, value, handleChange}: RadioProps) {
    return (
        <div>
            <input type="radio" id={id} name={name} value={value} onChange={handleChange} required/>
            <label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</label>
        </div>
    )
}