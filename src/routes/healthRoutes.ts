import express from 'express';
import * as healthController from '../controllers/healthController';

const router = express.Router();

// GET health check
router.get('/', healthController.checkHealth);

export default router;
