import { saveMessage, getAllMessages, deleteMessage } from './contact.repository.js';
import { NotFoundError } from '../../shared/middleware/errorHandler.js';

export async function submitMessage(data) {
  return saveMessage(data);
}

export async function fetchMessages() {
  return getAllMessages();
}

export async function removeMessage(id) {
  const messages = await getAllMessages();
  if (!messages.find((m) => m.id === id)) throw new NotFoundError('Message not found');
  await deleteMessage(id);
}
