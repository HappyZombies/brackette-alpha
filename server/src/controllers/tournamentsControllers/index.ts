import { IRestController, IController } from "../RestController";
import TournamentsControllerGets from "./get";
import TournamentsControllerCreates from "./create";

class TournamentControllers implements IRestController {
  get: TournamentsControllerGets = new TournamentsControllerGets();
  create: TournamentsControllerCreates = new TournamentsControllerCreates();
  update: IController;
  delete: IController;
}

export default TournamentControllers;
