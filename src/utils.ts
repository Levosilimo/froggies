import {TokenPayload} from "./types/auth-data";

export function debounce<F extends Function>(func: F, delay: number):F {
  let timeoutID: number;
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutID);
    const context = this;
    timeoutID = window.setTimeout(function () {
      func.apply(context, args);
    }, delay);
  } as any;
}

export function parseJwt(token: string): TokenPayload {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
