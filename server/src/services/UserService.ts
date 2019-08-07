import { Inject, Service } from 'typedi';
import {
  IUser,
  IUserCreateDTO,
  IUserMaximum,
  IUserMiminimum,
  IUserUpdateDTO,
} from './../interfaces/IUser';

@Service()
class UserService {
  constructor(
    @Inject('logger') private logger,
    @Inject('usersModel') private usersModel,
  ) {}

  public async findById(id: string): Promise<IUser> {
    let user;
    try {
      user = await this.usersModel
        .query()
        .findById(id)
        .first();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return user;
  }

  public async findAll(): Promise<IUserMiminimum[]> {
    let users;
    try {
      users = await this.usersModel.query().column('username', 'displayName');
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return users;
  }

  public async isUsernameAvailable(username: string): Promise<boolean> {
    let user;
    try {
      user = await this.findByUsername(username);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return user == null;
  }

  public async findByUsername(username: string = ''): Promise<IUserMaximum> {
    let user;
    try {
      user = await this.usersModel
        .query()
        .column('*')
        .where('username', username)
        .first();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return user;
  }

  public async findByEmail(email: string = ''): Promise<IUser> {
    let user;
    try {
      user = await this.usersModel
        .query()
        .column('*')
        .where('email', email)
        .first();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return user;
  }

  public async createNew(newUserDTO: IUserCreateDTO): Promise<IUser> {
    let newUser;
    try {
      newUser = await this.usersModel.query().insert(newUserDTO);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return newUser;
  }

  public async updateByUsername(
    username: string,
    userUpdateDTO: IUserUpdateDTO,
  ): Promise<IUser> {
    let user;
    try {
      user = await this.usersModel
        .query()
        .patch({ ...userUpdateDTO })
        .where('username', username)
        .first();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    if (!user) {
      return null;
    }
    // query by new username if the username was passed
    user = await this.findByUsername(
      userUpdateDTO.username ? userUpdateDTO.username : username,
    );
    Reflect.deleteProperty(user, 'password');
    return user;
  }

  public async updatePasswordByUsername(
    username: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      await this.usersModel
        .query()
        .patch({ password: hashedPassword })
        .where('username', username)
        .first();
    } catch (err) {
      this.logger.error(err);
      return false;
    }
    return true;
  }
}

export default UserService;
