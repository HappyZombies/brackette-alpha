import { IRestController, IController } from "../RestController";
import UsersControllerGets from "./get";

class UsersControllers implements IRestController {
  create: IController = null;
  get: UsersControllerGets = new UsersControllerGets();
  update: IController = null;
  delete: IController = null;
}

export default UsersControllers;
