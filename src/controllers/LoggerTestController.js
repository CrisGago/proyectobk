import logger from '../utils/logger.js';

const testLogs = (req, res) => {
  logger.error('Error log');
  logger.warn('Warn log');
  logger.info('Info log');
  logger.http('http log');
  logger.verbose('verbose log');
  logger.debug('Debug log');
  logger.silly('Silly log');
  res.send('Logs de prueba enviados');

};

export default { testLogs };
