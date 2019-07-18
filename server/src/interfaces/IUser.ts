export interface IUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  admin: number;
  facebookKey: string;
  challongeKey: string;
  smashggKey: string;
}

export interface IUserMaximum {
  id: string;
  username: string;
  password: string;
  email: string;
  displayName: string;
  admin: number;
  facebookKey: string;
  challongeKey: string;
  smashggKey: string;
  updatedAt: string;
  createdAt: string;
}

export interface IUserMiminimum {
  username: string;
  displayName: string;
}

export interface IUserCreateDTO {
  username: string;
  email: string;
  token: string;
  displayName: string;
  password: string;
}

export interface IUserLoginDTO {
  username: string;
  password: string;
}

export interface IUserUpdateDTO {
  displayName: string;
  email: string;
  username: string;
  facebookKey: string;
  challongeKey: string;
  smashggKey: string;
}

export interface IUserUpdatePasswordDTO {
  username: string;
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}
