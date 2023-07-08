import {createSlice} from '@reduxjs/toolkit';
import {
  getPokemonData,
  getPokemonDescriptions,
} from '../reducers/getPokemonData';
import {getEvolution} from '../reducers/getEvolution';

const initialState = {
  pokemonData: [],
  pokemonDescription: '',
  evolutionData: [],
  isLoading: false,
  error: null,
};

const getPokemonDataSlice = createSlice({
  name: 'pokemonData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPokemonData.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPokemonData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemonData = action.payload;
      })
      .addCase(getPokemonData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getPokemonDescriptions.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPokemonDescriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemonDescription = action.payload;
      })
      .addCase(getPokemonDescriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getEvolution.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEvolution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.evolutionData = action.payload;
      })
      .addCase(getEvolution.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default getPokemonDataSlice.reducer;
