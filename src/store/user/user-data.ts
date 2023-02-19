import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from "../../constants";
import {checkAuthAction, getUserDataAction, loginAction, registrationAction, setUserDataAction} from "../api-action";
import { dropToken, saveUserData } from "../../services/local-storage";
import {language, theme} from "../../types/user-data";
import i18n from "../../i18n";

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  isLoadingError: boolean,
  language?: language;
  volume: number;
  theme: theme;
  records?: Record<string, Array<number>>;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  isLoadingError: false,
  volume: 50,
  theme: "green",
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
    },
    setTheme: (state, action: PayloadAction<theme>) => {
      state.theme = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.isDataLoaded = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.isDataLoaded = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(registrationAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(registrationAction.fulfilled, (state, action) => {
        state.isDataLoaded = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        saveUserData({
          username: action.payload.username,
          email: action.payload.email
        })
      })
      .addCase(registrationAction.rejected, (state) => {
        state.isLoadingError = true;
        state.isDataLoaded = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isDataLoaded = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        saveUserData({
          username: action.payload.username,
          email: action.payload.email
        })
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoadingError = true;
        state.isDataLoaded = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(getUserDataAction.fulfilled, (state, action) => {
        state.records = action.payload.records;
        state.language = action.payload.language;
        i18n.changeLanguage(action.payload.language);
      })
      .addCase(setUserDataAction.pending, (state, action) => {
        state.records = action.meta.arg.records;
        state.language = action.meta.arg.language;
        i18n.changeLanguage(action.meta.arg.language);
      })
      .addCase(setUserDataAction.fulfilled, (state, action) => {
        state.records = action.payload.records;
        state.language = action.payload.language;
        i18n.changeLanguage(action.payload.language);
      })
  }
})

export const { logOutAction, setVolume, setTheme } = userProcess.actions;

