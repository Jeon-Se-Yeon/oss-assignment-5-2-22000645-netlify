import { useState } from "react";

export default function Form2() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Name: " + inputs.username + 
        ", Age: " + inputs.age);
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>Enter your name:
                <input
                    type="text"
                    name="username"
                    value={inputs.username || ""}
                    onChange={handleChange}
                />
            </label>{inputs.username}<br />
            <label>Enter your age:
                <input
                    type="number"
                    name="age"
                    value={inputs.age || ""}
                    onChange={handleChange}
                />
            </label><br />
            <label>User name is {inputs.username}!</label><br />
            <label>User age is {inputs.age}!</label>

            <input type="submit" />
        </form>
    );
}
