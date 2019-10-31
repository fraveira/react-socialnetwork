import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "./axios";

export default function FindPeople() {
    const [userInput, setUserInput] = useState("");
    const [peoples, setPeoples] = useState([]);

    useEffect(() => {
        let ignore = false;
        if (userInput == "") {
            (async () => {
                const { data } = await axios.get(`/api/users/`);
                setPeoples(data);
            })();
        } else {
            (async () => {
                const { data } = await axios.get(`/api/users/${userInput}`);
                if (!ignore) {
                    setPeoples(data);
                } else {
                    console.log("Ignored");
                }
            })();
        }
        return () => {
            ignore = true;
        };
    }, [userInput]);

    return (
        <div>
            <h2>Hi all!</h2>
            <input type="text" onChange={e => setUserInput(e.target.value)} />
            <ul>
                {peoples.map(people => (
                    <li key={people.first}>
                        {people.first}
                        {people.last}
                        <img src={people.profilepicture} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
