import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMorePokemon = createAsyncThunk(
  'pokemon/fetchMorePokemon',
  async newOffset => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${newOffset}`,
      );
      const pokemonList = response.data.results;

      const pokemonPromises = pokemonList.map(async pokemon => {
        const pokemonId = getPokemonId(pokemon.url);
        const pokemonResponse = await axios.get(pokemon.url);
        const pokemonData = pokemonResponse.data;
        return {
          id: pokemonId,
          name: pokemonData.name,
          types: pokemonData.types.map(type => type.type.name),
          imageUrl: pokemonData.sprites.other['official-artwork'].front_default,
        };
      });

      const pokemonDetails = await Promise.all(pokemonPromises);
      return pokemonDetails;
    } catch (error) {
      throw new Error('Failed to fetch Pokémon data.');
    }
  },
);

const getPokemonId = speciesURL => {
  const parts = speciesURL.split('/');
  const id = parts[parts.length - 2];
  return id ? parseInt(id, 10) : null;
};
