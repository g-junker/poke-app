import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    const [searchTerm, setSearchTerm] = useState("");

    function searchFormSubmitted(e) {
        e.preventDefault();
        fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    return (
        <div className="App">
            <form onSubmit={searchFormSubmitted}>
                <label htmlFor="search">Search your pokemon</label>
                <input type="text" id="search" value={searchTerm} onInput={(e) => setSearchTerm(e.target.value)} />
                <button type="submit">Search</button>
            </form>

            {/* LOADING */}
            <div>Loading...</div>

            {/* POKEMON FOUND */}
            <div>
                <span>Charmander</span>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" />
            </div>

            {/* ERROR */}
            <div>Oops... something went wrong.</div>
        </div>
    );
}

export default App;
