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
  title: 'DocTrack — Online Document Tracking System',
  description: 'A document tracking system built for Tarlac State University\'s OMIS office. Enables paperless document routing, real-time tracking, QR code scanning, and full audit trail across departments.',
  tech: ['ASP.NET Core', 'Blazor', 'C#', 'Microsoft SQL Server'],
  githubUrl: 'https://github.com/FreeFurio/DocTracking',
  liveUrl: '',
  createdAt: new Date().toISOString(),
});

console.log('Project seeded.');
process.exit(0);
