import { RestController, Controller } from "../RestController";
import SomeRouterGets from "./get";

class SomeRoutesControllers implements RestController {
  create: Controller = null;
  get: SomeRouterGets = new SomeRouterGets();
  update: Controller = null;
  delete: Controller = null;
}

export default SomeRoutesControllers;
