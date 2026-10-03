import { Router } from 'express';
import { getSkills, updateSkills } from './skills.controller.js';
import { requireAuth } from '../../shared/middleware/auth.js';

const router = Router();

router.get('/', getSkills);
router.put('/', requireAuth, updateSkills);

export default router;
