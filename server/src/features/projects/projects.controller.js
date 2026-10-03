import { fetchProjects, fetchProject, addProject, editProject, removeProject, setFeatured } from './projects.service.js';

export async function getProjects(req, res) {
  const data = await fetchProjects();
  res.json({ success: true, message: 'OK', data, errors: [] });
}

export async function getProject(req, res) {
  const data = await fetchProject(req.params.id);
  res.json({ success: true, message: 'OK', data, errors: [] });
}

export async function createProject(req, res) {
  const data = await addProject(req.body);
  res.status(201).json({ success: true, message: 'Project created', data, errors: [] });
}

export async function updateProject(req, res) {
  const data = await editProject(req.params.id, req.body);
  res.json({ success: true, message: 'Project updated', data, errors: [] });
}

export async function deleteProject(req, res) {
  await removeProject(req.params.id);
  res.status(204).send();
}

export async function featureProject(req, res) {
  const data = await setFeatured(req.params.id);
  res.json({ success: true, message: 'Featured project updated', data, errors: [] });
}
