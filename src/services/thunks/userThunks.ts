import {
  TLoginData,
  loginUserApi,
  TRegisterData,
  registerUserApi,
  updateUserApi,
  logoutApi,
  getUserApi
} from './../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const userData = await loginUserApi({ email, password });
    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    return userData;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ email, name }: TRegisterData) => {
    const userData = await updateUserApi({ email, name });
    return userData.user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi);
