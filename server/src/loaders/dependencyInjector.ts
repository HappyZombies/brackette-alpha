import { Container } from 'typedi';
import logger from './logger';

export default (models) => {
  try {
    Container.set('logger', logger);

    logger.info('✌️ Logger injected into container.');

    models.forEach((m) => {
      Container.set(m.name, m.model);
      logger.info(`✌️ Model '${m.name}' was injected into container.`);
    });

    return;
  } catch (e) {
    logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
