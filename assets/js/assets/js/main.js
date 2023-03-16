
/*<---------- Pokedex -----------------> */

const pokedex = document.getElementById('pokedex')
const loadMoreBtn = document.getElementById('load-more-btn')
const maxRecords = 649
const limit = 50;
let offset = 0;

function loadPokemons(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newList = pokemons.map((pokemon) => `
    <li class="pokedex__pokemon-card ${pokemon.type}">
        
        <span class="pokemon-card__number">
            #0${pokemon.number}
        </span>
        <span class="pokemon-card__name">
            ${pokemon.name}
        </span>
        <div class="pokemon-card__description">
            <div class="pokemon-card__details">
                <ol class="pokemon-card__types">
                    ${pokemon.types.map ((type) => `<li class="pokemon-card__type  ${pokemon.type}">${type}</li>`).join(" ")}
                </ol>
                <a class="pokemon-card__detail-btn" href="details.html?pokemon=${pokemon.number}">Detalhes</a> 
            </div>                    
            <img class= "pokemon-card__img" 
            src="${pokemon.image}"
            alt="${pokemon.name}" srcset="">
        </div>
    </li>`).join('');
    pokedex.innerHTML += newList;
})
}

loadPokemons( offset, limit);

loadMoreBtn.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemons(offset, newLimit)

        loadMoreBtn.parentElement.removeChild(loadMoreBtn)
    } else {
        loadPokemons(offset, limit)
        console.log(`offset: ${offset} limit: ${limit}`)
    }
})

