import { Middleware } from '@reduxjs/toolkit';
import { browserHistory } from '../browser-history';
import { rootReducer } from './root-reduser';
import {Action} from "./action";

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === Action.REDIRECT_TO_ROUTE) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
