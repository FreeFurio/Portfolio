import { db } from '../../shared/config/firebase.js';

const versionRef = db.collection('settings').doc('version');

export async function getVersion() {
  const snap = await versionRef.get();
  return snap.exists ? snap.data() : { version: 'v1' };
}

export async function setVersion(version) {
  await versionRef.set({ version }, { merge: true });
  return { version };
}
