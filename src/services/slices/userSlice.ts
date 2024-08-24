import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './../thunks/userThunks';
import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface IUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  userData: TUser | null;
  loginUserRequest: boolean;
  isLoading: boolean;
  error: string | undefined;
}

export const initialState: IUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  userData: null,
  loginUserRequest: false,
  isLoading: false,
  error: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    userInit: (state) => {
      state.isAuthenticated = true;
    },
    userLogout: (state) => {
      state.userData = null;
    }
  },
  selectors: {
    selectUserData: (state) => state.userData,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selsectIsAuthenticated: (state) => state.isAuthenticated,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.error = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message as string;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.error = undefined;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.isAuthenticated = false;
        state.error = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.error = undefined;
        state.userData = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.userData = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
        state.isAuthenticated = true;
        state.error = undefined;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.error = undefined;
        state.userData = action.payload.user;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.error = undefined;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.isAuthenticated = true;
        state.error = action.error.message as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.error = undefined;
        state.userData = null;
      });
  }
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;

export default userSlice.reducer;
