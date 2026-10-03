import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from './projects.repository.js';
import { NotFoundError } from '../../shared/middleware/errorHandler.js';

export async function fetchProjects() {
  return getAllProjects();
}

export async function fetchProject(id) {
  const project = await getProjectById(id);
  if (!project) throw new NotFoundError('Project not found');
  return project;
}

export async function addProject(data) {
  return createProject(data);
}

export async function editProject(id, data) {
  await fetchProject(id);
  return updateProject(id, data);
}

export async function removeProject(id) {
  await fetchProject(id);
  await deleteProject(id);
}

export async function setFeatured(id) {
  // unfeature all, then feature the selected one
  const projects = await getAllProjects();
  await Promise.all(projects.map((p) => updateProject(p.id, { ...p, featured: p.id === id })));
  return fetchProject(id);
}
