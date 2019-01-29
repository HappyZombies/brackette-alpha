import { IRestController, IController } from "../RestController";
import TokenControllerCreates from "./create";

class TokenControllers implements IRestController {
    create: TokenControllerCreates = new TokenControllerCreates();
    get: IController = null;
    update: IController = null;
    delete: IController = null;
}

export default TokenControllers;
