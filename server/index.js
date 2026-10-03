import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errorHandler } from './src/shared/middleware/errorHandler.js';
import heroRoutes from './src/features/hero/hero.routes.js';
import aboutRoutes from './src/features/about/about.routes.js';
import projectsRoutes from './src/features/projects/projects.routes.js';
import skillsRoutes from './src/features/skills/skills.routes.js';
import contactRoutes from './src/features/contact/contact.routes.js';
import versionRoutes from './src/features/version/version.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Server is running', data: null, errors: [] });
});

app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/version', versionRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
