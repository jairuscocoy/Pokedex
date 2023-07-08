import {createSlice} from '@reduxjs/toolkit';
import {fetchPokemon} from '../reducers/fetchPokemon';
import {fetchMorePokemon} from '../reducers/fetchMorePokemon';

const initialState = {
  pokemonList: [],
  isLoading: false,
  isLoadingMore: false,
  error: null,
};

const pokemonDataSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemon.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemonList = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMorePokemon.pending, state => {
        state.isLoadingMore = true;
        state.error = null;
      })
      .addCase(fetchMorePokemon.fulfilled, (state, action) => {
        state.isLoadingMore = false;
        state.pokemonList = [...state.pokemonList, ...action.payload];
      })
      .addCase(fetchMorePokemon.rejected, (state, action) => {
        state.isLoadingMore = false;
        state.error = action.error.message;
      });
  },
});

export default pokemonDataSlice.reducer;
