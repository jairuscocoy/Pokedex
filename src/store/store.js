import {configureStore} from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonSlice';
import pokemonDataReucer from './slices/pokemonDataSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonData: pokemonDataReucer,
  },
});

export default store;
