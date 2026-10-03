import { Router } from 'express';
import { postMessage, getMessages, deleteMessage } from './contact.controller.js';
import { requireAuth } from '../../shared/middleware/auth.js';

const router = Router();

router.post('/', postMessage);
router.get('/', requireAuth, getMessages);
router.delete('/:id', requireAuth, deleteMessage);

export default router;
