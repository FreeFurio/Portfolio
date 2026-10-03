import { getHero, updateHero } from './hero.repository.js';
import { NotFoundError } from '../../shared/middleware/errorHandler.js';

export async function fetchHero() {
  const hero = await getHero();
  if (!hero) throw new NotFoundError('Hero not found');
  return hero;
}

export async function editHero(data) {
  return updateHero(data);
}
