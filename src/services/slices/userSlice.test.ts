import { expect } from '@jest/globals';
import userReducer, { initialState } from './userSlice';
import { getUser, loginUser, logoutUser, registerUser, updateUser } from '../thunks/userThunks';

const mockRegisterData = {
  email: 'testemail@ya.ru',
  name: 'test',
  password: '12345678'
};

const mockAuthRespone = {
  success: true,
  refreshToken: 'fakeRefreshToken',
  accessToken: 'fakeAccessToken',
  user: {
    email: 'testemail@ya.ru',
    name: 'test'
  }
};

const mockLoginData = {
  email: 'testemail@ya.ru',
  password: '12345678'
};


const mockUser = {
  success: true,
  user: {
    email: 'testemail@ya.ru',
    name: 'test'
  }
};

describe('проверка userSlice', () => {
  it('проверка в состоянии registerUser.pending', () => {
    const newUserState = userReducer(
      initialState,
      registerUser.pending('isPending', mockRegisterData)
    );

    expect(newUserState.isAuthChecked).toBeTruthy();
    expect(newUserState.isAuthenticated).toBeFalsy();
    expect(newUserState.error).toBeUndefined();
  });

  it('проверка в состоянии registerUser.fulfiled', () => {
    const newUserState = userReducer(
      initialState,
      registerUser.fulfilled(mockAuthRespone, 'isFulfilled', mockRegisterData)
    );

    expect(newUserState.isAuthChecked).toBeTruthy();
    expect(newUserState.isAuthenticated).toBeTruthy();
    expect(newUserState.error).toBeUndefined();
    expect(newUserState.userData).toEqual(mockUser.user!);
  });

  it('проверка в состоянии registerUser.rejected', () => {
    const error = new Error('Failed to get user data');

    const newUserState = userReducer(
      initialState,
      registerUser.rejected(error, 'isRejected', mockRegisterData)
    );

    expect(newUserState.isAuthChecked).toBeTruthy();
    expect(newUserState.error).toEqual(error.message!);
  });

  it('проверка в состоянии loginUser.pending', () => {
    const newUserState = userReducer(
      initialState,
      loginUser.pending('isPending', mockLoginData)
    );

    expect(newUserState.loginUserRequest).toBeTruthy();
    expect(newUserState.error).toBeUndefined();
  });

  it('проверка в состоянии loginUser.fulfiled', () => {
    const newUserState = userReducer(
      initialState,
      loginUser.fulfilled(mockAuthRespone, 'isFulfilled', mockRegisterData)
    );

    expect(newUserState.loginUserRequest).toBeFalsy();
    expect(newUserState.isAuthChecked).toBeTruthy();
    expect(newUserState.isAuthenticated).toBeTruthy();
    expect(newUserState.error).toBeUndefined();
    expect(newUserState.userData).toEqual(mockUser.user!);
  });

  it('проверка в состоянии loginUser.rejected', () => {
    const error = new Error('Failed to get user data');

    const newUserState = userReducer(
      initialState,
      loginUser.rejected(error, 'isRejected', mockRegisterData)
    );

    expect(newUserState.loginUserRequest).toBeFalsy();
    expect(newUserState.isAuthChecked).toBeTruthy();
    expect(newUserState.isAuthenticated).toBeFalsy();
    expect(newUserState.error).toEqual(error.message!);
  });

  it('проверка в состоянии updateUser.pending', () => {
    const newUserState = userReducer(
      initialState,
      updateUser.pending('isPending', mockRegisterData)
    );

    expect(newUserState.isLoading).toBeTruthy();
    expect(newUserState.error).toBeUndefined();
  });

  it('проверка в состоянии updateUser.fulfiled', () => {
    const newUserState = userReducer(
      initialState,
      updateUser.fulfilled(mockUser.user, 'isFulfilled', mockRegisterData)
    );

    expect(newUserState.isLoading).toBeFalsy();
    expect(newUserState.error).toBeUndefined();
    expect(newUserState.userData).toEqual(mockUser.user!);
  });

  it('проверка в состоянии updateUser.rejected', () => {
    const error = new Error('Failed to get user data');

    const newUserState = userReducer(
      initialState,
      updateUser.rejected(error, 'isRejected', mockRegisterData)
    );

    expect(newUserState.isLoading).toBeFalsy();
    expect(newUserState.error).toEqual(error.message!);
  });

  it('проверка в состоянии getUser.pending', () => {
    const newUserState = userReducer(
      initialState,
      getUser.pending('isPending')
    );

    expect(newUserState.isAuthChecked).toBeFalsy();
    expect(newUserState.isAuthenticated).toBeTruthy();
    expect(newUserState.error).toBeUndefined();
  });

  it('проверка в состоянии getUser.fulfiled', () => {
    const newUserState = userReducer(
      initialState,
      getUser.fulfilled(mockUser, 'isFulfilled')
    );

    expect(newUserState.isAuthChecked).toBeTruthy();
    expect(newUserState.isAuthenticated).toBeTruthy();
    expect(newUserState.error).toBeUndefined();
    expect(newUserState.userData).toEqual(mockUser.user!);
  });

  it('проверка в состоянии getUser.rejected', () => {
    const error = new Error('Failed to get user data');

    const newUserState = userReducer(
      initialState,
      getUser.rejected(error, 'isRejected')
    );

    expect(newUserState.isAuthChecked).toBeTruthy();
    expect(newUserState.isAuthenticated).toBeFalsy();
    expect(newUserState.error).toEqual(error.message!);
  });

  it('проверка в состоянии logoutUser.pending', () => {
    const newUserState = userReducer(
      initialState,
      logoutUser.pending('isPending')
    );

    expect(newUserState.isLoading).toBeTruthy();
    expect(newUserState.isAuthChecked).toBeTruthy();
    expect(newUserState.isAuthenticated).toBeTruthy();
    expect(newUserState.error).toBeUndefined();
  });

  it('проверка в состоянии logoutUser.fulfiled', () => {
    const newUserState = userReducer(
      initialState,
      logoutUser.fulfilled(mockAuthRespone, 'isFulfilled')
    );

    expect(newUserState.isLoading).toBeFalsy();
    expect(newUserState.isAuthChecked).toBeTruthy();
    expect(newUserState.isAuthenticated).toBeFalsy();
    expect(newUserState.error).toBeUndefined();
    expect(newUserState.userData).toBeNull();
  });

  it('проверка в состоянии logoutUser.rejected', () => {
    const error = new Error('Failed to get user data');

    const newUserState = userReducer(
      initialState,
      logoutUser.rejected(error, 'isRejected')
    );

    expect(newUserState.isLoading).toBeFalsy();
    expect(newUserState.isAuthChecked).toBeFalsy();
    expect(newUserState.isAuthenticated).toBeTruthy();
    expect(newUserState.error).toEqual(error.message!);
  });
});
