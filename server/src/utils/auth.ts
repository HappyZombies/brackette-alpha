import * as bcrypt from "bcrypt-nodejs";

export const generateHash = (password: string): string =>
  password ? bcrypt.hashSync(password, bcrypt.genSaltSync(8)) : "";

export const validPassword = (
  password: string,
  hashedPassword: string
): boolean => bcrypt.compareSync(password, hashedPassword);

export const rand = () =>
  Math.random()
    .toString(36)
    .substr(2); // remove `0.`

export const generateToken = () => {
  return rand() + rand(); // to make it longer
};
