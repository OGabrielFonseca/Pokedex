

function convertPokemonToHtml (pokemon)
{
    return `
    <li class="pokedex__pokemon-card ${pokemon.type}">
        <span class="pokemon-card__number">
            #0${pokemon.number}
        </span>
        <span class="pokemon-card__name">
            ${pokemon.name}
        </span>
        <div class="pokemon-card__description">
            <ol class="pokemon-card__types">
                ${pokemon.types.map ((type) => `<li class="pokemon-card__type  ${pokemon.type}">${type}</li>`).join(" ")}
            </ol>                    
            <img class= "pokemon-card__img" 
            src="${pokemon.image}"
            alt="${pokemon.name}" srcset="">
        </div>
    </li>`
            
    
}

const pokedex = document.getElementById('pokedex')

pokeApi.getPokemons().then((pokemons = []) => {

    const newList = pokemons.map((pokemon) => convertPokemonToHtml(pokemon));
    pokedex.innerHTML += newList.join('');

})