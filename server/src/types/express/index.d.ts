import { IUser } from '../../interfaces/IUser';
declare global {
  namespace Express {
    interface Request {
      currentUser?: IUser;
    }
  }
}
