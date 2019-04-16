import { IRestController, IController } from "../RestController";
import TournamentsControllerGets from "./get";

class TournamentControllers implements IRestController {
  get: TournamentsControllerGets = new TournamentsControllerGets();
  create: IController;
  update: IController;
  delete: IController;
}

export default TournamentControllers;
