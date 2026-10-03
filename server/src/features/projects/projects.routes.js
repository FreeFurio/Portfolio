import { Router } from 'express';
import { getProjects, getProject, createProject, updateProject, deleteProject, featureProject } from './projects.controller.js';
import { requireAuth } from '../../shared/middleware/auth.js';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', requireAuth, createProject);
router.put('/:id', requireAuth, updateProject);
router.delete('/:id', requireAuth, deleteProject);
router.patch('/:id/feature', requireAuth, featureProject);

export default router;
