import {
  TLoginData,
  loginUserApi,
  TRegisterData,
  registerUserApi,
  updateUserApi,
  logoutApi
} from './../../utils/burger-api';
import { getUserApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';

export const getUser = createAsyncThunk('user/getUser', async () => {
  const userData = await getUserApi();
  return userData;
});

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
  async ({ email, name, password }: TRegisterData) => {
    const userData = await registerUserApi({ email, name, password });
    return userData;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ email, name }: TRegisterData) => {
    await updateUserApi({ email, name });
    return { email, name };
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const userData = await logoutApi();
  return userData;
});
