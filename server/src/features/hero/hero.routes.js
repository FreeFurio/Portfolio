import { Router } from 'express';
import { getHero, updateHero } from './hero.controller.js';
import { requireAuth } from '../../shared/middleware/auth.js';

const router = Router();

router.get('/', getHero);
router.put('/', requireAuth, updateHero);

export default router;
