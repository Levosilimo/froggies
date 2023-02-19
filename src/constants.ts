export const DEVELOPERS = [
  {
    name: 'Ivanou Andrei',
    linkPath: 'https://github.com/anjinsan132131'
  },
  {
    name: 'Alexander Mikheev',
    linkPath: 'https://github.com/solidrules'
  },
  {
    name: 'Lev Sylin',
    linkPath: 'https://github.com/Levosilimo'
  }
];

export const MAIL_REG_EXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const ERROR_MESSAGE = {
  USERNAME: 'This field is required',
  EMAIL: 'Invalid e-mail',
  LOGIN: 'This field is required',
  PASSWORD: 'Should contain min 6 symbols',
};

export const serverURL: string = 'https://rsclone-backend.adaptable.app'

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum APIRoute {
  Login = '/login',
  CheckAuth = '/check-auth',
  Registration = '/register',
  GetRecords = '/records',
  Levels = '/levels',
  Avatar = '/avatar',
  User = '/user'
}

export enum NameSpace {
  Game = 'GAME',
  User = 'USER',
}
