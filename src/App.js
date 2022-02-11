import React, { useState } from "react";
import "./App.css";

function usePokemon() {
    const [isLoading, setIsLoading] = useState(false);
    const [pokemon, setPokemon] = useState(null);
    const [hasError, setHasError] = useState(null);

    function search(searchTerm = "") {
        if (!searchTerm) return;

        setHasError(null);
        setPokemon(null);
        setIsLoading(true);

        return fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
                setPokemon(data);
                return Promise.resolve(data);
            })
            .catch((error) => {
                setHasError(error.message);
                return Promise.reject(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return { pokemon, isLoading, hasError, search };
}

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const { pokemon, isLoading, hasError, search } = usePokemon();

    function searchFormSubmitted(e) {
        e.preventDefault();
        search(searchTerm).then(() => setSearchTerm(""));
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
            {hasError && <div>Oops... something went wrong. {hasError}</div>}
        </div>
    );
}

export default App;
