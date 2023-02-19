import { State } from "../state";
import { AuthorizationStatus, NameSpace } from "../../constants";
import {language, theme} from "../../types/user-data";

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getIsDataLoadedValue = (state: State): boolean => state[NameSpace.User].isDataLoaded;
export const getLanguage = (state: State): language | undefined => state[NameSpace.User].language;
export const getVolume = (state: State): number => state[NameSpace.User].volume;
export const getTheme = (state: State): theme => state[NameSpace.User].theme;
export const getLoadingError = (state: State): boolean => state[NameSpace.User].isLoadingError;
