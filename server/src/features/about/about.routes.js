import { Router } from 'express';
import { getAbout, updateAbout } from './about.controller.js';
import { requireAuth } from '../../shared/middleware/auth.js';

const router = Router();

router.get('/', getAbout);
router.put('/', requireAuth, updateAbout);

export default router;
