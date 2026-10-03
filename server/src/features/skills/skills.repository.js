import { db } from '../../shared/config/firebase.js';

const skillsRef = db.collection('skills').doc('main');

export async function getSkills() {
  const snap = await skillsRef.get();
  return snap.exists ? snap.data() : null;
}

export async function updateSkills(data) {
  await skillsRef.set(data, { merge: true });
  return (await skillsRef.get()).data();
}
