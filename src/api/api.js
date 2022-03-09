import Axios from "axios";

const axiosGet = (id, info) => {
    var url = `https://martins-poke-fight.herokuapp.com/pokemon`;
    if (id) url += `/${id}`;
    if (info) url += `/${info}`;
    return Axios.get(url);
}

const updateAllPokemons = (setPokemons) => {
    axiosGet().then((resp) =>
        setPokemons(resp.data));
};

const updatePokemon = (id, setPokemon) => {
    axiosGet(id).then((resp) =>
        setPokemon(resp.data));
};

const updatePokemonInfo = (id, info, setPokemonInfo) => {
    axiosGet(id, info).then((resp) =>
        setPokemonInfo(resp.data));
};

export { updateAllPokemons, updatePokemon, updatePokemonInfo };