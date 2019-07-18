import expressLoader from "./express";
import objectionLoader from "./objection";
import dependencyInjector from "./dependencyInjector";
import Logger from "./logger";

export default async ({ expressApp }) => {
  Logger.info("✌️ Starting...");
  const models = await objectionLoader();
  Logger.info("✌️ Objection ORM loaded!");

  await dependencyInjector(models);
  Logger.info("✌️ Dependency Injections... injected!");
  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded!");
};
