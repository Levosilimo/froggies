const AUTH_TOKEN_KEY = 'rs-clone-token';
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
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ?? '';
};

export const saveToken = (token: LocalStorage): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
