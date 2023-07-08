import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getEvolution = createAsyncThunk(
  'pokemonData/getEvolution',
  async index => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${index}/`,
      );

      const speciesData = response.data;
      const evolutionChainURL = speciesData.evolution_chain.url;

      // Fetch evolution chain
      const evolutionChainResponse = await axios.get(evolutionChainURL);
      const evolutionChainData = evolutionChainResponse.data;

      const evolutions = [];
      // Function to traverse the evolution chain recursively
      const traverseEvolutionChain = chain => {
        // alert(
        //   JSON.stringify(chain.evolves_to[0].evolution_details[0].min_level),
        // );
        const species = chain.species.name;
        const pokemonId = getPokemonId(chain.species.url);
        const spriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
        // const level = chain.evolves_to[0].evolution_details[0].min_level;
        const level = getEvolutionLevel(chain);

        evolutions.push({
          species,
          spriteURL,
          level,
        });

        if (chain.evolves_to.length > 0) {
          chain.evolves_to.forEach(evolution => {
            traverseEvolutionChain(evolution);
          });
        }
      };

      // Function to get the evolution level from the evolution details array
      const getEvolutionLevel = chain => {
        if (chain.evolution_details && chain.evolution_details.length > 0) {
          const evolutionDetail = chain.evolution_details[0];
          if (evolutionDetail.hasOwnProperty('min_level')) {
            return evolutionDetail.min_level;
          }
        }
        return 0;
      };

      // Start traversing the evolution chain from the initial species
      traverseEvolutionChain(evolutionChainData.chain);
      //   alert(JSON.stringify(evolutions));
      return evolutions;
    } catch (err) {
      alert('Error: Something went wrong' + err);
    }
  },
);

// Function to extract the Pokemon ID from its species URL
const getPokemonId = speciesURL => {
  const parts = speciesURL.split('/');
  const id = parts[parts.length - 2];
  return id ? parseInt(id, 10) : null;
};
