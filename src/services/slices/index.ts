import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredientsSlice';
import { burgerConstructorSlice } from './burgerConstructorSlice';
import { userSlice } from './userSlice';
import { orderSlice } from './orderSlice';
import { ordersSlice } from './ordersSlice';
import { feedsSlice } from './feedSlice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer
});

export default rootReducer;
