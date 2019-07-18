import { Service, Inject } from "typedi";
import * as jsonwebtoken from "jsonwebtoken";
import * as HttpStatus from "http-status-codes";

import {
  IUser,
  IUserCreateDTO,
  IUserUpdatePasswordDTO,
  IUserUpdateDTO,
  IUserLoginDTO,
  IUserMaximum
} from "./../interfaces/IUser";
import { generateHash, ExpressError, validPassword } from "../utils";
import config from "../config";
import UserService from "./UserService";
import TokenService from "./TokenService";
import user from "api/routes/api/user";

@Service()
class AuthService {
  constructor(
    @Inject("logger") private logger,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  public async getUser(id: string) {
    let user;
    try {
      user = await this.userService.findById(id);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    if (!user) {
      // really the user was not found, but throw invalid credentials
      throw ExpressError("Invalide Credentials.", HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  public async register(
    newUserDTO: IUserCreateDTO
  ): Promise<{ user: IUser; accessToken: string }> {
    let newUser;
    let token;

    // check if the token is valid or taken already.
    try {
      token = await this.tokenService.isTokenAvailable(newUserDTO.token);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    if (!token) {
      throw ExpressError(
        "This token is incorrect or has been used already.",
        HttpStatus.UNAUTHORIZED
      );
    }

    // username taken?
    let available: boolean;
    try {
      available = await this.userService.isUsernameAvailable(
        newUserDTO.username
      );
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    if (!available) {
      throw ExpressError(
        "A user with this username already exists.",
        HttpStatus.CONFLICT
      );
    }

    // email taken?
    try {
      newUser = await this.userService.findByEmail(newUserDTO.email);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    if (newUser) {
      throw ExpressError(
        "A user with this email already exists.",
        HttpStatus.CONFLICT
      );
    }

    // all is good, continue with creating the user.
    newUserDTO.password = generateHash(newUserDTO.password);
    try {
      newUser = await this.userService.createNew(newUserDTO);
      // update the token with the new user id
      await this.tokenService.addUserToToken(newUser.id, newUserDTO.token);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    const accessToken = jsonwebtoken.sign({ data: newUser }, config.JWT_SECRET);
    Reflect.deleteProperty(newUser, "password");
    return { user: newUser, accessToken };
  }

  public async login(
    userLoginDTO: IUserLoginDTO
  ): Promise<{ user: IUser; accessToken: string }> {
    let user: IUserMaximum;
    try {
      user = await this.userService.findByUsername(userLoginDTO.username);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    if (!user) {
      // this user does not exist, but throw the same error message anyways.
      throw ExpressError(
        "Incorrect username and/or password.",
        HttpStatus.UNAUTHORIZED
      );
    }
    // the user does exist, so check password
    if (!validPassword(userLoginDTO.password, user.password)) {
      throw ExpressError(
        "Incorrect username and/or password.",
        HttpStatus.UNAUTHORIZED
      );
    }
    // TODO: eventually...store things like ip address, # of logins, etc.
    Reflect.deleteProperty(user, "password");
    const token = jsonwebtoken.sign({ data: user }, config.JWT_SECRET);
    return { user, accessToken: token };
  }

  public async updatePassword(
    currentUser: IUser,
    userPasswordDTO: IUserUpdatePasswordDTO
  ): Promise<boolean> {
    let user;
    if (userPasswordDTO.newPassword !== userPasswordDTO.newPasswordConfirm) {
      throw ExpressError("Password must match.", HttpStatus.BAD_REQUEST);
    }
    try {
      user = await this.userService.findByUsername(currentUser.username);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    if (!validPassword(userPasswordDTO.password, user.password)) {
      throw ExpressError("Unauthorized to do this.", HttpStatus.UNAUTHORIZED);
    }
    const newPassword = generateHash(userPasswordDTO.newPassword);
    return await this.userService.updatePasswordByUsername(
      user.username,
      newPassword
    );
  }

  public async updateUser(
    currentUser: IUser,
    userUpdateDTO: IUserUpdateDTO
  ): Promise<{ user: IUser; accessToken: string }> {
    let user;
    if (userUpdateDTO.username) {
      //trying to update username, check if it's valid
      let available;
      try {
        available = await this.userService.isUsernameAvailable(
          userUpdateDTO.username
        );
      } catch (err) {
        this.logger.error(err);
        throw err;
      }
      if (!available) {
        throw ExpressError("Username is taken.", 409);
      }
    }
    user = await this.userService.updateByUsername(
      currentUser.username,
      userUpdateDTO
    );
    const accessToken = jsonwebtoken.sign({ data: user }, config.JWT_SECRET);
    return { user, accessToken };
  }
}

export default AuthService;
