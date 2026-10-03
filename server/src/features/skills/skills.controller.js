import { fetchSkills, editSkills } from './skills.service.js';

export async function getSkills(req, res) {
  const data = await fetchSkills();
  res.json({ success: true, message: 'OK', data, errors: [] });
}

export async function updateSkills(req, res) {
  const data = await editSkills(req.body);
  res.json({ success: true, message: 'Skills updated', data, errors: [] });
}
