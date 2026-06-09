export const pushTranslations: Record<string, {
  account_activated: { title: string; body: string };
  new_registration: { title: string; body: string };
  message_audio: { title: string; body: string };
  message_text: { title: string; body: string };
  message_voice: { title: string; body: string };
  message_image: { title: string; body: string };
  message_video: { title: string; body: string };
  message_types: {
    image: string;
    video: string;
    audio: string;
    voice_note: string;
    encrypted: string;
  };
}> = {
  'it-IT': {
    account_activated: {
      title: 'Account attivato',
      body: 'Il tuo account è stato approvato. Ora puoi accedere a Ghost Chat.',
    },
    new_registration: {
      title: 'Nuova richiesta di registrazione',
      body: 'Utente "{{username}}" ha richiesto l’attivazione.',
    },
    message_audio: {
      title: 'Messaggio audio da {{sender}}',
      body: '🎵 Audio',
    },
    message_text: {
      title: 'Nuovo messaggio da {{sender}}',
      body: '{{preview}}',
    },
    message_voice: {
      title: 'Messaggio vocale da {{sender}}',
      body: '🎵 Messaggio vocale',
    },
    message_image: {
      title: 'Immagine da {{sender}}',
      body: '🖼️ Immagine',
    },
    message_video: {
      title: 'Video da {{sender}}',
      body: '🎬 Video',
    },
    message_types: {
      image: '🖼️ Immagine',
      video: '🎬 Video',
      audio: '🎵 Audio',
      voice_note: '🎵 Messaggio vocale',
      encrypted: '🔒 Messaggio cifrato',
    },
  },
  'en-US': {
    account_activated: {
      title: 'Account activated',
      body: 'Your account has been approved. You can now log in to Ghost Chat.',
    },
    new_registration: {
      title: 'New registration request',
      body: 'User "{{username}}" requested activation.',
    },
    message_audio: {
      title: 'Audio message from {{sender}}',
      body: '🎵 Audio',
    },
    message_text: {
      title: 'New message from {{sender}}',
      body: '{{preview}}',
    },
    message_voice: {
      title: 'Voice message from {{sender}}',
      body: '🎵 Voice message',
    },
    message_image: {
      title: 'Image from {{sender}}',
      body: '🖼️ Image',
    },
    message_video: {
      title: 'Video from {{sender}}',
      body: '🎬 Video',
    },
    message_types: {
      image: '🖼️ Image',
      video: '🎬 Video',
      audio: '🎵 Audio',
      voice_note: '🎵 Voice message',
      encrypted: '🔒 Encrypted message',
    },
  },
};