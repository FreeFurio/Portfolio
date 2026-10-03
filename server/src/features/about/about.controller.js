import { fetchAbout, editAbout } from './about.service.js';

export async function getAbout(req, res) {
  const data = await fetchAbout();
  res.json({ success: true, message: 'OK', data, errors: [] });
}

export async function updateAbout(req, res) {
  const data = await editAbout(req.body);
  res.json({ success: true, message: 'About updated', data, errors: [] });
}
