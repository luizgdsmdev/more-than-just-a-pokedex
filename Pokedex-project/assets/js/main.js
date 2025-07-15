
function convertJsonToPokemonClass(json){
    let pokemonClass = new Pokemon();

        pokemonClass.name = json.name;
        pokemonClass.number_id = json.id <= 9 ? `00${json.id}`: (json.id <= 99 ? `0${json.id}` : `${json.id}`);
        pokemonClass.type = json.types[0].type.name;
        pokemonClass.type2 = json.types[1] ? json.types[1].type.name : "";
        pokemonClass.svg = json.sprites.other.dream_world.front_default.length > 0 ? json.sprites.other.dream_world.front_default : "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

    return pokemonClass;
};

let htmlControler = 0;
//Passing the information from the pokemon details (api) to html
function convertDataToHtmlList(pokemonDetails){
    let olListElement = document.getElementById("pokemons-ol-list");

    //Runs for each pokemon listed and creats a <li> element with the information
    let htmlList = pokemonDetails.map(pokemon => {
        let pokemonClass = convertJsonToPokemonClass(pokemon);
        let type2Html = pokemonClass.type2.length > 0 ? `<li class="type type-background-${pokemonClass.type}">${pokemonClass.type2}</li>` : '';
        pokemonClass.name = pokemonClass.name.charAt(0).toUpperCase() + pokemonClass.name.slice(1);

           return `
           <li id="pokemon" class="pokemon box-shadow-${pokemonClass.type}">
                <span class="number">#${pokemonClass.number_id}</span>
                <span class="name">${pokemonClass.name}</span>
                <div class="detail">
                    <ol class="types">
                        <li class="type type-background-${pokemonClass.type}">${pokemonClass.type}</li>
                        ${type2Html}
                    </ol>
                    <img class="pokemon-image" src="${pokemonClass.svg}" alt="${pokemonClass.name}">
                </div>
            </li>
            `
    });

    // DOM insertion on .pokemons-ol-list
    htmlControler > 0 ? olListElement.insertAdjacentHTML('beforeend', htmlList.join("")) : olListElement.innerHTML += htmlList.join("");
    htmlControler += 1
};

// Calling from pokemon-api.js for html listing on main page 
createPokemonListing();

// add an auto-load for scroll to 75% of the page, load more pokemons on listing
let pokemonSidelist = document.getElementById("pokemon-sidelist");
pokemonSidelist.addEventListener('scroll', function() {
    const scrollTop = pokemonSidelist.scrollTop;
    const scrollHeight = pokemonSidelist.scrollHeight;
    const clientHeight = pokemonSidelist.clientHeight;

    if (scrollTop + clientHeight >= ((scrollHeight - 1) * 0.75)) {
        offset += limitSearch;
        createPokemonListing(offset);
    }
});