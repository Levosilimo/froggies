import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../constants';
import { getToken, saveToken } from '../services/local-storage';
import { AuthData, LoginData, RegistrationData } from '../types/auth-data';
import { redirectToRoute } from './action';
import { AppDispatch, State } from './state';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const token = getToken();
    const { data } = await api.get(APIRoute.CheckAuth, {
      headers: { 'x-access-token': token }
    });
    return data;
  },
);

export const getAvatarAction = createAsyncThunk<string, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'avatar/:username',
  async (username, {extra: api}) => {
    const { data } = await api.get(`/avatar/${username}`);
    console.log(data);
    return data;
  },
);

export const registrationAction = createAsyncThunk<AuthData, RegistrationData,  {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/register',
  async ({ username, email, password, adminPassword = undefined}, {dispatch, extra: api}) => {
    const { data } = await api.post<AuthData>(APIRoute.Registration, {username, email, password, adminPassword});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  },
);


export const loginAction = createAsyncThunk<AuthData, LoginData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login, password}, {dispatch, extra: api}) => {
    const { data } = await api.post<AuthData>(APIRoute.Login, {login, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  },
);
