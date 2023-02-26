import { UserData } from "../types/auth-data";

const AUTH_TOKEN_KEY_NAME = 'rs-clone-token';
const USER_DATA_KEY_NAME = 'rs-clone-user-data'
const CURRENT_LEVEL_FLEXBOX_KEY = 'flexbox-level';

export type LocalStorage = string;

export const getLevel = (): number => {
  const level = Number(localStorage.getItem(CURRENT_LEVEL_FLEXBOX_KEY));
  return !Number.isNaN(level) && level > 0 ? level : 1;
};

export const saveLevel = (level: number): void => {
  localStorage.setItem(CURRENT_LEVEL_FLEXBOX_KEY, level.toString(10));
};

export const getToken = (): LocalStorage => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: LocalStorage): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const saveUserData = (userData: UserData): void => {
  localStorage.setItem(USER_DATA_KEY_NAME, JSON.stringify(userData));
};

export const getUserData = (): UserData | null => {
  const userData = localStorage.getItem(USER_DATA_KEY_NAME);

  if (typeof userData === "string") {
    return JSON.parse(userData);
  }

  return null;
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
