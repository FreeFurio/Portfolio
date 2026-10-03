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

async function seed() {
  await db.collection('hero').doc('main').set({
    name: 'Reeon Lance Tobia',
    title: 'Full-Stack Developer',
    tagline: 'I build things for the web. From the interface users see to the systems that power it — I handle the full stack.',
    ctaPrimary: 'View My Work',
    ctaSecondary: 'Get In Touch',
  });

  await db.collection('about').doc('main').set({
    bio: 'I am a Full-Stack Developer based in the Philippines.',
    photoUrl: '',
  });

  await db.collection('skills').doc('main').set({
    groups: [
      { label: 'Programming Languages', items: ['C#', 'JavaScript'] },
      { label: 'Frontend', items: ['HTML', 'CSS', 'React.js', 'Blazor', 'Responsive Web Design'] },
      { label: 'Backend', items: ['ASP.NET Core', 'Node.js'] },
      { label: 'APIs & Real-Time', items: ['REST APIs', 'GraphQL', 'WebSockets', 'SignalR'] },
      { label: 'Auth & Integration', items: ['Meta Authentication', 'Meta Graph API', 'API Integration'] },
      { label: 'Database', items: ['Microsoft SQL', 'Firebase'] },
      { label: 'Cloud & Deployment', items: ['Microsoft Azure', 'Railway'] },
      { label: 'Tools', items: ['Git', 'GitHub', 'Visual Studio', 'VS Code', 'Postman'] },
      { label: 'AI Integration', items: ['OpenAI API'] },
      { label: 'Familiar With', items: ['Next.js', 'Figma'] },
    ],
  });

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
