import 'dotenv/config';
import admin from 'firebase-admin';

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = admin.firestore(app);

await db.collection('projects').add({
  title: 'AI-Powered Digital Marketing System',
  description: 'A comprehensive full-stack application that combines AI content generation, SEO analysis, design tools, and automated social media posting.',
  tech: [
    'React 18', 'Vite', 'CSS3', 'Socket.io',
    'Node.js', 'Express', 'OpenAI API', 'Firebase',
    'Facebook Graph API', 'Twitter API v2', 'Axios'
  ],
  githubUrl: 'https://github.com/FreeFurio/System',
  liveUrl: '',
  createdAt: new Date().toISOString(),
});

console.log('Project seeded.');
process.exit(0);
