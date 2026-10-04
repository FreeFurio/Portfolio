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

const doc = await db.collection('about').doc('main').get();
const data = doc.data();

if (data?.stats) {
  const updated = data.stats.map((s) =>
    s.label === 'Years Experience' || s.label === 'Years of Programming Experience' ? { ...s, label: 'Yrs of Programming' } : s
  );
  await db.collection('about').doc('main').update({ stats: updated });
  console.log('Updated stat label in Firebase.');
} else {
  console.log('No stats found in Firebase — default will be used.');
}

process.exit(0);
