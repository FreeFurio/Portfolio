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
  title: 'Urban Brew — Static Website',
  description: 'Designed and developed a static website for Urban Brew Tarlac. Focused on UI/UX design and mobile responsiveness.',
  tech: ['JavaScript', 'CSS', 'HTML'],
  githubUrl: '',
  liveUrl: '',
  createdAt: new Date().toISOString(),
});

console.log('Urban Brew seeded.');
process.exit(0);
