

import ApplicationConfigs, { Config } from "./config";
import { logger } from "./utils/logger"
import app from "./app";
const PORT: number = 3000;

app.listen(PORT, (err) => {
    if (err) {
        logger.error(err);
        throw err;
    }
    logger.info(`Express Server is listening at port -> ${PORT}`);

})
const environment: Config = ApplicationConfigs[process.env.NODE_ENV];
