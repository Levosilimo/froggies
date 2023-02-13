import { UserData } from "../types/auth-data";

const AUTH_TOKEN_KEY_NAME = 'rs-clone-token';
const USER_DATA_KEY_NAME = 'rs-clone-user-data'

export type LocalStorage = string;

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
