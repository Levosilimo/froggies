import { State } from "../state";
import { AuthorizationStatus, NameSpace } from "../../constants";

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getIsDataLoadingValue = (state: State): boolean => state[NameSpace.User].isDataLoading;
export const getLoadingError = (state: State): boolean => state[NameSpace.User].isLoadingError;
