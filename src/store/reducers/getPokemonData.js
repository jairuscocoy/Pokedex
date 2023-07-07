import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getPokemonData = createAsyncThunk(
  'pokemonData/getPokemonData',
  async index => {
    // alert(`INDEX: ${index}`);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${index}`,
      );
      // alert(JSON.stringify(response.data.stats));
      return response.data;
    } catch (err) {
      alert('Error: Somethine went wrong' + err);
    }
  },
);

// export const clearPokemonDetails = asyn()=>{
//   return ''
// }
