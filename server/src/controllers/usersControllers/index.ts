import { IRestController, IController } from "../RestController";
import UsersControllerGets from "./get";
import UsersControllerCreates from "./create";
import UsersControllerUpdates from './update';

class UsersControllers implements IRestController {
  create: UsersControllerCreates = new UsersControllerCreates();
  get: UsersControllerGets = new UsersControllerGets();
  update: UsersControllerUpdates = new UsersControllerUpdates();
  delete: IController = null;
}

export default UsersControllers;
