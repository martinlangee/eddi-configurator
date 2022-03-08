import Axios from "axios";

const axiosGet = (id, info) => {
    var url = `https://martins-poke-fight.herokuapp.com/pokemon`;
    if (id) url += `/${id}`;
    if (info) url += `/${info}`;
    return Axios.get(url);
}

const getAllPokemons = (setPokemons) => {
    axiosGet().then((resp) =>
        setPokemons(resp.data));
};

const getPokemon = (id, setPokemon) => {
    axiosGet(id).then((resp) =>
        setPokemon(resp.data));
};

const getPokemonInfo = (id, info, setPokemon) => {
    axiosGet(id, info).then((resp) =>
        setPokemon(resp.data));
};

export { axiosGet, getAllPokemons, getPokemon, getPokemonInfo };