const pokeApi = {};

/*<--------------- Pokedex ----------------->*/
function convertToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;

    pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertToPokemon);
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails);
}

/*<--------------- Pokemon Deitail ----------------->*/

function convertToPokemonDetail(pokeDetail) {

    const pokemonDetail = new PokemonDetail();
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemonDetail.abilities = abilities;
    pokemonDetail.number = pokeDetail.id;
    pokemonDetail.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types;
    pokemonDetail.types = types;
    pokemonDetail.type = type;

    pokemonDetail.image = pokeDetail.sprites.other.dream_world.front_default;

    const stats = pokeDetail.stats.map((statSlot) => [statSlot.stat.name, statSlot.base_stat]);
    pokemonDetail.stats = stats;

    pokemonDetail.height = pokeDetail.height;
    pokemonDetail.weight = pokeDetail.weight;
    pokemonDetail.baseExperience = pokeDetail.base_experience;

    pokemonDetail.moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.url);
    pokemonDetail.species = pokeDetail.species.url;

    return pokemonDetail;
}

pokeApi.getMove = (move) => {
    return fetch(move)
        .then((response) => response.json())
        .then((pokemonMove) => [pokemonMove.id, pokemonMove.name, pokemonMove.type.name]);
}

pokeApi.getEvolutions = async (evolutionChain) => {
    evolutionChain = evolutionChain.chain;
    const evolutions = [];
    do{
        console.log(evolutionChain);
        const pokemonName = evolutionChain.species.name;
        const pokemonImage = await pokeApi.getPokemonImage(evolutionChain.species.url.replace('-species', ''))
        const pokemoUrl = evolutionChain.species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', 'details.html?pokemon=')
        evolutionChain = evolutionChain.evolves_to[0];
        evolutions.push({
            "name": pokemonName,
            "url": pokemoUrl,
            "image": pokemonImage
        })
    } while(evolutionChain)
    return evolutions;
}

pokeApi.getPokemon = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertToPokemonDetail)
        .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getPokemonImage = (url) => {
    return fetch(url)
        .then((response) => response.json())
        .then(convertToPokemonDetail)
        .then((pokemonDetails) => pokemonDetails.image);
}

