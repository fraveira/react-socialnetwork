import React from "react";
import CuteAnimals from "./cute-animals";

export default function HelloWorld() {
    let myFavoriteAnimal = "puppy";
    return (
        <div>
            Hello, World!
            <CuteAnimals cuteAnimal={myFavoriteAnimal} />
        </div>
    );
}
