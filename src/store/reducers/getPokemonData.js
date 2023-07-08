import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getPokemonData = createAsyncThunk(
  'pokemonData/getPokemonData',
  async index => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${index}`,
      );
      return response.data;
    } catch (err) {
      alert('Error: Something went wrong' + err);
    }
  },
);

export const getPokemonDescriptions = createAsyncThunk(
  'pokemonData/getPokemonDescriptions',
  async index => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${index}`,
      );
      const descriptions = response.data.flavor_text_entries[6].flavor_text;
      return descriptions;
    } catch (err) {
      console.error('Error: Something went wrong', err);
      throw err;
    }
  },
);
