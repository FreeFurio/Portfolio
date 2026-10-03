import { db } from '../../shared/config/firebase.js';

const projectsCol = db.collection('projects');

export async function getAllProjects() {
  const snap = await projectsCol.orderBy('createdAt', 'desc').get();
  const projects = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // featured project always first
  return [
    ...projects.filter((p) => p.featured),
    ...projects.filter((p) => !p.featured),
  ];
}

export async function getProjectById(id) {
  const snap = await projectsCol.doc(id).get();
  return snap.exists ? { id: snap.id, ...snap.data() } : null;
}

export async function createProject(data) {
  const ref = await projectsCol.add({ ...data, createdAt: new Date().toISOString() });
  return { id: ref.id, ...data };
}

export async function updateProject(id, data) {
  await projectsCol.doc(id).set(data, { merge: true });
  return { id, ...data };
}

export async function deleteProject(id) {
  await projectsCol.doc(id).delete();
}
