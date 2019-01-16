import { IRestController, IController } from "../RestController";
import UsersControllerGets from "./get";
import UsersControllerCreates from "./create";

class UsersControllers implements IRestController {
  create: UsersControllerCreates = new UsersControllerCreates();
  get: UsersControllerGets = new UsersControllerGets();
  update: IController = null;
  delete: IController = null;
}

export default UsersControllers;
