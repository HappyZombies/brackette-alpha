import { IRestController, IController } from "../RestController";
import SomeRouterGets from "./get";

class SomeRoutesControllers implements IRestController {
  create: IController = null;
  get: SomeRouterGets = new SomeRouterGets();
  update: IController = null;
  delete: IController = null;
}

export default SomeRoutesControllers;
