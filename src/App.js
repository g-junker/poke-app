import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pokemon, setPokemon] = useState(null);
    const [hasError, setHasError] = useState(false);

    function searchFormSubmitted(e) {
        e.preventDefault();

        if (!searchTerm) return;

        setHasError(false);
        setPokemon(null);
        setIsLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
                setPokemon(data);
                setSearchTerm("");
            })
            .catch((error) => {
                setHasError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="App">
            <form onSubmit={searchFormSubmitted}>
                <label htmlFor="search">Search your pokemon</label>
                <input type="text" id="search" value={searchTerm} onInput={(e) => setSearchTerm(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            {/* LOADING */}
            {isLoading && <div>Loading...</div>}
            {pokemon && (
                <div>
                    <span>{pokemon.name}</span>
                    <img src={pokemon.sprites.front_default} />
                </div>
            )}
            {hasError && <div>Oops... something went wrong.</div>}
        </div>
    );
}

export default App;
