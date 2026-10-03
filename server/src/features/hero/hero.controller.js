import { fetchHero, editHero } from './hero.service.js';

export async function getHero(req, res) {
  const data = await fetchHero();
  res.json({ success: true, message: 'OK', data, errors: [] });
}

export async function updateHero(req, res) {
  const data = await editHero(req.body);
  res.json({ success: true, message: 'Hero updated', data, errors: [] });
}
