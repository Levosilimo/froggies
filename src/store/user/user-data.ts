import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthorizationStatus, NameSpace} from "../../constans";
import {checkAuthAction, getUserDataAction, loginAction, registrationAction, setUserDataAction} from "../api-action";
import {dropToken, getLevel, getToken, saveLevel} from "../../services/local-storage";
import {TokenPayload} from "../../types/auth-data";
import {parseJwt} from "../../utils";

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  isDataLoading: boolean;
  username?: string;
  email?: string;
  records?: Record<string, Array<number>>;
  currentLevel: number
  isLoadingError: boolean,
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
  isLoadingError: false,
  currentLevel: getLevel(),
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    logOutAction: (state) => {
      dropToken();
      state.records = undefined;
      state.username = undefined;
      state.email = undefined;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    },
    setLevelAction: (state, action: PayloadAction<number>) => {
      saveLevel(action.payload);
      state.currentLevel = action.payload;
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
      .addCase(getUserDataAction.pending, (state) => {})
      .addCase(getUserDataAction.fulfilled, (state, action) => {
        state.records = action.payload.records;
      })
      .addCase(getUserDataAction.rejected, (state) => {})
      .addCase(setUserDataAction.pending, (state, action) => {
        state.records = action.meta.arg.records;
      })
      .addCase(setUserDataAction.fulfilled, (state, action) => {
        state.records = action.payload.records;
      })
      .addCase(setUserDataAction.rejected, (state) => {})
      /*.addCase(getLevelAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(getLevelAction.fulfilled, (state) => {
        state.isDataLoading = false;
      })
      .addCase(getLevelAction.rejected, (state) => {
        state.isLoadingError = true;
        state.isDataLoading = false;
      })*/
  }
})

export const { logOutAction, setLevelAction } = userProcess.actions;

