import { db } from '../../shared/config/firebase.js';

const messagesCol = db.collection('messages');

export async function saveMessage(data) {
  const ref = await messagesCol.add({ ...data, createdAt: new Date().toISOString() });
  return { id: ref.id, ...data };
}

export async function getAllMessages() {
  const snap = await messagesCol.orderBy('createdAt', 'desc').get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deleteMessage(id) {
  await messagesCol.doc(id).delete();
}
