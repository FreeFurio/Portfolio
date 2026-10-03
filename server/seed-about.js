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

await db.collection('about').doc('main').set({
  bio: "I'm a Full-Stack Developer from Tarlac City, Philippines with over a year of hands-on experience building web applications. I enjoy working across the entire stack — from designing clean interfaces to architecting reliable backends. I'm currently open to freelance projects, collaborations, and full-time opportunities.",
  photoUrl: '',
});

console.log('About updated.');
process.exit(0);
