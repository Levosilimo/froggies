import {State} from "../state";
import {AuthorizationStatus, NameSpace} from "../../constans";

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserAvatar = (state: State): string | null => state[NameSpace.User].userAvatar;
