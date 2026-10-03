import { getSkills, updateSkills } from './skills.repository.js';
import { NotFoundError } from '../../shared/middleware/errorHandler.js';

export async function fetchSkills() {
  const skills = await getSkills();
  if (!skills) throw new NotFoundError('Skills not found');
  return skills;
}

export async function editSkills(data) {
  return updateSkills(data);
}
