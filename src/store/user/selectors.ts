import { State } from "../state";
import { AuthorizationStatus, NameSpace } from "../../constants";

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getIsDataLoadedValue = (state: State): boolean => state[NameSpace.User].isDataLoaded;
export const getLoadingError = (state: State): boolean => state[NameSpace.User].isLoadingError;
export const getUserAvatar = (state: State): string | null => state[NameSpace.User].userAvatar;
export const getIsAdmin = (state: State): boolean | undefined => state[NameSpace.User].isAdmin;
