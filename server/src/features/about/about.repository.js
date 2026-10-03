import { db } from '../../shared/config/firebase.js';

const aboutRef = db.collection('about').doc('main');

export async function getAbout() {
  const snap = await aboutRef.get();
  return snap.exists ? snap.data() : null;
}

export async function updateAbout(data) {
  await aboutRef.set(data, { merge: true });
  return (await aboutRef.get()).data();
}
