import dependencyInjector from './dependencyInjector';
import expressLoader from './expressLoader';
import logger from './logger';
import objectionLoader from './objectionLoader';

export default async ({ expressApp }) => {
  logger.info('✌️ Starting...');
  const models = await objectionLoader();
  logger.info('✌️ Objection ORM loaded!');

  await dependencyInjector(models);
  logger.info('✌️ Dependency Injections... injected!');
  await expressLoader({ app: expressApp });
  logger.info('✌️ Express loaded!');
};
