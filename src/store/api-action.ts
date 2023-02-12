import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import { APIRoute, AppRoute } from '../constans';
import { getToken, saveToken } from '../services/local-storage';
import { AuthData, LoginData, RegistrationData } from '../types/auth-data';
import { redirectToRoute } from './action';
import { AppDispatch, State } from './state';
import {UserRecordRes, UserRecordsItem, UserRecordsReq} from "../types/user-data";


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

export async function getRecords({page, limit, sorting, order}: UserRecordsReq): Promise<UserRecordRes> {
  const token = getToken();
  //const data = await axios.get<Array<UserRecordsItem>>(`https://rsclone-backend.adaptable.app${APIRoute.GetRecords}?page=${page??1}&limit=${limit??0}&sort=${sorting??'username'}&order=${order??'asc'}`, {headers: { 'x-access-token': token}});
  const data = (await fetch(`https://rsclone-backend.adaptable.app${APIRoute.GetRecords}?page=${page??1}&limit=${limit??0}&sort=${sorting??'username'}&order=${order??'asc'}`, {method: 'GET',headers: { 'x-access-token': token}}))
  const items: Array<UserRecordsItem> = await data.json();
  return { items, totalCount: Number(data.headers.get('X-Total-Count')) };
}

export async function getLevelCount(level: string): Promise<number> {
  const token = getToken();
  //const data = await axios.get<Array<UserRecordsItem>>(`https://rsclone-backend.adaptable.app${APIRoute.GetRecords}?page=${page??1}&limit=${limit??0}&sort=${sorting??'username'}&order=${order??'asc'}`, {headers: { 'x-access-token': token}});
  const data = (await fetch(`https://rsclone-backend.adaptable.app${APIRoute.Levels}/${level}`, {method: 'GET',headers: { 'x-access-token': token}}));
  const obj: {levelsCount: number} = await data.json();
  return obj.levelsCount;
}

export async function updateUserData({records, username}: {records: Record<string, Array<number>>, username: string}): Promise<AxiosResponse> {
  const token = getToken();
  return axios.patch<void>(`https://rsclone-backend.adaptable.app${APIRoute.User}/${username}`, {records: records}, {headers: { 'x-access-token': token }})
}

export async function setAvatar({file,username}: {file: File, username: string}): Promise<AxiosResponse> {
  const token = getToken();
  const formData = new FormData();
  formData.append('file', file);
  formData.append('username', username);
  return axios.patch<void>(`https://rsclone-backend.adaptable.app${APIRoute.Avatar}/${username}`, formData, {headers: { 'x-access-token': token }})
}
