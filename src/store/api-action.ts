import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { APIRoute, AppRoute } from '../constants';
import { getToken, saveToken } from '../services/local-storage';
import { AuthData, LoginData, RegistrationData } from '../types/auth-data';
import { UserData } from "../types/user-data";
import { redirectToRoute } from './action';
import { AppDispatch, State } from './state';
import {UserRecordRes, UserRecordsItem, UserRecordsReq} from "../types/user-data";
import {TaskModel} from "../types/task-model";

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

export async function getRecords({page, limit, sorting, order, fullInfo}: UserRecordsReq): Promise<UserRecordRes> {
  const token = getToken();
  const data = (await fetch(`https://rsclone-backend.adaptable.app${APIRoute.Records}?page=${page??1}&limit=${limit??0}&sort=${sorting??'username'}&order=${order??'asc'}&fullInfo=${fullInfo}`, {method: 'GET',headers: { 'x-access-token': token}}))
  const items: Array<UserRecordsItem> = await data.json();
  return { items, totalCount: Number(data.headers.get('X-Total-Count')) };
}

export async function getLevelCount(level: string): Promise<number> {
  const token = getToken();
  const data = (await fetch(`https://rsclone-backend.adaptable.app${APIRoute.Levels}/${level}`, {method: 'GET',headers: { 'x-access-token': token}}));
  const obj: {levelsCount: number} = await data.json();
  return obj.levelsCount;
}

export async function setAvatar({file,username}: {file: File, username: string}): Promise<AxiosResponse> {
  const token = getToken();
  const formData = new FormData();
  formData.append('file', file);
  formData.append('username', username);
  return axios.patch<void>(`https://rsclone-backend.adaptable.app${APIRoute.Avatar}/${username}`, formData, {headers: { 'x-access-token': token }})
}

export const checkUsernameEligibility = async (username: string): Promise<string> => {
  const response = await axios.post(`https://rsclone-backend.adaptable.app${APIRoute.Registration}/check-username`, {username});
  if (response.status !== 200) return Promise.reject(response.data.message);
  return Promise.resolve(response.data);
}

export const checkEmailEligibility = async (email: string): Promise<string> => {
  const response = await axios.post(`https://rsclone-backend.adaptable.app${APIRoute.Registration}/check-email`, {email});
  if (response.status !== 200) return Promise.reject(response.data.message);
  return Promise.resolve(response.data);
}

export const setUserDataAction = createAsyncThunk<UserData, Partial<UserData>, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('user/updateData',
  async ({language, records, username}, {dispatch, extra: api}) => {
    const token = getToken();
    const response = (await api.patch<UserData>(`https://rsclone-backend.adaptable.app${APIRoute.UserData}${username ? `/${username}` : ''}`, {language, records},{headers: { 'x-access-token': token}}))
    return response.data;
  });

export const getUserDataAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('user/getData',
  async (_arg, {dispatch, extra: api}) => {
    const token = getToken();
    const response = (await api.get<UserData>(`https://rsclone-backend.adaptable.app${APIRoute.UserData}`, {headers: { 'x-access-token': token}}))
    return response.data;
});

interface LevelDataReq {game: string; levelNumber: number;}

export const getLevelAction = async ({game, levelNumber}: LevelDataReq): Promise<TaskModel> => {
  const token = getToken()
  const {data} = await axios.get<TaskModel>(`https://rsclone-backend.adaptable.app${APIRoute.Levels}/${game}/${levelNumber}`, {headers: {'x-access-token': token}});
  return data;
};
