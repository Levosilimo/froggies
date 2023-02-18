import { State } from "../state";
import { AuthorizationStatus, NameSpace } from "../../constants";

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getIsDataLoadedValue = (state: State): boolean => state[NameSpace.User].isDataLoaded;
export const getLoadingError = (state: State): boolean => state[NameSpace.User].isLoadingError;
