import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from "../../constans";
import { checkAuthAction, loginAction, registrationAction } from "../api-action";
import { dropToken, saveUserData } from "../../services/local-storage";

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  userAvatar: string | null;
  isLoadingError: boolean,
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  userAvatar: null,
  isLoadingError: false,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    logOutAction: (state) => {
      dropToken();
      state.userAvatar = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
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
  }
})

export const { logOutAction } = userProcess.actions;

