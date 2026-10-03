import { Router } from 'express';
import { getVersion, putVersion } from './version.controller.js';
import { requireAuth } from '../../shared/middleware/auth.js';

const router = Router();

router.get('/', getVersion);
router.put('/', requireAuth, putVersion);

export default router;
