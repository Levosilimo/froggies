export type RegistrationData = {
  username: string;
  email: string;
  password: string;
  adminPassword?: string;
};

export type AuthData = {
  username: string;
  email: string;
  token: string;
  records: Record<string, Array<number>>;
};

export type ChangeUsernameRes = {
  username: string;
  token: string;
}

export type ChangeUsernameReq = {
  newUsername: string;
  password: string;
}

export type UserData = {
  username: string;
  email: string;
};

export type LoginData = {
  login: string;
  password: string;
}

export type TokenPayload = {
  username: string;
  isAdmin: boolean;
}

export type FieldAvailabilityMessage = {
  msg: string;
  isError: boolean
}
