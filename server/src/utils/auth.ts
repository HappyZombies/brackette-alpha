import * as bcrypt from "bcrypt-nodejs";

export const generateHash = (password: string): string =>
  password ? bcrypt.hashSync(password, bcrypt.genSaltSync(8)) : "";

export const validPassword = (password: string, hashedPassword: string): boolean =>
  bcrypt.compareSync(password, hashedPassword);
