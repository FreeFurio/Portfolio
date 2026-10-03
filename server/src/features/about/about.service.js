import { getAbout, updateAbout } from './about.repository.js';
import { NotFoundError } from '../../shared/middleware/errorHandler.js';

export async function fetchAbout() {
  const about = await getAbout();
  if (!about) throw new NotFoundError('About not found');
  return about;
}

export async function editAbout(data) {
  return updateAbout(data);
}
