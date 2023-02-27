import {language, theme} from "../types/user-data";

const AUTH_TOKEN_KEY = 'token';
const LANGUAGE_KEY = 'language';
const VOLUME_KEY = 'volume';
const THEME_KEY = 'theme';
const CURRENT_LEVEL_FLEXBOX_KEY = 'flexbox-level';

export const getLevel = (): number => {
  const level = Number(localStorage.getItem(CURRENT_LEVEL_FLEXBOX_KEY));
  return !Number.isNaN(level) && level > 0 ? level : 1;
};

export const saveLevel = (level: number): void => {
  localStorage.setItem(CURRENT_LEVEL_FLEXBOX_KEY, level.toString(10));
};

export const getToken = (): string => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ?? '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getLanguage = (): language => {
  const language = localStorage.getItem(LANGUAGE_KEY) as language;
  return language ?? 'en_us';
};

export const saveLanguage = (language: language): void => {
  localStorage.setItem(LANGUAGE_KEY, language);
};

export const getVolume = (): number => {
  const volume = Number(localStorage.getItem(VOLUME_KEY));
  return !Number.isNaN(volume) && volume >= 0 && volume <= 100 ? volume : 50;
};

export const saveVolume = (volume: number): void => {
  localStorage.setItem(VOLUME_KEY, volume.toString(10));
};

export const getTheme = (): theme => {
  const theme = localStorage.getItem(THEME_KEY) as theme;
  return theme ?? 'green';
};

export const saveTheme = (theme: string): void => {
  localStorage.setItem(THEME_KEY, theme);
};
