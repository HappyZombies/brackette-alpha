import * as bcrypt from "bcrypt-nodejs";

export const generateHash = (password: string) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const validPassword = (password: string, hashedPassword: string) => bcrypt.compareSync(password, hashedPassword);

