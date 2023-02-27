import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from "../../constants";
import {
  changeUsernameAction,
  checkAuthAction,
  getUserDataAction,
  loginAction,
  registrationAction,
  setUserDataAction
} from "../api-action";
import {language, theme} from "../../types/user-data";
import i18n from "../../i18n";
import {
  dropToken,
  getLanguage,
  getLevel, getTheme,
  getToken,
  getVolume,
  saveLanguage,
  saveLevel, saveTheme, saveVolume
} from "../../services/local-storage";
import {parseJwt} from "../../utils";

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  isDataLoading: boolean;
  username?: string;
  email?: string;
  records?: Record<string, Array<number>>;
  isAdmin: boolean;
  currentLevel: number;
  isLoadingError: boolean,
  language?: language;
  volume: number;
  theme: theme;
  isPlayerMuted: boolean;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isAdmin: false,
  isDataLoading: false,
  isLoadingError: false,
  volume: getVolume(),
  theme: getTheme(),
  currentLevel: getLevel(),
  language: getLanguage(),
  isPlayerMuted: false,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    logOutAction: (state) => {
      dropToken();
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.isAdmin = false;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
      saveVolume(action.payload);
    },
    setTheme: (state, action: PayloadAction<theme>) => {
      state.theme = action.payload;
      saveTheme(action.payload);
    },
    setLevelAction: (state, action: PayloadAction<number>) => {
      saveLevel(action.payload);
      state.currentLevel = action.payload;
    },
    setPlayerMuted: (state, action: PayloadAction<boolean>) => {
      state.isPlayerMuted = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.username = parseJwt(getToken()).username;
        state.isDataLoading = true;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isAdmin = Boolean(parseJwt(getToken()).isAdmin);
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAdmin = false;
      })
      .addCase(registrationAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(registrationAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isAdmin = Boolean(parseJwt(getToken()).isAdmin);
        state.username = action.payload.username;
        state.records = action.payload.records;
        state.email = action.payload.email;
      })
      .addCase(registrationAction.rejected, (state) => {
        state.isLoadingError = true;
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAdmin = false;
      })
      .addCase(loginAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isAdmin = Boolean(parseJwt(getToken()).isAdmin);
        state.username = action.payload.username;
        state.records = action.payload.records;
        state.email = action.payload.email;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoadingError = true;
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAdmin = false;
      })
      .addCase(getUserDataAction.fulfilled, (state, action) => {
        state.records = action.payload.records;
        state.language = action.payload.language;
        i18n.changeLanguage(action.payload.language);
        saveLanguage(action.payload.language);
      })
      .addCase(setUserDataAction.pending, (state, action) => {
        if(!action.meta.arg.username || action.meta.arg.username===state.username){
          state.records = action.meta.arg.records;
          if(action.meta.arg.language) {
            i18n.changeLanguage(action.meta.arg.language);
            saveLanguage(action.meta.arg.language);
          }
        }
      })
      .addCase(setUserDataAction.fulfilled, (state, action) => {
        if(!action.meta.arg.username || action.meta.arg.username===state.username) {
          state.records = action.payload.records;
          if(action.payload.language) {
            state.language = action.payload.language;
            i18n.changeLanguage(action.payload.language);
            saveLanguage(action.payload.language);
          }
        }
      })
      .addCase(changeUsernameAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(changeUsernameAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isAdmin = Boolean(parseJwt(getToken()).isAdmin);
        state.username = action.payload.username;
      })
      .addCase(changeUsernameAction.rejected, (state) => {
        state.isDataLoading = false;
      })
  }
})

export const { logOutAction, setVolume, setTheme, setLevelAction, setPlayerMuted } = userProcess.actions;

