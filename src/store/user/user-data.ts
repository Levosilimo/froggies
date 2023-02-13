import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from "../../constants";
import { checkAuthAction, loginAction, registrationAction } from "../api-action";
import { dropToken, saveUserData } from "../../services/local-storage";

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  isDataLoading: boolean;
  userAvatar: string | null;
  isLoadingError: boolean,
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
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
        saveUserData({
          username: action.payload.username,
          email: action.payload.email
        })
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
        saveUserData({
          username: action.payload.username,
          email: action.payload.email
        })
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoadingError = true;
        state.isDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
  }
})

export const { logOutAction } = userProcess.actions;

