import { PrismaClient } from '@prisma/client';
import webpush from 'web-push';

const prisma = new PrismaClient();

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY!;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY!;
const vapidSubject = process.env.VAPID_SUBJECT!;

webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

async function main() {
  // Sostituisci con lo username dell'utente DUE (quello su Chrome)
  const username = 'test_b';

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !user.push_subscription) {
    console.error('Utente non trovato o nessuna subscription salvata');
    return;
  }

  const subscription = JSON.parse(user.push_subscription);
  console.log('Subscription trovata:', subscription);

  const payload = {
    title: 'Test push manuale',
    body: 'Questo è un test diretto',
    senderId: user.id,
  };

  try {
    const result = await webpush.sendNotification(subscription, JSON.stringify(payload));
    console.log('Push inviata con successo!', result?.statusCode);
  } catch (err: any) {
    console.error('ERRORE PUSH:', err.message);
    if (err.body) console.error('Body:', err.body);
    if (err.statusCode) console.error('Status:', err.statusCode);
    console.error('Stack:', err.stack?.split('\n').slice(0, 3).join('\n'));
  }

  await prisma.$disconnect();
}

main();