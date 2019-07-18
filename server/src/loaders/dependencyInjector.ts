import { Container } from "typedi";
import LoggerInstance from "./logger";

export default models => {
  try {
    Container.set("logger", LoggerInstance);

    LoggerInstance.info("✌️ Logger injected into container.");

    models.forEach(m => {
      Container.set(m.name, m.model);
      LoggerInstance.info(`✌️ Model '${m.name}' was injected into container.`);
    });

    return;
  } catch (e) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};
