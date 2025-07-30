//Variables to control standard API call
let offset = 0;
const limitSearch = 15;
let pokemonDetails = {};

// Get the listing of valid pokemons
pokemonDetails.getValidPokemons = (offset) =>{
    const urlPokemonList = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limitSearch}`; 
    return fetch(urlPokemonList)
        .then((response) => {
            if(!response.ok){
                throw new Error(response.status);
            }else{
                return response.json()
            }
        })
        .then((responseJson) => responseJson.results)// Returning just the name and URL from each valid pokemon listed 
        .catch((error) => error)
};

// Get the information for each valid pokemon listed above
pokemonDetails.getPokemonDetails = (pokemonUrl) =>{
    return fetch(pokemonUrl.url)
        .then((response) => {
            if(!response.ok){
                throw new Error(response.status);
            }else{
                return response.json()
            }
        })
        .then((detailRequest) => {return detailRequest})
};

// isolated call for the convertDataToHtmlList function to create and insert the pokemon list into the main page
// easier control of call
let createPokemonListing = (offset) =>{
    pokemonDetails.getValidPokemons(offset).then((validPokemonUrl) => {
        // Checking for errors from the first fetch
        if("message" in validPokemonUrl){
            throw new Error(validPokemonUrl.stack);
        }else{
            return validPokemonUrl;
        }
    })
    .then((pokemonUrl) => {
       return pokemonUrl.map(pokemonDetails.getPokemonDetails)
        
    })
    .then((pokemonDetails) => Promise.all(pokemonDetails))
    .then((pokemon) => convertDataToHtmlList(pokemon))
    .catch((error) => error)
};



//https://thenounproject.com/browse/icons/term/pokedex/



