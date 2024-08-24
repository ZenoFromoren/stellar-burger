import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from '../thunks/ingredientsThunks';

interface IIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | undefined;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: undefined
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      state.ingredients = action.payload;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message!;
    });
  }
});

export const ingredientsSelectors = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
