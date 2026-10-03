import { getVersion, setVersion } from './version.repository.js';

export async function fetchVersion() {
  return getVersion();
}

export async function updateVersion(version) {
  return setVersion(version);
}
