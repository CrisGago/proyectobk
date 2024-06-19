import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
    req.logger = developmentLogger;
    req.logger.http(`${new Date() .toDateString()} ${req.method} ${req.url}`);
    next();


    logger.error(`Error: ${err.message}`);
  res.status(500).send('Internal Server Error');


};


export default errorHandler;
