import express from 'express';
import loggerTestController from '../controllers/LoggerTestController.js';

const router = express.Router();

router.get('/', loggerTestController.testLogs);

export default router;
