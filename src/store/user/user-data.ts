import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, NameSpace} from "../../constans";
import {checkAuthAction, loginAction, registrationAction} from "../api-action";
import {dropToken, getToken, saveUserData} from "../../services/local-storage";

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  userAvatar: string | null;
  isAdmin: boolean | undefined;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  userAvatar: null,
  isAdmin: false
};

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    logOutAction: (state) => {
      dropToken();
      state.userAvatar = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.isAdmin = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isAdmin = Boolean(parseJwt(getToken()).isAdmin);
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAdmin = false;
      })
      .addCase(registrationAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        saveUserData({
          username: action.payload.username,
          email: action.payload.email
        })
        state.isAdmin = Boolean(parseJwt(getToken()).isAdmin);
      })
      .addCase(registrationAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAdmin = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        saveUserData({
          username: action.payload.username,
          email: action.payload.email
        })
        state.isAdmin = Boolean(parseJwt(getToken()).isAdmin);
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAdmin = false;
      })
  }
})

export const { logOutAction } = userProcess.actions;

