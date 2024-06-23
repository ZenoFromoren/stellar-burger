import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from '../thunks/ingredientsThunks';

interface IIngredientsState {
  ingredients: TIngredient[];
}

const initialState: IIngredientsState = {
  ingredients: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    });
  }
});

export const ingredientsSelectors = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
