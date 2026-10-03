import { submitMessage, fetchMessages, removeMessage } from './contact.service.js';

export async function postMessage(req, res) {
  const data = await submitMessage(req.body);
  res.status(201).json({ success: true, message: 'Message sent', data, errors: [] });
}

export async function getMessages(req, res) {
  const data = await fetchMessages();
  res.json({ success: true, message: 'OK', data, errors: [] });
}

export async function deleteMessage(req, res) {
  await removeMessage(req.params.id);
  res.status(204).send();
}
