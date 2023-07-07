import {createSlice} from '@reduxjs/toolkit';
import {getPokemonData} from '../reducers/getPokemonData';

const initialState = {
  pokemonData: [],
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
      });
  },
});

export default getPokemonDataSlice.reducer;
