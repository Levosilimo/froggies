import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from "../../constants";
import {checkAuthAction, getUserDataAction, loginAction, registrationAction, setUserDataAction} from "../api-action";
import {language, theme} from "../../types/user-data";
import i18n from "../../i18n";
import {
  dropToken,
  getLanguage,
  getLevel,
  getToken,
  getVolume,
  saveLanguage,
  saveLevel, saveVolume
} from "../../services/local-storage";
import {parseJwt} from "../../utils";

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  isDataLoading: boolean;
  username?: string;
  email?: string;
  records?: Record<string, Array<number>>;
  currentLevel: number;
  isLoadingError: boolean,
  language?: language;
  volume: number;
  theme: theme;
  isPlayerMuted: boolean;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
  isLoadingError: false,
  volume: getVolume(),
  theme: "green",
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
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
      saveVolume(action.payload);
    },
    setTheme: (state, action: PayloadAction<theme>) => {
      state.theme = action.payload;
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
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(registrationAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(registrationAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.username = action.payload.username;
        state.records = action.payload.records;
        state.email = action.payload.email;
      })
      .addCase(registrationAction.rejected, (state) => {
        state.isLoadingError = true;
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.username = action.payload.username;
        state.records = action.payload.records;
        state.email = action.payload.email;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoadingError = true;
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(getUserDataAction.fulfilled, (state, action) => {
        state.records = action.payload.records;
        state.language = action.payload.language;
        i18n.changeLanguage(action.payload.language);
        saveLanguage(action.payload.language);
      })
      .addCase(setUserDataAction.pending, (state, action) => {
        if(action.meta.arg.language) {
          state.records = action.meta.arg.records;
          state.language = action.meta.arg.language;
          i18n.changeLanguage(action.meta.arg.language);
          saveLanguage(action.meta.arg.language);
        }
      })
      .addCase(setUserDataAction.fulfilled, (state, action) => {
        state.records = action.payload.records;
        state.language = action.payload.language;
        i18n.changeLanguage(action.payload.language);
        saveLanguage(action.payload.language);
      })
  }
})

export const { logOutAction, setVolume, setTheme, setLevelAction, setPlayerMuted } = userProcess.actions;

