import logo from "./logo.svg";
import "./App.css";

function App() {
    return (
        <div className="App">
            <form>
                <label htmlFor="search">Search your pokemon</label>
                <input type="text" id="search" />
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
