import { State } from "../state";
import { AuthorizationStatus, NameSpace } from "../../constans";

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUsername = (state: State): string | undefined => state[NameSpace.User].username;
export const getRecords = (state: State): Record<string, Array<number>> | undefined => state[NameSpace.User].records;
export const getCurrentLevel = (state: State): number => state[NameSpace.User].currentLevel;
export const getIsDataLoadingValue = (state: State): boolean => state[NameSpace.User].isDataLoading;
export const getLoadingError = (state: State): boolean => state[NameSpace.User].isLoadingError;
