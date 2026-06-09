import webpush from 'web-push';

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY!;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY!;
const vapidSubject = process.env.VAPID_SUBJECT!;

if (vapidPublicKey && vapidPrivateKey && vapidSubject) {
  webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
} else {
  console.warn('⚠️ Chiavi VAPID non configurate, le notifiche push non funzioneranno');
}

export async function sendPushNotification(subscriptionJson: string, payload: object) {
  try {
    const subscription = JSON.parse(subscriptionJson);
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return true;
  } catch (err: any) {
    if (err.statusCode === 410 || err.statusCode === 404) {
      // Sottoscrizione scaduta o non valida, restituisce false per farla rimuovere
      return false;
    }
      console.error('[PUSH ERROR] Dettagli:', {
      message: err.message,
      statusCode: err.statusCode,
      body: err.body,
      stack: err.stack?.split('\n').slice(0,3).join('\n')
    });
    throw err;
  }
}