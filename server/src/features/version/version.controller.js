import { fetchVersion, updateVersion } from './version.service.js';

export async function getVersion(req, res) {
  const data = await fetchVersion();
  res.json({ success: true, message: 'OK', data, errors: [] });
}

export async function putVersion(req, res) {
  const { version } = req.body;
  const data = await updateVersion(version);
  res.json({ success: true, message: 'Version updated', data, errors: [] });
}
