import { useState } from "react";

export default function Form1() {
    const [name, setName] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${name}`)
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Enter your name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            {name}
            <button type="submit">Save</button>
        </form>
    )
}
