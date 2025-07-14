let offset = 0;
const limitSearch = 15;


//Grab a list of 10 pokemons each time a request is send
let pokemonDetails = {};


    // Minimal function to get valid URLs for pokemon listing
    //return array ex: [0: "https://pokeapi.co/api/v2/pokemon/1/", 1: "https://pokeapi.co/api/v2/pokemon/2/"]


// Get the listing of valid pokemons
pokemonDetails.getValidPokemons = (offset) =>{
    console.log(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limitSearch}`)
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
}

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

}


// isolated call for the convertDataToHtmlList function to create and insert the pokemon list into the main page
// easier control of call
let createPokemonListing = (offset) =>{
    pokemonDetails.getValidPokemons(offset).then((validPokemonUrl) => {
        // Checking for errors from the first fetch
        if("message" in validPokemonUrl){
            throw new Error(validPokemonUrl.stack);
        }else{
            return validPokemonUrl;
            //convertDataToHtmlList(pokemonDetails.getPokemonDetails(validPokemonUrl));
        }
    })
    .then((pokemonUrl) => {
       return pokemonUrl.map(pokemonDetails.getPokemonDetails)
        
    })
    .then((pokemonDetails) => Promise.all(pokemonDetails))
    .then((pokemon) => convertDataToHtmlList(pokemon))
    .catch((error) => error)
        
    

    // Function from main.js
}

        



