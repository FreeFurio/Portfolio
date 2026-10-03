import { db } from '../../shared/config/firebase.js';

const heroRef = db.collection('hero').doc('main');

export async function getHero() {
  const snap = await heroRef.get();
  return snap.exists ? snap.data() : null;
}

export async function updateHero(data) {
  await heroRef.set(data, { merge: true });
  return (await heroRef.get()).data();
}
