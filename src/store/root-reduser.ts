import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constans';
import {userProcess} from "./user/user-data";


export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
});
