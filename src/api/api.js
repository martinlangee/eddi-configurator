import Axios from "axios";

const axiosGet = (idPath, info) => {
    var url = `https://martins-poke-fight.herokuapp.com/pokemon`;
    if (idPath) url += `/${idPath}`;
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

export { updateAllPokemons, updatePokemon };