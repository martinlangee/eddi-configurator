import Axios from "axios";

let pokemons = null;

const axiosGet = (idPath, info) => {
    var url = `https://martins-poke-fight.herokuapp.com/pokemon`;
    if (idPath) url += `/${idPath}`;
    if (info) url += `/${info}`;
    return Axios.get(url);
}

const updateAllPokemons = (setPokemons) => {
    console.log("-- updateAllPokemons");
    if (!pokemons) {
        console.log("-- updateAllPokemons => read in");
        axiosGet().then((resp) => {
            pokemons = resp.data;
            setPokemons(pokemons)
        });
    } else {
        console.log("-- updateAllPokemons => do nothing");
        setPokemons(pokemons);
    }
};

const updatePokemon = (id, setPokemon) => {
    axiosGet(id).then((resp) =>
        setPokemon(resp.data));
};

export { updateAllPokemons, updatePokemon };