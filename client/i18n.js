// client/i18n.js – Internazionalizzazione leggera

const translations = {
  it: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: 'Talk local, chat global, anonymously',
    login_heading: 'Accedi',
    login_username_placeholder: 'Username',
    login_password_placeholder: 'Password',
    login_button: 'Accedi',
    login_no_account: 'Non hai un account?',
    login_register_link: 'Registrati',
    register_heading: 'Registrati',
    register_username_placeholder: 'Username',
    register_password_placeholder: 'Password',
    register_language_label: 'Lingua',
    register_api_key_placeholder: 'Chiave API Gemini (opzionale)',
    register_button: 'Registrati',
    register_has_account: 'Hai già un account?',
    register_login_link: 'Accedi',
    register_fields_required: 'Compila tutti i campi obbligatori',
    registration_pending: 'Registrazione completata. Attendi l\'approvazione dell\'amministratore.',

    // ========== Navigazione ==========
    nav_contacts: 'Contatti',
    nav_chats: 'Chat',
    nav_profile: 'Profilo',
    nav_translate: 'Traduci',

    // ========== Banner offline ==========
    offline_banner: '⚠️ Offline - In attesa di connessione...',

    // ========== Contatti ==========
    contacts_title: 'Contatti',
    add_contact_btn: 'Aggiungi contatto',
    requests_in: 'Richieste in arrivo',
    requests_out: 'Richieste inviate',
    no_contacts: 'Nessun contatto',
    pending_badge: 'In attesa',
    role_keyholder: 'Key-holder',
    role_guest: 'Guest',
    btn_accept: 'Accetta',
    btn_remove: 'Rimuovi',
    contacts_manage_btn: 'Contatti',
    new_chat_btn: 'Nuova chat',
    new_chat_modal_title: 'Nuova chat',
    contacts_modal_title: 'Contatti',
    confirm_delete_contact_message: 'Vuoi rimuovere {name} dai contatti?',
    confirm_delete_contact_msg: 'Vuoi rimuovere il contatto "{name}"?',
    contact_online: '● Online',
    contact_offline: '● Offline',
    add_contacts_title: 'Aggiungi contatti',
    btn_cancel: 'Annulla',
    btn_send_requests: 'Invia richieste',
    select_at_least_one: 'Seleziona almeno un utente',
    search_contacts_placeholder: 'Cerca contatti...',

    // --- Modale aggiungi contatto ---
    modal_title: 'Aggiungi contatto',
    search_placeholder: 'Cerca username...',
    btn_add: 'Aggiungi',
    btn_close: 'Chiudi',

    // ========== Chat ==========
    back_btn: '← Indietro',
    clear_chat_btn: 'Clear Chat',
    typing_indicator: 'sta scrivendo...',
    expiry_label: '⏳ Autodistruzione:',
    expiry_options: [
    { value: '0', text: 'Nessuna scadenza' },
    { value: '0.002777', text: '10 secondi' },
    { value: '0.0166667', text: '1 minuto' },
    { value: '0.0833333', text: '5 minuti' },
    { value: '1', text: '1 ora' },
    { value: '6', text: '6 ore' },
    { value: '12', text: '12 ore' },
    { value: '24', text: '24 ore' },
    { value: '168', text: '7 giorni' },
    ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> Parla',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> Detta',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> Ascolto',
    record_btn_release: '⏹ RILASCIA',
    text_input_placeholder: 'Scrivi',
    send_text_btn: 'Invia testo',
    send_text_sending: 'Invio in corso...',
    message_sent_confirm: 'Nuovo messaggio da {name}\n\n{text}\n\nAprire chat?',
    voice_note_confirm: 'Nuova nota vocale da {name}\n\nAprire chat?',
    confirm_image_message: 'Nuova immagine da {name}\n\nAprire chat?',
    confirm_video_message: 'Nuovo video da {name}\n\nAprire chat?',
    local_notification_voice_note: '🎵 Nota vocale',
    local_notification_image: '🖼️ Immagine',
    local_notification_video: '🎬 Video',
    voice_note_sent: '🎵 Nota vocale inviata',
    voice_note_listen: '▶️ Ascolta nota vocale',
    no_messages: 'Nessun messaggio',
    load_error: 'Errore caricamento messaggi',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 Ghost',
    individual_chat: '💬 Chat individuale',
    group_chat: '👥 Chat di gruppo',
    search_chats_placeholder: 'Cerca chat...',
    btn_delete: 'Cancella',
    confirm_delete_chat_msg: 'Vuoi chiudere la chat con "{name}"?',
    confirm_delete_message: 'Vuoi cancellare questo messaggio? Sparirà anche dalla chat del destinatario.',

    // --- Gruppi ---
    group_chat_modal_title: 'Crea chat di gruppo',
    group_chat_modal_subtitle: 'Seleziona i contatti online',
    group_create_btn: 'Crea gruppo',
    group_leave_btn: 'Esci',
    group_invite_title: 'Invito gruppo',
    group_invite_accept: 'Entra',
    group_invite_decline: 'Rifiuta',
    group_user_joined: 'è entrato nel gruppo',
    group_user_left: 'ha lasciato il gruppo',
    group_error_no_contacts_online: 'Nessun contatto online',
    group_error_select_contact: 'Seleziona almeno un contatto',
    group_error_creation_failed: 'Creazione gruppo fallita',
    group_notification_created: 'Gruppo creato',
    new_contact_request: 'Nuova richiesta di contatto da {{name}}',
    group_chat_title: 'Gruppo ({{count}})',
    group_reconnected: 'è rientrato',
    group_timeout_suffix: ' (timeout)',
    group_empty: 'Sei rimasto solo nel gruppo.',
    group_chat_btn: '👥 Gruppo',
    send_btn: 'Invia',

    // ========== Profilo ==========
    profile_avatar_upload: 'Carica foto profilo',
    profile_avatar_remove: 'Rimuovi',
    profile_username_label: 'Username',
    profile_language_label: 'Lingua',
    profile_api_key_label: 'Chiave API Gemini',
    profile_api_key_placeholder: 'Lascia vuoto per rimuovere',
    profile_api_key_hint: 'Inserisci una nuova chiave per diventare key-holder',
    profile_voice_label: 'Voce TTS preferita',
    profile_expiry_label: '⏳ Autodistruzione globale',
    profile_expiry_hint: 'Nuovi messaggi erediteranno questa durata (modificabile per chat)',
    profile_regenerate_keys: 'Rigenera chiavi E2E',
    profile_regenerate_keys_hint: 'Attenzione: i messaggi cifrati precedenti diventeranno illeggibili.',
    profile_logout: 'Logout',
    profile_delete_account: 'Elimina account',
    profile_save: 'Salva modifiche',
    profile_password_label: 'Password',
    profile_change_password_btn: 'Cambia',
    change_password_title: 'Cambia password',
    current_password_placeholder: 'Password attuale',
    new_password_placeholder: 'Nuova password',
    confirm_password_placeholder: 'Conferma nuova password',
    profile_saved: 'Impostazioni salvate',
    profile_error: 'Errore',
    profile_ui_language_label: 'Lingua interfaccia',
    profile_theme_label: 'Tema colore',
    theme_red: 'Rosso intenso',
    theme_blue: 'Blu oceano',
    theme_green: 'Verde foresta',
    theme_purple: 'Viola reale',
    profile_ephemeral_default: '👻 Ghost di default',
    profile_beep_label: 'Inizio registrazione audio',

    // --- Chiavi API ---
    profile_api_keys_label: 'Chiavi API',
    manage_api_keys_btn: 'Gestisci chiavi API',
    profile_api_keys_hint: 'Aggiungi o rimuovi chiavi Gemini.',
    api_keys_modal_title: 'Le tue chiavi API',
    new_api_key_placeholder: 'Incolla una nuova chiave API',
    add_api_key_btn: 'Aggiungi',
    no_api_keys: 'Nessuna chiave API salvata',
    confirm_delete_api_key: 'Eliminare questa chiave?',

    // ========== Errori e avvisi ==========
    error_network: 'Impossibile connettersi al server',
    error_session_expired: 'Sessione scaduta',
    error_login_failed: 'Errore durante il login',
    error_register_failed: 'Errore durante la registrazione',
    error_contact_load: 'Errore caricamento contatti',
    error_profile_load: 'Impossibile caricare il profilo',
    error_send_failed: 'Invio non riuscito. Riprova.',
    error_send_text_failed: 'Invio testo non riuscito. Riprova tra qualche istante.',
    error_dictation_blocked: 'Riconoscimento vocale non supportato su questo browser.\nBrowser consigliati: Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (con flag abilitato).',
    error_dictation_mic: 'Permesso microfono negato per la dettatura.',
    error_dictation_generic: 'Errore durante la dettatura: {error}',
    error_recording_unsupported: 'Registrazione non supportata',
    error_mic_access: 'Impossibile accedere al microfono per la nota vocale',
    error_voice_note_e2e: 'Impossibile inviare la nota vocale: il destinatario non ha configurato la crittografia E2E. Chiedigli di aprire il profilo.',
    error_private_key_missing: 'Chiave privata mancante. Rigenera le chiavi E2E dal profilo.',
    error_voice_note_send_failed: 'Invio nota vocale fallito',
    error_text_e2e_required: 'Impossibile inviare il messaggio: il destinatario non ha configurato la crittografia E2E. Chiedigli di aprire il profilo.',
    error_decryption_failed: 'Decifratura audio fallita',
    error_no_audio_data: 'Dati audio non disponibili.',
    error_audio_decrypt: 'Decifratura audio fallita',
    error_ephemeral_message: 'Errore nel messaggio effimero',
    error_voice_note_network: "Errore di rete durante l'invio del messaggio vocale",
    error_send_retry: 'Invio non riuscito. Riprova.',
    error_audio_data_unavailable: 'Dati audio non disponibili.',
    error_delete_account: "Errore durante l'eliminazione dell'account",
    error_generic: 'Errore',
    error_key_regeneration: 'Errore durante la rigenerazione delle chiavi.',
    ephemeral_language_error: 'La modalità effimera richiede la stessa lingua.',
    ephemeral_offline_error: 'Il destinatario è offline. I messaggi effimeri non possono essere recapitati.',
    confirm_delete_contact: 'Rimuovere questo contatto?',
    confirm_delete_account: 'Sei sicuro di voler eliminare definitivamente il tuo account? Questa azione è irreversibile.',
    confirm_regenerate_keys: 'Rigenerare le chiavi E2E? I messaggi cifrati precedenti diventeranno illeggibili.',
    keys_regenerated: 'Nuove chiavi generate con successo.',
    account_deleted: 'Account eliminato con successo',
    avatar_upload_error: "Errore durante il caricamento dell'immagine",
    no_chats: 'Nessuna chat attiva',
    error_loading_chats: 'Errore nel caricamento delle chat',
    error_guest_diff_language: "Per chattare con utenti di lingua diversa è necessaria una chiave API. Registra una chiave API nella pagina del profilo.",
    error_guest_group_multilingual: "Gli utenti guest possono creare gruppi solo con persone della stessa lingua. Per gruppi multilingua serve una chiave API.",
    warning_keyholder_add_guest_diff_language: "Il contatto che stai aggiungendo ha un account Guest ed è di lingua diversa dalla tua. Tutte le chat tra di voi saranno tradotte usando le tue chiavi API di Gemini.",
    alert_fill_all_fields: 'Compila tutti i campi obbligatori',
    error_missing_public_key: 'Chiave pubblica mancante per {memberId}',
    error_cannot_get_public_key: 'Impossibile recuperare la chiave pubblica di {memberId}',

    // ========== Notifiche push ==========
    push_new_message: 'Nuovo messaggio da {name}',
    push_voice_note: 'Nota vocale da {name}',
    push_body: '🎵 Nota vocale',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'Tua impronta E2E:',
    speaker_title: 'Ascolta',
    media_upload_title: 'Invia foto o video',
    media_expiry_default_warning: 'I contenuti multimediali inviati senza un timer di autodistruzione verranno cancellati automaticamente dopo 7 giorni.',
    lightbox_image_alt: 'Immagine',
    lightbox_video_alt: 'Video',
    translate_show_original: 'Mostra originale',
    translating_placeholder: 'Traducendo…',
    error_translation_failed: 'Traduzione non riuscita',
    error_translation_api_key: 'Aggiungi una chiave API per tradurre',
    translate_title: 'Traduttore',
    encrypted_message: '🔒 Messaggio cifrato',

    // --- Amministrazione ---
    admin_requests_title: "Richieste di registrazione",
    admin_requests_btn: "Gestione Utenti",
    admin_note_placeholder: "Nota (max 30 caratteri)",
    admin_account_active: "Attivo",
    admin_account_inactive: "In attesa",
    admin_toggle_activate: "Attiva account",
    admin_toggle_deactivate: "Disattiva account",
    admin_back_to_profile: "← Torna al profilo",
    admin_panel_label: "Pannello Admin",
    admin_panel_open_btn: "Apri pannello",

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "Attiva la modalità Ghost: i messaggi inviati non vengono salvati sul server e scompaiono quando lasci la chat. Funziona solo se anche il destinatario ha la chat aperta.",
    tour_chat_selfdestruct: "Ogni messaggio può avere un timer di autodistruzione. Il conto alla rovescia parte quando il destinatario lo visualizza. Allo scadere, il messaggio si cancella per tutti.",
    tour_chat_dictate: "Tocco breve: avvia la dettatura vocale, un secondo tocco la interrompe e invia il testo. Tieni premuto: registri un messaggio vocale; al rilascio viene inviato. Aspetta il segnale acustico prima di parlare.",
    tour_chat_sent: "Tieni premuto su un tuo messaggio per cancellarlo.",
    tour_chat_received: "Tieni premuto su un messaggio ricevuto per aggiungere una reazione emoji.",
    tour_chat_speaker: "Tocca l'icona dell'altoparlante sotto al messaggio per fartelo leggere ad alta voce.",
    tour_chat_clear: "Cancella i messaggi nella tua interfaccia di chat ma non in quella del tuo interlocutore.",
    tour_group_ghost: "La chat di gruppo è sempre in modalità Ghost: la conversazione e tutti i messaggi vengono cancellati quando esci dalla chat.",
    tour_contacts_fab: "Tocca per aggiungere un nuovo contatto.",
    tour_contacts_delete: "Tieni premuto su un contatto per cancellarlo. Dovrai confermare l'eliminazione.",
    tour_chatslist_fab: "Tocca per creare una nuova chat singola o di gruppo. Tutte le chat di gruppo sono sempre in modalità Ghost: i messaggi non vengono salvati e funzionano solo quando almeno due partecipanti hanno la chat aperta contemporaneamente.",
    tour_chatslist_delete: "Tieni premuto sul banner di una chat per cancellarla. Dovrai confermare l'eliminazione.",
    tour_profile_recording: "Scegli il suono che ti avvisa quando la registrazione di un messaggio vocale è effettivamente partita.",
    tour_profile_api: "Per chattare con persone che parlano un'altra lingua serve almeno una chiave API Gemini. Se hai un account Google puoi registrarne una o più, anche gratuite, in 3 passaggi:<br>1) Vai su <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a><br>2) Clicca su 'Crea chiave API' in basso a sinistra<br>3) Incollala qui.<br>Se ne hai più di una, il sistema userà la prima fino a esaurimento del limite giornaliero, poi passerà automaticamente alla successiva.<br>In alternativa potete chattare senza chiave API se parlate una lingua comune. Dovete impostarla entrambi dalla pagina del Profilo ma ricordatevi di cambiarla nuovamente quando tornerete a chattare con persone della vostra stessa lingua.",
    tour_profile_e2e: "Genera nuove chiavi di cifratura per i tuoi messaggi. Attenzione: dopo la rigenerazione non potrai più leggere i vecchi messaggi.",
    tour_translate_howto: "Pensato per conversazioni faccia a faccia con chi non parla la tua lingua. Scegli le due lingue. Premi una volta il pulsante Parla nella tua lingua, parla e premilo nuovamente. Apparirà la traduzione e una voce la leggerà nella lingua dell'altro. L'interlocutore risponde con il pulsante della sua lingua.",
    tour_translate_original: "Attivalo per vedere anche il testo nella lingua di chi ha parlato, così puoi controllare se il messaggio è passato correttamente. Consuma più risorse della tua chiave API: potrai tradurre meno messaggi al giorno.",
    tour_translate_limits: "L'uso del traduttore è vincolato ai limiti giornalieri delle tue chiavi API Gemini.",

    // --- UI del tour ---
    tour_next: "Avanti",
    tour_skip: "Salta",
    tour_finish: "Fine",
    profile_tour_label: "Info tour",
    profile_tour_button: "Ricomincia tour",

    // --- Legal Form ---
    terms_title: "Condizioni di utilizzo",
    terms_accept_label: "Dichiaro di aver letto e accettato le condizioni",
    terms_confirm_btn: "Accetta e registrati",
    terms_text: `DOCUMENTO – CONDIZIONI DI UTILIZZO DEL SERVIZIO DI GHOST CHAT
      Premessa
      Il presente servizio (la pwa “Ghost Chat”) è fornito esclusivamente come piattaforma tecnica di messaggistica anonima tra utenti. Il titolare/amministratore del server (il “Fornitore”) non ha alcun controllo sui contenuti scambiati, sulle identità dichiarate o sulle condotte degli utenti. L’utilizzo dell’App è vietato a chiunque non accetti integralmente le seguenti condizioni.
      1. Accettazione e obbligo di lettura
      Accedendo o utilizzando l’App, l’utente dichiara di aver letto, compreso e accettato incondizionatamente tutte le clausole del presente documento. L’accettazione è prerequisito obbligatorio per l’uso del servizio.
      2. Utilizzo lecito e divieti assoluti
      L’utente si impegna a utilizzare l’App solo per scopi leciti, civili e conformi alla legge italiana ed europea, nonché alle leggi del proprio paese di residenza. È espressamente vietato:
      diffondere materiale pedopornografico, violento, discriminatorio, diffamatorio, ingiurioso o che istighi all’odio;
      pianificare, promuovere o commettere reati di qualsiasi genere (es. terrorismo, stalking, truffe, estorsioni, spaccio, violenza privata);
      violare diritti altrui (privacy, proprietà intellettuale, segreto professionale);
      utilizzare l’App per attività di phishing, malware, spam o attacchi informatici;
      aggirare i sistemi di segnalazione o anonimato per danneggiare terzi.
      3. Anonimato tecnico e assenza di dati identificativi
      Il servizio non richiede né raccoglie alcun dato personale (nome, email, telefono, indirizzo IP permanente) al momento della registrazione. Il server non conserva log di connessione né indirizzi IP degli utenti, se non per il tempo strettamente necessario alla trasmissione dei messaggi (e comunque mai oltre la sessione).
      Pertanto, anche in caso di ordine giudiziario, il Fornitore non è in grado di fornire alcuna informazione identificativa sugli utenti, né di risalire alla loro identità reale.
      L’unico dato associato a un account è lo username scelto dall’utente, che non consente di identificare una persona fisica.
      4. Esclusione totale di responsabilità del Fornitore per usi illeciti
      Il Fornitore non è in alcun modo responsabile – civilmente, penalmente o amministrativamente – per:
      i contenuti, le conversazioni, i file o le azioni degli utenti;
      l’uso che terzi facciano dei messaggi ricevuti;
      eventuali reati commessi tramite l’App, essendo la piattaforma uno strumento passivo e neutrale di trasmissione di dati (ai sensi dell’art. 14 del D.Lgs. 70/2003 e della Direttiva UE 2000/31/CE).
      L’utente assume ogni rischio derivante dall’uso del servizio.
      5. Obbligo di manleva (indennizzo)
      L’utente si impegna a manlevare, tenere indenne e difendere il Fornitore da qualsiasi richiesta, azione legale, multa, sanzione, spesa legale o risarcimento derivante da:
      violazioni delle presenti condizioni da parte dell’utente;
      usi illegali o non autorizzati dell’App riconducibili al proprio account/sessione;
      controversie tra utenti o con terze parti originate dall’uso dell’App.
      In caso di condanna del Fornitore per fatto imputabile all’utente, quest’ultimo è obbligato a rifondere integralmente il Fornitore di quanto pagato, inclusi onorari legali.
      6. Cooperazione con le autorità e limiti tecnici
      Il Fornitore dichiara la propria piena disponibilità a collaborare con le autorità giudiziarie o di polizia, nel rispetto delle leggi applicabili, al fine di contrastare eventuali usi illeciti del servizio.
      Tuttavia, l’utente prende atto e accetta che:
      il servizio è stato progettato per non raccogliere né conservare indirizzi IP o altri dati identificativi degli utenti;
      il Fornitore non ha accesso visivo ai contenuti delle chat private né capacità tecnica di estrarli;
      eventuali log tecnici (quali timestamp, metadati di connessione o tracce di sistema) possono esistere esclusivamente presso il gestore dell’infrastruttura server (hosting provider) e non sono nella diretta disponibilità del Fornitore;
      il Fornitore non è in grado di fornire dati che non possiede o che sono tecnicamente inaccessibili, né di aggirare le proprie stesse misure di anonimato e crittografia.
      In caso di richiesta formale da parte di un’autorità, il Fornitore si impegna a:
      sospendere o cancellare immediatamente l’account dell’utente indicato, qualora tecnicamente possibile;
      fornire all’autorità ogni informazione in proprio possesso (anche se minimale o non identificativa);
      indicare all’autorità i dati di contatto del gestore del server, affinché possa richiedere direttamente a quest’ultimo eventuali log tecnici non nella disponibilità del Fornitore.
      L’utente riconosce che, per la natura stessa del servizio, la collaborazione del Fornitore è limitata dalla sua oggettiva impossibilità tecnica di raccogliere o consegnare dati che non ha mai posseduto. Nessuna disposizione del presente contratto può essere interpretata come un obbligo del Fornitore di fornire prove o identificativi che la legge non gli impone di detenere.
      7. Limiti di garanzia e disponibilità
      Il servizio è fornito “così com’è”, senza garanzie di continuità, assenza di errori o sicurezza assoluta. Il Fornitore non garantisce l’assenza di intercettazioni da parte di terzi o di vulnerabilità tecniche.
      8. Durata, modifica e revoca
      Il Fornitore può modificare queste condizioni in qualsiasi momento, dandone comunicazione tramite l’App. L’uso continuato del servizio dopo la modifica costituisce accettazione. L’utente può interrompere l’uso in qualsiasi momento. Il Fornitore può revocare l’accesso senza preavviso in caso di violazione.
      9. Foro competente e legge applicabile
      Il presente contratto è regolato dalla legge italiana. Per qualsiasi controversia relativa al servizio o a queste condizioni, il foro esclusivo è quello del luogo di residenza del Fornitore (o, a sua scelta, quello di Milano/Roma). L’utente rinuncia espressamente a qualsiasi altra giurisdizione.
      10. Nullità parziale
      Se una qualsiasi clausola venisse dichiarata nulla o inefficace, le restanti restano pienamente valide.
      11. Consenso espresso ai sensi degli artt. 1341 e 1342 c.c.
      L’utente dichiara di aver letto e approvare specificamente le clausole relative a: esclusione di responsabilità (art. 4), obbligo di manleva (art. 5), limiti di garanzia (art. 7), foro competente (art. 9).

      Conferma di accettazione obbligatoria
      Premendo “Accetto” o continuando a utilizzare l’App dopo 10 secondi dalla visualizzazione, l’utente conferma di accettare tutte le condizioni sopra riportate.`,

    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 Scorri fino in fondo per attivare l'accettazione",

    // --- Modale aggiungi contatto ---
    admin_force_mode_btn: "Force",
    admin_force_mode_active: "Force ON",
    
    // --- Admin alerts ---
    admin_no_requests: "Nessuna richiesta di registrazione",
    admin_delete_btn: "Elimina",
    admin_delete_btn_title: "Elimina permanentemente questo account",
    admin_delete_confirm: "Sei sicuro di voler eliminare permanentemente questo account? L'operazione è irreversibile.",
    admin_delete_error: "Errore durante l'eliminazione dell'account",
    admin_load_error: "Errore caricamento richieste",


  },
  en: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: 'Talk local, chat global, anonymously',
    login_heading: 'Login',
    login_username_placeholder: 'Username',
    login_password_placeholder: 'Password',
    login_button: 'Login',
    login_no_account: "Don't have an account?",
    login_register_link: 'Register',
    register_heading: 'Register',
    register_username_placeholder: 'Username',
    register_password_placeholder: 'Password',
    register_language_label: 'Language',
    register_api_key_placeholder: 'Gemini API Key (optional)',
    register_button: 'Register',
    register_has_account: 'Already have an account?',
    register_login_link: 'Login',
    register_fields_required: 'Fill in all required fields',
    registration_pending: 'Registration complete. Please wait for admin approval.',

    // ========== Navigazione ==========
    nav_contacts: 'Contacts',
    nav_chats: 'Chat',
    nav_profile: 'Profile',
    nav_translate: 'Translate',

    // ========== Banner offline ==========
    offline_banner: '⚠️ Offline - Waiting for connection...',

    // ========== Contatti ==========
    contacts_title: 'Contacts',
    add_contact_btn: 'Add contact',
    requests_in: 'Incoming Requests',
    requests_out: 'Sent Requests',
    no_contacts: 'No contacts',
    pending_badge: 'Pending',
    role_keyholder: 'Key-holder',
    role_guest: 'Guest',
    btn_accept: 'Accept',
    btn_remove: 'Remove',
    contacts_manage_btn: 'Contacts',
    new_chat_btn: 'New chat',
    new_chat_modal_title: 'New chat',
    contacts_modal_title: 'Contacts',
    confirm_delete_contact_message: 'Remove {name} from contacts?',
    confirm_delete_contact_msg: 'Do you want to remove the contact "{name}"?',
    contact_online: '● Online',
    contact_offline: '● Offline',
    add_contacts_title: 'Add contacts',
    btn_cancel: 'Cancel',
    btn_send_requests: 'Send requests',
    select_at_least_one: 'Select at least one user',
    search_contacts_placeholder: 'Search contacts...',

    // --- Modale aggiungi contatto ---
    modal_title: 'Add Contact',
    search_placeholder: 'Search username...',
    btn_add: 'Add',
    btn_close: 'Close',

    // ========== Chat ==========
    back_btn: '← Back',
    clear_chat_btn: 'Clear Chat',
    typing_indicator: 'typing...',
    expiry_label: '⏳ Self-destruct:',
    expiry_options: [
      { value: '0', text: 'No expiry' },
      { value: '0.002777', text: '10 seconds' },
      { value: '0.0166667', text: '1 minute' },
      { value: '0.0833333', text: '5 minutes' },
      { value: '1', text: '1 hour' },
      { value: '6', text: '6 hours' },
      { value: '12', text: '12 hours' },
      { value: '24', text: '24 hours' },
      { value: '168', text: '7 days' },
    ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> Speak',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> Dictate',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> Listening',
    record_btn_release: '⏹ RELEASE',
    text_input_placeholder: 'Write',
    send_text_btn: 'Send text',
    send_text_sending: 'Sending...',
    message_sent_confirm: 'New message from {name}\n\n{text}\n\nOpen chat?',
    voice_note_confirm: 'New voice note from {name}\n\nOpen chat?',
    confirm_image_message: 'New image from {name}\n\nOpen chat?',
    confirm_video_message: 'New video from {name}\n\nOpen chat?',
    local_notification_voice_note: '🎵 Voice note',
    local_notification_image: '🖼️ Image',
    local_notification_video: '🎬 Video',
    voice_note_sent: '🎵 Voice note sent',
    voice_note_listen: '▶️ Listen to voice note',
    no_messages: 'No messages',
    load_error: 'Error loading messages',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 Ghost',
    individual_chat: '💬 Individual chat',
    group_chat: '👥 Group chat',
    search_chats_placeholder: 'Search chats...',
    btn_delete: 'Delete',
    confirm_delete_chat_msg: 'Do you want to close the chat with "{name}"?',
    confirm_delete_message: "Delete this message? It will also disappear from recipient's chat.",

    // --- Gruppi ---
    group_chat_modal_title: 'Create group chat',
    group_chat_modal_subtitle: 'Select online contacts',
    group_create_btn: 'Create group',
    group_leave_btn: 'Leave',
    group_invite_title: 'Group invitation',
    group_invite_accept: 'Join',
    group_invite_decline: 'Decline',
    group_user_joined: 'joined the group',
    group_user_left: 'left the group',
    group_error_no_contacts_online: 'No online contacts',
    group_error_select_contact: 'Select at least one contact',
    group_error_creation_failed: 'Group creation failed',
    group_notification_created: 'Group created',
    new_contact_request: 'New contact request from {{name}}',
    group_chat_title: 'Group ({{count}})',
    group_reconnected: 'rejoined',
    group_timeout_suffix: ' (timeout)',
    group_empty: 'You\'re the only one left in the group.',
    group_chat_btn: '👥 Group',
    send_btn: 'Send',

    // ========== Profilo ==========
    profile_avatar_upload: 'Upload profile picture',
    profile_avatar_remove: 'Remove',
    profile_username_label: 'Username',
    profile_language_label: 'Language',
    profile_api_key_label: 'Gemini API Key',
    profile_api_key_placeholder: 'Leave empty to remove',
    profile_api_key_hint: 'Enter a new key to become a key-holder',
    profile_voice_label: 'Preferred TTS voice',
    profile_expiry_label: '⏳ Global self-destruct',
    profile_expiry_hint: 'New messages will inherit this duration (can be changed per chat)',
    profile_regenerate_keys: 'Regenerate E2E keys',
    profile_regenerate_keys_hint: 'Warning: previous encrypted messages will become unreadable.',
    profile_logout: 'Logout',
    profile_delete_account: 'Delete account',
    profile_save: 'Save changes',
    profile_password_label: 'Password',
    profile_change_password_btn: 'Change',
    change_password_title: 'Change password',
    current_password_placeholder: 'Current password',
    new_password_placeholder: 'New password',
    confirm_password_placeholder: 'Confirm new password',
    profile_saved: 'Settings saved',
    profile_error: 'Error',
    profile_ui_language_label: 'Interface language',
    profile_theme_label: 'Color theme',
    theme_red: 'Intense red',
    theme_blue: 'Ocean blue',
    theme_green: 'Forest green',
    theme_purple: 'Royal purple',
    profile_ephemeral_default: '👻 Default Ghost',
    profile_beep_label: 'Recording start beep',

    // --- Chiavi API ---
    profile_api_keys_label: 'API Keys',
    manage_api_keys_btn: 'Manage API Keys',
    profile_api_keys_hint: 'Add or remove Gemini keys.',
    api_keys_modal_title: 'Your API Keys',
    new_api_key_placeholder: 'Paste a new API key',
    add_api_key_btn: 'Add',
    no_api_keys: 'No API keys saved',
    confirm_delete_api_key: 'Delete this key?',

    // ========== Errori e avvisi ==========
    error_network: 'Unable to connect to server',
    error_session_expired: 'Session expired',
    error_login_failed: 'Login failed',
    error_register_failed: 'Registration failed',
    error_contact_load: 'Error loading contacts',
    error_profile_load: 'Unable to load profile',
    error_send_failed: 'Send failed. Try again.',
    error_send_text_failed: 'Text send failed. Try again later.',
    error_dictation_blocked: 'Speech recognition not supported on this browser.\nRecommended browsers: Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (with flag enabled).',
    error_dictation_mic: 'Microphone permission denied for dictation.',
    error_dictation_generic: 'Dictation error: {error}',
    error_recording_unsupported: 'Recording not supported',
    error_mic_access: 'Cannot access microphone for voice note',
    error_voice_note_e2e: 'Cannot send voice note: recipient has not configured E2E encryption. Ask them to open their profile.',
    error_private_key_missing: 'Private key missing. Regenerate E2E keys from profile.',
    error_voice_note_send_failed: 'Voice note send failed',
    error_text_e2e_required: 'Cannot send message: recipient has not configured E2E encryption. Ask them to open their profile.',
    error_decryption_failed: 'Audio decryption failed',
    error_no_audio_data: 'Audio data not available.',
    error_audio_decrypt: 'Audio decryption failed',
    error_ephemeral_message: 'Ephemeral message error',
    error_voice_note_network: 'Network error while sending voice note',
    error_send_retry: 'Send failed. Tap to retry.',
    error_audio_data_unavailable: 'Audio data unavailable.',
    error_delete_account: 'Error deleting account',
    error_generic: 'Error',
    error_key_regeneration: 'Error regenerating keys.',
    ephemeral_language_error: 'Ephemeral mode requires the same language.',
    ephemeral_offline_error: 'Recipient is offline. Ephemeral messages cannot be delivered.',
    confirm_delete_contact: 'Remove this contact?',
    confirm_delete_account: 'Are you sure you want to permanently delete your account? This action is irreversible.',
    confirm_regenerate_keys: 'Regenerate E2E keys? Previous encrypted messages will become unreadable.',
    keys_regenerated: 'New keys generated successfully.',
    account_deleted: 'Account deleted successfully',
    avatar_upload_error: 'Error uploading image',
    no_chats: 'No active chats',
    error_loading_chats: 'Error loading chats',
    error_guest_diff_language: "To chat with users speaking a different language, an API key is required. Register an API key on the profile page.",
    error_guest_group_multilingual: "Guests can only create groups with people who speak the same language. For multilingual groups, you'll need an API key.",
    warning_keyholder_add_guest_diff_language: "The contact you're adding is a Guest and speaks a different language than you. All chats between you will be translated using your Gemini API keys.",
    alert_fill_all_fields: 'Fill in all required fields',
    error_missing_public_key: 'Missing public key for {memberId}',
    error_cannot_get_public_key: 'Unable to retrieve public key for {memberId}',

    // ========== Notifiche push ==========
    push_new_message: 'New message from {name}',
    push_voice_note: 'Voice note from {name}',
    push_body: '🎵 Voice note',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'Your E2E fingerprint:',
    speaker_title: 'Listen',
    media_upload_title: 'Send photo or video',
    media_expiry_default_warning: 'Media sent without a self-destruct timer will be automatically deleted after 7 days.',
    lightbox_image_alt: 'Image',
    lightbox_video_alt: 'Video',
    translate_show_original: 'Show original',
    translating_placeholder: 'Translating…',
    error_translation_failed: 'Translation failed',
    error_translation_api_key: 'Add an API key to translate',
    translate_title: 'Translator',
    encrypted_message: '🔒 Encrypted message',

    // --- Amministrazione ---
    admin_requests_title: 'Registration requests',
    admin_requests_btn: 'Manage requests',
    admin_note_placeholder: 'Note (max 30 characters)',
    admin_account_active: 'Active',
    admin_account_inactive: 'Pending',
    admin_toggle_activate: 'Activate account',
    admin_toggle_deactivate: 'Deactivate account',
    admin_back_to_profile: '← Back to profile',

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "Turn on Ghost mode: messages you send won't be saved on the server and will disappear when you leave the chat. This only works if the other person also has the chat open.",
    tour_chat_selfdestruct: 'Each message can have a self-destruct timer. The countdown starts when the recipient views it. When time runs out, the message is deleted for everyone.',
    tour_chat_dictate: 'Short tap: start voice dictation, a second tap stops it and sends the text. Press and hold: record a voice message; release to send. Wait for the beep before speaking.',
    tour_chat_sent: 'Press and hold your own message to delete it.',
    tour_chat_received: 'Press and hold a received message to add an emoji reaction.',
    tour_chat_speaker: 'Tap the speaker icon below the message to have it read aloud.',
    tour_chat_clear: "Clear messages from your chat interface, but not from your conversation partner's.",
    tour_group_ghost: 'Group chat is always in Ghost mode: the conversation and all messages are deleted when you leave the chat.',
    tour_contacts_fab: 'Tap to add a new contact.',
    tour_contacts_delete: 'Press and hold a contact to delete it. You will need to confirm the deletion.',
    tour_chatslist_fab: "Tap to create a new one-on-one or group chat. All group chats are always in Ghost mode: messages aren't saved and only work when at least two participants have the chat open at the same time.",
    tour_chatslist_delete: 'Press and hold a chat banner to delete it. You will need to confirm the deletion.',
    tour_profile_recording: 'Choose the sound that notifies you when voice message recording has actually started.',
    tour_profile_api: "To chat with people who speak another language, you need at least one Gemini API key. If you have a Google account, you can create one or more free keys in 3 steps:<br>1) Go to <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a><br>2) Click 'Create API key' at the bottom left<br>3) Paste it here.<br>If you have multiple keys, the system will use the first one until it hits the daily limit, then automatically switch to the next.<br>Alternatively, you can chat without an API key if you share a common language. Both of you need to set it from the Profile page, but remember to change it back when you return to chatting with people who speak your same language.",
    tour_profile_e2e: 'Generate new encryption keys for your messages. Warning: after regeneration, you will no longer be able to read old messages.',
    tour_translate_howto: 'Designed for face-to-face conversations with someone who doesn\'t speak your language. Choose the two languages. Press the Speak button in your language once, speak, then press it again. The translation will appear and a voice will read it in the other person\'s language. The other person responds using the button in their language.',
    tour_translate_original: 'Enable it to also see the text in the speaker\'s language, so you can check if the message was conveyed correctly. It uses more of your API key\'s quota: you\'ll be able to translate fewer messages per day.',
    tour_translate_limits: 'Use of the translator is subject to the daily limits of your Gemini API keys.',

    // --- UI del tour ---
    tour_next: 'Next',
    tour_skip: 'Skip',
    tour_finish: 'Done',
    profile_tour_label: "Tour info",
    profile_tour_button: "Restart tour",

    // --- Legal Form ---
    terms_title: "Terms of Use",
    terms_accept_label: "I declare that I have read and accepted the terms",
    terms_confirm_btn: "Accept and Register",
    terms_text: `DOCUMENT – TERMS OF USE FOR THE GHOST CHAT SERVICE

      Premise
      This service (the PWA “Ghost Chat”) is provided solely as a technical platform for anonymous messaging between users. The server owner/administrator (the “Provider”) has no control over the content exchanged, the identities declared, or the conduct of users. Use of the App is prohibited to anyone who does not fully accept the following terms.

      1. Acceptance and Obligation to Read
      By accessing or using the App, the user declares that they have read, understood, and unconditionally accepted all clauses of this document. Acceptance is a mandatory prerequisite for using the service.

      2. Lawful Use and Absolute Prohibitions
      The user agrees to use the App only for lawful, civil purposes, in compliance with Italian and European law, as well as the laws of their country of residence. The following are expressly forbidden:
      - disseminating child pornography, violent, discriminatory, defamatory, insulting content, or content inciting hatred;
      - planning, promoting, or committing crimes of any kind (e.g., terrorism, stalking, fraud, extortion, drug dealing, private violence);
      - violating the rights of others (privacy, intellectual property, professional secrecy);
      - using the App for phishing, malware, spam, or cyberattacks;
      - circumventing reporting or anonymity systems to harm third parties.

      3. Technical Anonymity and Absence of Identifying Data
      The service does not require or collect any personal data (name, email, phone number, permanent IP address) at registration. The server does not store connection logs or user IP addresses, except for the time strictly necessary to transmit messages (and in any case never beyond the session).
      Therefore, even under a court order, the Provider is unable to provide any identifying information about users, nor to trace their real identity.
      The only data associated with an account is the username chosen by the user, which does not allow identification of a natural person.

      4. Total Exclusion of Provider’s Liability for Unlawful Use
      The Provider is in no way liable – civilly, criminally, or administratively – for:
      - the content, conversations, files, or actions of users;
      - the use that third parties make of received messages;
      - any crimes committed through the App, as the platform is a passive and neutral data transmission tool (pursuant to art. 14 of Italian Legislative Decree 70/2003 and EU Directive 2000/31/EC).
      The user assumes all risks arising from the use of the service.

      5. Duty to Indemnify
      The user undertakes to indemnify, hold harmless, and defend the Provider from any claim, legal action, fine, penalty, legal expense, or compensation arising from:
      - violations of these terms by the user;
      - illegal or unauthorized uses of the App attributable to their account/session;
      - disputes between users or with third parties originating from the use of the App.
      In the event the Provider is convicted due to an act attributable to the user, the user is obliged to fully reimburse the Provider for any amount paid, including legal fees.

      6. Cooperation with Authorities and Technical Limitations
      The Provider declares its full willingness to cooperate with judicial or police authorities, in compliance with applicable laws, in order to counteract any unlawful use of the service.
      However, the user acknowledges and agrees that:
      - the service has been designed not to collect or store IP addresses or other identifying data of users;
      - the Provider has no visual access to private chat content nor the technical capability to extract it;
      - any technical logs (such as timestamps, connection metadata, or system traces) may exist only with the server infrastructure manager (hosting provider) and are not directly available to the Provider;
      - the Provider is unable to provide data it does not possess or that is technically inaccessible, nor to bypass its own anonymity and encryption measures.
      In the event of a formal request from an authority, the Provider agrees to:
      - immediately suspend or delete the indicated user's account, where technically possible;
      - provide the authority with any information in its possession (even if minimal or non-identifying);
      - indicate to the authority the contact details of the server manager, so that it may directly request from the latter any technical logs not available to the Provider.
      The user acknowledges that, due to the very nature of the service, the Provider's cooperation is limited by its objective technical impossibility to collect or deliver data it has never possessed. No provision of this contract may be interpreted as an obligation for the Provider to provide evidence or identifiers that the law does not require it to retain.

      7. Limitations of Warranty and Availability
      The service is provided "as is", without warranties of continuity, error-free operation, or absolute security. The Provider does not guarantee the absence of interception by third parties or technical vulnerabilities.

      8. Duration, Modification, and Revocation
      The Provider may modify these terms at any time, giving notice through the App. Continued use of the service after the modification constitutes acceptance. The user may stop using the service at any time. The Provider may revoke access without notice in case of violation.

      9. Jurisdiction and Applicable Law
      This contract is governed by Italian law. For any dispute relating to the service or these terms, the exclusive forum is the place of residence of the Provider (or, at its choice, Milan/Rome). The user expressly waives any other jurisdiction.

      10. Partial Nullity
      If any clause is declared null or ineffective, the remaining clauses remain fully valid.

      11. Express Consent Pursuant to Articles 1341 and 1342 of the Italian Civil Code
      The user declares that they have read and specifically approve the clauses relating to: exclusion of liability (art. 4), duty to indemnify (art. 5), limitations of warranty (art. 7), jurisdiction (art. 9).

      Mandatory Confirmation of Acceptance
      By pressing "Accept" or continuing to use the App 10 seconds after viewing, the user confirms acceptance of all the above terms.`,

    // --- Modale Legal Form ---      
    terms_scroll_hint: "🔽 Scroll all the way down to enable acceptance",

    // --- Admin alerts ---
      admin_no_requests: "No registration requests",
      admin_delete_btn: "Delete",
      admin_delete_btn_title: "Permanently delete this account",
      admin_delete_confirm: "Are you sure you want to permanently delete this account? This action cannot be undone.",
      admin_delete_error: "Error deleting account",
      admin_load_error: "Error loading requests",
  },
  fr: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: 'Talk local, chat global, anonymously',
    login_heading: 'Connexion',
    login_username_placeholder: "Nom d'utilisateur",
    login_password_placeholder: 'Mot de passe',
    login_button: 'Se connecter',
    login_no_account: "Vous n'avez pas de compte ?",
    login_register_link: "S'inscrire",
    register_heading: 'Inscription',
    register_username_placeholder: "Nom d'utilisateur",
    register_password_placeholder: 'Mot de passe',
    register_language_label: 'Langue',
    register_api_key_placeholder: 'Clé API Gemini (facultatif)',
    register_button: "S'inscrire",
    register_has_account: 'Vous avez déjà un compte ?',
    register_login_link: 'Se connecter',
    register_fields_required: 'Veuillez remplir tous les champs obligatoires',
    registration_pending: "Inscription terminée. Veuillez attendre l'approbation de l'administrateur.",

    // ========== Navigazione ==========
    nav_contacts: 'Contacts',
    nav_chats: 'Chat',
    nav_profile: 'Profil',
    nav_translate: 'Traduire',

    // ========== Banner offline ==========
    offline_banner: '⚠️ Hors ligne - En attente de connexion...',

    // ========== Contatti ==========
    contacts_title: 'Contacts',
    add_contact_btn: '+ Ajouter',
    requests_in: 'Demandes entrantes',
    requests_out: 'Demandes envoyées',
    no_contacts: 'Aucun contact',
    pending_badge: 'En attente',
    role_keyholder: 'Key-holder',
    role_guest: 'Invité',
    btn_accept: 'Accepter',
    btn_remove: 'Supprimer',
    contacts_manage_btn: 'Contacts',
    new_chat_btn: 'Nouvelle discussion',
    new_chat_modal_title: 'Nouvelle discussion',
    contacts_modal_title: 'Contacts',
    confirm_delete_contact_message: 'Supprimer {name} des contacts ?',
    confirm_delete_contact_msg: 'Voulez-vous supprimer le contact « {name} » ?',
    contact_online: '● En ligne',
    contact_offline: '● Hors ligne',
    add_contacts_title: 'Ajouter des contacts',
    btn_cancel: 'Annuler',
    btn_send_requests: 'Envoyer les demandes',
    select_at_least_one: 'Sélectionnez au moins un utilisateur',
    search_contacts_placeholder: 'Rechercher des contacts...',

    // --- Modale aggiungi contatto ---
    modal_title: 'Ajouter un contact',
    search_placeholder: "Rechercher un nom d'utilisateur...",
    btn_add: 'Ajouter',
    btn_close: 'Fermer',

    // ========== Chat ==========
    back_btn: '← Retour',
    clear_chat_btn: 'Effacer la conversation',
    typing_indicator: "est en train d'écrire...",
    expiry_label: '⏳ Autodestruction :',
    expiry_options: [
      { value: '0', text: 'Aucune expiration' },
      { value: '0.002777', text: '10 secondes' },
      { value: '0.0166667', text: '1 minute' },
      { value: '0.0833333', text: '5 minutes' },
      { value: '1', text: '1 heure' },
      { value: '6', text: '6 heures' },
      { value: '12', text: '12 heures' },
      { value: '24', text: '24 heures' },
      { value: '168', text: '7 jours' },
    ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> Parler',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> Dicter',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> Écoute',
    record_btn_release: '⏹ RELÂCHER',
    text_input_placeholder: 'Écris',
    send_text_btn: 'Envoyer le texte',
    send_text_sending: 'Envoi en cours...',
    message_sent_confirm: 'Nouveau message de {name}\n\n{text}\n\nOuvrir la discussion ?',
    voice_note_confirm: 'Nouvelle note vocale de {name}\n\nOuvrir la discussion ?',
    confirm_image_message: 'Nouvelle image de {name}\n\nOuvrir le chat ?',
    confirm_video_message: 'Nouvelle vidéo de {name}\n\nOuvrir le chat ?',
    local_notification_voice_note: '🎵 Message vocal',
    local_notification_image: '🖼️ Image',
    local_notification_video: '🎬 Vidéo',
    voice_note_sent: '🎵 Note vocale envoyée',
    voice_note_listen: '▶️ Écouter la note vocale',
    no_messages: 'Aucun message',
    load_error: 'Erreur lors du chargement des messages',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 Ghost',
    individual_chat: '💬 Chat individuel',
    group_chat: '👥 Discussion de groupe',
    search_chats_placeholder: 'Rechercher des discussions...',
    btn_delete: 'Supprimer',
    confirm_delete_chat_msg: 'Voulez-vous fermer la discussion avec « {name} » ?',
    confirm_delete_message: 'Voulez-vous supprimer ce message ? Il disparaîtra également de la discussion du destinataire.',

    // --- Gruppi ---
    group_chat_modal_title: 'Créer une discussion de groupe',
    group_chat_modal_subtitle: 'Sélectionnez les contacts en ligne',
    group_create_btn: 'Créer le groupe',
    group_leave_btn: 'Quitter',
    group_invite_title: 'Invitation au groupe',
    group_invite_accept: 'Rejoindre',
    group_invite_decline: 'Refuser',
    group_user_joined: 'a rejoint le groupe',
    group_user_left: 'a quitté le groupe',
    group_error_no_contacts_online: 'Aucun contact en ligne',
    group_error_select_contact: 'Sélectionnez au moins un contact',
    group_error_creation_failed: 'Échec de la création du groupe',
    group_notification_created: 'Groupe créé',
    new_contact_request: 'Nouvelle demande de contact de {{name}}',
    group_chat_title: 'Groupe ({{count}})',
    group_reconnected: 's\'est reconnecté',
    group_timeout_suffix: ' (timeout)',
    group_empty: 'Vous êtes désormais seul dans le groupe.',
    group_chat_btn: '👥 Groupe',
    send_btn: 'Envoyer',

    // ========== Profilo ==========
    profile_avatar_upload: 'Télécharger une photo de profil',
    profile_avatar_remove: 'Supprimer',
    profile_username_label: "Nom d'utilisateur",
    profile_language_label: 'Langue',
    profile_api_key_label: 'Clé API Gemini',
    profile_api_key_placeholder: 'Laisser vide pour supprimer',
    profile_api_key_hint: 'Entrez une nouvelle clé pour devenir key-holder',
    profile_voice_label: 'Voix TTS préférée',
    profile_expiry_label: '⏳ Autodestruction globale',
    profile_expiry_hint: 'Les nouveaux messages hériteront de cette durée (modifiable par discussion)',
    profile_regenerate_keys: 'Régénérer les clés E2E',
    profile_regenerate_keys_hint: 'Attention : les messages chiffrés précédents deviendront illisibles.',
    profile_logout: 'Déconnexion',
    profile_delete_account: 'Supprimer le compte',
    profile_save: 'Enregistrer les modifications',
    profile_password_label: 'Mot de passe',
    profile_change_password_btn: 'Modifier',
    change_password_title: 'Modifier le mot de passe',
    current_password_placeholder: 'Mot de passe actuel',
    new_password_placeholder: 'Nouveau mot de passe',
    confirm_password_placeholder: 'Confirmer le nouveau mot de passe',
    profile_saved: 'Paramètres enregistrés',
    profile_error: 'Erreur',
    profile_ui_language_label: "Langue de l'interface",
    profile_theme_label: 'Thème de couleur',
    theme_red: 'Rouge intense',
    theme_blue: 'Bleu océan',
    theme_green: 'Vert forêt',
    theme_purple: 'Violet royal',
    profile_ephemeral_default: '👻 Ghost par défaut',
    profile_beep_label: 'Début de l\'enregistrement audio',

    // --- Chiavi API ---
    profile_api_keys_label: 'Clés API',
    manage_api_keys_btn: 'Gérer les clés API',
    profile_api_keys_hint: 'Ajoutez ou supprimez des clés Gemini.',
    api_keys_modal_title: 'Vos clés API',
    new_api_key_placeholder: 'Collez une nouvelle clé API',
    add_api_key_btn: 'Ajouter',
    no_api_keys: 'Aucune clé API enregistrée',
    confirm_delete_api_key: 'Supprimer cette clé ?',

    // ========== Errori e avvisi ==========
    error_network: 'Impossible de se connecter au serveur',
    error_session_expired: 'Session expirée',
    error_login_failed: 'Erreur lors de la connexion',
    error_register_failed: "Erreur lors de l'inscription",
    error_contact_load: 'Erreur lors du chargement des contacts',
    error_profile_load: 'Impossible de charger le profil',
    error_send_failed: "Échec de l'envoi. Réessayez.",
    error_send_text_failed: "Échec de l'envoi du texte. Réessayez dans quelques instants.",
    error_dictation_blocked: "La reconnaissance vocale n'est pas prise en charge sur ce navigateur.\nNavigateurs recommandés : Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (avec l'option activée).",
    error_dictation_mic: 'Autorisation du microphone refusée pour la dictée.',
    error_dictation_generic: 'Erreur lors de la dictée : {error}',
    error_recording_unsupported: 'Enregistrement non pris en charge',
    error_mic_access: "Impossible d'accéder au microphone pour la note vocale",
    error_voice_note_e2e: "Impossible d'envoyer la note vocale : le destinataire n'a pas configuré le chiffrement E2E. Demandez-lui d'ouvrir son profil.",
    error_private_key_missing: 'Clé privée manquante. Régénérez les clés E2E depuis le profil.',
    error_voice_note_send_failed: "Échec de l'envoi de la note vocale",
    error_text_e2e_required: "Impossible d'envoyer le message : le destinataire n'a pas configuré le chiffrement E2E. Demandez-lui d'ouvrir son profil.",
    error_decryption_failed: 'Échec du déchiffrement audio',
    error_no_audio_data: 'Données audio non disponibles.',
    error_audio_decrypt: 'Échec du déchiffrement audio',
    error_ephemeral_message: 'Erreur du message éphémère',
    error_voice_note_network: 'Erreur réseau lors de lʼenvoi de la note vocale',
    error_send_retry: 'Envoi échoué. Réessayez.',
    error_audio_data_unavailable: 'Données audio indisponibles.',
    error_delete_account: 'Erreur lors de la suppression du compte',
    error_generic: 'Erreur',
    error_key_regeneration: 'Erreur lors de la régénération des clés.',
    ephemeral_language_error: 'Le mode éphémère nécessite la même langue.',
    ephemeral_offline_error: 'Le destinataire est hors ligne. Les messages éphémères ne peuvent pas être envoyés.',
    confirm_delete_contact: 'Supprimer ce contact ?',
    confirm_delete_account: 'Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action est irréversible.',
    confirm_regenerate_keys: 'Régénérer les clés E2E ? Les messages chiffrés précédents deviendront illisibles.',
    keys_regenerated: 'Nouvelles clés générées avec succès.',
    account_deleted: 'Compte supprimé avec succès',
    avatar_upload_error: "Erreur lors du téléchargement de l'image",
    no_chats: 'Aucun chat actif',
    error_loading_chats: 'Erreur lors du chargement des chats',
    error_guest_diff_language: "Pour discuter avec des utilisateurs parlant une langue différente, une clé API est nécessaire. Enregistrez une clé API sur la page de votre profil.",
    error_guest_group_multilingual: "Les invités ne peuvent créer des groupes qu'avec des personnes parlant la même langue. Pour un groupe multilingue, une clé API est requise.",
    warning_keyholder_add_guest_diff_language: "Le contact que vous ajoutez a un compte Invité et ne parle pas la même langue que vous. Toutes vos conversations seront traduites grâce à vos clés API Gemini.",
    alert_fill_all_fields: 'Veuillez remplir tous les champs obligatoires',
    error_missing_public_key: 'Clé publique manquante pour {memberId}',
    error_cannot_get_public_key: 'Impossible de récupérer la clé publique de {memberId}',

    // ========== Notifiche push ==========
    push_new_message: 'Nouveau message de {name}',
    push_voice_note: 'Note vocale de {name}',
    push_body: '🎵 Note vocale',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'Votre empreinte E2E:',
    speaker_title: 'Écouter',
    media_upload_title: 'Envoyer photo ou vidéo',
    media_expiry_default_warning: 'Les contenus multimédias envoyés sans minuteur d\'autodestruction seront automatiquement supprimés après 7 jours.',
    lightbox_image_alt: 'Image',
    lightbox_video_alt: 'Vidéo',
    translate_show_original: 'Afficher original',
    translating_placeholder: 'Traduction en cours…',
    error_translation_failed: 'Échec de la traduction',
    error_translation_api_key: 'Ajoutez une clé API pour traduire',
    translate_title: 'Traducteur',
    encrypted_message: '🔒 Message chiffré',

    // --- Amministrazione ---
    admin_requests_title: "Demandes d'inscription",
    admin_requests_btn: "Gérer les demandes",
    admin_note_placeholder: "Note (max 30 caractères)",
    admin_account_active: "Actif",
    admin_account_inactive: "En attente",
    admin_toggle_activate: "Activer le compte",
    admin_toggle_deactivate: "Désactiver le compte",
    admin_back_to_profile: "← Retour au profil",

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "Activez le mode Ghost : les messages envoyés ne sont pas sauvegardés sur le serveur et disparaissent lorsque vous quittez le chat. Cela ne fonctionne que si le destinataire a également le chat ouvert.",
    tour_chat_selfdestruct: "Chaque message peut avoir un minuteur d'autodestruction. Le compte à rebours démarre lorsque le destinataire le consulte. À expiration, le message est supprimé pour tout le monde.",
    tour_chat_dictate: "Appui court : démarre la saisie vocale, un deuxième appui l'arrête et envoie le texte. Maintenez enfoncé : enregistrez un message vocal ; relâchez pour l'envoyer. Attendez le signal sonore avant de parler.",
    tour_chat_sent: "Maintenez enfoncé votre message pour le supprimer.",
    tour_chat_received: "Maintenez enfoncé un message reçu pour ajouter une réaction emoji.",
    tour_chat_speaker: "Appuyez sur l'icône du haut-parleur sous le message pour le faire lire à voix haute.",
    tour_chat_clear: "Effacez les messages dans votre interface de chat, mais pas dans celle de votre interlocuteur.",
    tour_group_ghost: "La discussion de groupe est toujours en mode Ghost : la conversation et tous les messages sont effacés lorsque vous quittez la discussion.",
    tour_contacts_fab: "Appuyez pour ajouter un nouveau contact.",
    tour_contacts_delete: "Maintenez enfoncé un contact pour le supprimer. Vous devrez confirmer la suppression.",
    tour_chatslist_fab: "Appuyez pour créer un nouveau chat individuel ou de groupe. Tous les chats de groupe sont toujours en mode Ghost : les messages ne sont pas sauvegardés et ne fonctionnent que lorsque au moins deux participants ont le chat ouvert en même temps.",
    tour_chatslist_delete: "Maintenez enfoncé la bannière d'une discussion pour la supprimer. Vous devrez confirmer la suppression.",
    tour_profile_recording: "Choisissez le son qui vous avertit lorsque l'enregistrement d'un message vocal a effectivement démarré.",
    tour_profile_api: "Pour chatter avec des personnes qui parlent une autre langue, vous avez besoin d'au moins une clé API Gemini. Si vous avez un compte Google, vous pouvez en créer une ou plusieurs, même gratuites, en 3 étapes :<br>1) Rendez-vous sur <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a><br>2) Cliquez sur 'Créer une clé API' en bas à gauche<br>3) Collez-la ici.<br>Si vous en avez plusieurs, le système utilisera la première jusqu'à épuisement du quota journalier, puis passera automatiquement à la suivante.<br>Vous pouvez également discuter sans clé API si vous parlez une langue commune. Vous devez tous les deux la définir depuis la page Profil, mais n'oubliez pas de la changer à nouveau lorsque vous reviendrez discuter avec des personnes parlant votre propre langue.",
    tour_profile_e2e: "Générez de nouvelles clés de chiffrement pour vos messages. Attention : après la régénération, vous ne pourrez plus lire les anciens messages.",
    tour_translate_howto: "Conçu pour les conversations en face à face avec quelqu'un qui ne parle pas votre langue. Choisissez les deux langues. Appuyez une fois sur le bouton Parler dans votre langue, parlez, puis appuyez à nouveau. La traduction s'affichera et une voix la lira dans la langue de l'autre. Votre interlocuteur répond avec le bouton de sa langue.",
    tour_translate_original: "Activez-le pour voir également le texte dans la langue de la personne qui a parlé, afin de vérifier que le message a bien été transmis. Cela consomme davantage les ressources de votre clé API : vous pourrez traduire moins de messages par jour.",
    tour_translate_limits: "L'utilisation du traducteur est soumise aux limites quotidiennes de vos clés API Gemini.",

    // --- UI del tour ---
    tour_next: "Suivant",
    tour_skip: "Passer",
    tour_finish: "Terminer" ,
    profile_tour_label: "Infos visite",
    profile_tour_button: "Recommencer la visite",

    // --- Legal Form ---
    terms_title: "Conditions d'utilisation",
    terms_accept_label: "Je déclare avoir lu et accepté les conditions",
    terms_confirm_btn: "Accepter et s'inscrire",
    terms_text: `DOCUMENT – CONDITIONS D'UTILISATION DU SERVICE GHOST CHAT

      Préambule
      Le présent service (la PWA « Ghost Chat ») est fourni exclusivement en tant que plateforme technique de messagerie anonyme entre utilisateurs. Le propriétaire/administrateur du serveur (le « Fournisseur ») n’exerce aucun contrôle sur les contenus échangés, les identités déclarées ou les comportements des utilisateurs. L’utilisation de l’application est interdite à quiconque n’accepte pas intégralement les conditions suivantes.

      1. Acceptation et obligation de lecture
      En accédant ou en utilisant l’application, l’utilisateur déclare avoir lu, compris et accepté sans réserve toutes les clauses du présent document. L’acceptation constitue un prérequis obligatoire pour l’utilisation du service.

      2. Utilisation licite et interdits absolus
      L’utilisateur s’engage à utiliser l’application uniquement à des fins licites, respectueuses des lois et conformes au droit italien et européen, ainsi qu’aux lois de son pays de résidence. Il est expressément interdit de :
      diffuser du matériel pédopornographique, violent, discriminatoire, diffamatoire, injurieux ou incitant à la haine ;
      planifier, promouvoir ou commettre des infractions de quelque nature que ce soit (ex. : terrorisme, harcèlement, escroqueries, extorsion, trafic de stupéfiants, violence privée) ;
      violer les droits d’autrui (vie privée, propriété intellectuelle, secret professionnel) ;
      utiliser l’application à des fins de phishing, malware, spam ou attaques informatiques ;
      contourner les systèmes de signalement ou d’anonymat pour nuire à des tiers.

      3. Anonymat technique et absence de données identifiantes
      Le service ne requiert ni ne collecte aucune donnée personnelle (nom, email, téléphone, adresse IP permanente) lors de l’inscription. Le serveur ne conserve pas de journaux de connexion ni d’adresses IP des utilisateurs, sauf pendant le temps strictement nécessaire à la transmission des messages (et en tout état de cause jamais au-delà de la session).
      Par conséquent, même en cas d’ordonnance judiciaire, le Fournisseur est incapable de fournir quelque information identificative que ce soit sur les utilisateurs, ni de remonter jusqu’à leur identité réelle.
      La seule donnée associée à un compte est le nom d’utilisateur choisi par l’utilisateur, qui ne permet pas d’identifier une personne physique.

      4. Exclusion totale de responsabilité du Fournisseur pour les usages illicites
      Le Fournisseur n’est en aucun cas responsable – civilement, pénalement ou administrativement – pour :
      les contenus, conversations, fichiers ou actions des utilisateurs ;
      l’usage que des tiers font des messages reçus ;
      d’éventuelles infractions commises via l’application, la plateforme étant un outil passif et neutre de transmission de données (conformément à l’article 14 du décret législatif n° 70/2003 et à la directive UE 2000/31/CE).
      L’utilisateur assume tous les risques découlant de l’utilisation du service.

      5. Obligation de garantie (indemnisation)
      L’utilisateur s’engage à garantir, indemniser et défendre le Fournisseur contre toute réclamation, action en justice, amende, sanction, frais de justice ou dommages-intérêts résultant :
      d’une violation des présentes conditions par l’utilisateur ;
      d’utilisations illégales ou non autorisées de l’application imputables à son compte/sa session ;
      de litiges entre utilisateurs ou avec des tiers découlant de l’utilisation de l’application.
      En cas de condamnation du Fournisseur pour un fait imputable à l’utilisateur, ce dernier est tenu de rembourser intégralement au Fournisseur les sommes versées, y compris les honoraires d’avocat.

      6. Coopération avec les autorités et limites techniques
      Le Fournisseur déclare être pleinement disposé à coopérer avec les autorités judiciaires ou de police, dans le respect des lois applicables, afin de lutter contre d’éventuels usages illicites du service.
      Cependant, l’utilisateur prend acte et accepte que :
      le service a été conçu pour ne pas collecter ni conserver d’adresses IP ou d’autres données identifiantes des utilisateurs ;
      le Fournisseur n’a pas d’accès visuel au contenu des chats privés ni la capacité technique de les extraire ;
      d’éventuels journaux techniques (tels que horodatages, métadonnées de connexion ou traces système) peuvent exister uniquement chez le gestionnaire de l’infrastructure serveur (hébergeur) et ne sont pas à la disposition directe du Fournisseur ;
      le Fournisseur est incapable de fournir des données qu’il ne possède pas ou qui sont techniquement inaccessibles, ni de contourner ses propres mesures d’anonymat et de chiffrement.
      En cas de demande formelle d’une autorité, le Fournisseur s’engage à :
      suspendre ou supprimer immédiatement le compte de l’utilisateur désigné, lorsque techniquement possible ;
      fournir à l’autorité toute information en sa possession (même minime ou non identificative) ;
      indiquer à l’autorité les coordonnées du gestionnaire du serveur, afin qu’elle puisse demander directement à ce dernier d’éventuels journaux techniques non disponibles auprès du Fournisseur.
      L’utilisateur reconnaît que, de par la nature même du service, la coopération du Fournisseur est limitée par son impossibilité technique objective de collecter ou de livrer des données qu’il n’a jamais possédées. Aucune disposition du présent contrat ne peut être interprétée comme une obligation pour le Fournisseur de fournir des preuves ou des identifiants que la loi ne lui impose pas de détenir.

      7. Limites de garantie et de disponibilité
      Le service est fourni « en l’état », sans garantie de continuité, d’absence d’erreur ou de sécurité absolue. Le Fournisseur ne garantit pas l’absence d’interceptions par des tiers ou de vulnérabilités techniques.

      8. Durée, modification et révocation
      Le Fournisseur peut modifier ces conditions à tout moment, en en informant via l’application. L’utilisation continue du service après la modification vaut acceptation. L’utilisateur peut cesser l’utilisation à tout moment. Le Fournisseur peut révoquer l’accès sans préavis en cas de violation.

      9. For compétent et loi applicable
      Le présent contrat est régi par la loi italienne. Pour tout litige relatif au service ou aux présentes conditions, le for exclusif est celui du lieu de résidence du Fournisseur (ou, à son choix, celui de Milan/Rome). L’utilisateur renonce expressément à toute autre juridiction.

      10. Nullité partielle
      Si une quelconque clause était déclarée nulle ou inefficace, les clauses restantes demeurent pleinement valides.

      11. Consentement exprès au sens des art. 1341 et 1342 du code civil italien
      L’utilisateur déclare avoir lu et approuver spécifiquement les clauses relatives à : l’exclusion de responsabilité (art. 4), l’obligation de garantie (art. 5), les limites de garantie (art. 7), le for compétent (art. 9).

      Confirmation d’acceptation obligatoire
      En appuyant sur « J’accepte » ou en continuant à utiliser l’application après 10 secondes d’affichage, l’utilisateur confirme accepter toutes les conditions ci-dessus.`,
    
    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 Faites défiler tout en bas pour activer l’acceptation",

    // --- Admin alerts ---
    admin_no_requests: "Aucune demande d'inscription",
    admin_delete_btn: "Supprimer",
    admin_delete_btn_title: "Supprimer définitivement ce compte",
    admin_delete_confirm: "Es-tu sûr de vouloir supprimer définitivement ce compte ? Cette action est irréversible.",
    admin_delete_error: "Erreur lors de la suppression du compte",
    admin_load_error: "Erreur de chargement des demandes",
  },
  es: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: 'Talk local, chat global, anonymously',
    login_heading: 'Iniciar sesión',
    login_username_placeholder: 'Usuario',
    login_password_placeholder: 'Contraseña',
    login_button: 'Iniciar sesión',
    login_no_account: '¿No tienes cuenta?',
    login_register_link: 'Regístrate',
    register_heading: 'Registrarse',
    register_username_placeholder: 'Usuario',
    register_password_placeholder: 'Contraseña',
    register_language_label: 'Idioma',
    register_api_key_placeholder: 'Clave API Gemini (opcional)',
    register_button: 'Registrarse',
    register_has_account: '¿Ya tienes cuenta?',
    register_login_link: 'Iniciar sesión',
    register_fields_required: 'Completa todos los campos obligatorios',
    registration_pending: 'Registro completo. Espera la aprobación del administrador.',

    // ========== Navigazione ==========
    nav_contacts: 'Contactos',
    nav_chats: 'Chat',
    nav_profile: 'Perfil',
    nav_translate: 'Traducir',

    // ========== Banner offline ==========
    offline_banner: '⚠️ Sin conexión - Esperando conexión...',

    // ========== Contatti ==========
    contacts_title: 'Contactos',
    add_contact_btn: '+ Añadir',
    requests_in: 'Solicitudes recibidas',
    requests_out: 'Solicitudes enviadas',
    no_contacts: 'Sin contactos',
    pending_badge: 'Pendiente',
    role_keyholder: 'Key-holder',
    role_guest: 'Invitado',
    btn_accept: 'Aceptar',
    btn_remove: 'Eliminar',
    contacts_manage_btn: 'Contactos',
    new_chat_btn: 'Nuevo chat',
    new_chat_modal_title: 'Nuevo chat',
    contacts_modal_title: 'Contactos',
    confirm_delete_contact_message: '¿Eliminar a {name} de contactos?',
    confirm_delete_contact_msg: '¿Quieres eliminar el contacto "{name}"?',
    contact_online: '● En línea',
    contact_offline: '● Sin conexión',
    add_contacts_title: 'Añadir contactos',
    btn_cancel: 'Cancelar',
    btn_send_requests: 'Enviar solicitudes',
    select_at_least_one: 'Selecciona al menos un usuario',
    search_contacts_placeholder: 'Buscar contactos...',

    // --- Modale aggiungi contatto ---
    modal_title: 'Añadir contacto',
    search_placeholder: 'Buscar usuario...',
    btn_add: 'Añadir',
    btn_close: 'Cerrar',

    // ========== Chat ==========
    back_btn: '← Atrás',
    clear_chat_btn: 'Borrar chat',
    typing_indicator: 'está escribiendo...',
    expiry_label: '⏳ Autodestrucción:',
    expiry_options: [
          { value: '0', text: 'Sin caducidad' },
          { value: '0.002777', text: '10 segundos' },
          { value: '0.0166667', text: '1 minuto' },
          { value: '0.0833333', text: '5 minutos' },
          { value: '1', text: '1 hora' },
          { value: '6', text: '6 horas' },
          { value: '12', text: '12 horas' },
          { value: '24', text: '24 horas' },
          { value: '168', text: '7 días' },
        ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> Hablar',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> Dictar',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> Escuchando',
    record_btn_release: '⏹ LIBERAR',
    text_input_placeholder: 'Escribe',
    send_text_btn: 'Enviar texto',
    send_text_sending: 'Enviando...',
    message_sent_confirm: 'Nuevo mensaje de {name}\n\n{text}\n\n¿Abrir chat?',
    voice_note_confirm: 'Nueva nota de voz de {name}\n\n¿Abrir chat?',
    confirm_image_message: 'Nueva imagen de {name}\n\n¿Abrir chat?',
    confirm_video_message: 'Nuevo video de {name}\n\n¿Abrir chat?',
    local_notification_voice_note: '🎵 Nota de voz',
    local_notification_image: '🖼️ Imagen',
    local_notification_video: '🎬 Video',
    voice_note_sent: '🎵 Nota de voz enviada',
    voice_note_listen: '▶️ Escuchar nota de voz',
    no_messages: 'Sin mensajes',
    load_error: 'Error al cargar mensajes',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 Ghost',
    individual_chat: '💬 Chat individual',
    group_chat: '👥 Chat de grupo',
    search_chats_placeholder: 'Buscar chats...',
    btn_delete: 'Eliminar',
    confirm_delete_chat_msg: '¿Quieres cerrar el chat con "{name}"?',
    confirm_delete_message: '¿Quieres eliminar este mensaje? También desaparecerá del chat del destinatario.',

    // --- Gruppi ---
    group_chat_modal_title: 'Crea chat de grupo',
    group_chat_modal_subtitle: 'Selecciona los contactos en línea',
    group_create_btn: 'Crear grupo',
    group_leave_btn: 'Salir',
    group_invite_title: 'Invitación al grupo',
    group_invite_accept: 'Entrar',
    group_invite_decline: 'Rechazar',
    group_user_joined: 'se ha unido al grupo',
    group_user_left: 'ha salido del grupo',
    group_error_no_contacts_online: 'Ningún contacto en línea',
    group_error_select_contact: 'Selecciona al menos un contacto',
    group_error_creation_failed: 'Creación del grupo fallida',
    group_notification_created: 'Grupo creado',
    new_contact_request: 'Nueva solicitud de contacto de {{name}}',
    group_chat_title: 'Grupo ({{count}})',
    group_reconnected: 'ha vuelto a entrar',
    group_timeout_suffix: ' (timeout)',
    group_empty: 'Te has quedado solo en el grupo.',
    group_chat_btn: '👥 Grupo',
    send_btn: 'Enviar',

    // ========== Profilo ==========
    profile_avatar_upload: 'Subir foto de perfil',
    profile_avatar_remove: 'Eliminar',
    profile_username_label: 'Usuario',
    profile_language_label: 'Idioma',
    profile_api_key_label: 'Clave API Gemini',
    profile_api_key_placeholder: 'Dejar vacío para eliminar',
    profile_api_key_hint: 'Introduce una nueva clave para ser key-holder',
    profile_voice_label: 'Voz TTS preferida',
    profile_expiry_label: '⏳ Autodestrucción global',
    profile_expiry_hint: 'Los nuevos mensajes heredarán esta duración (modificable por chat)',
    profile_regenerate_keys: 'Regenerar claves E2E',
    profile_regenerate_keys_hint: 'Atención: los mensajes cifrados anteriores serán ilegibles.',
    profile_logout: 'Cerrar sesión',
    profile_delete_account: 'Eliminar cuenta',
    profile_save: 'Guardar cambios',
    profile_password_label: 'Contraseña',
    profile_change_password_btn: 'Cambiar',
    change_password_title: 'Cambiar contraseña',
    current_password_placeholder: 'Contraseña actual',
    new_password_placeholder: 'Nueva contraseña',
    confirm_password_placeholder: 'Confirmar nueva contraseña',
    profile_saved: 'Configuración guardada',
    profile_error: 'Error',
    profile_ui_language_label: 'Idioma de la interfaz',
    profile_theme_label: 'Tema de color',
    theme_red: 'Rojo intenso',
    theme_blue: 'Azul océano',
    theme_green: 'Verde bosque',
    theme_purple: 'Púrpura real',
    profile_ephemeral_default: '👻 Ghost por defecto',
    profile_beep_label: 'Inicio de grabación de audio',

    // --- Chiavi API ---
    profile_api_keys_label: 'Claves API',
    manage_api_keys_btn: 'Gestionar claves API',
    profile_api_keys_hint: 'Añade o elimina claves de Gemini.',
    api_keys_modal_title: 'Tus claves API',
    new_api_key_placeholder: 'Pega una nueva clave API',
    add_api_key_btn: 'Añadir',
    no_api_keys: 'No hay claves API guardadas',
    confirm_delete_api_key: '¿Eliminar esta clave?',

    // ========== Errori e avvisi ==========
    error_network: 'No se puede conectar al servidor',
    error_session_expired: 'Sesión expirada',
    error_login_failed: 'Error al iniciar sesión',
    error_register_failed: 'Error al registrarse',
    error_contact_load: 'Error al cargar contactos',
    error_profile_load: 'No se puede cargar el perfil',
    error_send_failed: 'Envío fallido. Inténtalo de nuevo.',
    error_send_text_failed: 'Envío de texto fallido. Inténtalo de nuevo en unos instantes.',
    error_dictation_blocked: 'Reconocimiento de voz no compatible con este navegador.\nNavegadores recomendados: Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (con flag habilitado).',
    error_dictation_mic: 'Permiso de micrófono denegado para el dictado.',
    error_dictation_generic: 'Error durante el dictado: {error}',
    error_recording_unsupported: 'Grabación no compatible',
    error_mic_access: 'No se puede acceder al micrófono para la nota de voz',
    error_voice_note_e2e: 'No se puede enviar la nota de voz: el destinatario no ha configurado el cifrado E2E. Pídele que abra el perfil.',
    error_private_key_missing: 'Falta la clave privada. Regenera las claves E2E desde el perfil.',
    error_voice_note_send_failed: 'Envío de nota de voz fallido',
    error_text_e2e_required: 'No se puede enviar el mensaje: el destinatario no ha configurado el cifrado E2E. Pídele que abra el perfil.',
    error_decryption_failed: 'Descifrado de audio fallido',
    error_no_audio_data: 'Datos de audio no disponibles.',
    error_audio_decrypt: 'Descifrado de audio fallido',
    error_ephemeral_message: 'Error en el mensaje efímero',
    error_voice_note_network: 'Error de red al enviar la nota de voz',
    error_send_retry: 'Envío fallido. Toca para reintentar.',
    error_audio_data_unavailable: 'Datos de audio no disponibles.',
    error_delete_account: 'Error al eliminar la cuenta',
    error_generic: 'Error',
    error_key_regeneration: 'Error al regenerar las claves.',
    ephemeral_language_error: 'El modo efímero requiere el mismo idioma.',
    ephemeral_offline_error: 'El destinatario está desconectado. Los mensajes efímeros no pueden entregarse.',
    confirm_delete_contact: '¿Eliminar este contacto?',
    confirm_delete_account: '¿Seguro que quieres eliminar definitivamente tu cuenta? Esta acción es irreversible.',
    confirm_regenerate_keys: '¿Regenerar las claves E2E? Los mensajes cifrados anteriores serán ilegibles.',
    keys_regenerated: 'Nuevas claves generadas con éxito.',
    account_deleted: 'Cuenta eliminada con éxito',
    avatar_upload_error: 'Error al cargar la imagen',
    no_chats: 'No hay chats activos',
    error_loading_chats: 'Error al cargar los chats',
    error_guest_diff_language: "Para chatear con usuarios de diferente idioma, se necesita una clave API. Registra una clave API en la página de perfil.",
    error_guest_group_multilingual: "Los usuarios invitados solo pueden crear grupos con personas de su mismo idioma. Para grupos multilingües, se necesita una clave API.",
    warning_keyholder_add_guest_diff_language: "El contacto que estás añadiendo tiene una cuenta de invitado y su idioma es diferente al tuyo. Todas las conversaciones entre vosotros se traducirán usando tus claves API de Gemini.",
    alert_fill_all_fields: 'Completa todos los campos obligatorios',
    error_missing_public_key: 'Falta la clave pública para {memberId}',
    error_cannot_get_public_key: 'No se pudo recuperar la clave pública de {memberId}',

    // ========== Notifiche push ==========
    push_new_message: 'Nuevo mensaje de {name}',
    push_voice_note: 'Nota de voz de {name}',
    push_body: '🎵 Nota de voz',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'Tu huella E2E:',
    speaker_title: 'Escuchar',
    media_upload_title: 'Enviar foto o video',
    media_expiry_default_warning: 'Los contenidos multimedia enviados sin un temporizador de autodestrucción se eliminarán automáticamente después de 7 días.',
    lightbox_image_alt: 'Imagen',
    lightbox_video_alt: 'Video',
    translate_show_original: 'Mostrar original',
    translating_placeholder: 'Traduciendo…',
    error_translation_failed: 'Traducción fallida',
    error_translation_api_key: 'Añade una clave API para traducir',
    translate_title: 'Traductor',
    encrypted_message: '🔒 Mensaje cifrado',

    // --- Amministrazione ---
    admin_requests_title: 'Solicitudes de registro',
    admin_requests_btn: 'Gestionar solicitudes',
    admin_note_placeholder: 'Nota (máx. 30 caracteres)',
    admin_account_active: 'Activo',
    admin_account_inactive: 'En espera',
    admin_toggle_activate: 'Activar cuenta',
    admin_toggle_deactivate: 'Desactivar cuenta',
    admin_back_to_profile: '← Volver al perfil',

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "Activa el modo Fantasma: los mensajes enviados no se guardan en el servidor y desaparecen al salir del chat. Solo funciona si el destinatario también tiene el chat abierto.",
    tour_chat_selfdestruct: 'Cada mensaje puede tener un temporizador de autodestrucción. La cuenta atrás comienza cuando el destinatario lo visualiza. Al expirar, el mensaje se elimina para todos.',
    tour_chat_dictate: 'Toque breve: inicia el dictado por voz; un segundo toque lo detiene y envía el texto. Mantén pulsado: grabas un mensaje de voz; al soltar se envía. Espera la señal acústica antes de hablar.',
    tour_chat_sent: 'Mantén pulsado un mensaje tuyo para eliminarlo.',
    tour_chat_received: 'Mantén pulsado un mensaje recibido para añadir una reacción emoji.',
    tour_chat_speaker: 'Toca el icono del altavoz bajo el mensaje para que te lo lea en voz alta.',
    tour_chat_clear: "Borra los mensajes de tu interfaz de chat, pero no los de la de tu interlocutor.",
    tour_group_ghost: 'El chat de grupo está siempre en modo Ghost: la conversación y todos los mensajes se eliminan cuando sales del chat.',
    tour_contacts_fab: 'Toca para añadir un nuevo contacto.',
    tour_contacts_delete: 'Mantén pulsado un contacto para eliminarlo. Tendrás que confirmar la eliminación.',
    tour_chatslist_fab: "Toca para crear un chat nuevo (individual o grupal). Todos los chats grupales están siempre en modo Fantasma: los mensajes no se guardan y solo funcionan cuando al menos dos participantes tienen el chat abierto al mismo tiempo.",
    tour_chatslist_delete: 'Mantén pulsado el banner de un chat para eliminarlo. Tendrás que confirmar la eliminación.',
    tour_profile_recording: 'Elige el sonido que te avisa cuando la grabación de un mensaje de voz ha comenzado realmente.',
    tour_profile_api: "Para chatear con personas que hablan otro idioma necesitas al menos una clave API de Gemini. Si tienes una cuenta de Google, puedes registrar una o más (gratis) en 3 pasos:<br>1) Ve a <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a><br>2) Haz clic en 'Crear clave API' abajo a la izquierda<br>3) Pégala aquí.<br>Si tienes varias, el sistema usará la primera hasta agotar el límite diario, luego pasará automáticamente a la siguiente.<br>Alternativamente, pueden chatear sin una clave API si hablan un idioma común. Ambos deben configurarlo desde la página de Perfil, pero recuerden cambiarlo nuevamente cuando vuelvan a chatear con personas de su mismo idioma.",
    tour_profile_e2e: 'Genera nuevas claves de cifrado para tus mensajes. Atención: después de regenerarlas no podrás leer los mensajes antiguos.',
    tour_translate_howto: 'Pensado para conversaciones cara a cara con quien no habla tu idioma. Elige los dos idiomas. Pulsa una vez el botón Habla en tu idioma, habla y vuelve a pulsarlo. Aparecerá la traducción y una voz la leerá en el idioma de la otra persona. El interlocutor responde con el botón de su idioma.',
    tour_translate_original: 'Actívalo para ver también el texto en el idioma de quien ha hablado, así puedes comprobar si el mensaje se ha transmitido correctamente. Consume más recursos de tu clave API: podrás traducir menos mensajes al día.',
    tour_translate_limits: 'El uso del traductor está sujeto a los límites diarios de tus claves API de Gemini.',

    // --- UI del tour ---
    tour_next: 'Siguiente',
    tour_skip: 'Saltar',
    tour_finish: 'Finalizar',
    profile_tour_label: "Info del tour",
    profile_tour_button: "Reiniciar tour",

    // --- Legal Form ---
    terms_title: "Condiciones de uso",
    terms_accept_label: "Declaro haber leído y aceptar las condiciones",
    terms_confirm_btn: "Aceptar y registrarse",
    terms_text: `DOCUMENTO – CONDICIONES DE USO DEL SERVICIO DE GHOST CHAT

      Preámbulo
      El presente servicio (la PWA "Ghost Chat") se proporciona exclusivamente como plataforma técnica de mensajería anónima entre usuarios. El titular/administrador del servidor (el "Proveedor") no tiene ningún control sobre los contenidos intercambiados, las identidades declaradas o las conductas de los usuarios. Queda prohibido el uso de la App a toda persona que no acepte íntegramente las siguientes condiciones.

      1. Aceptación y obligación de lectura
      Al acceder o utilizar la App, el usuario declara haber leído, comprendido y aceptado incondicionalmente todas las cláusulas del presente documento. La aceptación es un requisito obligatorio para el uso del servicio.

      2. Uso lícito y prohibiciones absolutas
      El usuario se compromete a utilizar la App únicamente para fines lícitos, civiles y conformes a la legislación italiana y europea, así como a las leyes de su país de residencia. Queda expresamente prohibido:
      - difundir material pedopornográfico, violento, discriminatorio, difamatorio, injurioso o que incite al odio;
      - planificar, promocionar o cometer delitos de cualquier tipo (ej.: terrorismo, acoso, estafas, extorsión, tráfico de drogas, violencia privada);
      - violar derechos ajenos (privacidad, propiedad intelectual, secreto profesional);
      - utilizar la App para actividades de phishing, malware, spam o ataques informáticos;
      - eludir los sistemas de denuncia o anonimato para perjudicar a terceros.

      3. Anonimato técnico y ausencia de datos identificativos
      El servicio no requiere ni recopila ningún dato personal (nombre, correo electrónico, teléfono, dirección IP permanente) en el momento del registro. El servidor no conserva registros de conexión ni direcciones IP de los usuarios, salvo durante el tiempo estrictamente necesario para la transmisión de los mensajes (y en ningún caso más allá de la sesión).
      Por lo tanto, incluso en caso de orden judicial, el Proveedor no puede proporcionar ninguna información identificativa sobre los usuarios, ni remontarse a su identidad real.
      El único dato asociado a una cuenta es el nombre de usuario elegido por el usuario, que no permite identificar a una persona física.

      4. Exclusión total de responsabilidad del Proveedor por usos ilícitos
      El Proveedor no es en modo alguno responsable – civil, penal o administrativamente – por:
      - los contenidos, conversaciones, archivos o acciones de los usuarios;
      - el uso que terceros hagan de los mensajes recibidos;
      - posibles delitos cometidos a través de la App, siendo la plataforma una herramienta pasiva y neutral de transmisión de datos (en virtud del art. 14 del Decreto Legislativo 70/2003 y de la Directiva UE 2000/31/CE).
      El usuario asume todo riesgo derivado del uso del servicio.

      5. Obligación de exoneración (indemnización)
      El usuario se compromete a exonerar, mantener indemne y defender al Proveedor de cualquier reclamación, acción legal, multa, sanción, gasto legal o indemnización derivada de:
      - violaciones de las presentes condiciones por parte del usuario;
      - usos ilegales o no autorizados de la App atribuibles a su cuenta/sesión;
      - controversias entre usuarios o con terceros originadas por el uso de la App.
      En caso de condena del Proveedor por un hecho imputable al usuario, este último estará obligado a reembolsar íntegramente al Proveedor lo pagado, incluidos honorarios legales.

      6. Cooperación con las autoridades y límites técnicos
      El Proveedor declara su total disposición a colaborar con las autoridades judiciales o policiales, en cumplimiento de las leyes aplicables, a fin de combatir posibles usos ilícitos del servicio.
      No obstante, el usuario toma conocimiento y acepta que:
      - el servicio ha sido diseñado para no recopilar ni conservar direcciones IP u otros datos identificativos de los usuarios;
      - el Proveedor no tiene acceso visual a los contenidos de los chats privados ni capacidad técnica para extraerlos;
      - eventuales registros técnicos (como marcas de tiempo, metadatos de conexión o trazas de sistema) pueden existir únicamente en el gestor de la infraestructura del servidor (proveedor de alojamiento) y no están en la disponibilidad directa del Proveedor;
      - el Proveedor no puede proporcionar datos que no posee o que son técnicamente inaccesibles, ni eludir sus propias medidas de anonimato y cifrado.
      En caso de solicitud formal por parte de una autoridad, el Proveedor se compromete a:
      - suspender o cancelar inmediatamente la cuenta del usuario indicado, cuando sea técnicamente posible;
      - proporcionar a la autoridad toda la información en su poder (aunque sea mínima o no identificativa);
      - indicar a la autoridad los datos de contacto del gestor del servidor, para que pueda solicitar directamente a este último los eventuales registros técnicos no disponibles para el Proveedor.
      El usuario reconoce que, por la propia naturaleza del servicio, la colaboración del Proveedor está limitada por su objetiva imposibilidad técnica de recopilar o entregar datos que nunca ha poseído. Ninguna disposición del presente contrato puede interpretarse como una obligación del Proveedor de proporcionar pruebas o identificadores que la ley no le exige conservar.

      7. Límites de garantía y disponibilidad
      El servicio se proporciona "tal cual", sin garantías de continuidad, ausencia de errores o seguridad absoluta. El Proveedor no garantiza la ausencia de interceptaciones por parte de terceros o de vulnerabilidades técnicas.

      8. Duración, modificación y revocación
      El Proveedor puede modificar estas condiciones en cualquier momento, notificándolo a través de la App. El uso continuado del servicio después de la modificación constituye la aceptación. El usuario puede interrumpir el uso en cualquier momento. El Proveedor puede revocar el acceso sin previo aviso en caso de violación.

      9. Fuero competente y ley aplicable
      El presente contrato se rige por la ley italiana. Para cualquier controversia relativa al servicio o a estas condiciones, el fuero exclusivo es el del lugar de residencia del Proveedor (o, a su elección, el de Milán/Roma). El usuario renuncia expresamente a cualquier otra jurisdicción.

      10. Nulidad parcial
      Si alguna cláusula fuera declarada nula o ineficaz, las restantes permanecen plenamente válidas.

      11. Consentimiento expreso en virtud de los arts. 1341 y 1342 del Código Civil italiano
      El usuario declara haber leído y aprobar específicamente las cláusulas relativas a: exclusión de responsabilidad (art. 4), obligación de exoneración (art. 5), límites de garantía (art. 7), fuero competente (art. 9).

      Confirmación de aceptación obligatoria
      Al presionar "Acepto" o continuar utilizando la App después de 10 segundos de su visualización, el usuario confirma que acepta todas las condiciones anteriormente expuestas.`,
    
    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 Desplázate hasta el final para activar la aceptación",

    // --- Admin alerts ---
    admin_no_requests: "No hay solicitudes de registro",
    admin_delete_btn: "Eliminar",
    admin_delete_btn_title: "Eliminar esta cuenta para siempre",
    admin_delete_confirm: "¿Seguro que quieres eliminar esta cuenta definitivamente? No se puede deshacer.",
    admin_delete_error: "Error al eliminar la cuenta",
    admin_load_error: "Error al cargar las solicitudes",
  },
  de: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: 'Talk local, chat global, anonymously',
    login_heading: 'Anmelden',
    login_username_placeholder: 'Benutzername',
    login_password_placeholder: 'Passwort',
    login_button: 'Anmelden',
    login_no_account: 'Noch kein Konto?',
    login_register_link: 'Registrieren',
    register_heading: 'Registrieren',
    register_username_placeholder: 'Benutzername',
    register_password_placeholder: 'Passwort',
    register_language_label: 'Sprache',
    register_api_key_placeholder: 'Gemini API-Schlüssel (optional)',
    register_button: 'Registrieren',
    register_has_account: 'Hast du bereits ein Konto?',
    register_login_link: 'Anmelden',
    register_fields_required: 'Füllen Sie alle Pflichtfelder aus',
    registration_pending: 'Registrierung abgeschlossen. Bitte warten Sie auf die Freigabe durch den Administrator.',

    // ========== Navigazione ==========
    nav_contacts: 'Kontakte',
    nav_chats: 'Chat',
    nav_profile: 'Profil',
    nav_translate: 'Übersetzen',

    // ========== Banner offline ==========
    offline_banner: '⚠️ Offline - Warte auf Verbindung...',

    // ========== Contatti ==========
    contacts_title: 'Kontakte',
    add_contact_btn: '+ Hinzufügen',
    requests_in: 'Eingehende Anfragen',
    requests_out: 'Ausgehende Anfragen',
    no_contacts: 'Keine Kontakte',
    pending_badge: 'Ausstehend',
    role_keyholder: 'Schlüsselhalter',
    role_guest: 'Gast',
    btn_accept: 'Annehmen',
    btn_remove: 'Entfernen',
    contacts_manage_btn: 'Kontakte',
    new_chat_btn: 'Neuer Chat',
    new_chat_modal_title: 'Neuer Chat',
    contacts_modal_title: 'Kontakte',
    confirm_delete_contact_message: '{name} aus den Kontakten entfernen?',
    confirm_delete_contact_msg: 'Möchtest du den Kontakt "{name}" entfernen?',
    contact_online: '● Online',
    contact_offline: '● Offline',
    add_contacts_title: 'Kontakte hinzufügen',
    btn_cancel: 'Abbrechen',
    btn_send_requests: 'Anfragen senden',
    select_at_least_one: 'Mindestens einen Benutzer auswählen',
    search_contacts_placeholder: 'Kontakte suchen...',

    // --- Modale aggiungi contatto ---
    modal_title: 'Kontakt hinzufügen',
    search_placeholder: 'Benutzername suchen...',
    btn_add: 'Hinzufügen',
    btn_close: 'Schließen',

    // ========== Chat ==========
    back_btn: '← Zurück',
    clear_chat_btn: 'Chat löschen',
    typing_indicator: 'schreibt...',
    expiry_label: '⏳ Selbstzerstörung:',
    expiry_options: [
          { value: '0', text: 'Kein Ablauf' },
          { value: '0.002777', text: '10 Sekunden' },
          { value: '0.0166667', text: '1 Minute' },
          { value: '0.0833333', text: '5 Minuten' },
          { value: '1', text: '1 Stunde' },
          { value: '6', text: '6 Stunden' },
          { value: '12', text: '12 Stunden' },
          { value: '24', text: '24 Stunden' },
          { value: '168', text: '7 Tage' },
        ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> Sprechen',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> Diktieren',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> Zuhören',
    record_btn_release: '⏹ LOSLASSEN',
    text_input_placeholder: 'Schreib',
    send_text_btn: 'Text senden',
    send_text_sending: 'Wird gesendet...',
    message_sent_confirm: 'Neue Nachricht von {name}\n\n{text}\n\nChat öffnen?',
    voice_note_confirm: 'Neue Sprachnachricht von {name}\n\nChat öffnen?',
    confirm_image_message: 'Neues Bild von {name}\n\nChat öffnen?',
    confirm_video_message: 'Neues Video von {name}\n\nChat öffnen?',
    local_notification_voice_note: '🎵 Sprachnachricht',
    local_notification_image: '🖼️ Bild',
    local_notification_video: '🎬 Video',
    voice_note_sent: '🎵 Sprachnachricht gesendet',
    voice_note_listen: '▶️ Sprachnachricht anhören',
    no_messages: 'Keine Nachrichten',
    load_error: 'Fehler beim Laden der Nachrichten',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 Ghost',
    individual_chat: '💬 Einzelchat',
    group_chat: '👥 Gruppenchat',
    search_chats_placeholder: 'Chats suchen...',
    btn_delete: 'Löschen',
    confirm_delete_chat_msg: 'Möchtest du den Chat mit "{name}" schließen?',
    confirm_delete_message: 'Möchtest du diese Nachricht löschen? Sie wird auch aus dem Chat des Empfängers entfernt.',

    // --- Gruppi ---
    group_chat_modal_title: 'Gruppenchat erstellen',
    group_chat_modal_subtitle: 'Online-Kontakte auswählen',
    group_create_btn: 'Gruppe erstellen',
    group_leave_btn: 'Verlassen',
    group_invite_title: 'Gruppeneinladung',
    group_invite_accept: 'Beitreten',
    group_invite_decline: 'Ablehnen',
    group_user_joined: 'ist der Gruppe beigetreten',
    group_user_left: 'hat die Gruppe verlassen',
    group_error_no_contacts_online: 'Kein Kontakt online',
    group_error_select_contact: 'Mindestens einen Kontakt auswählen',
    group_error_creation_failed: 'Gruppenerstellung fehlgeschlagen',
    group_notification_created: 'Gruppe erstellt',
    new_contact_request: 'Neue Kontaktanfrage von {{name}}',
    group_chat_title: 'Gruppe ({{count}})',
    group_reconnected: 'ist wieder beigetreten',
    group_timeout_suffix: ' (Timeout)',
    group_empty: 'Du bist allein in der Gruppe.',
    group_chat_btn: '👥 Gruppe',
    send_btn: 'Senden',

    // ========== Profilo ==========
    profile_avatar_upload: 'Profilbild hochladen',
    profile_avatar_remove: 'Entfernen',
    profile_username_label: 'Benutzername',
    profile_language_label: 'Sprache',
    profile_api_key_label: 'Gemini API-Schlüssel',
    profile_api_key_placeholder: 'Leer lassen zum Entfernen',
    profile_api_key_hint: 'Gib einen neuen Schlüssel ein, um Schlüsselhalter zu werden',
    profile_voice_label: 'Bevorzugte TTS-Stimme',
    profile_expiry_label: '⏳ Globale Selbstzerstörung',
    profile_expiry_hint: 'Neue Nachrichten erben diese Dauer (pro Chat änderbar)',
    profile_regenerate_keys: 'E2E-Schlüssel neu generieren',
    profile_regenerate_keys_hint: 'Achtung: Vorherige verschlüsselte Nachrichten werden unlesbar.',
    profile_logout: 'Abmelden',
    profile_delete_account: 'Konto löschen',
    profile_save: 'Änderungen speichern',
    profile_password_label: 'Passwort',
    profile_change_password_btn: 'Ändern',
    change_password_title: 'Passwort ändern',
    current_password_placeholder: 'Aktuelles Passwort',
    new_password_placeholder: 'Neues Passwort',
    confirm_password_placeholder: 'Neues Passwort bestätigen',
    profile_saved: 'Einstellungen gespeichert',
    profile_error: 'Fehler',
    profile_ui_language_label: 'Oberflächensprache',
    profile_theme_label: 'Farbschema',
    theme_red: 'Intensives Rot',
    theme_blue: 'Ozeanblau',
    theme_green: 'Waldgrün',
    theme_purple: 'Königliches Violett',
    profile_ephemeral_default: '👻 Standard-Geist',
    profile_beep_label: 'Start der Audioaufnahme',

    // --- Chiavi API ---
    profile_api_keys_label: 'API-Schlüssel',
    manage_api_keys_btn: 'API-Schlüssel verwalten',
    profile_api_keys_hint: 'Füge Gemini-Schlüssel hinzu oder entferne sie.',
    api_keys_modal_title: 'Deine API-Schlüssel',
    new_api_key_placeholder: 'Neuen API-Schlüssel einfügen',
    add_api_key_btn: 'Hinzufügen',
    no_api_keys: 'Keine API-Schlüssel gespeichert',
    confirm_delete_api_key: 'Diesen Schlüssel löschen?',

    // ========== Errori e avvisi ==========
    error_network: 'Verbindung zum Server nicht möglich',
    error_session_expired: 'Sitzung abgelaufen',
    error_login_failed: 'Fehler beim Anmelden',
    error_register_failed: 'Fehler bei der Registrierung',
    error_contact_load: 'Fehler beim Laden der Kontakte',
    error_profile_load: 'Profil konnte nicht geladen werden',
    error_send_failed: 'Senden fehlgeschlagen. Bitte versuche es erneut.',
    error_send_text_failed: 'Senden des Textes fehlgeschlagen. Versuche es in Kürze erneut.',
    error_dictation_blocked:
          'Spracherkennung wird von diesem Browser nicht unterstützt.\nEmpfohlene Browser: Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (mit aktiviertem Flag).',
    error_dictation_mic: 'Mikrofonzugriff für Diktat verweigert.',
    error_dictation_generic: 'Fehler beim Diktieren: {error}',
    error_recording_unsupported: 'Aufnahme nicht unterstützt',
    error_mic_access: 'Kein Zugriff auf das Mikrofon für Sprachnachricht',
    error_voice_note_e2e:
          'Sprachnachricht kann nicht gesendet werden: Der Empfänger hat keine E2E-Verschlüsselung eingerichtet. Bitte ihn, das Profil zu öffnen.',
    error_private_key_missing:
          'Privater Schlüssel fehlt. Generiere die E2E-Schlüssel im Profil neu.',
    error_voice_note_send_failed: 'Senden der Sprachnachricht fehlgeschlagen',
    error_text_e2e_required:
          'Nachricht kann nicht gesendet werden: Der Empfänger hat keine E2E-Verschlüsselung eingerichtet. Bitte ihn, das Profil zu öffnen.',
    error_decryption_failed: 'Entschlüsselung der Audiodatei fehlgeschlagen',
    error_no_audio_data: 'Keine Audiodaten verfügbar.',
    error_audio_decrypt: 'Entschlüsselung der Audiodaten fehlgeschlagen',
    error_ephemeral_message: 'Fehler bei flüchtiger Nachricht',
    error_voice_note_network: 'Netzwerkfehler beim Senden der Sprachnachricht',
    error_send_retry: 'Senden fehlgeschlagen. Erneut versuchen.',
    error_audio_data_unavailable: 'Audiodaten nicht verfügbar.',
    error_delete_account: 'Fehler beim Löschen des Kontos',
    error_generic: 'Fehler',
    error_key_regeneration: 'Fehler beim Neugenerieren der Schlüssel.',
    ephemeral_language_error: 'Der ephemere Modus erfordert die gleiche Sprache.',
    ephemeral_offline_error:
          'Der Empfänger ist offline. Ephemere Nachrichten können nicht zugestellt werden.',
    confirm_delete_contact: 'Diesen Kontakt entfernen?',
    confirm_delete_account:
          'Bist du sicher, dass du dein Konto endgültig löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.',
    confirm_regenerate_keys:
          'E2E-Schlüssel neu generieren? Vorherige verschlüsselte Nachrichten werden unlesbar.',
    keys_regenerated: 'Neue Schlüssel erfolgreich generiert.',
    account_deleted: 'Konto erfolgreich gelöscht',
    avatar_upload_error: 'Fehler beim Hochladen des Bildes',
    no_chats: 'Keine aktiven Chats',
    error_loading_chats: 'Fehler beim Laden der Chats',
    error_guest_diff_language: "Um mit Benutzern einer anderen Sprache zu chatten, ist ein API-Schlüssel erforderlich. Registrieren Sie einen API-Schlüssel auf der Profilseite.",
    error_guest_group_multilingual: "Gastnutzer können nur Gruppen mit Personen gleicher Sprache erstellen. Für mehrsprachige Gruppen wird ein API-Schlüssel benötigt.",
    warning_keyholder_add_guest_diff_language: "Der Kontakt, den du hinzufügst, hat ein Gastkonto und spricht eine andere Sprache als du. Alle Chats zwischen euch werden mit deinen Gemini-API-Schlüsseln übersetzt.",
    alert_fill_all_fields: 'Füllen Sie alle Pflichtfelder aus',
    error_missing_public_key: 'Öffentlicher Schlüssel für {memberId} fehlt',
    error_cannot_get_public_key: 'Öffentlicher Schlüssel von {memberId} konnte nicht abgerufen werden',

    // ========== Notifiche push ==========
    push_new_message: 'Neue Nachricht von {name}',
    push_voice_note: 'Sprachnachricht von {name}',
    push_body: '🎵 Sprachnachricht',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'Dein E2E-Fingerabdruck:',
    speaker_title: 'Anhören',
    media_upload_title: 'Foto oder Video senden',
    media_expiry_default_warning: 'Ohne Selbstzerstörungstimer gesendete Medien werden nach 7 Tagen automatisch gelöscht.',
    lightbox_image_alt: 'Bild',
    lightbox_video_alt: 'Video',
    translate_show_original: 'Original anzeigen',
    translating_placeholder: 'Übersetzen…',
    error_translation_failed: 'Übersetzung fehlgeschlagen',
    error_translation_api_key: 'API-Schlüssel zum Übersetzen hinzufügen',
    translate_title: 'Übersetzer',
    encrypted_message: '🔒 Verschlüsselte Nachricht',

    // --- Amministrazione ---
    admin_requests_title: 'Registrierungsanfragen',
    admin_requests_btn: 'Anfragen verwalten',
    admin_note_placeholder: 'Notiz (max. 30 Zeichen)',
    admin_account_active: 'Aktiv',
    admin_account_inactive: 'Ausstehend',
    admin_toggle_activate: 'Konto aktivieren',
    admin_toggle_deactivate: 'Konto deaktivieren',
    admin_back_to_profile: '← Zurück zum Profil',

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "Aktiviere den Ghost-Modus: Gesendete Nachrichten werden nicht auf dem Server gespeichert und verschwinden, wenn du den Chat verlässt. Funktioniert nur, wenn auch der Empfänger den Chat geöffnet hat.",
    tour_chat_selfdestruct: 'Jede Nachricht kann einen Selbstzerstörungstimer haben. Der Countdown startet, sobald der Empfänger sie ansieht. Nach Ablauf wird die Nachricht für alle gelöscht.',
    tour_chat_dictate: 'Kurzes Tippen: Startet die Spracheingabe, ein zweites Tippen stoppt und sendet den Text. Halten: Nimmst eine Sprachnachricht auf; beim Loslassen wird sie gesendet. Warte auf den Signalton, bevor du sprichst.',
    tour_chat_sent: 'Halte eine eigene Nachricht gedrückt, um sie zu löschen.',
    tour_chat_received: 'Halte eine empfangene Nachricht gedrückt, um eine Emoji-Reaktion hinzuzufügen.',
    tour_chat_speaker: 'Tippe auf das Lautsprechersymbol unter einer Nachricht, um sie dir vorlesen zu lassen.',
    tour_chat_clear: "Lösche die Nachrichten in deiner Chat-Oberfläche, aber nicht in der deines Gesprächspartners.",
    tour_group_ghost: 'Der Gruppenchat ist immer im Ghost-Modus: Die Unterhaltung und alle Nachrichten werden gelöscht, wenn du den Chat verlässt.',
    tour_contacts_fab: 'Tippe, um einen neuen Kontakt hinzuzufügen.',
    tour_contacts_delete: 'Halte einen Kontakt gedrückt, um ihn zu löschen. Du musst die Löschung bestätigen.',
    tour_chatslist_fab: "Tippe, um einen neuen Einzel- oder Gruppenchat zu erstellen. Alle Gruppenchats sind immer im Ghost-Modus: Nachrichten werden nicht gespeichert und funktionieren nur, wenn mindestens zwei Teilnehmer den Chat gleichzeitig geöffnet haben.",
    tour_chatslist_delete: 'Halte das Banner eines Chats gedrückt, um ihn zu löschen. Du musst die Löschung bestätigen.',
    tour_profile_recording: 'Wähle den Ton, der dich benachrichtigt, wenn die Aufnahme einer Sprachnachricht tatsächlich gestartet ist.',
    tour_profile_api: "Um mit Personen zu chatten, die eine andere Sprache sprechen, benötigst du mindestens einen Gemini-API-Schlüssel. Wenn du ein Google-Konto hast, kannst du einen oder mehrere (auch kostenlose) in 3 Schritten erstellen:<br>1) Gehe zu <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a><br>2) Klicke unten links auf 'API-Schlüssel erstellen'<br>3) Füge ihn hier ein.<br>Falls du mehrere hast, verwendet das System den ersten, bis das Tageslimit erreicht ist, und wechselt dann automatisch zum nächsten.<br>Alternativ können Sie ohne API-Schlüssel chatten, wenn Sie eine gemeinsame Sprache sprechen. Sie müssen beide die Sprache auf der Profilseite einstellen, aber denken Sie daran, sie wieder zu ändern, wenn Sie mit Personen Ihrer eigenen Sprache chatten.",
    tour_profile_e2e: 'Erzeuge neue Verschlüsselungsschlüssel für deine Nachrichten. Achtung: Nach der Neuerstellung kannst du alte Nachrichten nicht mehr lesen.',
    tour_translate_howto: 'Für Gespräche von Angesicht zu Angesicht mit jemandem, der deine Sprache nicht spricht. Wähle die beiden Sprachen. Drücke einmal auf die Schaltfläche „Sprechen“ in deiner Sprache, sprich und drücke sie erneut. Die Übersetzung erscheint und eine Stimme liest sie in der Sprache des Gegenübers vor. Der Gesprächspartner antwortet mit der Schaltfläche seiner Sprache.',
    tour_translate_original: 'Aktiviere diese Option, um auch den Originaltext in der Sprache des Sprechers zu sehen, damit du überprüfen kannst, ob die Nachricht korrekt übermittelt wurde. Verbraucht mehr Ressourcen deines API-Schlüssels: Du kannst weniger Nachrichten pro Tag übersetzen.',
    tour_translate_limits: 'Die Nutzung des Übersetzers ist an die Tageslimits deiner Gemini-API-Schlüssel gebunden.',

    // --- UI del tour ---
    tour_next: 'Weiter',
    tour_skip: 'Überspringen',
    tour_finish: 'Fertig',
    profile_tour_label: "Tour-Info",
    profile_tour_button: "Tour neu starten",

    // --- Legal Form ---
    terms_title: "Nutzungsbedingungen",
    terms_accept_label: "Ich erkläre, dass ich die Bedingungen gelesen und akzeptiert habe",
    terms_confirm_btn: "Akzeptieren und registrieren",
    terms_text: `DOKUMENT – NUTZUNGSBEDINGUNGEN DES GHOST CHAT-DIENSTES

      Präambel
      Dieser Dienst (die PWA „Ghost Chat“) wird ausschließlich als technische Plattform für anonyme Nachrichtenübermittlung zwischen Nutzern bereitgestellt. Der Betreiber/Administrator des Servers (der „Anbieter“) hat keinerlei Kontrolle über die ausgetauschten Inhalte, die angegebenen Identitäten oder das Verhalten der Nutzer. Die Nutzung der App ist für jeden verboten, der die folgenden Bedingungen nicht vollständig akzeptiert.

      1. Akzeptanz und Lesepflicht
      Durch den Zugriff auf oder die Nutzung der App erklärt der Nutzer, dass er alle Klauseln dieses Dokuments gelesen, verstanden und vorbehaltlos akzeptiert hat. Die Akzeptanz ist eine zwingende Voraussetzung für die Nutzung des Dienstes.

      2. Rechtmäßige Nutzung und absolute Verbote
      Der Nutzer verpflichtet sich, die App nur für rechtmäßige, zivile Zwecke zu nutzen, die dem italienischen und europäischen Recht sowie den Gesetzen seines Wohnsitzlandes entsprechen. Es ist ausdrücklich verboten:
      - Verbreitung von kinderpornografischem, gewalttätigem, diskriminierendem, diffamierendem, beleidigendem oder zu Hass aufstachelndem Material;
      - Planung, Förderung oder Begehung von Straftaten jeglicher Art (z. B. Terrorismus, Stalking, Betrug, Erpressung, Drogenhandel, Nötigung);
      - Verletzung von Rechten Dritter (Privatsphäre, geistiges Eigentum, Berufsgeheimnis);
      - Nutzung der App für Phishing, Malware, Spam oder Cyberangriffe;
      - Umgehung der Meldesysteme oder der Anonymität, um Dritten zu schaden.

      3. Technische Anonymität und Fehlen personenbezogener Daten
      Der Dienst verlangt oder erhebt bei der Registrierung keine personenbezogenen Daten (Name, E-Mail, Telefon, permanente IP-Adresse). Der Server speichert weder Verbindungsprotokolle noch IP-Adressen der Nutzer, es sei denn für die Dauer, die unbedingt für die Übermittlung von Nachrichten erforderlich ist (und auf jeden Fall nicht über die Sitzung hinaus).
      Daher ist der Anbieter selbst auf gerichtliche Anordnung hin nicht in der Lage, identifizierende Informationen über die Nutzer bereitzustellen oder deren wahre Identität zu ermitteln.
      Das einzige einem Konto zugeordnete Datum ist der vom Nutzer gewählte Benutzername, der keine Identifizierung einer natürlichen Person ermöglicht.

      4. Vollständiger Haftungsausschluss des Anbieters für rechtswidrige Nutzung
      Der Anbieter haftet in keiner Weise – weder zivil-, straf- noch verwaltungsrechtlich – für:
      - die Inhalte, Gespräche, Dateien oder Handlungen der Nutzer;
      - die Nutzung der empfangenen Nachrichten durch Dritte;
      - etwaige Straftaten, die über die App begangen werden, da die Plattform ein passives und neutrales Instrument zur Datenübertragung ist (gemäß Art. 14 des italienischen Gesetzesdekrets 70/2003 und der EU-Richtlinie 2000/31/EG).
      Der Nutzer trägt alle Risiken, die sich aus der Nutzung des Dienstes ergeben.

      5. Freistellungspflicht (Schadloshaltung)
      Der Nutzer verpflichtet sich, den Anbieter von jeglichen Forderungen, Klagen, Geldstrafen, Sanktionen, Rechtskosten oder Schadensersatzansprüchen freizustellen, schadlos zu halten und zu verteidigen, die sich ergeben aus:
      - Verstößen des Nutzers gegen diese Bedingungen;
      - illegalen oder nicht autorisierten Nutzungen der App, die auf sein Konto/seine Sitzung zurückzuführen sind;
      - Streitigkeiten zwischen Nutzern oder mit Dritten, die aus der Nutzung der App entstehen.
      Im Falle einer Verurteilung des Anbieters aufgrund eines vom Nutzer zu vertretenden Umstands ist der Nutzer verpflichtet, dem Anbieter den gezahlten Betrag vollständig zu erstatten, einschließlich der Anwaltsgebühren.

      6. Zusammenarbeit mit Behörden und technische Grenzen
      Der Anbieter erklärt seine volle Bereitschaft, im Rahmen der geltenden Gesetze mit Justiz- oder Polizeibehörden zusammenzuarbeiten, um rechtswidrigen Nutzungen des Dienstes entgegenzuwirken.
      Der Nutzer nimmt jedoch zur Kenntnis und akzeptiert, dass:
      - der Dienst so konzipiert ist, dass er keine IP-Adressen oder andere identifizierende Daten der Nutzer erhebt oder speichert;
      - der Anbieter keinen visuellen Zugriff auf die Inhalte privater Chats hat und auch nicht über die technische Fähigkeit verfügt, diese zu extrahieren;
      - eventuelle technische Protokolle (wie Zeitstempel, Verbindungsmetadaten oder Systemspuren) ausschließlich beim Betreiber der Serverinfrastruktur (Hosting-Provider) vorhanden sein können und nicht in der direkten Verfügbarkeit des Anbieters liegen;
      - der Anbieter nicht in der Lage ist, Daten bereitzustellen, die er nicht besitzt oder die technisch unzugänglich sind, noch seine eigenen Anonymisierungs- und Verschlüsselungsmaßnahmen zu umgehen.
      Im Falle einer formellen Anfrage einer Behörde verpflichtet sich der Anbieter:
      - das angegebene Nutzerkonto, sofern technisch möglich, sofort zu sperren oder zu löschen;
      - der Behörde alle in seinem Besitz befindlichen Informationen (auch wenn minimal oder nicht identifizierend) zur Verfügung zu stellen;
      - der Behörde die Kontaktdaten des Serverbetreibers mitzuteilen, damit dieser direkt eventuelle technische Protokolle anfordern kann, die nicht im Besitz des Anbieters sind.
      Der Nutzer erkennt an, dass die Zusammenarbeit des Anbieters aufgrund der Natur des Dienstes durch dessen objektive technische Unmöglichkeit begrenzt ist, Daten zu erheben oder zu liefern, die er nie besessen hat. Keine Bestimmung dieses Vertrags kann als Verpflichtung des Anbieters ausgelegt werden, Beweise oder Identifikationsmerkmale bereitzustellen, deren Aufbewahrung ihm nicht gesetzlich auferlegt ist.

      7. Gewährleistungs- und Verfügbarkeitsbeschränkungen
      Der Dienst wird „wie besehen“ bereitgestellt, ohne Gewährleistung für Kontinuität, Fehlerfreiheit oder absolute Sicherheit. Der Anbieter garantiert nicht die Abwesenheit von Abhörmaßnahmen durch Dritte oder technische Schwachstellen.

      8. Dauer, Änderung und Widerruf
      Der Anbieter kann diese Bedingungen jederzeit ändern, indem er dies über die App mitteilt. Die fortgesetzte Nutzung des Dienstes nach der Änderung stellt eine Akzeptanz dar. Der Nutzer kann die Nutzung jederzeit einstellen. Der Anbieter kann den Zugang bei Verstoß ohne Vorankündigung entziehen.

      9. Gerichtsstand und anwendbares Recht
      Dieser Vertrag unterliegt italienischem Recht. Für alle Streitigkeiten im Zusammenhang mit dem Dienst oder diesen Bedingungen ist der ausschließliche Gerichtsstand der Wohnsitz des Anbieters (oder nach seiner Wahl Mailand/Rom). Der Nutzer verzichtet ausdrücklich auf jede andere Gerichtsbarkeit.

      10. Teilnichtigkeit
      Sollte eine Klausel für nichtig oder unwirksam erklärt werden, bleiben die übrigen vollumfänglich gültig.

      11. Ausdrückliche Einwilligung gemäß Art. 1341 und 1342 des italienischen Zivilgesetzbuches
      Der Nutzer erklärt, die Klauseln bezüglich Haftungsausschluss (Art. 4), Freistellungspflicht (Art. 5), Gewährleistungsbeschränkungen (Art. 7) und Gerichtsstand (Art. 9) speziell gelesen und gebilligt zu haben.

      Verbindliche Akzeptanzbestätigung
      Durch Drücken von „Akzeptieren“ oder durch fortgesetzte Nutzung der App innerhalb von 10 Sekunden nach Anzeige bestätigt der Nutzer, dass er alle oben aufgeführten Bedingungen akzeptiert.`,

    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 Scrolle ganz nach unten, um die Zustimmung zu aktivieren",

    // --- Admin alerts ---
    admin_no_requests: "Keine Registrierungsanfragen",
    admin_delete_btn: "Löschen",
    admin_delete_btn_title: "Diesen Account dauerhaft löschen",
    admin_delete_confirm: "Bist du sicher, dass du diesen Account dauerhaft löschen willst? Diese Aktion kann nicht rückgängig gemacht werden.",
    admin_delete_error: "Fehler beim Löschen des Accounts",
    admin_load_error: "Fehler beim Laden der Anfragen",
  },
  ru: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: 'Говори по-местному, общайся с миром, анонимно',
    login_heading: 'Войти',
    login_username_placeholder: 'Имя пользователя',
    login_password_placeholder: 'Пароль',
    login_button: 'Войти',
    login_no_account: 'Нет аккаунта?',
    login_register_link: 'Зарегистрироваться',
    register_heading: 'Регистрация',
    register_username_placeholder: 'Имя пользователя',
    register_password_placeholder: 'Пароль',
    register_language_label: 'Язык',
    register_api_key_placeholder: 'API-ключ Gemini (необязательно)',
    register_button: 'Зарегистрироваться',
    register_has_account: 'Уже есть аккаунт?',
    register_login_link: 'Войти',
    register_fields_required: 'Заполните все обязательные поля',
    registration_pending: 'Регистрация завершена. Ожидайте одобрения администратора.',

    // ========== Navigazione ==========
    nav_contacts: 'Контакты',
    nav_chats: 'Чат',
    nav_profile: 'Профиль',
    nav_translate: 'Перевести',

    // ========== Banner offline ==========
    offline_banner: '⚠️ Офлайн — ожидание подключения...',

    // ========== Contatti ==========
    contacts_title: 'Контакты',
    add_contact_btn: '+ Добавить',
    requests_in: 'Входящие запросы',
    requests_out: 'Исходящие запросы',
    no_contacts: 'Нет контактов',
    pending_badge: 'Ожидание',
    role_keyholder: 'Key-holder',
    role_guest: 'Guest',
    btn_accept: 'Принять',
    btn_remove: 'Удалить',
    contacts_manage_btn: 'Контакты',
    new_chat_btn: 'Новый чат',
    new_chat_modal_title: 'Новый чат',
    contacts_modal_title: 'Контакты',
    confirm_delete_contact_message: 'Удалить {name} из контактов?',
    confirm_delete_contact_msg: 'Вы хотите удалить контакт "{name}"?',
    contact_online: '● В сети',
    contact_offline: '● Не в сети',
    add_contacts_title: 'Добавить контакты',
    btn_cancel: 'Отмена',
    btn_send_requests: 'Отправить запросы',
    select_at_least_one: 'Выберите хотя бы одного пользователя',
    search_contacts_placeholder: 'Поиск контактов...',

    // --- Modale aggiungi contatto ---
    modal_title: 'Добавить контакт',
    search_placeholder: 'Поиск пользователя...',
    btn_add: 'Добавить',
    btn_close: 'Закрыть',

    // ========== Chat ==========
    back_btn: '← Назад',
    clear_chat_btn: 'Очистить чат',
    typing_indicator: 'печатает...',
    expiry_label: '⏳ Самоуничтожение:',
    expiry_options: [
      { value: '0', text: 'Без срока' },
      { value: '0.002777', text: '10 секунд' },
      { value: '0.0166667', text: '1 минута' },
      { value: '0.0833333', text: '5 минут' },
      { value: '1', text: '1 час' },
      { value: '6', text: '6 часов' },
      { value: '12', text: '12 часов' },
      { value: '24', text: '24 часа' },
      { value: '168', text: '7 дней' },
    ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> ГОВОРИТЬ',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> ДИКТОВАТЬ',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> СЛУШАНИЕ',
    record_btn_release: '⏹ ОТПУСТИТЬ',
    text_input_placeholder: 'Напиши',
    send_text_btn: 'Отправить текст',
    send_text_sending: 'Отправка...',
    message_sent_confirm: 'Новое сообщение от {name}\n\n{text}\n\nОткрыть чат?',
    voice_note_confirm: 'Новое голосовое сообщение от {name}\n\nОткрыть чат?',
    confirm_image_message: 'Новое изображение от {name}\n\nОткрыть чат?',
    confirm_video_message: 'Новое видео от {name}\n\nОткрыть чат?',
    local_notification_voice_note: '🎵 Голосовое сообщение',
    local_notification_image: '🖼️ Изображение',
    local_notification_video: '🎬 Видео',
    voice_note_sent: '🎵 Голосовое сообщение отправлено',
    voice_note_listen: '▶️ Прослушать голосовое сообщение',
    no_messages: 'Нет сообщений',
    load_error: 'Ошибка загрузки сообщений',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 призрак',
    individual_chat: '💬 Личный чат',
    group_chat: '👥 Групповой чат',
    search_chats_placeholder: 'Поиск чатов...',
    btn_delete: 'Удалить',
    confirm_delete_chat_msg: 'Вы хотите закрыть чат с "{name}"?',
    confirm_delete_message: 'Удалить это сообщение? Оно исчезнет и у получателя.',

    // --- Gruppi ---
    group_chat_modal_title: 'Создать групповой чат',
    group_chat_modal_subtitle: 'Выберите контакты онлайн',
    group_create_btn: 'Создать группу',
    group_leave_btn: 'Выйти',
    group_invite_title: 'Приглашение в группу',
    group_invite_accept: 'Войти',
    group_invite_decline: 'Отклонить',
    group_user_joined: 'вошёл в группу',
    group_user_left: 'покинул группу',
    group_error_no_contacts_online: 'Нет контактов онлайн',
    group_error_select_contact: 'Выберите хотя бы один контакт',
    group_error_creation_failed: 'Не удалось создать группу',
    group_notification_created: 'Группа создана',
    new_contact_request: 'Новый запрос контакта от {{name}}',
    group_chat_title: 'Группа ({{count}})',
    group_reconnected: 'присоединился снова',
    group_timeout_suffix: ' (timeout)',
    group_empty: 'Вы остались в группе один.',
    group_chat_btn: '👥 Группа',
    send_btn: 'Отправить',

    // ========== Profilo ==========
    profile_avatar_upload: 'Загрузить фото профиля',
    profile_avatar_remove: 'Удалить',
    profile_username_label: 'Имя пользователя',
    profile_language_label: 'Язык',
    profile_api_key_label: 'API-ключ Gemini',
    profile_api_key_placeholder: 'Оставьте пустым, чтобы удалить',
    profile_api_key_hint: 'Введите новый ключ, чтобы стать key-holder',
    profile_voice_label: 'Предпочитаемый голос TTS',
    profile_expiry_label: '⏳ Глобальное самоуничтожение',
    profile_expiry_hint: 'Новые сообщения унаследуют этот срок (можно изменить для каждого чата)',
    profile_regenerate_keys: 'Пересоздать E2E-ключи',
    profile_regenerate_keys_hint: 'Внимание: ранее зашифрованные сообщения станут нечитаемыми.',
    profile_logout: 'Выйти',
    profile_delete_account: 'Удалить аккаунт',
    profile_save: 'Сохранить изменения',
    profile_password_label: 'Пароль',
    profile_change_password_btn: 'Изменить',
    change_password_title: 'Изменить пароль',
    current_password_placeholder: 'Текущий пароль',
    new_password_placeholder: 'Новый пароль',
    confirm_password_placeholder: 'Подтвердите новый пароль',
    profile_saved: 'Настройки сохранены',
    profile_error: 'Ошибка',
    profile_ui_language_label: 'Язык интерфейса',
    profile_theme_label: 'Цветовая тема',
    theme_red: 'Интенсивный красный',
    theme_blue: 'Океанский синий',
    theme_green: 'Лесной зелёный',
    theme_purple: 'Королевский пурпурный',
    profile_ephemeral_default: '👻 Призрачный режим по умолчанию',
    profile_beep_label: 'Начало записи аудио',

    // --- Chiavi API ---
    profile_api_keys_label: 'API-ключи',
    manage_api_keys_btn: 'Управление API-ключами',
    profile_api_keys_hint: 'Добавьте или удалите ключи Gemini.',
    api_keys_modal_title: 'Ваши API-ключи',
    new_api_key_placeholder: 'Вставьте новый API-ключ',
    add_api_key_btn: 'Добавить',
    no_api_keys: 'Нет сохранённых API-ключей',
    confirm_delete_api_key: 'Удалить этот ключ?',

    // ========== Errori e avvisi ==========
    error_network: 'Не удалось подключиться к серверу',
    error_session_expired: 'Сессия истекла',
    error_login_failed: 'Ошибка входа',
    error_register_failed: 'Ошибка регистрации',
    error_contact_load: 'Ошибка загрузки контактов',
    error_profile_load: 'Не удалось загрузить профиль',
    error_send_failed: 'Отправка не удалась. Попробуйте снова.',
    error_send_text_failed: 'Отправка текста не удалась. Попробуйте через несколько секунд.',
    error_dictation_blocked: 'Распознавание речи не поддерживается в этом браузере.\nРекомендуемые браузеры: Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (с включённым флагом).',
    error_dictation_mic: 'Доступ к микрофону для диктовки запрещён.',
    error_dictation_generic: 'Ошибка диктовки: {error}',
    error_recording_unsupported: 'Запись не поддерживается',
    error_mic_access: 'Нет доступа к микрофону для голосового сообщения',
    error_voice_note_e2e: 'Невозможно отправить голосовое сообщение: получатель не настроил E2E-шифрование. Попросите его открыть профиль.',
    error_private_key_missing: 'Приватный ключ отсутствует. Пересоздайте E2E-ключи в профиле.',
    error_voice_note_send_failed: 'Отправка голосового сообщения не удалась',
    error_text_e2e_required: 'Невозможно отправить сообщение: получатель не настроил E2E-шифрование. Попросите его открыть профиль.',
    error_decryption_failed: 'Ошибка расшифровки аудио',
    error_no_audio_data: 'Аудиоданные недоступны.',
    error_audio_decrypt: 'Не удалось расшифровать аудио',
    error_ephemeral_message: 'Ошибка эфемерного сообщения',
    error_voice_note_network: 'Ошибка сети при отправке голосового сообщения',
    error_send_retry: 'Отправка не удалась. Попробуйте снова.',
    error_audio_data_unavailable: 'Аудиоданные недоступны.',
    error_delete_account: 'Ошибка при удалении аккаунта',
    error_generic: 'Ошибка',
    error_key_regeneration: 'Ошибка при пересоздании ключей.',
    ephemeral_language_error: 'Для эфемерного режима требуется одинаковый язык.',
    ephemeral_offline_error: 'Получатель не в сети. Эфемерные сообщения не могут быть доставлены.',
    confirm_delete_contact: 'Удалить этот контакт?',
    confirm_delete_account: 'Вы уверены, что хотите навсегда удалить аккаунт? Это действие необратимо.',
    confirm_regenerate_keys: 'Пересоздать E2E-ключи? Ранее зашифрованные сообщения станут нечитаемыми.',
    keys_regenerated: 'Новые ключи успешно созданы.',
    account_deleted: 'Аккаунт успешно удалён',
    avatar_upload_error: 'Ошибка загрузки изображения',
    no_chats: 'Нет активных чатов',
    error_loading_chats: 'Ошибка загрузки чатов',
    error_guest_diff_language: "Для общения с пользователями на другом языке требуется ключ API. Зарегистрируйте ключ API на странице профиля.",
    error_guest_group_multilingual: "Gli utenti guest possono creare gruppi solo con persone della stessa lingua. Per gruppi multilingua serve una chiave API.",
    warning_keyholder_add_guest_diff_language: "Il contatto che stai aggiungendo ha un account Guest ed è di lingua diversa dalla tua. Tutte le chat tra di voi saranno tradotte usando le tue chiavi API di Gemini.",
    alert_fill_all_fields: 'Заполните все обязательные поля',
    error_missing_public_key: 'Отсутствует открытый ключ для {memberId}',
    error_cannot_get_public_key: 'Не удалось получить открытый ключ {memberId}',

    // ========== Notifiche push ==========
    push_new_message: 'Новое сообщение от {name}',
    push_voice_note: 'Голосовое сообщение от {name}',
    push_body: '🎵 Голосовое сообщение',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'Ваш отпечаток E2E:',
    speaker_title: 'Прослушать',
    media_upload_title: 'Отправить фото или видео',
    media_expiry_default_warning: 'Медиафайлы, отправленные без таймера самоуничтожения, будут автоматически удалены через 7 дней.',
    lightbox_image_alt: 'Изображение',
    lightbox_video_alt: 'Видео',
    translate_show_original: 'Показать оригинал',
    translating_placeholder: 'Перевожу…',
    error_translation_failed: 'Перевод не удался',
    error_translation_api_key: 'Добавьте ключ API для перевода',
    translate_title: 'Переводчик',
    encrypted_message: '🔒 Зашифрованное сообщение',

    // --- Amministrazione ---
    admin_requests_title: 'Запросы на регистрацию',
    admin_requests_btn: 'Управление запросами',
    admin_note_placeholder: 'Заметка (макс. 30 символов)',
    admin_account_active: 'Активен',
    admin_account_inactive: 'Ожидание',
    admin_toggle_activate: 'Активировать аккаунт',
    admin_toggle_deactivate: 'Деактивировать аккаунт',
    admin_back_to_profile: '← Вернуться к профилю',

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "Активируйте режим Ghost: отправленные сообщения не сохраняются на сервере и исчезают, когда вы покидаете чат. Работает только если получатель тоже открыл этот чат.",
    tour_chat_selfdestruct: 'Каждое сообщение может иметь таймер самоуничтожения. Обратный отсчёт начинается, когда получатель его просматривает. По истечении времени сообщение удаляется у всех.',
    tour_chat_dictate: 'Короткое нажатие: запускает голосовой ввод, повторное нажатие останавливает и отправляет текст. Удерживайте: записываете голосовое сообщение; при отпускании оно отправляется. Дождитесь звукового сигнала, прежде чем говорить.',
    tour_chat_sent: 'Удерживайте своё сообщение, чтобы удалить его.',
    tour_chat_received: 'Удерживайте полученное сообщение, чтобы добавить реакцию эмодзи.',
    tour_chat_speaker: 'Нажмите на значок динамика под сообщением, чтобы прослушать его вслух.',
    tour_chat_clear: "Очистите сообщения в вашем интерфейсе чата, но не в интерфейсе вашего собеседника.",
    tour_group_ghost: 'Групповой чат всегда в призрачном режиме: переписка и все сообщения удаляются, когда вы покидаете чат.',
    tour_contacts_fab: 'Нажмите, чтобы добавить новый контакт.',
    tour_contacts_delete: 'Удерживайте контакт, чтобы удалить его. Потребуется подтверждение удаления.',
    tour_chatslist_fab: "Нажмите, чтобы создать новый личный чат или групповой чат. Все групповые чаты всегда работают в режиме Ghost: сообщения не сохраняются и работают только тогда, когда хотя бы два участника одновременно открыли этот чат.",
    tour_chatslist_delete: 'Удерживайте баннер чата, чтобы удалить его. Потребуется подтверждение.',
    tour_profile_recording: 'Выберите звук, который уведомит вас о начале записи голосового сообщения.',
    tour_profile_api: "Для общения с людьми, говорящими на другом языке, нужен хотя бы один API-ключ Gemini. Если у вас есть аккаунт Google, вы можете зарегистрировать один или несколько ключей (бесплатно) в 3 шага:<br>1) Перейдите в <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a><br>2) Нажмите «Создать API-ключ» внизу слева<br>3) Вставьте его сюда.<br>Если у вас несколько ключей, система будет использовать первый, пока не исчерпает дневной лимит, затем автоматически переключится на следующий.<br>В качестве альтернативы вы можете общаться без ключа API, если говорите на общем языке. Оба должны установить его на странице профиля, но не забудьте снова изменить его, когда вернетесь к общению с людьми на вашем родном языке.",
    tour_profile_e2e: 'Создать новые ключи шифрования для ваших сообщений. Внимание: после перегенерации вы больше не сможете прочитать старые сообщения.',
    tour_translate_howto: 'Предназначен для разговоров лицом к лицу с теми, кто не говорит на вашем языке. Выберите два языка. Нажмите один раз кнопку «Говорить» на вашем языке, говорите и нажмите её снова. Появится перевод, и голос озвучит его на языке собеседника. Собеседник отвечает, нажимая кнопку своего языка.',
    tour_translate_original: 'Включите, чтобы также видеть текст на языке говорившего — так вы сможете проверить, правильно ли передан смысл. Потребляет больше ресурсов вашего ключа API: вы сможете переводить меньше сообщений в день.',
    tour_translate_limits: 'Использование переводчика ограничено дневными лимитами ваших ключей API Gemini.',

    // --- UI del tour ---
    tour_next: 'Далее',
    tour_skip: 'Пропустить',
    tour_finish: 'Готово',
    profile_tour_label: "Info tour",
    profile_tour_button: "Ricomincia tour",

    // --- Legal Form ---
    terms_title: "Условия использования",
    terms_accept_label: "Заявляю, что ознакомился и принимаю условия",
    terms_confirm_btn: "Принять и зарегистрироваться",
    terms_text: `ДОКУМЕНТ – УСЛОВИЯ ИСПОЛЬЗОВАНИЯ СЕРВИСА GHOST CHAT
      Введение
      Настоящий сервис (PWA «Ghost Chat») предоставляется исключительно как техническая платформа для анонимного обмена сообщениями между пользователями. Владелец/администратор сервера (далее – «Поставщик») не контролирует передаваемый контент, заявленные личности или действия пользователей. Использование Приложения запрещено для тех, кто не принимает полностью нижеследующие условия.
      1. Принятие и обязательство ознакомления
      Получая доступ или используя Приложение, пользователь заявляет, что ознакомился, понял и безоговорочно принимает все пункты настоящего документа. Принятие является обязательным предварительным условием для использования сервиса.
      2. Законное использование и абсолютные запреты
      Пользователь обязуется использовать Приложение только в законных, гражданских целях, в соответствии с итальянским и европейским законодательством, а также законами своей страны проживания. Прямо запрещается:
      распространять материалы, содержащие детскую порнографию, насилие, дискриминацию, клевету, оскорбления или разжигание ненависти;
      планировать, продвигать или совершать преступления любого рода (например, терроризм, сталкинг, мошенничество, вымогательство, сбыт наркотиков, насилие);
      нарушать права других лиц (конфиденциальность, интеллектуальная собственность, профессиональная тайна);
      использовать Приложение для фишинга, распространения вредоносного ПО, спама или кибератак;
      обходить системы жалоб или анонимности с целью навредить третьим лицам.
      3. Техническая анонимность и отсутствие идентификационных данных
      Сервис не требует и не собирает никаких персональных данных (имя, электронная почта, телефон, постоянный IP-адрес) при регистрации. Сервер не хранит журналы подключений и IP-адреса пользователей, за исключением времени, строго необходимого для передачи сообщений (и в любом случае не дольше сессии).
      Следовательно, даже по судебному запросу Поставщик не может предоставить какую-либо идентифицирующую информацию о пользователях или установить их реальную личность.
      Единственным данным, связанным с учётной записью, является имя пользователя, выбранное пользователем, которое не позволяет идентифицировать физическое лицо.
      4. Полное исключение ответственности Поставщика за незаконное использование
      Поставщик никоим образом не несёт ответственности – гражданской, уголовной или административной – за:
      контент, переписку, файлы или действия пользователей;
      использование сообщений третьими лицами;
      возможные преступления, совершённые через Приложение, поскольку платформа является пассивным и нейтральным инструментом передачи данных (в соответствии со ст. 14 Законодательного декрета № 70/2003 и Директивой ЕС 2000/31/EC).
      Пользователь принимает на себя все риски, связанные с использованием сервиса.
      5. Обязательство возмещения убытков (индемнификация)
      Пользователь обязуется освободить Поставщика от ответственности, возместить убытки и защищать его от любых претензий, судебных исков, штрафов, санкций, судебных издержек или компенсаций, возникающих в результате:
      нарушений настоящих условий со стороны пользователя;
      незаконного или неавторизованного использования Приложения, связанного с учётной записью/сессией пользователя;
      споров между пользователями или с третьими лицами, возникших из-за использования Приложения.
      В случае осуждения Поставщика за действие, приписываемое пользователю, последний обязан полностью возместить Поставщику все выплаченные суммы, включая гонорары адвокатов.
      6. Сотрудничество с властями и технические ограничения
      Поставщик заявляет о своей полной готовности сотрудничать с судебными или полицейскими органами в соответствии с применимым законодательством для противодействия возможному незаконному использованию сервиса.
      Тем не менее, пользователь принимает к сведению и соглашается, что:
      сервис спроектирован так, чтобы не собирать и не хранить IP-адреса или другие идентификационные данные пользователей;
      Поставщик не имеет визуального доступа к содержимому приватных чатов и не обладает технической возможностью его извлечения;
      возможные технические журналы (например, временные метки, метаданные подключения или системные следы) могут существовать исключительно у оператора серверной инфраструктуры (хостинг-провайдера) и не находятся в прямом распоряжении Поставщика;
      Поставщик не может предоставить данные, которыми не располагает или которые технически недоступны, а также обойти собственные меры анонимности и шифрования.
      В случае официального запроса от властей Поставщик обязуется:
      немедленно приостановить или удалить учётную запись указанного пользователя, если это технически возможно;
      предоставить властям всю имеющуюся у него информацию (даже минимальную или не идентифицирующую);
      сообщить властям контактные данные оператора сервера, чтобы они могли напрямую запросить у него возможные технические журналы, не находящиеся в распоряжении Поставщика.
      Пользователь признаёт, что в силу самой природы сервиса сотрудничество Поставщика ограничено его объективной технической невозможностью собирать или предоставлять данные, которыми он никогда не располагал. Никакое положение настоящего договора не может толковаться как обязанность Поставщика предоставлять доказательства или идентификаторы, которые закон не обязывает его хранить.
      7. Ограничения гарантии и доступности
      Сервис предоставляется «как есть», без гарантий бесперебойности, отсутствия ошибок или абсолютной безопасности. Поставщик не гарантирует отсутствие перехвата третьими лицами или технических уязвимостей.
      8. Срок действия, изменение и отзыв
      Поставщик может в любое время изменить настоящие условия, уведомив об этом через Приложение. Продолжение использования сервиса после изменения означает принятие. Пользователь может прекратить использование в любое время. Поставщик может отозвать доступ без предупреждения в случае нарушения.
      9. Подсудность и применимое право
      Настоящий договор регулируется итальянским законодательством. По любым спорам, связанным с сервисом или настоящими условиями, исключительной подсудностью является место жительства Поставщика (или, по его выбору, Милан/Рим). Пользователь прямо отказывается от любой иной юрисдикции.
      10. Частичная недействительность
      Если какое-либо положение будет признано недействительным или не имеющим силы, остальные остаются полностью действительными.
      11. Прямое согласие в соответствии со ст. 1341 и 1342 Гражданского кодекса Италии
      Пользователь заявляет, что ознакомился и конкретно одобряет положения, касающиеся: исключения ответственности (п. 4), обязательства возмещения убытков (п. 5), ограничений гарантии (п. 7), подсудности (п. 9).

      Обязательное подтверждение принятия
      Нажимая «Принимаю» или продолжая использовать Приложение через 10 секунд после отображения, пользователь подтверждает, что принимает все вышеуказанные условия.`,

    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 Прокрутите до конца, чтобы активировать принятие",

    // --- Admin alerts ---
    admin_no_requests: "Нет заявок на регистрацию",
    admin_delete_btn: "Удалить",
    admin_delete_btn_title: "Полностью удалить этот аккаунт",
    admin_delete_confirm: "Точно удалить аккаунт навсегда? Это действие необратимо.",
    admin_delete_error: "Ошибка при удалении аккаунта",
    admin_load_error: "Ошибка загрузки заявок",
  },
  zh: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: '用母语畅聊，与世界对话，匿名无忧',
    login_heading: '登录',
    login_username_placeholder: '用户名',
    login_password_placeholder: '密码',
    login_button: '登录',
    login_no_account: '没有账号？',
    login_register_link: '注册',
    register_heading: '注册',
    register_username_placeholder: '用户名',
    register_password_placeholder: '密码',
    register_language_label: '语言',
    register_api_key_placeholder: 'Gemini API 密钥（选填）',
    register_button: '注册',
    register_has_account: '已有账号？',
    register_login_link: '登录',
    register_fields_required: '请填写所有必填字段',
    registration_pending: '注册完成。请等待管理员审核。',

    // ========== Navigazione ==========
    nav_contacts: '联系人',
    nav_chats: '聊天',
    nav_profile: '个人资料',
    nav_translate: '翻译',

    // ========== Banner offline ==========
    offline_banner: '⚠️ 离线 - 等待连接中...',

    // ========== Contatti ==========
    contacts_title: '联系人',
    add_contact_btn: '+ 添加',
    requests_in: '收到的请求',
    requests_out: '发出的请求',
    no_contacts: '暂无联系人',
    pending_badge: '待处理',
    role_keyholder: '密钥持有者',
    role_guest: '访客',
    btn_accept: '接受',
    btn_remove: '移除',
    contacts_manage_btn: '通讯录',
    new_chat_btn: '新建聊天',
    new_chat_modal_title: '新建聊天',
    contacts_modal_title: '通讯录',
    confirm_delete_contact_message: '将 {name} 从通讯录中删除？',
    confirm_delete_contact_msg: '确定要删除联系人 "{name}" 吗？',
    contact_online: '● 在线',
    contact_offline: '● 离线',
    add_contacts_title: '添加联系人',
    btn_cancel: '取消',
    btn_send_requests: '发送请求',
    select_at_least_one: '请至少选择一个用户',
    search_contacts_placeholder: '搜索联系人...',

    // --- Modale aggiungi contatto ---
    modal_title: '添加联系人',
    search_placeholder: '搜索用户名...',
    btn_add: '添加',
    btn_close: '关闭',

    // ========== Chat ==========
    back_btn: '← 返回',
    clear_chat_btn: '清除聊天',
    typing_indicator: '正在输入...',
    expiry_label: '⏳ 自动销毁：',
    expiry_options: [
          { value: '0', text: '永不过期' },
          { value: '0.002777', text: '10 秒' },
          { value: '0.0166667', text: '1 分钟' },
          { value: '0.0833333', text: '5 分钟' },
          { value: '1', text: '1 小时' },
          { value: '6', text: '6 小时' },
          { value: '12', text: '12 小时' },
          { value: '24', text: '24 小时' },
          { value: '168', text: '7 天' },
        ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> 说话',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> 口述',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> 聆听',
    record_btn_release: '⏹ 释放',
    text_input_placeholder: '写',
    send_text_btn: '发送文本',
    send_text_sending: '发送中...',
    message_sent_confirm: '来自 {name} 的新消息\n\n{text}\n\n打开聊天？',
    voice_note_confirm: '来自 {name} 的新语音消息\n\n打开聊天？',
    confirm_image_message: '来自 {name} 的新图片\n\n打开聊天？',
    confirm_video_message: '来自 {name} 的新视频\n\n打开聊天？',
    local_notification_voice_note: '🎵 语音消息',
    local_notification_image: '🖼️ 图片',
    local_notification_video: '🎬 视频',
    voice_note_sent: '🎵 语音消息已发送',
    voice_note_listen: '▶️ 收听语音消息',
    no_messages: '暂无消息',
    load_error: '加载消息出错',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 鬼',
    individual_chat: '💬 私聊',
    group_chat: '👥 群聊',
    search_chats_placeholder: '搜索聊天...',
    btn_delete: '删除',
    confirm_delete_chat_msg: '确定要关闭与 "{name}" 的聊天吗？',
    confirm_delete_message: '确定删除此消息吗？对方的聊天中也会被删除。',

    // --- Gruppi ---
    group_chat_modal_title: '创建群聊',
    group_chat_modal_subtitle: '选择在线联系人',
    group_create_btn: '创建群组',
    group_leave_btn: '退出',
    group_invite_title: '群组邀请',
    group_invite_accept: '加入',
    group_invite_decline: '拒绝',
    group_user_joined: '加入了群组',
    group_user_left: '离开了群组',
    group_error_no_contacts_online: '没有在线联系人',
    group_error_select_contact: '请至少选择一个联系人',
    group_error_creation_failed: '群组创建失败',
    group_notification_created: '群组已创建',
    new_contact_request: '来自 {{name}} 的新联系人请求',
    group_chat_title: '群组 ({{count}})',
    group_reconnected: '重新加入了',
    group_timeout_suffix: ' (超时)',
    group_empty: '群组里只剩下你了。',
    group_chat_btn: '👥 群组',
    send_btn: '发送',

    // ========== Profilo ==========
    profile_avatar_upload: '上传头像',
    profile_avatar_remove: '移除',
    profile_username_label: '用户名',
    profile_language_label: '语言',
    profile_api_key_label: 'Gemini API 密钥',
    profile_api_key_placeholder: '留空以移除',
    profile_api_key_hint: '输入新密钥以成为密钥持有者',
    profile_voice_label: '首选 TTS 声音',
    profile_expiry_label: '⏳ 全局自动销毁',
    profile_expiry_hint: '新消息将继承此有效期（可在聊天中修改）',
    profile_regenerate_keys: '重新生成端到端加密密钥',
    profile_regenerate_keys_hint: '注意：之前的加密消息将无法读取。',
    profile_logout: '退出登录',
    profile_delete_account: '删除账户',
    profile_save: '保存更改',
    profile_password_label: '密码',
    profile_change_password_btn: '修改',
    change_password_title: '修改密码',
    current_password_placeholder: '当前密码',
    new_password_placeholder: '新密码',
    confirm_password_placeholder: '确认新密码',
    profile_saved: '设置已保存',
    profile_error: '错误',
    profile_ui_language_label: '界面语言',
    profile_theme_label: '颜色主题',
    theme_red: '深红色',
    theme_blue: '海洋蓝',
    theme_green: '森林绿',
    theme_purple: '皇家紫',
    profile_ephemeral_default: '👻 默认幽灵模式',
    profile_beep_label: '录音开始提示音',

    // --- Chiavi API ---
    profile_api_keys_label: 'API 密钥',
    manage_api_keys_btn: '管理 API 密钥',
    profile_api_keys_hint: '添加或删除 Gemini 密钥。',
    api_keys_modal_title: '你的 API 密钥',
    new_api_key_placeholder: '粘贴新的 API 密钥',
    add_api_key_btn: '添加',
    no_api_keys: '未保存任何 API 密钥',
    confirm_delete_api_key: '删除此密钥？',

    // ========== Errori e avvisi ==========
    error_network: '无法连接服务器',
    error_session_expired: '会话已过期',
    error_login_failed: '登录失败',
    error_register_failed: '注册失败',
    error_contact_load: '加载联系人失败',
    error_profile_load: '无法加载个人资料',
    error_send_failed: '发送失败，请重试。',
    error_send_text_failed: '文本发送失败，请稍后重试。',
    error_dictation_blocked: '此浏览器不支持语音识别。\n推荐浏览器：Google Chrome、Microsoft Edge、Safari（iOS/macOS）、Firefox（需启用相关标志）。',
    error_dictation_mic: '语音输入被拒绝了麦克风权限。',
    error_dictation_generic: '语音输入出错：{error}',
    error_recording_unsupported: '不支持录音',
    error_mic_access: '无法访问麦克风以录制语音消息',
    error_voice_note_e2e: '无法发送语音消息：对方未配置端到端加密。请让对方打开个人资料页面。',
    error_private_key_missing: '私钥丢失。请从个人资料重新生成端到端加密密钥。',
    error_voice_note_send_failed: '语音消息发送失败',
    error_text_e2e_required: '无法发送消息：对方未配置端到端加密。请让对方打开个人资料页面。',
    error_decryption_failed: '音频解密失败',
    error_no_audio_data: '音频数据不可用。',
    error_audio_decrypt: '音频解密失败',
    error_ephemeral_message: '即时消息错误',
    error_voice_note_network: '发送语音消息时网络错误',
    error_send_retry: '发送失败，轻点重试。',
    error_audio_data_unavailable: '音频数据不可用。',
    error_delete_account: '删除账户时出错',
    error_generic: '错误',
    error_key_regeneration: '密钥重新生成时出错。',
    ephemeral_language_error: '临时模式要求使用相同的语言。',
    ephemeral_offline_error: '收件人离线。临时消息无法送达。',
    confirm_delete_contact: '移除该联系人？',
    confirm_delete_account: '确定要永久删除你的账户吗？此操作不可撤销。',
    confirm_regenerate_keys: '重新生成端到端加密密钥？之前的加密消息将无法读取。',
    keys_regenerated: '新密钥已成功生成。',
    account_deleted: '账户已成功删除',
    avatar_upload_error: '头像上传出错',
    no_chats: '没有活跃的聊天',
    error_loading_chats: '加载聊天出错',
    error_guest_diff_language: "要与使用不同语言的用户聊天，需要API密钥。请在个人资料页面注册API密钥。",
    error_guest_group_multilingual: "游客用户只能与使用相同语言的人创建群组。多语言群组需要API密钥。",
    warning_keyholder_add_guest_diff_language: "你正在添加的联系人是游客账号，且语言与你不同。你们之间的所有聊天将使用你的Gemini API密钥进行翻译。",
    alert_fill_all_fields: '请填写所有必填字段',
    error_missing_public_key: '缺少 {memberId} 的公钥',
    error_cannot_get_public_key: '无法获取 {memberId} 的公钥',

    // ========== Notifiche push ==========
    push_new_message: '来自 {name} 的新消息',
    push_voice_note: '来自 {name} 的语音消息',
    push_body: '🎵 语音消息',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: '你的 E2E 指纹:',
    speaker_title: '收听',
    media_upload_title: '发送照片或视频',
    media_expiry_default_warning: '未设置自毁计时器的媒体内容将在 7 天后自动删除。',
    lightbox_image_alt: '图片',
    lightbox_video_alt: '视频',
    translate_show_original: '显示原文',
    translating_placeholder: '翻译中…',
    error_translation_failed: '翻译失败',
    error_translation_api_key: '请添加 API 密钥以进行翻译',
    translate_title: '翻译',
    encrypted_message: '🔒 加密消息',

    // --- Amministrazione ---
    admin_requests_title: '注册请求',
    admin_requests_btn: '管理请求',
    admin_note_placeholder: '备注 (最多30个字符)',
    admin_account_active: '活跃',
    admin_account_inactive: '待审核',
    admin_toggle_activate: '激活账户',
    admin_toggle_deactivate: '停用账户',
    admin_back_to_profile: '← 返回个人资料',

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "开启幽灵模式：发送的消息不会保存在服务器上，离开聊天后即消失。仅当对方也打开聊天时才会生效。",
    tour_chat_selfdestruct: '每条消息都可设置自毁计时器，倒计时从对方查看时开始，到期后消息将对所有人删除。',
    tour_chat_dictate: '轻点：开始语音转文字，再次轻点停止并将文字发送。长按：录制语音消息，松手后自动发送。听到提示音后再开始说话。',
    tour_chat_sent: '长按自己发送的消息可将其删除。',
    tour_chat_received: '长按收到的消息可添加表情回应。',
    tour_chat_speaker: '点击消息下方的扬声器图标可让系统朗读出来。',
    tour_chat_clear: "清除您聊天界面中的消息，但不会清除对方界面中的消息。",
    tour_group_ghost: '群聊始终处于幽灵模式：离开聊天后，所有对话和消息都会被删除。',
    tour_contacts_fab: '点击添加新联系人。',
    tour_contacts_delete: '长按联系人可将其删除。需要确认删除操作。',
    tour_chatslist_fab: "点击创建新的单聊或群聊。所有群聊均默认开启幽灵模式：消息不会被保存，且仅当至少两个参与者同时打开聊天时才能正常使用。",
    tour_chatslist_delete: '长按聊天横幅可删除该聊天。需要确认删除操作。',
    tour_profile_recording: '选择录音真正开始时的提示音。',
    tour_profile_api: "要与使用不同语言的人聊天，至少需要一枚 Gemini API 密钥。如果你有 Google 账号，可以免费注册一个或多个，只需三步：<br>1) 前往 <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a><br>2) 点击左下角的“创建 API 密钥”<br>3) 在此粘贴密钥。<br>如果你有多个密钥，系统会优先使用第一个，直到达到每日限额，然后自动切换到下一个。<br>或者，如果您使用共同语言，则无需API密钥即可聊天。你们双方都需要在个人资料页面进行设置，但请记住，当您重新与使用相同语言的人聊天时，需要再次更改回来。",
    tour_profile_e2e: '为你的消息生成新的加密密钥。注意：重新生成后，将无法再读取旧消息。',
    tour_translate_howto: '专为与语言不通的人面对面交流而设计。选择两种语言，按一次你的语言按钮开始说话，说完再次按下。翻译文本会出现，并会用对方语言朗读出来。对方使用自己的语言按钮回应。',
    tour_translate_original: '开启后可同时显示说话者的原始语言文本，方便你确认信息是否准确。这会消耗更多 API 额度，每天可翻译的消息数量会减少。',
    tour_translate_limits: '翻译功能受 Gemini API 密钥的每日限额限制。',

    // --- UI del tour ---
    tour_next: '下一步',
    tour_skip: '跳过',
    tour_finish: '完成',
    profile_tour_label: "引导说明",
    profile_tour_button: "重新开始引导",

    // --- Legal Form ---
    terms_title: "使用条款",
    terms_accept_label: "本人声明已阅读并接受条款",
    terms_confirm_btn: "接受并注册",
    terms_text: `文件 – GHOST CHAT 服务使用条款

      前言
      本服务（PWA应用“Ghost Chat”）仅作为用户间匿名消息传递的技术平台提供。服务器所有者/管理者（下称“服务提供方”）对用户交换的内容、声明的身份或行为没有任何控制权。任何不完全接受以下条款的人均不得使用本应用。

      1. 接受与阅读义务
      访问或使用本应用即表示用户声明其已阅读、理解并无条件接受本文件的所有条款。接受是使用本服务的强制性前提条件。

      2. 合法使用与绝对禁止
      用户承诺仅将本应用用于合法、文明且符合意大利及欧洲法律以及用户所在国法律的目的。明确禁止以下行为：
      - 传播儿童色情、暴力、歧视、诽谤、侮辱或煽动仇恨的材料；
      - 策划、宣传或实施任何类型的犯罪（例如恐怖主义、跟踪、欺诈、敲诈、贩毒、私人暴力）；
      - 侵犯他人权利（隐私、知识产权、职业秘密）；
      - 利用本应用进行网络钓鱼、恶意软件、垃圾邮件或网络攻击；
      - 绕过举报或匿名系统以损害第三方。

      3. 技术匿名与无身份识别数据
      本服务在注册时不要求也不收集任何个人数据（姓名、电子邮件、电话、永久IP地址）。服务器不保存连接日志或用户IP地址，除非为传输消息所严格必需（且绝不超出一个会话）。
      因此，即使有司法命令，服务提供方也无法提供任何有关用户的身份识别信息，也无法追溯其真实身份。
      与账户关联的唯一数据是用户自行选择的用户名，该用户名无法识别自然人。

      4. 服务提供方对非法使用完全免责
      服务提供方在任何情况下均不承担民事、刑事或行政责任，对于：
      - 用户的内容、对话、文件或行为；
      - 第三方对接收消息的使用；
      - 通过本应用实施的任何犯罪，该平台作为被动和中立的数据传输工具（依据意大利第70/2003号立法令第14条及欧盟2000/31/EC指令）。
      用户自行承担使用本服务产生的所有风险。

      5. 赔偿义务
      用户承诺赔偿、保护并使服务提供方免受任何因以下原因引起的索赔、法律诉讼、罚款、处罚、法律费用或损害赔偿：
      - 用户违反本条款；
      - 与用户账户/会话相关的非法或未经授权的应用使用；
      - 用户之间或与第三方因使用本应用产生的争议。
      若服务提供方因可归责于用户的行为而被判罚，用户有义务全额赔偿服务提供方已支付的款项，包括律师费。

      6. 与当局合作及技术限制
      服务提供方声明其完全愿意与司法或警察当局合作，遵守适用法律，以打击服务的任何非法使用。
      然而，用户知悉并接受：
      - 本服务设计为不收集或保存用户IP地址或其他身份识别数据；
      - 服务提供方无法查看私密聊天内容，也不具备提取这些内容的技术能力；
      - 任何技术日志（例如时间戳、连接元数据或系统痕迹）可能仅存在于服务器基础设施管理者（托管提供商）处，而非服务提供方直接可控；
      - 服务提供方无法提供其不拥有或技术上无法访问的数据，也无法绕过其自身的匿名和加密措施。
      在当局正式要求的情况下，服务提供方承诺：
      - 在技术可行的情况下，立即暂停或删除指定用户的账户；
      - 向当局提供其拥有的所有信息（即使是最小或非识别性的）；
      - 向当局提供服务器管理者的联系信息，以便后者可直接向服务器管理者请求服务提供方无法获取的技术日志。
      用户承认，基于服务本身的性质，服务提供方的合作受到其客观上无法收集或交付从未拥有过的数据的技术限制。本协议的任何条款均不得解释为服务提供方有义务提供法律未要求其保存的证据或身份标识。

      7. 保证与可用性限制
      本服务“按原样”提供，不保证连续性、无错误或绝对安全。服务提供方不保证不存在第三方拦截或技术漏洞。

      8. 期限、修改与撤销
      服务提供方可随时修改本条款，并通过应用内通知告知。修改后继续使用服务即构成接受。用户可随时停止使用。若发生违规，服务提供方可无需事先通知即撤销访问权限。

      9. 管辖法院与适用法律
      本协议受意大利法律管辖。对于任何与服务或本条款相关的争议，专属管辖法院为服务提供方住所地法院（或由服务提供方选择米兰/罗马法院）。用户明确放弃任何其他司法管辖权。

      10. 部分无效
      若任何条款被宣布无效或无法执行，其余条款仍完全有效。

      11. 根据意大利民法典第1341条和第1342条的明确同意
      用户声明其已阅读并特别同意以下条款：免责条款（第4条）、赔偿义务（第5条）、保证限制（第7条）、管辖法院（第9条）。

      强制性接受确认
      点击“接受”或在显示后继续使用本应用10秒钟，即表示用户确认接受上述所有条款。`,

    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 滚动到底部以启用接受",

    // --- Admin alerts ---
    admin_no_requests: "暂无注册申请",
    admin_delete_btn: "删除",
    admin_delete_btn_title: "永久删除此账号",
    admin_delete_confirm: "确定要永久删除此账号吗？此操作不可撤销。",
    admin_delete_error: "删除账号时出错",
    admin_load_error: "加载请求失败",
  },
  ar: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: 'تحدث محلياً، تواصل عالمياً، دون الكشف عن هويتك',
    login_heading: 'تسجيل الدخول',
    login_username_placeholder: 'اسم المستخدم',
    login_password_placeholder: 'كلمة المرور',
    login_button: 'تسجيل الدخول',
    login_no_account: 'ليس لديك حساب؟',
    login_register_link: 'سجّل',
    register_heading: 'إنشاء حساب',
    register_username_placeholder: 'اسم المستخدم',
    register_password_placeholder: 'كلمة المرور',
    register_language_label: 'اللغة',
    register_api_key_placeholder: 'مفتاح Gemini API (اختياري)',
    register_button: 'سجّل',
    register_has_account: 'لديك حساب بالفعل؟',
    register_login_link: 'تسجيل الدخول',
    register_fields_required: 'يرجى ملء جميع الحقول الإلزامية',
    registration_pending: 'اكتمل التسجيل. انتظر موافقة المشرف.',

    // ========== Navigazione ==========
    nav_contacts: 'جهات الاتصال',
    nav_chats: 'دردشة',
    nav_profile: 'الملف الشخصي',
    nav_translate: 'ترجم',

    // ========== Banner offline ==========
    offline_banner: '⚠️ غير متصل - بانتظار الاتصال...',

    // ========== Contatti ==========
    contacts_title: 'جهات الاتصال',
    add_contact_btn: '+ أضف',
    requests_in: 'الطلبات الواردة',
    requests_out: 'الطلبات المرسلة',
    no_contacts: 'لا توجد جهات اتصال',
    pending_badge: 'قيد الانتظار',
    role_keyholder: 'حامل المفتاح',
    role_guest: 'ضيف',
    btn_accept: 'قبول',
    btn_remove: 'إزالة',
    contacts_manage_btn: 'جهات الاتصال',
    new_chat_btn: 'محادثة جديدة',
    new_chat_modal_title: 'محادثة جديدة',
    contacts_modal_title: 'جهات الاتصال',
    confirm_delete_contact_message: 'إزالة {name} من جهات الاتصال؟',
    confirm_delete_contact_msg: 'هل تريد إزالة جهة الاتصال "{name}"؟',
    contact_online: '● متصل',
    contact_offline: '● غير متصل',
    add_contacts_title: 'إضافة جهات اتصال',
    btn_cancel: 'إلغاء',
    btn_send_requests: 'إرسال الطلبات',
    select_at_least_one: 'اختر مستخدماً واحداً على الأقل',
    search_contacts_placeholder: 'البحث عن جهات اتصال...',

    // --- Modale aggiungi contatto ---
    modal_title: 'إضافة جهة اتصال',
    search_placeholder: 'ابحث عن اسم المستخدم...',
    btn_add: 'إضافة',
    btn_close: 'إغلاق',

    // ========== Chat ==========
    back_btn: '← رجوع',
    clear_chat_btn: 'مسح المحادثة',
    typing_indicator: 'يكتب...',
    expiry_label: '⏳ التدمير الذاتي:',
    expiry_options: [
    { value: '0', text: 'بدون انتهاء' },
    { value: '0.002777', text: '10 ثوانٍ' },
    { value: '0.0166667', text: 'دقيقة واحدة' },
    { value: '0.0833333', text: '5 دقائق' },
    { value: '1', text: 'ساعة واحدة' },
    { value: '6', text: '6 ساعات' },
    { value: '12', text: '12 ساعة' },
    { value: '24', text: '24 ساعة' },
    { value: '168', text: '7 أيام' },
    ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> تكلم',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> إملاء',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> استماع',
    record_btn_release: '⏹ إطلاق',
    text_input_placeholder: 'اكتب',
    send_text_btn: 'إرسال نص',
    send_text_sending: 'جارٍ الإرسال...',
    message_sent_confirm: 'رسالة جديدة من {name}\n\n{text}\n\nفتح المحادثة؟',
    voice_note_confirm: 'ملاحظة صوتية جديدة من {name}\n\nفتح المحادثة؟',
    confirm_image_message: 'صورة جديدة من {name}\n\nهل تريد فتح الدردشة؟',
    confirm_video_message: 'فيديو جديد من {name}\n\nهل تريد فتح الدردشة؟',
    local_notification_voice_note: '🎵 رسالة صوتية',
    local_notification_image: '🖼️ صورة',
    local_notification_video: '🎬 فيديو',
    voice_note_sent: '🎵 تم إرسال الملاحظة الصوتية',
    voice_note_listen: '▶️ استمع للملاحظة الصوتية',
    no_messages: 'لا توجد رسائل',
    load_error: 'خطأ في تحميل الرسائل',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 شبح',
    individual_chat: '💬 محادثة فردية',
    group_chat: '👥 محادثة جماعية',
    search_chats_placeholder: 'البحث عن محادثات...',
    btn_delete: 'حذف',
    confirm_delete_chat_msg: 'هل تريد إغلاق المحادثة مع "{name}"؟',
    confirm_delete_message: 'هل تريد حذف هذه الرسالة؟ ستختفي أيضاً من محادثة المستلم.',

    // --- Gruppi ---
    group_chat_modal_title: 'إنشاء محادثة جماعية',
    group_chat_modal_subtitle: 'اختر جهات الاتصال المتصلة',
    group_create_btn: 'إنشاء مجموعة',
    group_leave_btn: 'خروج',
    group_invite_title: 'دعوة للمجموعة',
    group_invite_accept: 'انضمام',
    group_invite_decline: 'رفض',
    group_user_joined: 'انضم إلى المجموعة',
    group_user_left: 'غادر المجموعة',
    group_error_no_contacts_online: 'لا توجد جهات اتصال متصلة',
    group_error_select_contact: 'اختر جهة اتصال واحدة على الأقل',
    group_error_creation_failed: 'فشل إنشاء المجموعة',
    group_notification_created: 'تم إنشاء المجموعة',
    new_contact_request: 'طلب جهة اتصال جديدة من {{name}}',
    group_chat_title: 'مجموعة ({{count}})',
    group_reconnected: 'انضم مجدداً',
    group_timeout_suffix: ' (timeout)',
    group_empty: 'أنت الوحيد المتبقي في المجموعة.',
    group_chat_btn: '👥 مجموعة',
    send_btn: 'إرسال',

    // ========== Profilo ==========
    profile_avatar_upload: 'تحميل صورة الملف الشخصي',
    profile_avatar_remove: 'إزالة',
    profile_username_label: 'اسم المستخدم',
    profile_language_label: 'اللغة',
    profile_api_key_label: 'مفتاح Gemini API',
    profile_api_key_placeholder: 'اتركه فارغاً للإزالة',
    profile_api_key_hint: 'أدخل مفتاحاً جديداً لتصبح حامل مفتاح',
    profile_voice_label: 'صوت TTS المفضل',
    profile_expiry_label: '⏳ التدمير الذاتي العام',
    profile_expiry_hint: 'سترث الرسائل الجديدة هذه المدة (يمكن تعديلها لكل محادثة)',
    profile_regenerate_keys: 'إعادة توليد مفاتيح E2E',
    profile_regenerate_keys_hint: 'تحذير: ستصبح الرسائل المشفرة السابقة غير قابلة للقراءة.',
    profile_logout: 'تسجيل الخروج',
    profile_delete_account: 'حذف الحساب',
    profile_save: 'حفظ التغييرات',
    profile_password_label: 'كلمة المرور',
    profile_change_password_btn: 'تغيير',
    change_password_title: 'تغيير كلمة المرور',
    current_password_placeholder: 'كلمة المرور الحالية',
    new_password_placeholder: 'كلمة المرور الجديدة',
    confirm_password_placeholder: 'تأكيد كلمة المرور الجديدة',
    profile_saved: 'تم حفظ الإعدادات',
    profile_error: 'خطأ',
    profile_ui_language_label: 'لغة الواجهة',
    profile_theme_label: 'سمة اللون',
    theme_red: 'أحمر كثيف',
    theme_blue: 'أزرق محيطي',
    theme_green: 'أخضر غابي',
    theme_purple: 'أرجواني ملكي',
    profile_ephemeral_default: '👻 الشبح الافتراضي',
    profile_beep_label: 'بدء تسجيل الصوت',

    // --- Chiavi API ---
    profile_api_keys_label: 'مفاتيح API',
    manage_api_keys_btn: 'إدارة مفاتيح API',
    profile_api_keys_hint: 'أضف أو أزل مفاتيح Gemini.',
    api_keys_modal_title: 'مفاتيح API الخاصة بك',
    new_api_key_placeholder: 'الصق مفتاح API جديد',
    add_api_key_btn: 'إضافة',
    no_api_keys: 'لا توجد مفاتيح API محفوظة',
    confirm_delete_api_key: 'حذف هذا المفتاح؟',

    // ========== Errori e avvisi ==========
    error_network: 'تعذر الاتصال بالخادم',
    error_session_expired: 'انتهت الجلسة',
    error_login_failed: 'خطأ في تسجيل الدخول',
    error_register_failed: 'خطأ في التسجيل',
    error_contact_load: 'خطأ في تحميل جهات الاتصال',
    error_profile_load: 'تعذر تحميل الملف الشخصي',
    error_send_failed: 'فشل الإرسال. حاول مجدداً.',
    error_send_text_failed: 'فشل إرسال النص. حاول مرة أخرى بعد قليل.',
    error_dictation_blocked: 'التعرف على الصوت غير مدعوم في هذا المتصفح.\nالمتصفحات الموصى بها: Google Chrome، Microsoft Edge، Safari (iOS/macOS)، Firefox (مع تفعيل الإعداد).',
    error_dictation_mic: 'تم رفض إذن الميكروفون للإملاء.',
    error_dictation_generic: 'خطأ أثناء الإملاء: {error}',
    error_recording_unsupported: 'التسجيل غير مدعوم',
    error_mic_access: 'تعذر الوصول إلى الميكروفون للملاحظة الصوتية',
    error_voice_note_e2e: 'تعذر إرسال الملاحظة الصوتية: المستلم لم يقم بإعداد تشفير E2E. اطلب منه فتح الملف الشخصي.',
    error_private_key_missing: 'المفتاح الخاص مفقود. أعد توليد مفاتيح E2E من الملف الشخصي.',
    error_voice_note_send_failed: 'فشل إرسال الملاحظة الصوتية',
    error_text_e2e_required: 'تعذر إرسال الرسالة: المستلم لم يقم بإعداد تشفير E2E. اطلب منه فتح الملف الشخصي.',
    error_decryption_failed: 'فشل فك تشفير الصوت',
    error_no_audio_data: 'البيانات الصوتية غير متوفرة.',
    error_audio_decrypt: 'فشل فك تشفير الصوت',
    error_ephemeral_message: 'خطأ في الرسالة المؤقتة',
    error_voice_note_network: 'خطأ في الشبكة أثناء إرسال الملاحظة الصوتية',
    error_send_retry: 'فشل الإرسال. اضغط لإعادة المحاولة.',
    error_audio_data_unavailable: 'البيانات الصوتية غير متاحة.',
    error_delete_account: 'خطأ أثناء حذف الحساب',
    error_generic: 'خطأ',
    error_key_regeneration: 'خطأ أثناء إعادة توليد المفاتيح.',
    ephemeral_language_error: 'يتطلب الوضع المؤقت نفس اللغة.',
    ephemeral_offline_error: 'المستلم غير متصل. لا يمكن تسليم الرسائل المؤقتة.',
    confirm_delete_contact: 'إزالة جهة الاتصال هذه؟',
    confirm_delete_account: 'هل أنت متأكد من رغبتك في حذف حسابك نهائياً؟ هذا الإجراء لا يمكن التراجع عنه.',
    confirm_regenerate_keys: 'إعادة توليد مفاتيح E2E؟ ستصبح الرسائل المشفرة السابقة غير قابلة للقراءة.',
    keys_regenerated: 'تم توليد مفاتيح جديدة بنجاح.',
    account_deleted: 'تم حذف الحساب بنجاح',
    avatar_upload_error: 'خطأ أثناء تحميل الصورة',
    no_chats: 'لا توجد محادثات نشطة',
    error_loading_chats: 'خطأ في تحميل المحادثات',
    error_guest_diff_language: "للدردشة مع مستخدمين بلغة مختلفة، يلزم وجود مفتاح API. سجل مفتاح API في صفحة الملف الشخصي.",
    error_guest_group_multilingual: "المستخدمون الضيوف يمكنهم فقط إنشاء مجموعات مع أشخاص من نفس لغتهم. للمجموعات متعددة اللغات، يلزم وجود مفتاح API.",
    warning_keyholder_add_guest_diff_language: "جهة الاتصال التي تحاول إضافتها تمتلك حساب ضيف ولغتها مختلفة عن لغتك. ستتم ترجمة جميع المحادثات بينكما باستخدام مفاتيح Gemini الخاصة بك.",
    alert_fill_all_fields: 'يرجى ملء جميع الحقول الإلزامية',
    error_missing_public_key: 'المفتاح العمومي مفقود لـ {memberId}',
    error_cannot_get_public_key: 'تعذر استرداد المفتاح العمومي لـ {memberId}',

    // ========== Notifiche push ==========
    push_new_message: 'رسالة جديدة من {name}',
    push_voice_note: 'ملاحظة صوتية من {name}',
    push_body: '🎵 ملاحظة صوتية',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'بصمتك E2E:',
    speaker_title: 'استماع',
    media_upload_title: 'إرسال صورة أو فيديو',
    media_expiry_default_warning: 'الوسائط المرسلة بدون مؤقت التدمير الذاتي ستُحذف تلقائياً بعد 7 أيام.',
    lightbox_image_alt: 'صورة',
    lightbox_video_alt: 'فيديو',
    translate_show_original: 'إظهار النص الأصلي',
    translating_placeholder: 'جارٍ الترجمة…',
    error_translation_failed: 'فشلت الترجمة',
    error_translation_api_key: 'أضف مفتاح API للترجمة',
    translate_title: 'المترجم',
    encrypted_message: '🔒 رسالة مشفرة',

    // --- Amministrazione ---
    admin_requests_title: 'طلبات التسجيل',
    admin_requests_btn: 'إدارة الطلبات',
    admin_note_placeholder: 'ملاحظة (30 حرفاً كحد أقصى)',
    admin_account_active: 'نشط',
    admin_account_inactive: 'قيد الانتظار',
    admin_toggle_activate: 'تفعيل الحساب',
    admin_toggle_deactivate: 'تعطيل الحساب',
    admin_back_to_profile: '← العودة إلى الملف الشخصي',

    // ========== Tour guidato ==========
    tour_chat_ephemeral: 'فعّل الوضع الخفي: الرسائل المرسلة لا تُحفظ على الخادم وتختفي عند مغادرتك المحادثة. يعمل هذا فقط إذا كان المستلم لديه المحادثة مفتوحة أيضًا.',
    tour_chat_selfdestruct: 'يمكن لكل رسالة أن تحتوي على مؤقت تدمير ذاتي. يبدأ العد التنازلي عندما يراها المستلم. عند انتهاء الوقت، تُحذف الرسالة للجميع.',
    tour_chat_dictate: 'لمسة قصيرة لبدء الإملاء الصوتي، ولمسة ثانية لإيقافه وإرسال النص. اضغط مع الاستمرار لتسجيل رسالة صوتية، وعند رفع الإصبع تُرسل. انتظر الصفير قبل التحدث.',
    tour_chat_sent: 'اضغط مطولاً على رسالتك لحذفها.',
    tour_chat_received: 'اضغط مطولاً على رسالة مستلمة لإضافة تفاعل إيموجي.',
    tour_chat_speaker: 'اضغط على أيقونة السماعة أسفل الرسالة لقراءتها بصوت عالٍ.',
    tour_chat_clear: "امسح الرسائل في واجهة الدردشة الخاصة بك، وليس في واجهة محاورك.",
    tour_group_ghost: 'المحادثة الجماعية دائماً في وضع الشبح: تُحذف المحادثة وجميع الرسائل عند الخروج.',
    tour_contacts_fab: 'اضغط لإضافة جهة اتصال جديدة.',
    tour_contacts_delete: 'اضغط مطولاً على جهة اتصال لحذفها. سيُطلب منك تأكيد الحذف.',
    tour_chatslist_fab: "انقر لإنشاء محادثة فردية أو جماعية جديدة. جميع المحادثات الجماعية تكون دائمًا في الوضع الخفي: لا يتم حفظ الرسائل وتعمل فقط عندما يكون هناك شخصان على الأقل لديهما المحادثة مفتوحة في نفس الوقت.",
    tour_chatslist_delete: 'اضغط مطولاً على شريط المحادثة لحذفها. سيُطلب منك تأكيد الحذف.',
    tour_profile_recording: 'اختر الصوت الذي ينبهك عند بدء تسجيل الرسالة الصوتية فعلياً.',
    tour_profile_api: "للدردشة مع أشخاص يتحدثون لغة أخرى، تحتاج إلى مفتاح API Gemini واحد على الأقل. إذا كان لديك حساب Google، يمكنك إنشاء مفتاح واحد أو أكثر (مجاني أيضًا) في 3 خطوات:<br>1) انتقل إلى <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a><br>2) انقر على 'إنشاء مفتاح API' في الأسفل يسار الشاشة<br>3) الصقه هنا.<br>إذا كان لديك أكثر من مفتاح، سيستخدم النظام الأول حتى ينفد حدّه اليومي، ثم ينتقل تلقائيًا إلى التالي.<br>بدلاً من ذلك، يمكنك الدردشة بدون مفتاح API إذا كنت تتحدث لغة مشتركة. يجب عليكما تعيينها من صفحة الملف الشخصي، لكن تذكروا تغييرها مرة أخرى عندما تعودون للدردشة مع أشخاص يتحدثون لغتكم نفسها.",
    tour_profile_e2e: 'أنشئ مفاتيح تشفير جديدة لرسائلك. تنبيه: بعد إعادة التوليد، لن تتمكن من قراءة الرسائل القديمة.',
    tour_translate_howto: 'مُصمَّم للمحادثات وجهاً لوجه مع من لا يتحدث لغتك. اختر اللغتين. اضغط مرة على زر "تحدث" بلغتك، تحدث ثم اضغط عليه مجدداً. ستظهر الترجمة وسيقرأها صوت بلغة الطرف الآخر. يرد الطرف الآخر باستخدام الزر الخاص بلغته.',
    tour_translate_original: 'فعّله لرؤية النص أيضاً بلغة المتحدث، لتتأكد من وصول الرسالة بشكل صحيح. يستهلك هذا موارد إضافية من مفتاح API: ستتمكن من ترجمة رسائل أقل يومياً.',
    tour_translate_limits: 'يخضع استخدام المترجم للحدود اليومية لمفاتيح Gemini API الخاصة بك.',

    // --- UI del tour ---
    tour_next: 'التالي',
    tour_skip: 'تخطي',
    tour_finish: 'إنهاء',
    profile_tour_label: "معلومات الجولة",
    profile_tour_button: "إعادة الجولة",

    // --- Legal Form ---
    terms_title: "شروط الاستخدام",
    terms_accept_label: "أقر بأنني اطلعت على الشروط وقبلتها",
    terms_confirm_btn: "قبول والتسجيل",
    terms_text: `وثيقة – شروط استخدام خدمة Ghost Chat
      تمهيد
      هذه الخدمة (تطبيق الويب التقدمي "Ghost Chat") مقدمة فقط كمنصة تقنية للتراسل المجهول بين المستخدمين. مالك/مدير الخادم ( "المزوّد") ليس له أي سيطرة على المحتوى المتبادل، أو الهويات المعلنة، أو سلوكيات المستخدمين. يُحظر استخدام التطبيق على أي شخص لا يقبل الشروط التالية بشكل كامل.
      1. القبول وإلزامية القراءة
      بالوصول إلى التطبيق أو استخدامه، يصرح المستخدم بأنه قد قرأ وفهم وقبل بدون تحفظ جميع بنود هذه الوثيقة. يُعد القبول شرطًا إلزاميًا مسبقًا لاستخدام الخدمة.
      2. الاستخدام المشروع والمحظورات المطلقة
      يلتزم المستخدم باستخدام التطبيق فقط للأغراض المشروعة، المدنية، والمتوافقة مع القانون الإيطالي والأوروبي، وكذلك قوانين بلد إقامته. يُحظر صراحةً:
      نشر مواد إباحية تتعلق بالأطفال، عنيفة، تمييزية، تشهيرية، مسيئة، أو تحرض على الكراهية؛
      التخطيط أو الترويج أو ارتكاب جرائم من أي نوع (مثل الإرهاب، المطاردة، الاحتيال، الابتزاز، الاتجار بالمخدرات، العنف الخاص)؛
      انتهاك حقوق الآخرين (الخصوصية، الملكية الفكرية، السرية المهنية)؛
      استخدام التطبيق في أنشطة التصيد، البرامج الضارة، البريد العشوائي، أو الهجمات الإلكترونية؛
      التحايل على أنظمة الإبلاغ أو إخفاء الهوية للإضرار بالغير.
      3. إخفاء الهوية التقني وغياب البيانات التعريفية
      لا تتطلب الخدمة ولا تجمع أي بيانات شخصية (الاسم، البريد الإلكتروني، الهاتف، عنوان IP دائم) عند التسجيل. لا يحتفظ الخادم بسجلات الاتصال ولا عناوين IP للمستخدمين، إلا للوقت الضروري لنقل الرسائل (وعلى أي حال لا يتجاوز مدة الجلسة).
      وبالتالي، حتى في حالة أمر قضائي، لا يستطيع المزوّد تقديم أي معلومات تعريفية عن المستخدمين، ولا التعرف على هويتهم الحقيقية.
      البيانات الوحيدة المرتبطة بحساب ما هو اسم المستخدم الذي يختاره المستخدم، والذي لا يسمح بتحديد هوية شخص طبيعي.
      4. إعفاء كامل لمسؤولية المزوّد عن الاستخدامات غير المشروعة
      المزوّد ليس مسؤولاً بأي حال من الأحوال – مدنيًا أو جنائيًا أو إداريًا – عن:
      محتوى المستخدمين أو محادثاتهم أو ملفاتهم أو أفعالهم؛
      استخدام الغير للرسائل المستلمة؛
      أية جرائم ترتكب عبر التطبيق، كون المنصة أداة سلبية ومحايدة لنقل البيانات (وفقًا للمادة 14 من المرسوم التشريعي 70/2003 وتوجيه الاتحاد الأوروبي 2000/31/EC).
      يتحمل المستخدم جميع المخاطر الناتجة عن استخدام الخدمة.
      5. إلزام التعويض (الإحلال)
      يلتزم المستخدم بتعويض المزوّد وإبراء ذمته والدفاع عنه ضد أي طلب أو إجراء قانوني أو غرامة أو عقوبة أو نفقة قانونية أو تعويض ناتج عن:
      انتهاكات المستخدم لهذه الشروط؛
      الاستخدامات غير القانونية أو غير المصرح بها للتطبيق والتي تعود إلى حسابه/جلسته؛
      النزاعات بين المستخدمين أو مع أطراف ثالثة تنشأ عن استخدام التطبيق.
      في حالة إدانة المزوّد بفعل يُنسب إلى المستخدم، فإن هذا الأخير ملزم بتعويض المزوّد بالكامل عن المبلغ المدفوع، بما في ذلك الأتعاب القانونية.
      6. التعاون مع السلطات والقيود التقنية
      يعلن المزوّد استعداده الكامل للتعاون مع السلطات القضائية أو الشرطية، مع احترام القوانين المعمول بها، من أجل مكافحة أي استخدام غير مشروع للخدمة.
      ومع ذلك، يقر المستخدم ويقبل بأن:
      الخدمة صُممت لعدم جمع أو الاحتفاظ بعناوين IP أو غيرها من البيانات التعريفية للمستخدمين؛
      المزوّد لا يملك وصولاً بصريًا إلى محتوى المحادثات الخاصة ولا قدرة تقنية على استخراجها؛
      قد توجد سجلات تقنية (مثل الطوابع الزمنية، بيانات الاتصال الوصفية، أو آثار النظام) فقط لدى مدير البنية التحتية للخادم (مزود الاستضافة) ولا تكون تحت تصرف المزوّد المباشر؛
      المزوّد غير قادر على تقديم بيانات لا يملكها أو غير قابلة للوصول تقنيًا، ولا على التحايل على إجراءات إخفاء الهوية والتشفير الخاصة به.
      في حالة طلب رسمي من سلطة ما، يلتزم المزوّد بما يلي:
      تعليق أو حذف حساب المستخدم المشار إليه فورًا، إذا كان ذلك ممكنًا تقنيًا؛
      تقديم كل معلومة بحوزته للسلطة (حتى لو كانت ضئيلة أو غير تعريفية)؛
      إبلاغ السلطة ببيانات الاتصال بمدير الخادم، حتى تتمكن من طلب أي سجلات تقنية غير متوفرة لدى المزوّد مباشرةً.
      يقر المستخدم أنه بحكم طبيعة الخدمة نفسها، فإن تعاون المزوّد محدود باستحالته التقنية الموضوعية لجمع أو تسليم بيانات لم يمتلكها أبدًا. لا يمكن تفسير أي حكم من هذا العقد على أنه التزام على المزوّد بتقديم أدلة أو هويات لا يلزمه القانون بالاحتفاظ بها.
      7. حدود الضمان والتوفر
      الخدمة مقدمة "كما هي"، بدون ضمانات الاستمرارية أو الخلو من الأخطاء أو الأمان المطلق. لا يضمن المزوّد عدم اعتراض أطراف ثالثة للرسائل أو عدم وجود ثغرات تقنية.
      8. المدة، التعديل، والإلغاء
      يمكن للمزوّد تعديل هذه الشروط في أي وقت، مع الإخطار عبر التطبيق. الاستمرار في استخدام الخدمة بعد التعديل يشكل قبولاً. يمكن للمستخدم التوقف عن الاستخدام في أي وقت. يمكن للمزوّد إلغاء الوصول دون إشعار مسبق في حالة حدوث خرق.
      9. المحكمة المختصة والقانون الواجب التطبيق
      يخضع هذا العقد للقانون الإيطالي. بالنسبة لأي نزاع يتعلق بالخدمة أو بهذه الشروط، فإن المحكمة الحصرية هي محكمة مكان إقامة المزوّد (أو، حسب اختياره، محكمة ميلانو/روما). يتنازل المستخدم صراحةً عن أي اختصاص قضائي آخر.
      10. البطلان الجزئي
      إذا أُعلن أن أي بند من البنود باطل أو غير فعال، تظل البنود المتبقية سارية المفعول بالكامل.
      11. الموافقة الصريحة وفقًا للمادتين 1341 و 1342 من القانون المدني الإيطالي
      يقر المستخدم بأنه قد قرأ ووافق تحديدًا على البنود المتعلقة بـ: إعفاء المسؤولية (المادة 4)، إلزام التعويض (المادة 5)، حدود الضمان (المادة 7)، المحكمة المختصة (المادة 9).

      تأكيد القبول الإلزامي
      بالضغط على "أقبل" أو الاستمرار في استخدام التطبيق بعد 10 ثوانٍ من العرض، يؤكد المستخدم قبوله لجميع الشروط المذكورة أعلاه.`,

    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 انتقل للأسفل حتى النهاية لتفعيل الموافقة",

    // --- Admin alerts ---
    admin_no_requests: "ما في طلبات تسجيل",
    admin_delete_btn: "حذف",
    admin_delete_btn_title: "احذف الحساب نهائياً",
    admin_delete_confirm: "متأكد إنك تبي تحذف الحساب نهائياً؟ ما فيه تراجع.",
    admin_delete_error: "خطأ في حذف الحساب",
    admin_load_error: "خطأ في تحميل الطلبات",
  },
  ja: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: '地元の言葉で話し、世界とチャット、匿名で',
    login_heading: 'ログイン',
    login_username_placeholder: 'ユーザー名',
    login_password_placeholder: 'パスワード',
    login_button: 'ログイン',
    login_no_account: 'アカウントをお持ちでないですか？',
    login_register_link: '登録',
    register_heading: '登録',
    register_username_placeholder: 'ユーザー名',
    register_password_placeholder: 'パスワード',
    register_language_label: '言語',
    register_api_key_placeholder: 'Gemini APIキー (任意)',
    register_button: '登録',
    register_has_account: 'すでにアカウントをお持ちですか？',
    register_login_link: 'ログイン',
    register_fields_required: '必須項目をすべて入力してください',
    registration_pending: '登録が完了しました。管理者の承認をお待ちください。',

    // ========== Navigazione ==========
    nav_contacts: '連絡先',
    nav_chats: 'チャット',
    nav_profile: 'プロフィール',
    nav_translate: '翻訳',

    // ========== Banner offline ==========
    offline_banner: '⚠️ オフライン - 接続待機中...',

    // ========== Contatti ==========
    contacts_title: '連絡先',
    add_contact_btn: '+ 追加',
    requests_in: '受信リクエスト',
    requests_out: '送信リクエスト',
    no_contacts: '連絡先がありません',
    pending_badge: '保留中',
    role_keyholder: 'Key-holder',
    role_guest: 'ゲスト',
    btn_accept: '承認',
    btn_remove: '削除',
    contacts_manage_btn: '連絡先',
    new_chat_btn: '新しいチャット',
    new_chat_modal_title: '新しいチャット',
    contacts_modal_title: '連絡先',
    confirm_delete_contact_message: '{name} を連絡先から削除しますか？',
    confirm_delete_contact_msg: '連絡先「{name}」を削除しますか？',
    contact_online: '● オンライン',
    contact_offline: '● オフライン',
    add_contacts_title: '連絡先を追加',
    btn_cancel: 'キャンセル',
    btn_send_requests: 'リクエストを送信',
    select_at_least_one: '少なくとも1人のユーザーを選択してください',
    search_contacts_placeholder: '連絡先を検索...',

    // --- Modale aggiungi contatto ---
    modal_title: '連絡先を追加',
    search_placeholder: 'ユーザー名を検索...',
    btn_add: '追加',
    btn_close: '閉じる',

    // ========== Chat ==========
    back_btn: '← 戻る',
    clear_chat_btn: 'Clear Chat',
    typing_indicator: '入力中...',
    expiry_label: '⏳ 自動消去:',
    expiry_options: [
    { value: '0', text: '有効期限なし' },
    { value: '0.002777', text: '10秒' },
    { value: '0.0166667', text: '1分' },
    { value: '0.0833333', text: '5分' },
    { value: '1', text: '1時間' },
    { value: '6', text: '6時間' },
    { value: '12', text: '12時間' },
    { value: '24', text: '24時間' },
    { value: '168', text: '7日間' },
    ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> 話す',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> 口述',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> リスニング',
    record_btn_release: '⏹ リリース',
    text_input_placeholder: '書いて',
    send_text_btn: 'テキストを送信',
    send_text_sending: '送信中...',
    message_sent_confirm: '{name}さんから新しいメッセージ\n\n{text}\n\nチャットを開きますか？',
    voice_note_confirm: '{name}さんから新しいボイスメモ\n\nチャットを開きますか？',
    confirm_image_message: '新しい画像が{name}から届きました\n\nチャットを開きますか？',
    confirm_video_message: '新しい動画が{name}から届きました\n\nチャットを開きますか？',
    local_notification_voice_note: '🎵 ボイスメッセージ',
    local_notification_image: '🖼️ 画像',
    local_notification_video: '🎬 動画',
    voice_note_sent: '🎵 ボイスメモを送信しました',
    voice_note_listen: '▶️ ボイスメモを再生',
    no_messages: 'メッセージはありません',
    load_error: 'メッセージの読み込みエラー',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 幽霊',
    individual_chat: '💬 個人チャット',
    group_chat: '👥 グループチャット',
    search_chats_placeholder: 'チャットを検索...',
    btn_delete: '削除',
    confirm_delete_chat_msg: '「{name}」とのチャットを終了しますか？',
    confirm_delete_message: 'このメッセージを削除しますか？相手のチャットからも消えます。',

    // --- Gruppi ---
    group_chat_modal_title: 'グループチャットを作成',
    group_chat_modal_subtitle: 'オンラインの連絡先を選択',
    group_create_btn: 'グループを作成',
    group_leave_btn: '退出',
    group_invite_title: 'グループ招待',
    group_invite_accept: '参加',
    group_invite_decline: '辞退',
    group_user_joined: 'がグループに参加しました',
    group_user_left: 'がグループを退出しました',
    group_error_no_contacts_online: 'オンラインの連絡先がありません',
    group_error_select_contact: '少なくとも1人の連絡先を選択してください',
    group_error_creation_failed: 'グループの作成に失敗しました',
    group_notification_created: 'グループが作成されました',
    new_contact_request: '{{name}}から新しい連絡先リクエストが届きました',
    group_chat_title: 'グループ ({{count}})',
    group_reconnected: 'が再参加しました',
    group_timeout_suffix: ' (タイムアウト)',
    group_empty: 'グループにあなただけが残っています。',
    group_chat_btn: '👥 グループ',
    send_btn: '送信',

    // ========== Profilo ==========
    profile_avatar_upload: 'プロフィール写真をアップロード',
    profile_avatar_remove: '削除',
    profile_username_label: 'ユーザー名',
    profile_language_label: '言語',
    profile_api_key_label: 'Gemini APIキー',
    profile_api_key_placeholder: '削除するには空欄のままにしてください',
    profile_api_key_hint: '新しいキーを入力するとキーホルダーになります',
    profile_voice_label: '優先TTS音声',
    profile_expiry_label: '⏳ デフォルトの自動消去',
    profile_expiry_hint: '新しいメッセージはこの有効期限を継承します（チャットごとに変更可能）',
    profile_regenerate_keys: 'E2E鍵を再生成',
    profile_regenerate_keys_hint: '注意: 以前の暗号化メッセージは読めなくなります。',
    profile_logout: 'ログアウト',
    profile_delete_account: 'アカウントを削除',
    profile_save: '変更を保存',
    profile_password_label: 'パスワード',
    profile_change_password_btn: '変更',
    change_password_title: 'パスワードを変更',
    current_password_placeholder: '現在のパスワード',
    new_password_placeholder: '新しいパスワード',
    confirm_password_placeholder: '新しいパスワードを確認',
    profile_saved: '設定が保存されました',
    profile_error: 'エラー',
    profile_ui_language_label: 'インターフェース言語',
    profile_theme_label: 'カラーテーマ',
    theme_red: 'インテンスレッド',
    theme_blue: 'オーシャンブルー',
    theme_green: 'フォレストグリーン',
    theme_purple: 'ロイヤルパープル',
    profile_ephemeral_default: '👻 デフォルトゴースト',
    profile_beep_label: '録音開始のビープ音',

    // --- Chiavi API ---
    profile_api_keys_label: 'APIキー',
    manage_api_keys_btn: 'APIキーを管理',
    profile_api_keys_hint: 'Geminiキーを追加または削除します。',
    api_keys_modal_title: 'あなたのAPIキー',
    new_api_key_placeholder: '新しいAPIキーを貼り付け',
    add_api_key_btn: '追加',
    no_api_keys: '保存されたAPIキーはありません',
    confirm_delete_api_key: 'このキーを削除しますか？',

    // ========== Errori e avvisi ==========
    error_network: 'サーバーに接続できません',
    error_session_expired: 'セッションの有効期限が切れました',
    error_login_failed: 'ログインエラー',
    error_register_failed: '登録エラー',
    error_contact_load: '連絡先の読み込みエラー',
    error_profile_load: 'プロフィールを読み込めません',
    error_send_failed: '送信に失敗しました。再試行してください。',
    error_send_text_failed: 'テキストの送信に失敗しました。しばらくしてから再試行してください。',
    error_dictation_blocked: 'このブラウザでは音声認識がサポートされていません。\n推奨ブラウザ: Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (フラグ有効時)。',
    error_dictation_mic: '音声入力のためのマイク許可が拒否されました。',
    error_dictation_generic: '音声入力エラー: {error}',
    error_recording_unsupported: '録音がサポートされていません',
    error_mic_access: 'ボイスメモ用のマイクにアクセスできません',
    error_voice_note_e2e: 'ボイスメモを送信できません: 受信者がE2E暗号化を設定していません。プロフィールを開くよう依頼してください。',
    error_private_key_missing: '秘密鍵が見つかりません。プロフィールからE2E鍵を再生成してください。',
    error_voice_note_send_failed: 'ボイスメモの送信に失敗しました',
    error_text_e2e_required: 'メッセージを送信できません: 受信者がE2E暗号化を設定していません。プロフィールを開くよう依頼してください。',
    error_decryption_failed: '音声の復号に失敗しました',
    error_no_audio_data: '音声データが利用できません。',
    error_audio_decrypt: '音声の復号に失敗しました',
    error_ephemeral_message: '消えるメッセージのエラー',
    error_voice_note_network: 'ボイスメッセージ送信中のネットワークエラー',
    error_send_retry: '送信に失敗しました。タップして再試行。',
    error_audio_data_unavailable: '音声データが利用できません。',
    error_delete_account: 'アカウントの削除中にエラーが発生しました',
    error_generic: 'エラー',
    error_key_regeneration: '鍵の再生成中にエラーが発生しました。',
    ephemeral_language_error: 'エフェメラルモードでは同じ言語が必要です。',
    ephemeral_offline_error: '受信者がオフラインです。エフェメラルメッセージは配信できません。',
    confirm_delete_contact: 'この連絡先を削除しますか？',
    confirm_delete_account: '本当にアカウントを完全に削除しますか？この操作は元に戻せません。',
    confirm_regenerate_keys: 'E2E鍵を再生成しますか？以前の暗号化メッセージは読めなくなります。',
    keys_regenerated: '新しい鍵が生成されました。',
    account_deleted: 'アカウントが正常に削除されました',
    avatar_upload_error: '画像のアップロード中にエラーが発生しました',
    no_chats: 'アクティブなチャットはありません',
    error_loading_chats: 'チャットの読み込みエラー',
    error_guest_diff_language: "異なる言語のユーザーとチャットするには、APIキーが必要です。プロフィールページでAPIキーを登録してください。",
    error_guest_group_multilingual: "ゲストユーザーが作れるグループは、同じ言語の人同士だけだよ。多言語グループを作るにはAPIキーが必要です。",
    warning_keyholder_add_guest_diff_language: "追加しようとしている連絡先はゲストアカウントで、あなたと言語が違います。あなたとのチャットはすべて、あなたのGemini APIキーを使って翻訳されます。",
    alert_fill_all_fields: '必須項目をすべて入力してください',
    error_missing_public_key: '{memberId} の公開鍵が見つかりません',
    error_cannot_get_public_key: '{memberId} の公開鍵を取得できませんでした',

    // ========== Notifiche push ==========
    push_new_message: '{name}さんから新しいメッセージ',
    push_voice_note: '{name}さんからボイスメモ',
    push_body: '🎵 ボイスメモ',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'あなたのE2E指紋:',
    speaker_title: '再生',
    media_upload_title: '写真またはビデオを送信',
    media_expiry_default_warning: '自動消去タイマーを設定せずに送信されたメディアは、7日後に自動的に削除されます。',
    lightbox_image_alt: '画像',
    lightbox_video_alt: '動画',
    translate_show_original: '原文を表示',
    translating_placeholder: '翻訳中…',
    error_translation_failed: '翻訳に失敗しました',
    error_translation_api_key: '翻訳するにはAPIキーを追加してください',
    translate_title: '翻訳',
    encrypted_message: '🔒 暗号化メッセージ',

    // --- Amministrazione ---
    admin_requests_title: '登録リクエスト',
    admin_requests_btn: 'リクエストを管理',
    admin_note_placeholder: 'メモ（最大30文字）',
    admin_account_active: 'アクティブ',
    admin_account_inactive: '保留中',
    admin_toggle_activate: 'アカウントを有効化',
    admin_toggle_deactivate: 'アカウントを無効化',
    admin_back_to_profile: '← プロフィールに戻る',

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "ゴーストモードを有効にすると、送信したメッセージはサーバーに保存されず、チャットを離れると消えます。相手もチャットを開いている場合にのみ機能します。",
    tour_chat_selfdestruct: '各メッセージに自動消去タイマーを設定できます。タイマーは相手がメッセージを表示した時点からカウントダウンを開始し、時間切れになると全員の画面から削除されます。',
    tour_chat_dictate: '短くタップ：音声入力を開始し、もう一度タップすると入力を終了してテキストを送信します。長押し：ボイスメッセージを録音し、指を離すと送信されます。話し始める前にビープ音を待ってください。',
    tour_chat_sent: '自分が送信したメッセージを長押しすると削除できます。',
    tour_chat_received: '受信したメッセージを長押しすると、絵文字リアクションを追加できます。',
    tour_chat_speaker: 'メッセージの下にあるスピーカーアイコンをタップすると、読み上げてくれます。',
    tour_chat_clear: "自分のチャットインターフェースのメッセージを消去しますが、相手のものは消去しません。",
    tour_group_ghost: 'グループチャットは常にゴーストモードです。退出すると、会話とすべてのメッセージが削除されます。',
    tour_contacts_fab: 'タップして新しい連絡先を追加します。',
    tour_contacts_delete: '連絡先を長押しすると削除できます。削除には確認が必要です。',
    tour_chatslist_fab: "タップして新しい個人チャットまたはグループチャットを作成。すべてのグループチャットは常にゴーストモードです：メッセージは保存されず、少なくとも2人の参加者が同時にチャットを開いている場合にのみ機能します。",
    tour_chatslist_delete: 'チャットのバナーを長押しすると削除できます。削除には確認が必要です。',
    tour_profile_recording: 'ボイスメッセージの録音が実際に開始されたことを知らせる音を選択します。',
    tour_profile_api: "他の言語を話す人とチャットするには、Gemini APIキーが少なくとも1つ必要です。Googleアカウントをお持ちなら、無料のキーを3ステップで1つ以上登録できます。<br>1) <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a>にアクセス<br>2) 左下の「APIキーを作成」をクリック<br>3) ここに貼り付け。<br>複数のキーがある場合、システムは最初のキーを1日の制限に達するまで使い、その後自動的に次のキーに切り替えます。<br>または、共通の言語を話す場合は、APIキーなしでチャットできます。両方ともプロフィールページから設定する必要がありますが、自分の言語を話す人々とチャットするときに戻すことを忘れないでください。",
    tour_profile_e2e: 'メッセージの暗号化キーを新しく生成します。注意：再生成後は過去のメッセージを読めなくなります。',
    tour_translate_howto: '相手があなたの言語を話さない対面会話向けです。2つの言語を選び、自分の言語の「話す」ボタンを一度押して話し、もう一度押します。すると翻訳が表示され、相手の言語で音声が読み上げられます。相手は自分の言語のボタンで返答します。',
    tour_translate_original: 'オンにすると、話した人の言語のテキストも表示され、メッセージが正しく伝わったか確認できます。APIキーの使用量が増えるため、1日に翻訳できるメッセージ数は少なくなります。',
    tour_translate_limits: '翻訳機能の利用は、お手持ちのGemini APIキーの1日あたりの上限に制限されます。',

    // --- UI del tour ---
    tour_next: '次へ',
    tour_skip: 'スキップ',
    tour_finish: '完了',
    profile_tour_label: "ツアー案内",
    profile_tour_button: "ツアーをやり直す",

    // --- Legal Form ---
    terms_title: "利用規約",
    terms_accept_label: "私は本利用規約を読み、同意したことを宣言します",
    terms_confirm_btn: "同意して登録",
    terms_text: `【ドキュメント】GHOST CHAT サービス利用規約
      はじめに
      本サービス（PWA「Ghost Chat」）は、ユーザー間の匿名メッセージングのための技術的プラットフォームとしてのみ提供されます。サーバーの所有者/管理者（「提供者」）は、交換されるコンテンツ、表明されたアイデンティティ、またはユーザーの行動を一切管理しません。本アプリの使用は、以下の条件に完全に同意しない限り禁止されます。
      1. 同意と読了義務
      本アプリにアクセスまたは使用することにより、ユーザーは本ドキュメントのすべての条項を読み、理解し、無条件に同意したことを宣言するものとします。同意は本サービスの使用に対する必須の前提条件です。
      2. 合法的な使用と絶対的禁止事項
      ユーザーは、本アプリを合法的かつ良識的な目的のため、ならびにイタリアおよびヨーロッパの法律、さらに自身の居住国の法律に準拠してのみ使用するものとします。以下は明示的に禁止されます。
      児童ポルノ、暴力的、差別的、名誉毀損的、侮辱的、または憎悪を煽るような素材を拡散すること；
      あらゆる種類の犯罪（例：テロ、ストーキング、詐欺、恐喝、麻薬取引、私的暴力）を計画、促進、または実行すること；
      他者の権利（プライバシー、知的財産、職業秘密）を侵害すること；
      フィッシング、マルウェア、スパム、またはサイバー攻撃のために本アプリを使用すること；
      第三者に損害を与えるために、報告または匿名性のシステムを回避すること。
      3. 技術的な匿名性と識別データの不存在
      本サービスは、登録時に個人データ（氏名、メールアドレス、電話番号、永続的IPアドレス）を一切要求または収集しません。サーバーは、メッセージ送信に厳密に必要な時間を超えて（いかなる場合もセッションを超えて）接続ログやユーザーのIPアドレスを保存しません。
      したがって、司法命令があった場合でも、提供者はユーザーに関する識別情報を提供したり、その実際の身元を特定したりすることはできません。
      アカウントに関連付けられる唯一のデータはユーザーが選択したユーザー名であり、これによって個人を特定することはできません。
      4. 違法使用に対する提供者の責任の完全な排除
      提供者は、以下の事項について、民事上、刑事上、行政上、いかなる責任も負いません：
      ユーザーのコンテンツ、会話、ファイル、または行動；
      第三者が受信したメッセージを使用すること；
      本アプリを通じて犯された可能性のある犯罪。なぜなら、当プラットフォームは受動的かつ中立的なデータ伝送手段だからです（Legislative Decree 70/2003 第14条およびEU指令2000/31/ECに基づく）。
      ユーザーは、本サービスの使用に起因するすべてのリスクを負うものとします。
      5. 免責補償義務
      ユーザーは、以下の事項に起因するいかなる請求、法的措置、罰金、制裁、弁護費用、または損害賠償から提供者を免責、補償、および防御することに同意するものとします：
      ユーザーによる本条件の違反；
      自身のアカウント/セッションに帰属する、本アプリの違法または不正使用；
      本アプリの使用に起因するユーザー間または第三者との紛争。
      ユーザーに帰属する行為により提供者が損害賠償責任を負った場合、ユーザーは、弁護士費用を含め、提供者が支払った全額を提供者に全額償還する義務を負うものとします。
      6. 当局との協力および技術的制限
      提供者は、適用される法律を尊重し、本サービスの違法使用に対抗するために、司法当局または警察当局と全面的に協力する用意があることを宣言します。
      ただし、ユーザーは以下を認識し、同意するものとします：
      本サービスは、ユーザーのIPアドレスやその他の識別データを収集または保存しないように設計されています；
      提供者は、プライベートチャットの内容を視覚的にアクセスすることも、それらを抽出する技術的能力も有していません；
      技術的ログ（タイムスタンプ、接続メタデータ、システムトレースなど）は、サーバーインフラストラクチャの管理者（ホスティングプロバイダー）のみに存在する可能性があり、提供者が直接利用できるものではありません；
      提供者は、自身が保有していない、または技術的にアクセス不可能なデータを提供することも、自身の匿名性および暗号化対策を回避することもできません。
      当局からの正式な要求があった場合、提供者は以下を行うものとします：
      技術的に可能であれば、指定されたユーザーのアカウントを直ちに停止または削除すること；
      自身が保有するすべての情報（たとえ最小限または非識別的なものであっても）を当局に提供すること；
      提供者が利用できない技術的ログについて、当局がサーバー管理者に直接要求できるよう、その連絡先情報を当局に提供すること。
      ユーザーは、本サービス自体の性質上、提供者の協力は、決して保有したことのないデータを収集または引き渡す技術的客観的不可能性によって制限されることを認識します。本契約のいかなる規定も、法律が提供者に保持を義務付けていない証拠または識別情報を提供する義務として解釈することはできません。
      7. 保証および可用性の制限
      本サービスは「現状有姿」で提供され、継続性、エラーのないこと、または絶対的な安全性についての保証はありません。提供者は、第三者による傍受や技術的脆弱性がないことを保証しません。
      8. 期間、変更、および取り消し
      提供者は、本アプリを通じて通知することにより、いつでも本条件を変更することができます。変更後のサービスの継続使用は同意を構成します。ユーザーはいつでも使用を中止できます。提供者は、違反があった場合、予告なくアクセスを取り消すことができます。
      9. 管轄裁判所および準拠法
      本契約はイタリア法に準拠します。本サービスまたは本条件に関する紛争については、提供者の居住地（または提供者の選択により、ミラノ/ローマ）の裁判所を専属的管轄とします。ユーザーは、その他のいかなる裁判管轄も明示的に放棄します。
      10. 部分的無効
      いずれかの条項が無効または効力を有しないと宣言された場合でも、残りの条項は完全に有効であり続けます。
      11. イタリア民法第1341条および第1342条に基づく明示的同意
      ユーザーは、以下の条項を具体的に読み、承認したことを宣言します：責任の排除（第4条）、免責補償義務（第5条）、保証の制限（第7条）、管轄裁判所（第9条）。

      必須の同意確認
      「同意する」を押すか、表示後10秒以内に本アプリの使用を継続することにより、ユーザーは上記のすべての条件に同意したことを確認するものとします。`,

    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 一番下までスクロールして、同意を有効にしてください",

    // --- Admin alerts ---
    admin_no_requests: "登録リクエストはありません",
    admin_delete_btn: "削除",
    admin_delete_btn_title: "このアカウントを完全に削除",
    admin_delete_confirm: "本当にこのアカウントを完全に削除しますか？元に戻せません。",
    admin_delete_error: "アカウント削除エラー",
    admin_load_error: "リクエスト読み込みエラー",
  },
  ko: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: '우리말로 대화하고, 세계와 채팅하고, 익명으로',
    login_heading: '로그인',
    login_username_placeholder: '사용자 이름',
    login_password_placeholder: '비밀번호',
    login_button: '로그인',
    login_no_account: '계정이 없으신가요?',
    login_register_link: '회원가입',
    register_heading: '회원가입',
    register_username_placeholder: '사용자 이름',
    register_password_placeholder: '비밀번호',
    register_language_label: '언어',
    register_api_key_placeholder: 'Gemini API 키 (선택 사항)',
    register_button: '회원가입',
    register_has_account: '이미 계정이 있으신가요?',
    register_login_link: '로그인',
    register_fields_required: '모든 필수 항목을 입력하세요',
    registration_pending: '등록이 완료되었습니다. 관리자 승인을 기다려주세요.',

    // ========== Navigazione ==========
    nav_contacts: '연락처',
    nav_chats: '채팅',
    nav_profile: '프로필',
    nav_translate: '번역',

    // ========== Banner offline ==========
    offline_banner: '⚠️ 오프라인 - 연결 대기 중...',

    // ========== Contatti ==========
    contacts_title: '연락처',
    add_contact_btn: '+ 추가',
    requests_in: '받은 요청',
    requests_out: '보낸 요청',
    no_contacts: '연락처 없음',
    pending_badge: '대기 중',
    role_keyholder: '키 보유자',
    role_guest: '게스트',
    btn_accept: '수락',
    btn_remove: '삭제',
    contacts_manage_btn: '연락처',
    new_chat_btn: '새 채팅',
    new_chat_modal_title: '새 채팅',
    contacts_modal_title: '연락처',
    confirm_delete_contact_message: '{name}님을 연락처에서 삭제하시겠습니까?',
    confirm_delete_contact_msg: '"{name}" 연락처를 삭제하시겠습니까?',
    contact_online: '● 온라인',
    contact_offline: '● 오프라인',
    add_contacts_title: '연락처 추가',
    btn_cancel: '취소',
    btn_send_requests: '요청 보내기',
    select_at_least_one: '최소 한 명의 사용자를 선택하세요.',
    search_contacts_placeholder: '연락처 검색...',

    // --- Modale aggiungi contatto ---
    modal_title: '연락처 추가',
    search_placeholder: '사용자 이름 검색...',
    btn_add: '추가',
    btn_close: '닫기',

    // ========== Chat ==========
    back_btn: '← 뒤로',
    clear_chat_btn: '대화 내용 지우기',
    typing_indicator: '입력 중...',
    expiry_label: '⏳ 자동 삭제:',
    expiry_options: [
          { value: '0', text: '기한 없음' },
          { value: '0.002777', text: '10초' },
          { value: '0.0166667', text: '1분' },
          { value: '0.0833333', text: '5분' },
          { value: '1', text: '1시간' },
          { value: '6', text: '6시간' },
          { value: '12', text: '12시간' },
          { value: '24', text: '24시간' },
          { value: '168', text: '7일' },
        ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> 말하기',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> 받아쓰기',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> 듣기',
    record_btn_release: '⏹ 해제',
    text_input_placeholder: '써',
    send_text_btn: '텍스트 보내기',
    send_text_sending: '전송 중...',
    message_sent_confirm: '{name}님의 새 메시지\n\n{text}\n\n채팅을 열까요?',
    voice_note_confirm: '{name}님의 새 음성 메모\n\n채팅을 열까요?',
    confirm_image_message: '{name}님에게서 새 이미지\n\n채팅을 열까요?',
    confirm_video_message: '{name}님에게서 새 동영상\n\n채팅을 열까요?',
    local_notification_voice_note: '🎵 음성 메모',
    local_notification_image: '🖼️ 이미지',
    local_notification_video: '🎬 동영상',
    voice_note_sent: '🎵 음성 메모 전송됨',
    voice_note_listen: '▶️ 음성 메모 듣기',
    no_messages: '메시지 없음',
    load_error: '메시지 로드 오류',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 유령',
    individual_chat: '💬 개인 채팅',
    group_chat: '👥 그룹 채팅',
    search_chats_placeholder: '채팅 검색...',
    btn_delete: '삭제',
    confirm_delete_chat_msg: '"{name}"님과의 채팅을 종료하시겠습니까?',
    confirm_delete_message: '이 메시지를 삭제하시겠습니까? 수신자의 채팅에서도 사라집니다.',

    // --- Gruppi ---
    group_chat_modal_title: '그룹 채팅 만들기',
    group_chat_modal_subtitle: '온라인 연락처 선택',
    group_create_btn: '그룹 만들기',
    group_leave_btn: '나가기',
    group_invite_title: '그룹 초대',
    group_invite_accept: '참여',
    group_invite_decline: '거절',
    group_user_joined: '님이 그룹에 참여했습니다.',
    group_user_left: '님이 그룹을 나갔습니다.',
    group_error_no_contacts_online: '온라인 연락처가 없습니다.',
    group_error_select_contact: '최소 한 명의 연락처를 선택하세요.',
    group_error_creation_failed: '그룹 생성 실패',
    group_notification_created: '그룹이 생성되었습니다.',
    new_contact_request: '{{name}}님에게서 새 연락처 요청',
    group_chat_title: '그룹 ({{count}})',
    group_reconnected: '님이 다시 참여했습니다.',
    group_timeout_suffix: ' (시간 초과)',
    group_empty: '그룹에 혼자 남았습니다.',
    group_chat_btn: '👥 그룹',
    send_btn: '보내기',

    // ========== Profilo ==========
    profile_avatar_upload: '프로필 사진 업로드',
    profile_avatar_remove: '제거',
    profile_username_label: '사용자 이름',
    profile_language_label: '언어',
    profile_api_key_label: 'Gemini API 키',
    profile_api_key_placeholder: '비우면 제거됩니다',
    profile_api_key_hint: '새 키를 입력하면 키 보유자가 됩니다',
    profile_voice_label: '선호 TTS 음성',
    profile_expiry_label: '⏳ 전역 자동 삭제',
    profile_expiry_hint: '새 메시지가 이 기간을 따릅니다 (채팅별 변경 가능)',
    profile_regenerate_keys: 'E2E 키 재생성',
    profile_regenerate_keys_hint: '주의: 이전 암호화 메시지는 읽을 수 없게 됩니다.',
    profile_logout: '로그아웃',
    profile_delete_account: '계정 삭제',
    profile_save: '변경 사항 저장',
    profile_password_label: '비밀번호',
    profile_change_password_btn: '변경',
    change_password_title: '비밀번호 변경',
    current_password_placeholder: '현재 비밀번호',
    new_password_placeholder: '새 비밀번호',
    confirm_password_placeholder: '새 비밀번호 확인',
    profile_saved: '설정 저장됨',
    profile_error: '오류',
    profile_ui_language_label: '인터페이스 언어',
    profile_theme_label: '색상 테마',
    theme_red: '진한 빨강',
    theme_blue: '오션 블루',
    theme_green: '포레스트 그린',
    theme_purple: '로열 퍼플',
    profile_ephemeral_default: '👻 기본 고스트',
    profile_beep_label: '오디오 녹음 시작',

    // --- Chiavi API ---
    profile_api_keys_label: 'API 키',
    manage_api_keys_btn: 'API 키 관리',
    profile_api_keys_hint: 'Gemini 키를 추가하거나 제거하세요.',
    api_keys_modal_title: '내 API 키',
    new_api_key_placeholder: '새 API 키 붙여넣기',
    add_api_key_btn: '추가',
    no_api_keys: '저장된 API 키 없음',
    confirm_delete_api_key: '이 키를 삭제할까요?',

    // ========== Errori e avvisi ==========
    error_network: '서버에 연결할 수 없습니다',
    error_session_expired: '세션이 만료되었습니다',
    error_login_failed: '로그인 오류',
    error_register_failed: '회원가입 오류',
    error_contact_load: '연락처 로드 오류',
    error_profile_load: '프로필을 로드할 수 없습니다',
    error_send_failed: '전송 실패. 다시 시도하세요.',
    error_send_text_failed: '텍스트 전송 실패. 잠시 후 다시 시도하세요.',
    error_dictation_blocked: '이 브라우저에서는 음성 인식이 지원되지 않습니다.\n권장 브라우저: Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (플래그 활성화 필요).',
    error_dictation_mic: '받아쓰기를 위한 마이크 권한이 거부되었습니다.',
    error_dictation_generic: '받아쓰기 오류: {error}',
    error_recording_unsupported: '녹음이 지원되지 않습니다',
    error_mic_access: '음성 메모를 위한 마이크 접근 불가',
    error_voice_note_e2e: '음성 메모를 보낼 수 없습니다: 수신자가 E2E 암호화를 설정하지 않았습니다. 프로필을 열도록 요청하세요.',
    error_private_key_missing: '개인 키가 없습니다. 프로필에서 E2E 키를 재생성하세요.',
    error_voice_note_send_failed: '음성 메모 전송 실패',
    error_text_e2e_required: '메시지를 보낼 수 없습니다: 수신자가 E2E 암호화를 설정하지 않았습니다. 프로필을 열도록 요청하세요.',
    error_decryption_failed: '오디오 복호화 실패',
    error_no_audio_data: '오디오 데이터가 없습니다.',
    error_audio_decrypt: '오디오 복호화 실패',
    error_ephemeral_message: '일회성 메시지 오류',
    error_voice_note_network: '음성 메시지 전송 중 네트워크 오류',
    error_send_retry: '전송 실패. 탭하여 다시 시도하세요.',
    error_audio_data_unavailable: '오디오 데이터를 사용할 수 없습니다.',
    error_delete_account: '계정 삭제 중 오류 발생',
    error_generic: '오류',
    error_key_regeneration: '키 재생성 중 오류 발생.',
    ephemeral_language_error: '에페메랄 모드는 동일한 언어를 필요로 합니다.',
    ephemeral_offline_error: '수신자가 오프라인 상태입니다. 에페메랄 메시지를 전달할 수 없습니다.',
    confirm_delete_contact: '이 연락처를 삭제하시겠습니까?',
    confirm_delete_account: '정말로 계정을 영구 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    confirm_regenerate_keys: 'E2E 키를 재생성하시겠습니까? 이전 암호화 메시지는 읽을 수 없게 됩니다.',
    keys_regenerated: '새 키가 성공적으로 생성되었습니다.',
    account_deleted: '계정이 성공적으로 삭제되었습니다',
    avatar_upload_error: '이미지 업로드 오류',
    no_chats: '활성 채팅이 없습니다',
    error_loading_chats: '채팅 불러오기 오류',
    error_guest_diff_language: "다른 언어를 사용하는 사용자와 채팅하려면 API 키가 필요합니다. 프로필 페이지에서 API 키를 등록하세요.", 
    error_guest_group_multilingual: "게스트 사용자는 같은 언어를 사용하는 사람들끼리만 그룹을 만들 수 있어요. 다국어 그룹을 만들려면 API 키가 필요합니다.",  
    warning_keyholder_add_guest_diff_language: "추가하려는 연락처는 게스트 계정이며 사용하는 언어가 달라요. 두 분 사이의 모든 채팅은 당신의 Gemini API 키를 사용해 번역됩니다.", 
    alert_fill_all_fields: '모든 필수 항목을 입력하세요',
    error_missing_public_key: '{memberId}의 공개 키가 없습니다',
    error_cannot_get_public_key: '{memberId}의 공개 키를 가져올 수 없습니다',

    // ========== Notifiche push ==========
    push_new_message: '{name}님의 새 메시지',
    push_voice_note: '{name}님의 음성 메모',
    push_body: '🎵 음성 메모',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: '당신의 E2E 지문:',
    speaker_title: '듣기',
    media_upload_title: '사진 또는 동영상 보내기',
    media_expiry_default_warning: '자동 삭제 타이머 없이 보낸 미디어는 7일 후 자동으로 삭제됩니다.',
    lightbox_image_alt: '이미지',
    lightbox_video_alt: '동영상',
    translate_show_original: '원문 보기',
    translating_placeholder: '번역 중…',
    error_translation_failed: '번역 실패',
    error_translation_api_key: '번역을 위해 API 키를 추가하세요',
    translate_title: '번역기',
    encrypted_message: '🔒 암호화된 메시지',

    // --- Amministrazione ---
    admin_requests_title: '가입 요청',
    admin_requests_btn: '요청 관리',
    admin_note_placeholder: '메모 (최대 30자)',
    admin_account_active: '활성',
    admin_account_inactive: '대기 중',
    admin_toggle_activate: '계정 활성화',
    admin_toggle_deactivate: '계정 비활성화',
    admin_back_to_profile: '← 프로필로 돌아가기',

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "고스트 모드를 활성화합니다: 전송된 메시지는 서버에 저장되지 않으며 채팅을 나가면 사라집니다. 상대방도 채팅을 열고 있을 때만 작동합니다.",
    tour_chat_selfdestruct: '각 메시지에 자동 삭제 타이머를 설정할 수 있습니다. 수신자가 메시지를 확인하면 카운트다운이 시작되고, 시간이 다 되면 모든 사람에게서 메시지가 삭제됩니다.',
    tour_chat_dictate: '짧게 터치: 음성 받아쓰기를 시작하고, 다시 터치하면 중지 후 텍스트를 보냅니다. 길게 누르기: 음성 메시지를 녹음하고, 손을 떼면 전송됩니다. 신호음이 들린 후 말하세요.',
    tour_chat_sent: '내 메시지를 길게 눌러 삭제하세요.',
    tour_chat_received: '받은 메시지를 길게 눌러 이모지 반응을 추가하세요.',
    tour_chat_speaker: '메시지 아래 스피커 아이콘을 터치하면 소리 내어 읽어 줍니다.',
    tour_chat_clear: "내 채팅 인터페이스의 메시지만 지우고, 상대방 인터페이스의 메시지는 지우지 않습니다.",
    tour_group_ghost: '그룹 채팅은 항상 고스트 모드입니다: 대화 내용과 모든 메시지는 채팅을 나가면 삭제됩니다.',
    tour_contacts_fab: '터치하여 새 연락처를 추가하세요.',
    tour_contacts_delete: '연락처를 길게 누르면 삭제할 수 있습니다. 삭제를 확인해야 합니다.',
    tour_chatslist_fab: "탭하여 1:1 채팅 또는 그룹 채팅을 새로 만듭니다. 모든 그룹 채팅은 항상 고스트 모드로 작동합니다: 메시지가 저장되지 않으며, 최소 두 명 이상의 참가자가 동시에 채팅을 열고 있을 때만 작동합니다.",
    tour_chatslist_delete: '채팅 배너를 길게 누르면 삭제할 수 있습니다. 삭제를 확인해야 합니다.',
    tour_profile_recording: '음성 메시지 녹음이 실제로 시작될 때 알려주는 소리를 선택하세요.',
    tour_profile_api: "다른 언어를 사용하는 사람들과 채팅하려면 최소 하나의 Gemini API 키가 필요합니다. Google 계정이 있으면 무료로 하나 이상의 키를 3단계로 등록할 수 있습니다:<br>1) <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a>로 이동<br>2) 왼쪽 하단의 'API 키 만들기' 클릭<br>3) 여기에 붙여넣기.<br>여러 개의 키가 있는 경우, 시스템은 일일 한도가 소진될 때까지 첫 번째 키를 사용하다가 자동으로 다음 키로 전환합니다.<br>또는 공통 언어를 사용하는 경우 API 키 없이 채팅할 수 있습니다. 두 사람 모두 프로필 페이지에서 설정해야 하지만, 같은 언어를 사용하는 사람들과 다시 채팅할 때는 다시 변경해야 한다는 점을 기억하세요.",
    tour_profile_e2e: '메시지 암호화를 위한 새 키를 생성합니다. 주의: 재생성하면 이전 메시지를 더 이상 읽을 수 없습니다.',
    tour_translate_howto: '내 언어를 못하는 사람과의 대면 대화를 위해 설계되었습니다. 두 언어를 선택하세요. 자신의 언어로 된 \'말하기\' 버튼을 한 번 누르고 말한 후 다시 누르면 번역이 나타나고 상대방 언어로 음성이 읽어 줍니다. 상대방은 자신의 언어 버튼으로 응답합니다.',
    tour_translate_original: '활성화하면 말한 사람의 언어로 된 원문도 함께 표시되어 메시지가 정확히 전달되었는지 확인할 수 있습니다. API 키 사용량이 늘어나므로 하루 번역 가능한 메시지 수가 줄어듭니다.',
    tour_translate_limits: '번역기 사용은 Gemini API 키의 일일 한도에 따라 제한됩니다.',

    // --- UI del tour ---
    tour_next: '다음',
    tour_skip: '건너뛰기',
    tour_finish: '완료',
    profile_tour_label: "투어 정보",  
    profile_tour_button: "투어 다시 시작",  

    // --- Legal Form ---
    terms_title: "이용 약관",
    terms_accept_label: "본 약관을 읽었으며 이에 동의합니다",
    terms_confirm_btn: "동의하고 가입하기",
    terms_text: `문서 – GHOST CHAT 서비스 이용 약관

      서문
      본 서비스(PWA "Ghost Chat")는 사용자 간 익명 메시징 기술 플랫폼으로만 제공됩니다. 서버 소유자/관리자(이하 "제공자")는 교환되는 콘텐츠, 주장되는 신원 또는 사용자의 행위에 대해 어떠한 통제권도 갖지 않습니다. 다음 약관을 완전히 수락하지 않는 사람은 앱 사용이 금지됩니다.

      1. 수락 및 읽을 의무
      앱에 접속하거나 사용함으로써 사용자는 본 문서의 모든 조항을 읽고 이해했으며 무조건 수락함을 선언합니다. 수락은 서비스 이용을 위한 필수 전제 조건입니다.

      2. 합법적 사용 및 절대적 금지 사항
      사용자는 앱을 합법적이고, 건전하며, 이탈리아 및 유럽 법률은 물론 자국 거주지 법률을 준수하는 목적으로만 사용할 것에 동의합니다. 다음 행위는 명시적으로 금지됩니다:
      아동 포르노그래피, 폭력적, 차별적, 명예훼손적, 모욕적 또는 증오를 선동하는 자료 유포;
      모든 종류의 범죄(예: 테러, 스토킹, 사기, 공갈, 마약 밀매, 폭행)를 계획, 조장 또는 실행;
      타인의 권리(프라이버시, 지적 재산, 직업적 비밀) 침해;
      피싱, 악성 코드, 스팸 또는 사이버 공격을 위해 앱 사용;
      타인에게 해를 끼치기 위한 신고 시스템 또는 익명성 우회.

      3. 기술적 익명성 및 식별 데이터 부재
      본 서비스는 가입 시 개인정보(이름, 이메일, 전화번호, 영구 IP 주소)를 요구하거나 수집하지 않습니다. 서버는 메시지 전송에 엄격히 필요한 시간(어떠한 경우에도 세션을 초과하지 않음) 동안만 연결 로그나 사용자 IP 주소를 보관합니다.
      따라서 법원 명령이 있더라도 제공자는 사용자에 대한 어떠한 식별 정보도 제공할 수 없으며, 실제 신원을 추적할 수 없습니다.
      계정과 연관된 유일한 데이터는 사용자가 선택한 사용자 이름으로, 이는 실제 개인을 식별할 수 없습니다.

      4. 불법적 사용에 대한 제공자의 완전한 책임 면제
      제공자는 다음 사항에 대해 민사적, 형사적 또는 행정적으로 어떠한 책임도 지지 않습니다:
      사용자의 콘텐츠, 대화, 파일 또는 행위;
      제3자가 수신한 메시지를 사용하는 방식;
      앱을 통해 저질러진 가능한 범죄. 플랫폼은 수동적이고 중립적인 데이터 전송 도구이기 때문입니다(법령 70/2003 제14조 및 EU 지침 2000/31/EC에 의거).
      사용자는 서비스 이용으로 인해 발생하는 모든 위험을 감수합니다.

      5. 면책 의무(손해 배상)
      사용자는 다음으로 인해 발생하는 모든 청구, 법적 조치, 벌금, 제재, 법적 비용 또는 손해 배상으로부터 제공자를 면책하고, 보호하며, 방어할 의무가 있습니다:
      사용자에 의한 본 약관 위반;
      자신의 계정/세션과 관련된 앱의 불법적 또는 허가되지 않은 사용;
      앱 사용으로 인해 발생한 사용자 간 또는 제3자와의 분쟁.
      사용자에게 귀책되는 사유로 제공자가 유죄 판결을 받는 경우, 사용자는 제공자가 지급한 금액(법률 수수료 포함)을 전액 배상할 의무가 있습니다.

      6. 당국과의 협력 및 기술적 한계
      제공자는 관련 법률을 준수하여 서비스의 불법적 사용을 방지하기 위해 사법 당국 또는 경찰과 협력할 완전한 의사가 있음을 밝힙니다.
      그러나 사용자는 다음을 인지하고 수락합니다:
      본 서비스는 IP 주소 또는 기타 사용자 식별 데이터를 수집하거나 보관하지 않도록 설계되었습니다;
      제공자는 개인 채팅 내용을 시각적으로 확인할 수 있는 권한도 없고 추출할 기술적 능력도 없습니다;
      기술 로그(예: 타임스탬프, 연결 메타데이터 또는 시스템 추적)는 서버 인프라 관리자(호스팅 제공자)에게만 존재할 수 있으며 제공자가 직접 보유하지 않습니다;
      제공자는 보유하지 않거나 기술적으로 접근할 수 없는 데이터를 제공할 수 없으며, 자체적인 익명성 및 암호화 조치를 우회할 수 없습니다.
      당국의 공식 요청이 있는 경우 제공자는 다음을 수행할 의무가 있습니다:
      기술적으로 가능한 경우 지시된 사용자 계정을 즉시 정지 또는 삭제;
      당국에 보유 중인 모든 정보(최소한이거나 식별 불가능한 정보라도) 제공;
      제공자가 보유하지 않은 기술 로그를 당국이 직접 요청할 수 있도록 서버 관리자의 연락처 정보를 당국에 제공.
      사용자는 서비스의 본질상 제공자의 협력이 제공자가 소유한 적 없는 데이터를 수집하거나 전달할 객관적인 기술적 불가능성에 의해 제한된다는 점을 인정합니다. 본 계약의 어떠한 규정도 제공자가 법률이 보관을 요구하지 않는 증거나 식별 정보를 제공할 의무로 해석될 수 없습니다.

      7. 보증 및 가용성의 한계
      본 서비스는 "있는 그대로" 제공되며, 연속성, 오류 없음 또는 절대적 보안에 대한 보증 없이 제공됩니다. 제공자는 제3자에 의한 감청 또는 기술적 취약점의 부재를 보장하지 않습니다.

      8. 기간, 수정 및 철회
      제공자는 앱을 통해 통지함으로써 언제든지 본 약관을 수정할 수 있습니다. 수정 후 지속적인 서비스 이용은 수락으로 간주됩니다. 사용자는 언제든지 이용을 중단할 수 있습니다. 제공자는 위반 시 사전 통지 없이 접근을 철회할 수 있습니다.

      9. 관할 법원 및 준거법
      본 계약은 이탈리아 법률의 적용을 받습니다. 서비스 또는 본 약관과 관련된 모든 분쟁에 대해 독점적 관할권은 제공자의 거주지(또는 제공자의 선택에 따라 밀라노/로마)로 합니다. 사용자는 다른 어떤 관할권도 명시적으로 포기합니다.

      10. 부분적 무효
      어떤 조항이 무효 또는 무효력으로 선언되더라도 나머지 조항은 완전히 유효하게 남습니다.

      11. 이탈리아 민법 제1341조 및 제1342조에 따른 명시적 동의
      사용자는 특히 다음 조항을 읽고 승인하였음을 선언합니다: 책임 면제(제4조), 면책 의무(제5조), 보증 한계(제7조), 관할 법원(제9조).

      필수 수락 확인
      "동의함"을 누르거나 앱을 시청 후 10초 이내에 계속 사용하는 경우, 사용자는 위에 명시된 모든 약관을 수락함을 확인하는 것입니다.`,

    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 맨 아래로 스크롤하면 수락 버튼이 활성화됩니다",

    // --- Admin alerts ---
    admin_no_requests: "가입 요청 없음",
    admin_delete_btn: "삭제",
    admin_delete_btn_title: "이 계정 영구 삭제",
    admin_delete_confirm: "정말 이 계정을 영구 삭제할까요? 되돌릴 수 없어요.",
    admin_delete_error: "계정 삭제 중 오류 발생",
    admin_load_error: "요청 불러오기 오류",
  },
  pt: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: 'Fala local, chata global, anonimamente',
    login_heading: 'Entrar',
    login_username_placeholder: 'Nome de usuário',
    login_password_placeholder: 'Senha',
    login_button: 'Entrar',
    login_no_account: 'Não tem uma conta?',
    login_register_link: 'Registre-se',
    register_heading: 'Registre-se',
    register_username_placeholder: 'Nome de usuário',
    register_password_placeholder: 'Senha',
    register_language_label: 'Idioma',
    register_api_key_placeholder: 'Chave da API Gemini (opcional)',
    register_button: 'Registre-se',
    register_has_account: 'Já tem uma conta?',
    register_login_link: 'Entrar',
    register_fields_required: 'Preencha todos os campos obrigatórios',
    registration_pending: 'Registro concluído. Aguarde a aprovação do administrador.',

    // ========== Navigazione ==========
    nav_contacts: 'Contatos',
    nav_chats: 'Chat',
    nav_profile: 'Perfil',
    nav_translate: 'Traduzir',

    // ========== Banner offline ==========
    offline_banner: '⚠️ Offline - Aguardando conexão...',

    // ========== Contatti ==========
    contacts_title: 'Contatos',
    add_contact_btn: '+ Adicionar',
    requests_in: 'Solicitações recebidas',
    requests_out: 'Solicitações enviadas',
    no_contacts: 'Nenhum contato',
    pending_badge: 'Pendente',
    role_keyholder: 'Key-holder',
    role_guest: 'Guest',
    btn_accept: 'Aceitar',
    btn_remove: 'Remover',
    contacts_manage_btn: 'Contatos',
    new_chat_btn: 'Nova conversa',
    new_chat_modal_title: 'Nova conversa',
    contacts_modal_title: 'Contatos',
    confirm_delete_contact_message: 'Remover {name} dos contatos?',
    confirm_delete_contact_msg: 'Deseja remover o contato "{name}"?',
    contact_online: '● Online',
    contact_offline: '● Offline',
    add_contacts_title: 'Adicionar contatos',
    btn_cancel: 'Cancelar',
    btn_send_requests: 'Enviar solicitações',
    select_at_least_one: 'Selecione pelo menos um usuário',
    search_contacts_placeholder: 'Buscar contatos...',

    // --- Modale aggiungi contatto ---
    modal_title: 'Adicionar contato',
    search_placeholder: 'Buscar nome de usuário...',
    btn_add: 'Adicionar',
    btn_close: 'Fechar',

    // ========== Chat ==========
    back_btn: '← Voltar',
    clear_chat_btn: 'Limpar chat',
    typing_indicator: 'está digitando...',
    expiry_label: '⏳ Autodestruição:',
    expiry_options: [
      { value: '0', text: 'Sem expiração' },
      { value: '0.002777', text: '10 segundos' },
      { value: '0.0166667', text: '1 minuto' },
      { value: '0.0833333', text: '5 minutos' },
      { value: '1', text: '1 hora' },
      { value: '6', text: '6 horas' },
      { value: '12', text: '12 horas' },
      { value: '24', text: '24 horas' },
      { value: '168', text: '7 dias' },
    ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> Falar',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> Ditar',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> Escutando',
    record_btn_release: '⏹ LIBERAR',
    text_input_placeholder: 'Escreva',
    send_text_btn: 'Enviar texto',
    send_text_sending: 'Enviando...',
    message_sent_confirm: 'Nova mensagem de {name}\n\n{text}\n\nAbrir chat?',
    voice_note_confirm: 'Nova nota de voz de {name}\n\nAbrir chat?',
    confirm_image_message: 'Nova imagem de {name}\n\nAbrir chat?',
    confirm_video_message: 'Novo vídeo de {name}\n\nAbrir chat?',
    local_notification_voice_note: '🎵 Nota de voz',
    local_notification_image: '🖼️ Imagem',
    local_notification_video: '🎬 Vídeo',
    voice_note_sent: '🎵 Nota de voz enviada',
    voice_note_listen: '▶️ Ouvir nota de voz',
    no_messages: 'Nenhuma mensagem',
    load_error: 'Erro ao carregar mensagens',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 Ghost',
    individual_chat: '💬 Chat individual',
    group_chat: '👥 Chat em grupo',
    search_chats_placeholder: 'Buscar chats...',
    btn_delete: 'Excluir',
    confirm_delete_chat_msg: 'Deseja encerrar a conversa com "{name}"?',
    confirm_delete_message: 'Deseja apagar esta mensagem? Ela também desaparecerá do chat do destinatário.',

    // --- Gruppi ---
    group_chat_modal_title: 'Criar chat em grupo',
    group_chat_modal_subtitle: 'Selecione os contatos online',
    group_create_btn: 'Criar grupo',
    group_leave_btn: 'Sair',
    group_invite_title: 'Convite de grupo',
    group_invite_accept: 'Entrar',
    group_invite_decline: 'Recusar',
    group_user_joined: 'entrou no grupo',
    group_user_left: 'saiu do grupo',
    group_error_no_contacts_online: 'Nenhum contato online',
    group_error_select_contact: 'Selecione pelo menos um contato',
    group_error_creation_failed: 'Falha ao criar grupo',
    group_notification_created: 'Grupo criado',
    new_contact_request: 'Nova solicitação de contato de {{name}}',
    group_chat_title: 'Grupo ({{count}})',
    group_reconnected: 'reconectou',
    group_timeout_suffix: ' (timeout)',
    group_empty: 'Você ficou sozinho no grupo.',
    group_chat_btn: '👥 Grupo',
    send_btn: 'Enviar',

    // ========== Profilo ==========
    profile_avatar_upload: 'Carregar foto de perfil',
    profile_avatar_remove: 'Remover',
    profile_username_label: 'Nome de usuário',
    profile_language_label: 'Idioma',
    profile_api_key_label: 'Chave da API Gemini',
    profile_api_key_placeholder: 'Deixe em branco para remover',
    profile_api_key_hint: 'Insira uma nova chave para se tornar key-holder',
    profile_voice_label: 'Voz TTS preferida',
    profile_expiry_label: '⏳ Autodestruição global',
    profile_expiry_hint: 'Novas mensagens herdarão esta duração (pode ser alterada por chat)',
    profile_regenerate_keys: 'Regenerar chaves E2E',
    profile_regenerate_keys_hint:
      'Atenção: as mensagens criptografadas anteriores ficarão ilegíveis.',
    profile_logout: 'Sair',
    profile_delete_account: 'Excluir conta',
    profile_save: 'Salvar alterações',
    profile_password_label: 'Senha',
    profile_change_password_btn: 'Alterar',
    change_password_title: 'Alterar senha',
    current_password_placeholder: 'Senha atual',
    new_password_placeholder: 'Nova senha',
    confirm_password_placeholder: 'Confirmar nova senha',
    profile_saved: 'Configurações salvas',
    profile_error: 'Erro',
    profile_ui_language_label: 'Idioma da interface',
    profile_theme_label: 'Tema de cor',
    theme_red: 'Vermelho intenso',
    theme_blue: 'Azul oceano',
    theme_green: 'Verde floresta',
    theme_purple: 'Roxo real',
    profile_ephemeral_default: '👻 Ghost padrão',
    profile_beep_label: 'Início da gravação de áudio',

    // --- Chiavi API ---
    profile_api_keys_label: 'Chaves de API',
    manage_api_keys_btn: 'Gerenciar chaves de API',
    profile_api_keys_hint: 'Adicione ou remova chaves Gemini.',
    api_keys_modal_title: 'Suas chaves de API',
    new_api_key_placeholder: 'Cole uma nova chave de API',
    add_api_key_btn: 'Adicionar',
    no_api_keys: 'Nenhuma chave de API salva',
    confirm_delete_api_key: 'Excluir esta chave?',

    // ========== Errori e avvisi ==========
    error_network: 'Não foi possível conectar ao servidor',
    error_session_expired: 'Sessão expirada',
    error_login_failed: 'Erro ao fazer login',
    error_register_failed: 'Erro ao se registrar',
    error_contact_load: 'Erro ao carregar contatos',
    error_profile_load: 'Não foi possível carregar o perfil',
    error_send_failed: 'Falha no envio. Tente novamente.',
    error_send_text_failed: 'Falha ao enviar texto. Tente novamente em instantes.',
    error_dictation_blocked:
      'Reconhecimento de voz não suportado neste navegador.\nNavegadores recomendados: Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (com flag ativado).',
    error_dictation_mic: 'Permissão do microfone negada para ditado.',
    error_dictation_generic: 'Erro durante o ditado: {error}',
    error_recording_unsupported: 'Gravação não suportada',
    error_mic_access: 'Não foi possível acessar o microfone para a nota de voz',
    error_voice_note_e2e:
      'Não foi possível enviar a nota de voz: o destinatário não configurou a criptografia E2E. Peça para ele abrir o perfil.',
    error_private_key_missing: 'Chave privada ausente. Regenere as chaves E2E no perfil.',
    error_voice_note_send_failed: 'Falha ao enviar nota de voz',
    error_text_e2e_required:
      'Não foi possível enviar a mensagem: o destinatário não configurou a criptografia E2E. Peça para ele abrir o perfil.',
    error_decryption_failed: 'Falha na decifração do áudio',
    error_no_audio_data: 'Dados de áudio não disponíveis.',
    error_audio_decrypt: 'Falha ao decifrar o áudio',
    error_ephemeral_message: 'Erro na mensagem efêmera',
    error_voice_note_network: 'Erro de rede ao enviar a nota de voz',
    error_send_retry: 'Envio falhou. Toque para tentar novamente.',
    error_audio_data_unavailable: 'Dados de áudio indisponíveis.',
    error_delete_account: 'Erro ao excluir a conta',
    error_generic: 'Erro',
    error_key_regeneration: 'Erro ao regenerar as chaves.',
    ephemeral_language_error: 'O modo efêmero requer o mesmo idioma.',
    ephemeral_offline_error:
      'O destinatário está offline. As mensagens efêmeras não podem ser entregues.',
    confirm_delete_contact: 'Remover este contato?',
    confirm_delete_account:
      'Tem certeza de que deseja excluir permanentemente sua conta? Esta ação é irreversível.',
    confirm_regenerate_keys:
      'Regenerar as chaves E2E? As mensagens criptografadas anteriores ficarão ilegíveis.',
    keys_regenerated: 'Novas chaves geradas com sucesso.',
    account_deleted: 'Conta excluída com sucesso',
    avatar_upload_error: 'Erro ao carregar a imagem',
    no_chats: 'Nenhum chat ativo',
    error_loading_chats: 'Erro ao carregar os chats',
    error_guest_diff_language: "Para conversar com usuários de idioma diferente, é necessária uma chave de API. Registre uma chave de API na página de perfil.",
    error_guest_group_multilingual: "Usuários convidados só podem criar grupos com pessoas do mesmo idioma. Para grupos multilíngues, é preciso uma chave de API.",  
    warning_keyholder_add_guest_diff_language: "O contato que você está adicionando tem uma conta de convidado e o idioma dele é diferente do seu. Todas as conversas entre vocês serão traduzidas usando suas chaves de API do Gemini.",
    alert_fill_all_fields: 'Preencha todos os campos obrigatórios',
    error_missing_public_key: 'Chave pública ausente para {memberId}',
    error_cannot_get_public_key: 'Não foi possível recuperar a chave pública de {memberId}',

    // ========== Notifiche push ==========
    push_new_message: 'Nova mensagem de {name}',
    push_voice_note: 'Nota de voz de {name}',
    push_body: '🎵 Nota de voz',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'Sua impressão digital E2E:',
    speaker_title: 'Ouvir',
    media_upload_title: 'Enviar foto ou vídeo',
    media_expiry_default_warning: 'Conteúdos multimídia enviados sem um temporizador de autodestruição serão apagados automaticamente após 7 dias.',
    lightbox_image_alt: 'Imagem',
    lightbox_video_alt: 'Vídeo',
    translate_show_original: 'Mostrar original',
    translating_placeholder: 'Traduzindo…',
    error_translation_failed: 'Falha na tradução',
    error_translation_api_key: 'Adicione uma chave de API para traduzir',
    translate_title: "Tradutor",
    encrypted_message: '🔒 Mensagem criptografada',

    // --- Amministrazione ---
    admin_requests_title: "Solicitações de registro",
    admin_requests_btn: "Gerenciar solicitações",
    admin_note_placeholder: "Nota (máx. 30 caracteres)",
    admin_account_active: "Ativo",
    admin_account_inactive: "Pendente",
    admin_toggle_activate: "Ativar conta",
    admin_toggle_deactivate: "Desativar conta",
    admin_back_to_profile: "← Voltar ao perfil",

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "Ative o modo Ghost: as mensagens enviadas não são salvas no servidor e desaparecem quando você sai do chat. Funciona apenas se o destinatário também estiver com o chat aberto.",
    tour_chat_selfdestruct: "Cada mensagem pode ter um temporizador de autodestruição. A contagem regressiva começa quando o destinatário a visualiza. Ao expirar, a mensagem é apagada para todos.",
    tour_chat_dictate: "Toque rápido: inicia a digitação por voz; um segundo toque interrompe e envia o texto. Mantenha pressionado: grava uma mensagem de voz; ao soltar, ela é enviada. Aguarde o sinal sonoro antes de falar.",
    tour_chat_sent: "Mantenha pressionada uma mensagem sua para apagá-la.",
    tour_chat_received: "Mantenha pressionada uma mensagem recebida para adicionar uma reação emoji.",
    tour_chat_speaker: "Toque no ícone do alto-falante abaixo da mensagem para ouvi-la em voz alta.",
    tour_chat_clear: "Apague as mensagens na sua interface de chat, mas não na do seu interlocutor.",
    tour_group_ghost: "O chat em grupo está sempre no modo Ghost: a conversa e todas as mensagens são apagadas quando você sai do chat.",
    tour_contacts_fab: "Toque para adicionar um novo contato.",
    tour_contacts_delete: "Mantenha pressionado um contato para excluí-lo. Você precisará confirmar a exclusão.",
    tour_chatslist_fab: "Toque para criar um novo chat individual ou em grupo. Todos os chats em grupo estão sempre no modo Ghost: as mensagens não são salvas e funcionam apenas quando pelo menos dois participantes têm o chat aberto ao mesmo tempo.",
    tour_chatslist_delete: "Mantenha pressionado o banner de um chat para excluí-lo. Você precisará confirmar a exclusão.",
    tour_profile_recording: "Escolha o som que avisa quando a gravação de uma mensagem de voz realmente começou.",
    tour_profile_api: "Para conversar com pessoas que falam outro idioma, você precisa de pelo menos uma chave de API Gemini. Se tiver uma conta Google, pode registrar uma ou mais chaves, inclusive gratuitas, em 3 passos:<br>1) Acesse <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a><br>2) Clique em 'Criar chave de API' no canto inferior esquerdo<br>3) Cole aqui.<br>Se tiver mais de uma, o sistema usará a primeira até atingir o limite diário e, em seguida, passará automaticamente para a próxima.<br>Alternativamente, vocês podem conversar sem uma chave de API se falarem um idioma comum. Ambos devem configurá-lo na página de Perfil, mas lembrem-se de mudá-lo novamente quando voltarem a conversar com pessoas do seu próprio idioma.",
    tour_profile_e2e: "Gere novas chaves de criptografia para suas mensagens. Atenção: após a regeneração, você não poderá mais ler as mensagens antigas.",
    tour_translate_howto: "Pensado para conversas cara a cara com quem não fala seu idioma. Escolha os dois idiomas. Pressione o botão Falar no seu idioma uma vez, fale e pressione-o novamente. A tradução aparecerá e uma voz a lerá no idioma da outra pessoa. O interlocutor responde com o botão do idioma dele.",
    tour_translate_original: "Ative para ver também o texto no idioma de quem falou, assim você pode verificar se a mensagem foi transmitida corretamente. Consome mais recursos da sua chave de API: você poderá traduzir menos mensagens por dia.",
    tour_translate_limits: "O uso do tradutor está sujeito aos limites diários das suas chaves de API do Gemini.",

    // --- UI del tour ---
    tour_next: "Avançar",
    tour_skip: "Pular",
    tour_finish: "Concluir",
    profile_tour_label: "Informações do tour",  
    profile_tour_button: "Reiniciar tour",  

    // --- Legal Form ---
    terms_title: "Condições de Utilização",
    terms_accept_label: "Declaro ter lido e aceite as condições",
    terms_confirm_btn: "Aceitar e registar",
    terms_text: `DOCUMENTO – CONDIÇÕES DE UTILIZAÇÃO DO SERVIÇO GHOST CHAT

      Preâmbulo
      O presente serviço (a PWA “Ghost Chat”) é fornecido exclusivamente como plataforma técnica de mensagens anónimas entre utilizadores. O titular/administrador do servidor (o “Fornecedor”) não tem qualquer controlo sobre os conteúdos trocados, as identidades declaradas ou as condutas dos utilizadores. A utilização da App é proibida a quem não aceitar integralmente as seguintes condições.

      1. Aceitação e obrigação de leitura
      Ao aceder ou utilizar a App, o utilizador declara ter lido, compreendido e aceitado incondicionalmente todas as cláusulas do presente documento. A aceitação é um pré-requisito obrigatório para a utilização do serviço.

      2. Utilização lícita e proibições absolutas
      O utilizador compromete-se a utilizar a App apenas para fins lícitos, civis e em conformidade com a lei italiana e europeia, bem como com as leis do seu país de residência. É expressamente proibido:
      - difundir material pedopornográfico, violento, discriminatório, difamatório, injurioso ou que incite ao ódio;
      - planear, promover ou cometer crimes de qualquer natureza (ex.: terrorismo, stalking, fraudes, extorsão, tráfico de drogas, violência privada);
      - violar direitos alheios (privacidade, propriedade intelectual, segredo profissional);
      - utilizar a App para atividades de phishing, malware, spam ou ataques informáticos;
      - contornar os sistemas de denúncia ou anonimato para prejudicar terceiros.

      3. Anonimato técnico e ausência de dados identificativos
      O serviço não exige nem recolhe quaisquer dados pessoais (nome, email, telefone, endereço IP permanente) no momento do registo. O servidor não conserva registos de ligação nem endereços IP dos utilizadores, exceto pelo tempo estritamente necessário à transmissão das mensagens (e, em qualquer caso, nunca além da sessão).
      Assim, mesmo em caso de ordem judicial, o Fornecedor não é capaz de fornecer qualquer informação identificativa sobre os utilizadores, nem de determinar a sua identidade real.
      O único dado associado a uma conta é o nome de utilizador escolhido pelo utilizador, o que não permite identificar uma pessoa singular.

      4. Exclusão total de responsabilidade do Fornecedor por usos ilícitos
      O Fornecedor não é, de forma alguma, responsável – civil, penal ou administrativamente – por:
      - conteúdos, conversas, ficheiros ou ações dos utilizadores;
      - a utilização que terceiros façam das mensagens recebidas;
      - eventuais crimes cometidos através da App, sendo a plataforma uma ferramenta passiva e neutra de transmissão de dados (nos termos do artigo 14.º do D.Lgs. 70/2003 e da Diretiva UE 2000/31/CE).
      O utilizador assume todos os riscos decorrentes da utilização do serviço.

      5. Obrigação de indemnização (hold harmless)
      O utilizador compromete-se a indemnizar, manter indemne e defender o Fornecedor de qualquer reclamação, ação judicial, multa, sanção, despesa legal ou compensação decorrente de:
      - violações das presentes condições por parte do utilizador;
      - usos ilegais ou não autorizados da App atribuíveis à sua conta/sessão;
      - controvérsias entre utilizadores ou com terceiros originadas pela utilização da App.
      Em caso de condenação do Fornecedor por ato imputável ao utilizador, este é obrigado a reembolsar integralmente o Fornecedor do montante pago, incluindo honorários advocatícios.

      6. Cooperação com as autoridades e limites técnicos
      O Fornecedor declara a sua total disponibilidade para cooperar com as autoridades judiciais ou policiais, no respeito das leis aplicáveis, a fim de combater eventuais usos ilícitos do serviço.
      No entanto, o utilizador toma conhecimento e aceita que:
      - o serviço foi concebido para não recolher nem conservar endereços IP ou outros dados identificativos dos utilizadores;
      - o Fornecedor não tem acesso visual aos conteúdos das conversas privadas nem capacidade técnica para os extrair;
      - eventuais registos técnicos (como timestamps, metadados de ligação ou vestígios de sistema) podem existir exclusivamente junto do gestor da infraestrutura do servidor (fornecedor de alojamento) e não estão diretamente disponíveis para o Fornecedor;
      - o Fornecedor não é capaz de fornecer dados que não possui ou que são tecnicamente inacessíveis, nem de contornar as suas próprias medidas de anonimato e encriptação.
      Em caso de pedido formal por parte de uma autoridade, o Fornecedor compromete-se a:
      - suspender ou cancelar imediatamente a conta do utilizador indicado, se tecnicamente possível;
      - fornecer à autoridade todas as informações em sua posse (mesmo que mínimas ou não identificativas);
      - indicar à autoridade os contactos do gestor do servidor, para que esta possa solicitar diretamente a este eventuais registos técnicos não disponíveis para o Fornecedor.
      O utilizador reconhece que, devido à própria natureza do serviço, a cooperação do Fornecedor é limitada pela sua objetiva impossibilidade técnica de recolher ou entregar dados que nunca possuiu. Nenhuma disposição do presente contrato pode ser interpretada como uma obrigação do Fornecedor de fornecer provas ou identificadores que a lei não lhe exija deter.

      7. Limites de garantia e disponibilidade
      O serviço é fornecido “como está”, sem garantias de continuidade, ausência de erros ou segurança absoluta. O Fornecedor não garante a ausência de interceções por parte de terceiros ou de vulnerabilidades técnicas.

      8. Duração, modificação e revogação
      O Fornecedor pode modificar as presentes condições a qualquer momento, notificando através da App. A utilização continuada do serviço após a modificação constitui aceitação. O utilizador pode interromper a utilização a qualquer momento. O Fornecedor pode revogar o acesso sem aviso prévio em caso de violação.

      9. Foro competente e lei aplicável
      O presente contrato é regido pela lei italiana. Para qualquer controvérsia relativa ao serviço ou a estas condições, o foro exclusivo é o do local de residência do Fornecedor (ou, à sua escolha, o de Milão/Roma). O utilizador renuncia expressamente a qualquer outra jurisdição.

      10. Nulidade parcial
      Se alguma cláusula for declarada nula ou ineficaz, as restantes permanecem plenamente válidas.

      11. Consentimento expresso nos termos dos artigos 1341.º e 1342.º do Código Civil italiano
      O utilizador declara ter lido e aprovado especificamente as cláusulas relativas a: exclusão de responsabilidade (art. 4.º), obrigação de indemnização (art. 5.º), limites de garantia (art. 7.º), foro competente (art. 9.º).

      Confirmação de aceitação obrigatória
      Ao premir “Aceito” ou continuar a utilizar a App após 10 segundos da visualização, o utilizador confirma que aceita todas as condições acima mencionadas.`,

    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 Role até o fim para ativar a aceitação",

    // --- Admin alerts ---
    admin_no_requests: "Nenhuma solicitação de registro",
    admin_delete_btn: "Excluir",
    admin_delete_btn_title: "Excluir esta conta permanentemente",
    admin_delete_confirm: "Tem certeza que quer excluir esta conta permanentemente? Essa ação não pode ser desfeita.",
    admin_delete_error: "Erro ao excluir a conta",
    admin_load_error: "Erro ao carregar solicitações",
  },
  nl: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: 'Talk local, chat global, anonymously',
    login_heading: 'Inloggen',
    login_username_placeholder: 'Gebruikersnaam',
    login_password_placeholder: 'Wachtwoord',
    login_button: 'Inloggen',
    login_no_account: 'Heb je geen account?',
    login_register_link: 'Registreren',
    register_heading: 'Registreren',
    register_username_placeholder: 'Gebruikersnaam',
    register_password_placeholder: 'Wachtwoord',
    register_language_label: 'Taal',
    register_api_key_placeholder: 'Gemini API-sleutel (optioneel)',
    register_button: 'Registreren',
    register_has_account: 'Heb je al een account?',
    register_login_link: 'Inloggen',
    register_fields_required: 'Vul alle verplichte velden in',
    registration_pending: 'Registratie voltooid. Wacht op goedkeuring door de beheerder.',

    // ========== Navigazione ==========
    nav_contacts: 'Contacten',
    nav_chats: 'Chat',
    nav_profile: 'Profiel',
    nav_translate: 'Vertalen',

    // ========== Banner offline ==========
    offline_banner: '⚠️ Offline - Wachten op verbinding...',

    // ========== Contatti ==========
    contacts_title: 'Contacten',
    add_contact_btn: '+ Toevoegen',
    requests_in: 'Inkomende verzoeken',
    requests_out: 'Uitgaande verzoeken',
    no_contacts: 'Geen contacten',
    pending_badge: 'In afwachting',
    role_keyholder: 'Sleutelhouder',
    role_guest: 'Gast',
    btn_accept: 'Accepteren',
    btn_remove: 'Verwijderen',
    contacts_manage_btn: '',
    new_chat_btn: '',
    new_chat_modal_title: '',
    contacts_modal_title: '',
    confirm_delete_contact_message: '',
    confirm_delete_contact_msg: 'Wil je het contact "{name}" verwijderen?',
    contact_online: '● Online',
    contact_offline: '● Offline',
    add_contacts_title: 'Contacten toevoegen',
    btn_cancel: 'Annuleren',
    btn_send_requests: 'Verzoeken versturen',
    select_at_least_one: 'Selecteer minstens één gebruiker',
    search_contacts_placeholder: 'Contacten zoeken...',

    // --- Modale aggiungi contatto ---
    modal_title: 'Contact toevoegen',
    search_placeholder: 'Zoek gebruikersnaam...',
    btn_add: 'Toevoegen',
    btn_close: 'Sluiten',

    // ========== Chat ==========
    back_btn: '← Terug',
    clear_chat_btn: 'Chat wissen',
    typing_indicator: 'is aan het typen...',
    expiry_label: '⏳ Zelfvernietiging:',
    expiry_options: [
      { value: '0', text: 'Geen vervaldatum' },
      { value: '0.002777', text: '10 seconden' },
      { value: '0.0166667', text: '1 minuut' },
      { value: '0.0833333', text: '5 minuten' },
      { value: '1', text: '1 uur' },
      { value: '6', text: '6 uur' },
      { value: '12', text: '12 uur' },
      { value: '24', text: '24 uur' },
      { value: '168', text: '7 dagen' },
    ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> Spreken',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> Dicteren',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> Luisteren',
    record_btn_release: '⏹ LOSLATEN',
    text_input_placeholder: 'Schrijf',
    send_text_btn: 'Tekst verzenden',
    send_text_sending: 'Verzenden...',
    message_sent_confirm: 'Nieuw bericht van {name}\n\n{text}\n\nChat openen?',
    voice_note_confirm: 'Nieuwe spraaknotitie van {name}\n\nChat openen?',
    confirm_image_message: 'Nieuwe afbeelding van {name}\n\nChat openen?',
    confirm_video_message: 'Nieuwe video van {name}\n\nChat openen?',
    local_notification_voice_note: '🎵 Spraakbericht',
    local_notification_image: '🖼️ Afbeelding',
    local_notification_video: '🎬 Video',
    voice_note_sent: '🎵 Spraaknotitie verzonden',
    voice_note_listen: '▶️ Spraaknotitie beluisteren',
    no_messages: 'Geen berichten',
    load_error: 'Fout bij laden berichten',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 Ghost',
    individual_chat: '💬 Individuele chat',
    group_chat: '👥 Groepschat',
    search_chats_placeholder: 'Chats zoeken...',
    btn_delete: 'Verwijderen',
    confirm_delete_chat_msg: 'Wil je de chat met "{name}" sluiten?',
    confirm_delete_message: 'Wil je dit bericht verwijderen? Het verdwijnt ook uit de chat van de ontvanger.',

    // --- Gruppi ---
    group_chat_modal_title: 'Groepschat aanmaken',
    group_chat_modal_subtitle: 'Selecteer online contacten',
    group_create_btn: 'Groep aanmaken',
    group_leave_btn: 'Verlaten',
    group_invite_title: 'Groepsuitnodiging',
    group_invite_accept: 'Deelnemen',
    group_invite_decline: 'Weigeren',
    group_user_joined: 'is de groep binnengekomen',
    group_user_left: 'heeft de groep verlaten',
    group_error_no_contacts_online: 'Geen online contacten',
    group_error_select_contact: 'Selecteer minstens één contact',
    group_error_creation_failed: 'Aanmaken van groep mislukt',
    group_notification_created: 'Groep aangemaakt',
    new_contact_request: 'Nieuw contactverzoek van {{name}}',
    group_chat_title: 'Groep ({{count}})',
    group_reconnected: 'is opnieuw binnengekomen',
    group_timeout_suffix: ' (timeout)',
    group_empty: 'Je bent alleen over in de groep.',
    group_chat_btn: '👥 Groep',
    send_btn: 'Verstuur',

    // ========== Profilo ==========
    profile_avatar_upload: 'Profielfoto uploaden',
    profile_avatar_remove: 'Verwijderen',
    profile_username_label: 'Gebruikersnaam',
    profile_language_label: 'Taal',
    profile_api_key_label: 'Gemini API-sleutel',
    profile_api_key_placeholder: 'Laat leeg om te verwijderen',
    profile_api_key_hint: 'Voer een nieuwe sleutel in om sleutelhouder te worden',
    profile_voice_label: 'TTS-stemvoorkeur',
    profile_expiry_label: '⏳ Algemene zelfvernietiging',
    profile_expiry_hint: 'Nieuwe berichten erven deze duur (aanpasbaar per chat)',
    profile_regenerate_keys: 'E2E-sleutels opnieuw genereren',
    profile_regenerate_keys_hint: 'Let op: eerder versleutelde berichten worden onleesbaar.',
    profile_logout: 'Uitloggen',
    profile_delete_account: 'Account verwijderen',
    profile_save: 'Wijzigingen opslaan',
    profile_password_label: 'Wachtwoord',
    profile_change_password_btn: 'Wijzigen',
    change_password_title: 'Wachtwoord wijzigen',
    current_password_placeholder: 'Huidig wachtwoord',
    new_password_placeholder: 'Nieuw wachtwoord',
    confirm_password_placeholder: 'Nieuw wachtwoord bevestigen',
    profile_saved: 'Instellingen opgeslagen',
    profile_error: 'Fout',
    profile_ui_language_label: 'Interfacetaal',
    profile_theme_label: 'Kleurenthema',
    theme_red: 'Intens rood',
    theme_blue: 'Oceaanblauw',
    theme_green: 'Bosgroen',
    theme_purple: 'Koninklijk paars',
    profile_ephemeral_default: '👻 Standaard ghost',
    profile_beep_label: 'Start opnamegeluid',

    // --- Chiavi API ---
    profile_api_keys_label: 'API-sleutels',
    manage_api_keys_btn: 'API-sleutels beheren',
    profile_api_keys_hint: 'Voeg Gemini-sleutels toe of verwijder ze.',
    api_keys_modal_title: 'Jouw API-sleutels',
    new_api_key_placeholder: 'Plak een nieuwe API-sleutel',
    add_api_key_btn: 'Toevoegen',
    no_api_keys: 'Geen API-sleutels opgeslagen',
    confirm_delete_api_key: 'Deze sleutel verwijderen?',

    // ========== Errori e avvisi ==========
    error_network: 'Kan geen verbinding maken met de server',
    error_session_expired: 'Sessie verlopen',
    error_login_failed: 'Inloggen mislukt',
    error_register_failed: 'Registratie mislukt',
    error_contact_load: 'Fout bij laden contacten',
    error_profile_load: 'Profiel kan niet worden geladen',
    error_send_failed: 'Verzenden mislukt. Probeer opnieuw.',
    error_send_text_failed: 'Tekst verzenden mislukt. Probeer het over een ogenblik opnieuw.',
    error_dictation_blocked: 'Spraakherkenning wordt niet ondersteund in deze browser.\nAanbevolen browsers: Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (met ingeschakelde vlag).',
    error_dictation_mic: 'Microfoontoegang geweigerd voor dicteren.',
    error_dictation_generic: 'Fout tijdens dicteren: {error}',
    error_recording_unsupported: 'Opname niet ondersteund',
    error_mic_access: 'Geen toegang tot microfoon voor spraaknotitie',
    error_voice_note_e2e: 'Kan spraaknotitie niet verzenden: ontvanger heeft E2E-encryptie niet ingesteld. Vraag hem/haar het profiel te openen.',
    error_private_key_missing: 'Privésleutel ontbreekt. Genereer E2E-sleutels opnieuw via het profiel.',
    error_voice_note_send_failed: 'Verzenden spraaknotitie mislukt',
    error_text_e2e_required: 'Kan bericht niet verzenden: ontvanger heeft E2E-encryptie niet ingesteld. Vraag hem/haar het profiel te openen.',
    error_decryption_failed: 'Ontsleuteling van audio mislukt',
    error_no_audio_data: 'Geen audiogegevens beschikbaar.',
    error_audio_decrypt: 'Ontsleuteling van audio mislukt',
    error_ephemeral_message: 'Fout bij efemeer bericht',
    error_voice_note_network: 'Netwerkfout bij verzenden spraaknotitie',
    error_send_retry: 'Verzenden mislukt. Tik om opnieuw te proberen.',
    error_audio_data_unavailable: 'Audiogegevens niet beschikbaar.',
    error_delete_account: 'Fout bij verwijderen account',
    error_generic: 'Fout',
    error_key_regeneration: 'Fout bij opnieuw genereren van sleutels.',
    ephemeral_language_error: 'De efemere modus vereist dezelfde taal.',
    ephemeral_offline_error: 'De ontvanger is offline. Efemere berichten kunnen niet worden afgeleverd.',
    confirm_delete_contact: 'Deze contactpersoon verwijderen?',
    confirm_delete_account: 'Weet je zeker dat je je account permanent wilt verwijderen? Dit kan niet ongedaan worden gemaakt.',
    confirm_regenerate_keys: 'E2E-sleutels opnieuw genereren? Eerder versleutelde berichten worden onleesbaar.',
    keys_regenerated: 'Nieuwe sleutels succesvol gegenereerd.',
    account_deleted: 'Account succesvol verwijderd',
    avatar_upload_error: 'Fout bij uploaden afbeelding',
    no_chats: 'Geen actieve chats',
    error_loading_chats: 'Fout bij het laden van chats',
    error_guest_diff_language: "Om te chatten met gebruikers die een andere taal spreken, is een API-sleutel vereist. Registreer een API-sleutel op de profielpagina.", 
    error_guest_group_multilingual: "Gastgebruikers kunnen alleen groepen maken met mensen die dezelfde taal spreken. Voor meertalige groepen heb je een API-sleutel nodig.",  
    warning_keyholder_add_guest_diff_language: "Het contact dat je toevoegt heeft een gastaccount en spreekt een andere taal dan jij. Al jullie chats worden vertaald met jouw Gemini API-sleutels.",  
    alert_fill_all_fields: 'Vul alle verplichte velden in',
    error_missing_public_key: 'Openbare sleutel ontbreekt voor {memberId}',
    error_cannot_get_public_key: 'Kan openbare sleutel van {memberId} niet ophalen',

    // ========== Notifiche push ==========
    push_new_message: 'Nieuw bericht van {name}',
    push_voice_note: 'Spraaknotitie van {name}',
    push_body: '🎵 Spraaknotitie',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'Jouw E2E-vingerafdruk:',
    speaker_title: 'Luisteren',
    media_upload_title: 'Foto of video verzenden',
    media_expiry_default_warning: 'Media die zonder zelfvernietigingstimer worden verzonden, worden automatisch na 7 dagen verwijderd.',
    lightbox_image_alt: 'Afbeelding',
    lightbox_video_alt: 'Video',
    translate_show_original: 'Toon origineel',
    translating_placeholder: 'Vertalen…',
    error_translation_failed: 'Vertaling mislukt',
    error_translation_api_key: 'Voeg een API-sleutel toe om te vertalen',
    translate_title: 'Vertaler',
    encrypted_message: '🔒 Versleuteld bericht',

    // --- Amministrazione ---
    admin_requests_title: 'Registratieverzoeken',
    admin_requests_btn: 'Verzoeken beheren',
    admin_note_placeholder: 'Notitie (max 30 tekens)',
    admin_account_active: 'Actief',
    admin_account_inactive: 'In afwachting',
    admin_toggle_activate: 'Account activeren',
    admin_toggle_deactivate: 'Account deactiveren',
    admin_back_to_profile: '← Terug naar profiel',

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "Zet de Ghost-modus aan: verzonden berichten worden niet op de server bewaard en verdwijnen zodra je de chat verlaat. Werkt alleen als de ontvanger de chat ook open heeft staan.",
    tour_chat_selfdestruct: 'Elk bericht kan een zelfvernietigingstimer hebben. De timer start zodra de ontvanger het bericht bekijkt. Na afloop wordt het bericht voor iedereen gewist.',
    tour_chat_dictate: 'Korte tik: start spraakdicteren; nog een tik stopt het en verstuurt de tekst. Houd ingedrukt: neem een spraakbericht op; laat los om te versturen. Wacht op de piep voordat je begint te spreken.',
    tour_chat_sent: 'Houd je eigen bericht ingedrukt om het te verwijderen.',
    tour_chat_received: 'Houd een ontvangen bericht ingedrukt om een emoji-reactie toe te voegen.',
    tour_chat_speaker: 'Tik op het luidsprekerpictogram onder het bericht om het te laten voorlezen.',
    tour_chat_clear: "Wis de berichten in jouw chatinterface, maar niet in die van je gesprekspartner.",
    tour_group_ghost: 'Groepschats zijn altijd in Ghost-modus: het gesprek en alle berichten worden gewist zodra je de chat verlaat.',
    tour_contacts_fab: 'Tik om een nieuw contact toe te voegen.',
    tour_contacts_delete: 'Houd een contact ingedrukt om het te verwijderen. Je moet de verwijdering bevestigen.',
    tour_chatslist_fab: "Tik om een nieuw gesprek (een-op-een of groep) te starten. Alle groepschats staan altijd in Ghost-modus: berichten worden niet opgeslagen en werken alleen als er minstens twee deelnemers de chat op dat moment open hebben.",
    tour_chatslist_delete: 'Houd de banner van een chat ingedrukt om deze te verwijderen. Je moet de verwijdering bevestigen.',
    tour_profile_recording: 'Kies het geluid dat je waarschuwt wanneer de opname van een spraakbericht daadwerkelijk is gestart.',
    tour_profile_api: "Om te chatten met mensen die een andere taal spreken, heb je minimaal één Gemini API-sleutel nodig. Heb je een Google-account? Dan kun je er gratis één of meer aanmaken in 3 stappen:<br>1) Ga naar <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a><br>2) Klik linksonder op 'API-sleutel maken'<br>3) Plak hem hier.<br>Heb je meerdere sleutels? Dan gebruikt het systeem de eerste totdat het dagelijkse limiet is bereikt, en schakelt daarna automatisch over naar de volgende.<br>Als alternatief kun je chatten zonder API-sleutel als je een gemeenschappelijke taal spreekt. Jullie moeten het beide instellen via de Profielpagina, maar vergeet niet om het opnieuw te wijzigen wanneer je terugkeert naar het chatten met mensen die jouw eigen taal spreken.",
    tour_profile_e2e: 'Genereer nieuwe encryptiesleutels voor je berichten. Let op: na het opnieuw genereren kun je oude berichten niet meer lezen.',
    tour_translate_howto: "Ontworpen voor face-to-facegesprekken met iemand die jouw taal niet spreekt. Kies de twee talen. Druk één keer op de knop 'Spreek' in jouw taal, spreek en druk er nogmaals op. De vertaling verschijnt en een stem leest deze voor in de taal van de ander. De gesprekspartner antwoordt met de knop in zijn of haar taal.",
    tour_translate_original: 'Schakel dit in om ook de oorspronkelijke tekst te zien in de taal van de spreker, zodat je kunt controleren of de boodschap goed is overgekomen. Dit verbruikt meer van je API-sleutel: je kunt dan minder berichten per dag vertalen.',
    tour_translate_limits: 'Het gebruik van de vertaler is gebonden aan de dagelijkse limieten van je Gemini API-sleutels.',

    // --- UI del tour ---
    tour_next: 'Volgende',
    tour_skip: 'Overslaan',
    tour_finish: 'Voltooien',
    profile_tour_label: "Tourinfo",  
    profile_tour_button: "Tour opnieuw starten", 

    // --- Legal Form ---
    terms_title: "Gebruiksvoorwaarden",
    terms_accept_label: "Ik verklaar dat ik de voorwaarden heb gelezen en aanvaard",
    terms_confirm_btn: "Accepteer en registreer",
    terms_text: `DOCUMENT – GEBRUIKSVOORWAARDEN VOOR DE DIENST VAN GHOST CHAT
      Preambule
      Deze dienst (de pwa "Ghost Chat") wordt uitsluitend aangeboden als een technisch platform voor anoniem berichtenverkeer tussen gebruikers. De eigenaar/beheerder van de server (de "Aanbieder") heeft geen enkele controle over de uitgewisselde inhoud, de opgegeven identiteiten of het gedrag van de gebruikers. Het gebruik van de App is verboden voor iedereen die de volgende voorwaarden niet volledig aanvaardt.
      1. Aanvaarding en leesplicht
      Door toegang te krijgen tot de App of deze te gebruiken, verklaart de gebruiker dat hij alle clausules van dit document heeft gelezen, begrepen en onvoorwaardelijk aanvaardt. Aanvaarding is een verplichte voorwaarde voor het gebruik van de dienst.
      2. Rechtmatig gebruik en absolute verboden
      De gebruiker verbindt zich ertoe de App uitsluitend te gebruiken voor rechtmatige, civile doeleinden die in overeenstemming zijn met de Italiaanse en Europese wetgeving, evenals met de wetten van zijn eigen land. Het is uitdrukkelijk verboden om:
      kinderpornografisch, gewelddadig, discriminerend, lasterlijk, beledigend materiaal of materiaal dat aanzet tot haat te verspreiden;
      misdrijven van welke aard ook te plannen, te promoten of te plegen (bv. terrorisme, stalking, oplichting, afpersing, drugshandel, willekeurig geweld);
      rechten van anderen te schenden (privacy, intellectuele eigendom, beroepsgeheim);
      de App te gebruiken voor phishing, malware, spam of cyberaanvallen;
      de rapportage- of anonimiseringssystemen te omzeilen om derden te schaden.
      3. Technische anonimiteit en afwezigheid van identificerende gegevens
      De dienst vraagt bij registratie geen persoonlijke gegevens (naam, e-mail, telefoon, permanent IP-adres) en verzamelt deze ook niet. De server bewaart geen verbindingslogboeken of IP-adressen van gebruikers, behalve voor de tijd die strikt nodig is voor het verzenden van berichten (en in ieder geval nooit langer dan de sessie).
      Daarom is de Aanbieder, zelfs in geval van een gerechtelijk bevel, niet in staat om identificerende informatie over gebruikers te verstrekken, noch om hun werkelijke identiteit te achterhalen.
      Het enige gegeven dat aan een account is gekoppeld, is de door de gebruiker gekozen gebruikersnaam, die het niet mogelijk maakt een natuurlijke persoon te identificeren.
      4. Volledige uitsluiting van aansprakelijkheid van de Aanbieder voor onrechtmatig gebruik
      De Aanbieder is op geen enkele wijze aansprakelijk – civiel, strafrechtelijk of bestuursrechtelijk – voor:
      de inhoud, gesprekken, bestanden of acties van gebruikers;
      het gebruik dat derden maken van ontvangen berichten;
      eventuele misdrijven die via de App worden gepleegd, aangezien het platform een passief en neutraal gegevensoverdrachtmiddel is (in de zin van art. 14 van Wetsdecreet 70/2003 en EU-Richtlijn 2000/31/EG).
      De gebruiker aanvaardt alle risico's die voortvloeien uit het gebruik van de dienst.
      5. Verplichting tot vrijwaring (schadeloosstelling)
      De gebruiker verbindt zich ertoe de Aanbieder te vrijwaren, schadeloos te stellen en te verdedigen tegen alle vorderingen, gerechtelijke stappen, boetes, sancties, juridische kosten of schadevergoedingen die voortvloeien uit:
      schendingen van deze voorwaarden door de gebruiker;
      onwettig of onbevoegd gebruik van de App dat aan zijn eigen account/sessie kan worden toegeschreven;
      geschillen tussen gebruikers of met derden die voortvloeien uit het gebruik van de App.
      In geval van een veroordeling van de Aanbieder als gevolg van een aan de gebruiker toerekenbare handeling, is de gebruiker verplicht de Aanbieder volledig te vergoeden voor het betaalde bedrag, inclusief honoraria van advocaten.
      6. Samenwerking met autoriteiten en technische beperkingen
      De Aanbieder verklaart volledig bereid te zijn om samen te werken met gerechtelijke of politiële autoriteiten, met inachtneming van de toepasselijke wetten, ter bestrijding van eventueel onrechtmatig gebruik van de dienst.
      De gebruiker neemt echter kennis en aanvaardt dat:
      de dienst is ontworpen om geen IP-adressen of andere identificerende gegevens van gebruikers te verzamelen of te bewaren;
      de Aanbieder geen visuele toegang heeft tot de inhoud van privégesprekken en ook niet over de technische capaciteit beschikt om deze te extraheren;
      eventuele technische logboeken (zoals tijdstempels, verbindingsmetadata of systeemsporen) uitsluitend kunnen bestaan bij de beheerder van de serverinfrastructuur (hostingprovider) en niet rechtstreeks ter beschikking staan van de Aanbieder;
      de Aanbieder niet in staat is gegevens te verstrekken die hij niet bezit of die technisch ontoegankelijk zijn, noch om zijn eigen anonimiteits- en versleutelingsmaatregelen te omzeilen.
      In geval van een formeel verzoek van een autoriteit verbindt de Aanbieder zich ertoe:
      het account van de aangegeven gebruiker onmiddellijk op te schorten of te verwijderen, indien technisch mogelijk;
      de autoriteit alle informatie te verstrekken waarover hij beschikt (ook al is die minimaal of niet-identificerend);
      de autoriteit de contactgegevens van de serverbeheerder te verstrekken, zodat deze rechtstreeks bij hem eventuele technische logboeken kan opvragen die niet ter beschikking staan van de Aanbieder.
      De gebruiker erkent dat, vanwege de aard van de dienst, de samenwerking van de Aanbieder wordt beperkt door zijn objectieve technische onmogelijkheid om gegevens te verzamelen of te overhandigen die hij nooit heeft bezeten. Geen enkele bepaling van dit contract kan worden uitgelegd als een verplichting van de Aanbieder om bewijsmateriaal of identificatiemiddelen te verstrekken die de wet hem niet verplicht te bewaren.
      7. Beperkingen van garantie en beschikbaarheid
      De dienst wordt verleend "zoals hij is", zonder garanties van continuïteit, foutloosheid of absolute veiligheid. De Aanbieder garandeert niet de afwezigheid van onderschepping door derden of van technische kwetsbaarheden.
      8. Duur, wijziging en intrekking
      De Aanbieder kan deze voorwaarden te allen tijde wijzigen, met kennisgeving via de App. Voortgezet gebruik van de dienst na de wijziging vormt aanvaarding. De gebruiker kan het gebruik te allen tijde stopzetten. De Aanbieder kan de toegang zonder voorafgaande kennisgeving intrekken in geval van een schending.
      9. Bevoegde rechtbank en toepasselijk recht
      Dit contract wordt beheerst door het Italiaanse recht. Voor elk geschil met betrekking tot de dienst of deze voorwaarden is de exclusieve bevoegde rechtbank die van de woonplaats van de Aanbieder (of, naar keuze van de Aanbieder, die van Milaan/Rome). De gebruiker doet uitdrukkelijk afstand van elke andere rechtsmacht.
      10. Gedeeltelijke nietigheid
      Indien een clausule nietig of ondoeltreffend wordt verklaard, blijven de overige clausules volledig van kracht.
      11. Uitdrukkelijke toestemming in de zin van art. 1341 en 1342 van het Italiaanse Burgerlijk Wetboek
      De gebruiker verklaart dat hij specifiek de clausules met betrekking tot: uitsluiting van aansprakelijkheid (art. 4), vrijwaringsverplichting (art. 5), garantiebeperkingen (art. 7), bevoegde rechtbank (art. 9) heeft gelezen en goedgekeurd.

      Verplichte aanvaardingsbevestiging
      Door op "Aanvaarden" te drukken of de App binnen 10 seconden na weergave te blijven gebruiken, bevestigt de gebruiker dat hij alle bovenstaande voorwaarden aanvaardt.`,

    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 Scrol helemaal naar beneden om acceptatie te activeren",

    // --- Admin alerts ---
    admin_no_requests: "Geen registratieverzoeken",
    admin_delete_btn: "Verwijder",
    admin_delete_btn_title: "Account definitief verwijderen",
    admin_delete_confirm: "Weet je zeker dat je dit account permanent wilt verwijderen? Dit kan niet ongedaan worden gemaakt.",
    admin_delete_error: "Fout bij het verwijderen van account",
    admin_load_error: "Fout bij laden verzoeken",
  },
  pl: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: 'Talk local, chat global, anonymously',
    login_heading: 'Zaloguj się',
    login_username_placeholder: 'Nazwa użytkownika',
    login_password_placeholder: 'Hasło',
    login_button: 'Zaloguj się',
    login_no_account: 'Nie masz konta?',
    login_register_link: 'Zarejestruj się',
    register_heading: 'Zarejestruj się',
    register_username_placeholder: 'Nazwa użytkownika',
    register_password_placeholder: 'Hasło',
    register_language_label: 'Język',
    register_api_key_placeholder: 'Klucz API Gemini (opcjonalnie)',
    register_button: 'Zarejestruj się',
    register_has_account: 'Masz już konto?',
    register_login_link: 'Zaloguj się',
    register_fields_required: 'Wypełnij wszystkie wymagane pola',
    registration_pending: 'Rejestracja zakończona. Poczekaj na zatwierdzenie przez administratora.',

    // ========== Navigazione ==========
    nav_contacts: 'Kontakty',
    nav_chats: 'Czat',
    nav_profile: 'Profil',
    nav_translate: 'Tłumacz',

    // ========== Banner offline ==========
    offline_banner: '⚠️ Offline – Oczekiwanie na połączenie...',

    // ========== Contatti ==========
    contacts_title: 'Kontakty',
    add_contact_btn: '+ Dodaj',
    requests_in: 'Otrzymane zaproszenia',
    requests_out: 'Wysłane zaproszenia',
    no_contacts: 'Brak kontaktów',
    pending_badge: 'Oczekujące',
    role_keyholder: 'Key-holder',
    role_guest: 'Gość',
    btn_accept: 'Akceptuj',
    btn_remove: 'Usuń',
    contacts_manage_btn: 'Kontakty',
    new_chat_btn: 'Nowa rozmowa',
    new_chat_modal_title: 'Nowa rozmowa',
    contacts_modal_title: 'Kontakty',
    confirm_delete_contact_message: 'Usunąć {name} z kontaktów?',
    confirm_delete_contact_msg: 'Czy usunąć kontakt "{name}"?',
    contact_online: '● Online',
    contact_offline: '● Offline',
    add_contacts_title: 'Dodaj kontakty',
    btn_cancel: 'Anuluj',
    btn_send_requests: 'Wyślij zaproszenia',
    select_at_least_one: 'Wybierz co najmniej jednego użytkownika',
    search_contacts_placeholder: 'Szukaj kontaktów...',

    // --- Modale aggiungi contatto ---
    modal_title: 'Dodaj kontakt',
    search_placeholder: 'Szukaj nazwy użytkownika...',
    btn_add: 'Dodaj',
    btn_close: 'Zamknij',

    // ========== Chat ==========
    back_btn: '← Wstecz',
    clear_chat_btn: 'Wyczyść czat',
    typing_indicator: 'pisze...',
    expiry_label: '⏳ Autodestrukcja:',
    expiry_options: [
          { value: '0', text: 'Bez wygasania' },
          { value: '0.002777', text: '10 sekund' },
          { value: '0.0166667', text: '1 minuta' },
          { value: '0.0833333', text: '5 minut' },
          { value: '1', text: '1 godzina' },
          { value: '6', text: '6 godzin' },
          { value: '12', text: '12 godzin' },
          { value: '24', text: '24 godziny' },
          { value: '168', text: '7 dni' },
        ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> Mówić',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> Dyktować',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> Słuchanie',
    record_btn_release: '⏹ ZWOLNIJ',
    text_input_placeholder: 'Napisz',
    send_text_btn: 'Wyślij tekst',
    send_text_sending: 'Wysyłanie...',
    message_sent_confirm: 'Nowa wiadomość od {name}\n\n{text}\n\nOtworzyć czat?',
    voice_note_confirm: 'Nowa notatka głosowa od {name}\n\nOtworzyć czat?',
    confirm_image_message: 'Nowe zdjęcie od {name}\n\nOtworzyć czat?',
    confirm_video_message: 'Nowy film od {name}\n\nOtworzyć czat?',
    local_notification_voice_note: '🎵 Notatka głosowa',
    local_notification_image: '🖼️ Zdjęcie',
    local_notification_video: '🎬 Wideo',
    voice_note_sent: '🎵 Notatka głosowa wysłana',
    voice_note_listen: '▶️ Odsłuchaj notatkę głosową',
    no_messages: 'Brak wiadomości',
    load_error: 'Błąd ładowania wiadomości',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 Ghost',
    individual_chat: '💬 Czat indywidualny',
    group_chat: '👥 Czat grupowy',
    search_chats_placeholder: 'Szukaj czatów...',
    btn_delete: 'Usuń',
    confirm_delete_chat_msg: 'Czy zamknąć czat z "{name}"?',
    confirm_delete_message: 'Czy na pewno chcesz usunąć tę wiadomość? Zostanie ona również usunięta z czatu odbiorcy.',

    // --- Gruppi ---
    group_chat_modal_title: 'Utwórz czat grupowy',
    group_chat_modal_subtitle: 'Wybierz kontakty online',
    group_create_btn: 'Utwórz grupę',
    group_leave_btn: 'Opuść',
    group_invite_title: 'Zaproszenie do grupy',
    group_invite_accept: 'Dołącz',
    group_invite_decline: 'Odrzuć',
    group_user_joined: 'dołączył(a) do grupy',
    group_user_left: 'opuścił(a) grupę',
    group_error_no_contacts_online: 'Brak kontaktów online',
    group_error_select_contact: 'Wybierz co najmniej jeden kontakt',
    group_error_creation_failed: 'Nie udało się utworzyć grupy',
    group_notification_created: 'Grupa utworzona',
    new_contact_request: 'Nowa prośba o kontakt od {{name}}',
    group_chat_title: 'Grupa ({{count}})',
    group_reconnected: 'ponownie dołączył(a)',
    group_timeout_suffix: ' (timeout)',
    group_empty: 'Jesteś jedyną osobą w grupie.',
    group_chat_btn: '👥 Grupa',
    send_btn: 'Wyślij',

    // ========== Profilo ==========
    profile_avatar_upload: 'Prześlij zdjęcie profilowe',
    profile_avatar_remove: 'Usuń',
    profile_username_label: 'Nazwa użytkownika',
    profile_language_label: 'Język',
    profile_api_key_label: 'Klucz API Gemini',
    profile_api_key_placeholder: 'Pozostaw puste, aby usunąć',
    profile_api_key_hint: 'Wprowadź nowy klucz, aby zostać key-holderem',
    profile_voice_label: 'Preferowany głos TTS',
    profile_expiry_label: '⏳ Globalna autodestrukcja',
    profile_expiry_hint: 'Nowe wiadomości odziedziczą ten czas (można zmienić w czacie)',
    profile_regenerate_keys: 'Wygeneruj ponownie klucze E2E',
    profile_regenerate_keys_hint: 'Uwaga: poprzednie zaszyfrowane wiadomości staną się nieczytelne.',
    profile_logout: 'Wyloguj się',
    profile_delete_account: 'Usuń konto',
    profile_save: 'Zapisz zmiany',
    profile_password_label: 'Hasło',
    profile_change_password_btn: 'Zmień',
    change_password_title: 'Zmień hasło',
    current_password_placeholder: 'Aktualne hasło',
    new_password_placeholder: 'Nowe hasło',
    confirm_password_placeholder: 'Potwierdź nowe hasło',
    profile_saved: 'Ustawienia zapisane',
    profile_error: 'Błąd',
    profile_ui_language_label: 'Język interfejsu',
    profile_theme_label: 'Motyw kolorystyczny',
    theme_red: 'Intensywna czerwień',
    theme_blue: 'Oceaniczny błękit',
    theme_green: 'Leśna zieleń',
    theme_purple: 'Królewska purpura',
    profile_ephemeral_default: '👻 Domyślny Ghost',
    profile_beep_label: 'Dźwięk rozpoczęcia nagrywania',

    // --- Chiavi API ---
    profile_api_keys_label: 'Klucze API',
    manage_api_keys_btn: 'Zarządzaj kluczami API',
    profile_api_keys_hint: 'Dodaj lub usuń klucze Gemini.',
    api_keys_modal_title: 'Twoje klucze API',
    new_api_key_placeholder: 'Wklej nowy klucz API',
    add_api_key_btn: 'Dodaj',
    no_api_keys: 'Brak zapisanych kluczy API',
    confirm_delete_api_key: 'Usunąć ten klucz?',

    // ========== Errori e avvisi ==========
    error_network: 'Nie można połączyć się z serwerem',
    error_session_expired: 'Sesja wygasła',
    error_login_failed: 'Błąd logowania',
    error_register_failed: 'Błąd rejestracji',
    error_contact_load: 'Błąd ładowania kontaktów',
    error_profile_load: 'Nie można załadować profilu',
    error_send_failed: 'Wysyłanie nie powiodło się. Spróbuj ponownie.',
    error_send_text_failed: 'Wysyłanie tekstu nie powiodło się. Spróbuj ponownie za chwilę.',
    error_dictation_blocked: 'Rozpoznawanie mowy nie jest obsługiwane w tej przeglądarce.\nZalecane przeglądarki: Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (z włączoną flagą).',
    error_dictation_mic: 'Odmowa dostępu do mikrofonu dla dyktowania.',
    error_dictation_generic: 'Błąd podczas dyktowania: {error}',
    error_recording_unsupported: 'Nagrywanie nie jest obsługiwane',
    error_mic_access: 'Nie można uzyskać dostępu do mikrofonu dla notatki głosowej',
    error_voice_note_e2e: 'Nie można wysłać notatki głosowej: odbiorca nie skonfigurował szyfrowania E2E. Poproś go o otwarcie profilu.',
    error_private_key_missing: 'Brak klucza prywatnego. Wygeneruj ponownie klucze E2E w profilu.',
    error_voice_note_send_failed: 'Wysyłanie notatki głosowej nie powiodło się',
    error_text_e2e_required: 'Nie można wysłać wiadomości: odbiorca nie skonfigurował szyfrowania E2E. Poproś go o otwarcie profilu.',
    error_decryption_failed: 'Odszyfrowanie dźwięku nie powiodło się',
    error_no_audio_data: 'Dane audio niedostępne.',
    error_audio_decrypt: 'Odszyfrowanie dźwięku nie powiodło się',
    error_ephemeral_message: 'Błąd efemerycznej wiadomości',
    error_voice_note_network: 'Błąd sieci podczas wysyłania notatki głosowej',
    error_send_retry: 'Wysyłanie nieudane. Stuknij, aby spróbować ponownie.',
    error_audio_data_unavailable: 'Dane audio niedostępne.',
    error_delete_account: 'Błąd podczas usuwania konta',
    error_generic: 'Błąd',
    error_key_regeneration: 'Błąd podczas ponownego generowania kluczy.',
    ephemeral_language_error: 'Tryb efemeryczny wymaga tego samego języka.',
    ephemeral_offline_error: 'Odbiorca jest offline. Nie można dostarczyć efemerycznych wiadomości.',
    confirm_delete_contact: 'Usunąć ten kontakt?',
    confirm_delete_account: 'Czy na pewno chcesz trwale usunąć swoje konto? Tej operacji nie można cofnąć.',
    confirm_regenerate_keys: 'Wygenerować ponownie klucze E2E? Poprzednie zaszyfrowane wiadomości staną się nieczytelne.',
    keys_regenerated: 'Nowe klucze zostały pomyślnie wygenerowane.',
    account_deleted: 'Konto zostało pomyślnie usunięte',
    avatar_upload_error: 'Błąd podczas przesyłania obrazu',
    no_chats: 'Brak aktywnych czatów',
    error_loading_chats: 'Błąd podczas ładowania czatów',
    error_guest_diff_language: "Aby rozmawiać z użytkownikami mówiącymi w innym języku, wymagany jest klucz API. Zarejestruj klucz API na stronie profilu.",
    error_guest_group_multilingual: "Goście mogą tworzyć grupy tylko z osobami o tym samym języku. Do grup wielojęzycznych potrzebny jest klucz API.",
    warning_keyholder_add_guest_diff_language: "Kontakt, który dodajesz, ma konto gościa i mówi w innym języku niż ty. Wszystkie wasze czaty będą tłumaczone przy użyciu twoich kluczy API Gemini.",
    alert_fill_all_fields: 'Wypełnij wszystkie wymagane pola',
    error_missing_public_key: 'Brak klucza publicznego dla {memberId}',
    error_cannot_get_public_key: 'Nie można pobrać klucza publicznego {memberId}',

    // ========== Notifiche push ==========
    push_new_message: 'Nowa wiadomość od {name}',
    push_voice_note: 'Notatka głosowa od {name}',
    push_body: '🎵 Notatka głosowa',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'Twój odcisk E2E:',
    speaker_title: 'Słuchaj',
    media_upload_title: 'Wyślij zdjęcie lub wideo',
    media_expiry_default_warning: 'Multimedia wysłane bez licznika autodestrukcji zostaną automatycznie usunięte po 7 dniach.',
    lightbox_image_alt: 'Zdjęcie',
    lightbox_video_alt: 'Wideo',
    translate_show_original: 'Pokaż oryginał',
    translating_placeholder: 'Tłumaczenie…',
    error_translation_failed: 'Tłumaczenie nie powiodło się',
    error_translation_api_key: 'Dodaj klucz API, aby tłumaczyć',
    translate_title: 'Tłumacz',
    encrypted_message: '🔒 Zaszyfrowana wiadomość',

    // --- Amministrazione ---
    admin_requests_title: 'Prośby o rejestrację',
    admin_requests_btn: 'Zarządzaj prośbami',
    admin_note_placeholder: 'Notatka (maks. 30 znaków)',
    admin_account_active: 'Aktywny',
    admin_account_inactive: 'Oczekujące',
    admin_toggle_activate: 'Aktywuj konto',
    admin_toggle_deactivate: 'Dezaktywuj konto',
    admin_back_to_profile: '← Powrót do profilu',

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "Włącz tryb Ghost: wysłane wiadomości nie są zapisywane na serwerze i znikają po opuszczeniu czatu. Działa tylko wtedy, gdy odbiorca również ma otwarty czat.",
    tour_chat_selfdestruct: 'Każda wiadomość może mieć licznik autodestrukcji. Odliczanie rozpoczyna się, gdy odbiorca ją wyświetli. Po upływie czasu wiadomość jest usuwana dla wszystkich.',
    tour_chat_dictate: 'Krótkie dotknięcie: rozpoczyna dyktowanie głosowe, drugie dotknięcie zatrzymuje i wysyła tekst. Przytrzymaj: nagrywasz wiadomość głosową; po zwolnieniu zostanie wysłana. Poczekaj na sygnał dźwiękowy przed mówieniem.',
    tour_chat_sent: 'Przytrzymaj swoją wiadomość, aby ją usunąć.',
    tour_chat_received: 'Przytrzymaj otrzymaną wiadomość, aby dodać reakcję emoji.',
    tour_chat_speaker: 'Dotknij ikony głośnika pod wiadomością, aby odczytać ją na głos.',
    tour_chat_clear: "Usuń wiadomości w swoim interfejsie czatu, ale nie w interfejsie twojego rozmówcy.",
    tour_group_ghost: 'Czat grupowy jest zawsze w trybie Ghost: konwersacja i wszystkie wiadomości są usuwane, gdy opuścisz czat.',
    tour_contacts_fab: 'Dotknij, aby dodać nowy kontakt.',
    tour_contacts_delete: 'Przytrzymaj kontakt, aby go usunąć. Konieczne będzie potwierdzenie usunięcia.',
    tour_chatslist_fab: "Dotknij, aby utworzyć nowy czat indywidualny lub grupowy. Wszystkie czaty grupowe są zawsze w trybie Ghost: wiadomości nie są zapisywane i działają tylko wtedy, gdy co najmniej dwóch uczestników ma czat otwarty jednocześnie.",
    tour_chatslist_delete: 'Przytrzymaj baner czatu, aby go usunąć. Konieczne będzie potwierdzenie usunięcia.',
    tour_profile_recording: 'Wybierz dźwięk, który powiadomi Cię, gdy nagrywanie wiadomości głosowej faktycznie się rozpocznie.',
    tour_profile_api: "Aby czatować z osobami mówiącymi w innym języku, potrzebujesz co najmniej jednego klucza API Gemini. Jeśli masz konto Google, możesz zarejestrować jeden lub więcej (nawet darmowe) w 3 krokach:<br>1) Przejdź do <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a><br>2) Kliknij 'Utwórz klucz API' na dole po lewej<br>3) Wklej go tutaj.<br>Jeśli masz ich więcej, system użyje pierwszego aż do wyczerpania dziennego limitu, a następnie automatycznie przełączy się na kolejny.<br>Alternatywnie możesz czatować bez klucza API, jeśli mówisz we wspólnym języku. Oboje musicie ustawić go na stronie Profilu, ale pamiętajcie, aby zmienić go ponownie, gdy wrócicie do czatowania z osobami mówiącymi waszym własnym językiem.",
    tour_profile_e2e: 'Wygeneruj nowe klucze szyfrujące dla swoich wiadomości. Uwaga: po ponownym wygenerowaniu nie będziesz mógł odczytać starych wiadomości.',
    tour_translate_howto: 'Przeznaczony do rozmów twarzą w twarz z osobą nieznającą Twojego języka. Wybierz dwa języki. Naciśnij raz przycisk Mów w swoim języku, mów, a następnie naciśnij go ponownie. Pojawi się tłumaczenie, a głos odczyta je w języku rozmówcy. Rozmówca odpowiada za pomocą przycisku w swoim języku.',
    tour_translate_original: 'Włącz, aby zobaczyć również tekst w języku mówiącego, dzięki czemu możesz sprawdzić, czy wiadomość została przekazana poprawnie. Zużywa więcej zasobów klucza API: będziesz mógł przetłumaczyć mniej wiadomości dziennie.',
    tour_translate_limits: 'Korzystanie z tłumacza jest ograniczone dziennymi limitami Twoich kluczy API Gemini.',

    // --- UI del tour ---
    tour_next: 'Dalej',
    tour_skip: 'Pomiń',
    tour_finish: 'Zakończ',
    profile_tour_label: "Informacje o przewodniku",
    profile_tour_button: "Uruchom ponownie przewodnik",

    // --- Legal Form ---
    terms_title: "Warunki korzystania z usługi",
    terms_accept_label: "Oświadczam, że zapoznałem/am się i akceptuję warunki",
    terms_confirm_btn: "Akceptuję i rejestruję",
    terms_text: `DOKUMENT – WARUNKI KORZYSTANIA Z USŁUGI GHOST CHAT

      Wstęp
      Niniejsza usługa (aplikacja PWA „Ghost Chat”) jest udostępniana wyłącznie jako techniczna platforma anonimowej komunikacji między użytkownikami. Właściciel/administrator serwera („Dostawca”) nie ma żadnej kontroli nad treściami wymienianymi przez użytkowników, deklarowanymi przez nich tożsamościami ani ich zachowaniem. Korzystanie z Aplikacji jest zabronione dla każdego, kto nie akceptuje w całości poniższych warunków.

      1. Akceptacja i obowiązek zapoznania się z treścią
      Uzyskując dostęp do Aplikacji lub korzystając z niej, użytkownik oświadcza, że zapoznał się, zrozumiał i bezwarunkowo akceptuje wszystkie postanowienia niniejszego dokumentu. Akceptacja jest obowiązkowym warunkiem wstępnym korzystania z usługi.

      2. Zgodne z prawem użytkowanie i bezwzględne zakazy
      Użytkownik zobowiązuje się korzystać z Aplikacji wyłącznie w celach zgodnych z prawem, moralnych oraz zgodnych z prawem włoskim i europejskim, a także z przepisami obowiązującymi w kraju swojego zamieszkania. Bezwzględnie zabrania się:
      – rozpowszechniania treści związanych z pedofilią, przemocą, dyskryminacją, zniesławieniem, znieważeniem lub nawołujących do nienawiści;
      – planowania, promowania lub popełniania przestępstw jakiegokolwiek rodzaju (np. terroryzm, stalking, oszustwa, wymuszenia, handel narkotykami, przemoc wobec osób);
      – naruszania praw innych osób (prywatności, własności intelektualnej, tajemnicy zawodowej);
      – wykorzystywania Aplikacji do phishingu, rozsyłania złośliwego oprogramowania, spamu lub ataków komputerowych;
      – obchodzenia systemów zgłaszania lub anonimowości w celu wyrządzenia szkody osobom trzecim.

      3. Anonimowość techniczna i brak danych identyfikacyjnych
      Usługa nie wymaga ani nie gromadzi żadnych danych osobowych (imię, e-mail, numer telefonu, stały adres IP) podczas rejestracji. Serwer nie przechowuje logów połączeń ani adresów IP użytkowników, poza czasem ściśle niezbędnym do przesłania wiadomości (i w żadnym wypadku nie dłużej niż przez czas trwania sesji).
      W związku z tym, nawet na mocy nakazu sądowego, Dostawca nie jest w stanie dostarczyć żadnych informacji identyfikujących użytkowników ani ustalić ich rzeczywistej tożsamości.
      Jedynym danym powiązanym z kontem jest nazwa użytkownika (username) wybrana przez użytkownika, która nie pozwala na identyfikację osoby fizycznej.

      4. Całkowite wyłączenie odpowiedzialności Dostawcy za niezgodne z prawem użycie
      Dostawca nie ponosi w żadnym zakresie odpowiedzialności – cywilnej, karnej ani administracyjnej – za:
      – treści, rozmowy, pliki lub działania użytkowników;
      – sposób, w jaki osoby trzecie wykorzystują otrzymane wiadomości;
      – ewentualne przestępstwa popełnione za pośrednictwem Aplikacji, ponieważ platforma jest pasywnym i neutralnym narzędziem transmisji danych (zgodnie z art. 14 dekretu ustawodawczego nr 70/2003 oraz dyrektywą UE 2000/31/WE).
      Użytkownik przyjmuje na siebie wszelkie ryzyko związane z korzystaniem z usługi.

      5. Obowiązek zwolnienia z odpowiedzialności (indemnizacja)
      Użytkownik zobowiązuje się zwolnić z odpowiedzialności, chronić i bronić Dostawcę przed wszelkimi roszczeniami, postępowaniami sądowymi, grzywnami, sankcjami, kosztami prawnymi lub odszkodowaniami wynikającymi z:
      – naruszenia niniejszych warunków przez użytkownika;
      – niezgodnego z prawem lub nieautoryzowanego korzystania z Aplikacji, które można przypisać jego koncie/sesji;
      – sporów między użytkownikami lub z osobami trzecimi, powstałych w wyniku korzystania z Aplikacji.
      W przypadku skazania Dostawcy za czyn przypisany użytkownikowi, ten ostatni jest zobowiązany do pełnego zwrotu Dostawcy wszelkich poniesionych kosztów, w tym honorariów prawnych.

      6. Współpraca z organami ścigania i ograniczenia techniczne
      Dostawca oświadcza, że jest w pełni gotów współpracować z organami sądowymi lub policją, z poszanowaniem obowiązujących przepisów prawa, w celu przeciwdziałania ewentualnemu niezgodnemu z prawem wykorzystywaniu usługi.
      Jednakże użytkownik przyjmuje do wiadomości i akceptuje, że:
      – usługa została zaprojektowana tak, aby nie gromadzić ani nie przechowywać adresów IP ani innych danych identyfikujących użytkowników;
      – Dostawca nie ma wizualnego dostępu do treści prywatnych czatów ani możliwości technicznych ich wyodrębnienia;
      – ewentualne logi techniczne (takie jak znaczniki czasu, metadane połączenia lub ślady systemowe) mogą istnieć wyłącznie u operatora infrastruktury serwerowej (dostawcy hostingu) i nie są bezpośrednio dostępne dla Dostawcy;
      – Dostawca nie jest w stanie dostarczyć danych, których nie posiada lub które są technicznie niedostępne, ani obejść własnych środków anonimowości i szyfrowania.
      W przypadku formalnego żądania ze strony organu ścigania, Dostawca zobowiązuje się do:
      – niezwłocznego zawieszenia lub usunięcia wskazanego konta użytkownika, o ile jest to technicznie możliwe;
      – dostarczenia organowi wszelkich posiadanych informacji (nawet jeśli są minimalne lub nieidentyfikujące);
      – wskazania organowi danych kontaktowych operatora serwera, aby mógł on zwrócić się bezpośrednio do niego o ewentualne logi techniczne, które nie są w posiadaniu Dostawcy.
      Użytkownik uznaje, że ze względu na sam charakter usługi współpraca Dostawcy jest ograniczona jego obiektywną techniczną niemożnością gromadzenia lub dostarczania danych, których nigdy nie posiadał. Żadne postanowienie niniejszej umowy nie może być interpretowane jako zobowiązanie Dostawcy do dostarczenia dowodów lub danych identyfikacyjnych, których przechowywania nie nakłada na niego prawo.

      7. Ograniczenia gwarancji i dostępności
      Usługa jest świadczona „tak jak jest”, bez gwarancji ciągłości, braku błędów lub absolutnego bezpieczeństwa. Dostawca nie gwarantuje braku przechwytywania przez osoby trzecie ani braku luk technicznych.

      8. Czas trwania, zmiany i cofnięcie dostępu
      Dostawca może w dowolnym momencie zmienić niniejsze warunki, powiadamiając o tym za pośrednictwem Aplikacji. Dalsze korzystanie z usługi po zmianie stanowi jej akceptację. Użytkownik może w dowolnym momencie przerwać korzystanie. Dostawca może cofnąć dostęp bez uprzedzenia w przypadku naruszenia warunków.

      9. Właściwy sąd i prawo właściwe
      Niniejsza umowa podlega prawu włoskiemu. W przypadku wszelkich sporów związanych z usługą lub niniejszymi warunkami, wyłączną właściwość miejscową ma sąd właściwy dla miejsca zamieszkania Dostawcy (lub, według jego wyboru, sąd w Mediolanie/Rzymie). Użytkownik wyraźnie zrzeka się wszelkiej innej jurysdykcji.

      10. Częściowa nieważność
      Jeśli którekolwiek z postanowień zostanie uznane za nieważne lub nieskuteczne, pozostałe pozostają w pełni skuteczne.

      11. Wyraźna zgoda w rozumieniu art. 1341 i 1342 włoskiego kodeksu cywilnego
      Użytkownik oświadcza, że zapoznał się i wyraźnie zatwierdza postanowienia dotyczące: wyłączenia odpowiedzialności (pkt 4), obowiązku zwolnienia z odpowiedzialności (pkt 5), ograniczeń gwarancji (pkt 7), właściwego sądu (pkt 9).

      Obowiązkowe potwierdzenie akceptacji
      Naciskając „Akceptuję” lub kontynuując korzystanie z Aplikacji po 10 sekundach od jej wyświetlenia, użytkownik potwierdza, że akceptuje wszystkie powyższe warunki.`,

    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 Przewiń na sam dół, aby włączyć akceptację",

    // --- Admin alerts ---
    admin_no_requests: "Brak próśb o rejestrację",
    admin_delete_btn: "Usuń",
    admin_delete_btn_title: "Trwale usuń to konto",
    admin_delete_confirm: "Czy na pewno chcesz trwale usunąć to konto? Tej operacji nie można cofnąć.",
    admin_delete_error: "Błąd podczas usuwania konta",
    admin_load_error: "Błąd wczytywania próśb",
  },
  tr: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: 'Yerel konuş, küresel sohbet et, anonim',
    login_heading: 'Giriş Yap',
    login_username_placeholder: 'Kullanıcı Adı',
    login_password_placeholder: 'Şifre',
    login_button: 'Giriş Yap',
    login_no_account: 'Hesabınız yok mu?',
    login_register_link: 'Kayıt Ol',
    register_heading: 'Kayıt Ol',
    register_username_placeholder: 'Kullanıcı Adı',
    register_password_placeholder: 'Şifre',
    register_language_label: 'Dil',
    register_api_key_placeholder: 'Gemini API Anahtarı (isteğe bağlı)',
    register_button: 'Kayıt Ol',
    register_has_account: 'Zaten bir hesabınız var mı?',
    register_login_link: 'Giriş Yap',
    register_fields_required: 'Tüm zorunlu alanları doldurun',
    registration_pending: 'Kayıt tamamlandı. Yönetici onayını bekleyin.',

    // ========== Navigazione ==========
    nav_contacts: 'Kişiler',
    nav_chats: 'Sohbet',
    nav_profile: 'Profil',
    nav_translate: 'Çevir',

    // ========== Banner offline ==========
    offline_banner: '⚠️ Çevrimdışı - Bağlantı bekleniyor...',

    // ========== Contatti ==========
    contacts_title: 'Kişiler',
    add_contact_btn: '+ Kişi Ekle',
    requests_in: 'Gelen İstekler',
    requests_out: 'Giden İstekler',
    no_contacts: 'Kişi yok',
    pending_badge: 'Bekliyor',
    role_keyholder: 'Anahtar Sahibi',
    role_guest: 'Misafir',
    btn_accept: 'Kabul Et',
    btn_remove: 'Kaldır',
    contacts_manage_btn: 'Kişiler',
    new_chat_btn: 'Yeni sohbet',
    new_chat_modal_title: 'Yeni sohbet',
    contacts_modal_title: 'Kişiler',
    confirm_delete_contact_message: '{name} kişisini kişilerden kaldır?',
    confirm_delete_contact_msg: '"{name}" kişisini silmek istiyor musunuz?',
    contact_online: '● Çevrimiçi',
    contact_offline: '● Çevrimdışı',
    add_contacts_title: 'Kişi ekle',
    btn_cancel: 'İptal',
    btn_send_requests: 'İstekleri gönder',
    select_at_least_one: 'En az bir kullanıcı seçin',
    search_contacts_placeholder: 'Kişilerde ara...',

    // --- Modale aggiungi contatto ---
    modal_title: 'Kişi Ekle',
    search_placeholder: 'Kullanıcı adı ara...',
    btn_add: 'Ekle',
    btn_close: 'Kapat',

    // ========== Chat ==========
    back_btn: '← Geri',
    clear_chat_btn: 'Sohbeti Temizle',
    typing_indicator: 'yazıyor...',
    expiry_label: '⏳ Kendini İmha:',
    expiry_options: [
      { value: '0', text: 'Süresiz' },
      { value: '0.002777', text: '10 saniye' },
      { value: '0.0166667', text: '1 dakika' },
      { value: '0.0833333', text: '5 dakika' },
      { value: '1', text: '1 saat' },
      { value: '6', text: '6 saat' },
      { value: '12', text: '12 saat' },
      { value: '24', text: '24 saat' },
      { value: '168', text: '7 gün' },
    ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> Konuş',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> Dikte et',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> Dinleme',
    record_btn_release: '⏹ BIRAK',
    text_input_placeholder: 'Yaz',
    send_text_btn: 'Metin Gönder',
    send_text_sending: 'Gönderiliyor...',
    message_sent_confirm: '{name} kişisinden yeni mesaj\n\n{text}\n\nSohbeti aç?',
    voice_note_confirm: '{name} kişisinden sesli not\n\nSohbeti aç?',
    confirm_image_message: '{name} kişisinden yeni fotoğraf\n\nSohbeti açalım mı?',
    confirm_video_message: '{name} kişisinden yeni video\n\nSohbeti açalım mı?',
    local_notification_voice_note: '🎵 Sesli not',
    local_notification_image: '🖼️ Görsel',
    local_notification_video: '🎬 Video',
    voice_note_sent: '🎵 Sesli not gönderildi',
    voice_note_listen: '▶️ Sesli notu dinle',
    no_messages: 'Mesaj yok',
    load_error: 'Mesajlar yüklenirken hata oluştu',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 Ghost',
    individual_chat: '💬 Bireysel sohbet',
    group_chat: '👥 Grup sohbeti',
    search_chats_placeholder: 'Sohbetlerde ara...',
    btn_delete: 'Sil',
    confirm_delete_chat_msg: '"{name}" ile sohbeti kapatmak istiyor musunuz?',
    confirm_delete_message: 'Bu mesajı silmek istiyor musunuz? Alıcının sohbetinden de kaybolacak.',

    // --- Gruppi ---
    group_chat_modal_title: 'Grup sohbeti oluştur',
    group_chat_modal_subtitle: 'Çevrimiçi kişileri seçin',
    group_create_btn: 'Grup oluştur',
    group_leave_btn: 'Ayrıl',
    group_invite_title: 'Grup daveti',
    group_invite_accept: 'Katıl',
    group_invite_decline: 'Reddet',
    group_user_joined: 'gruba katıldı',
    group_user_left: 'gruptan ayrıldı',
    group_error_no_contacts_online: 'Çevrimiçi kişi yok',
    group_error_select_contact: 'En az bir kişi seçin',
    group_error_creation_failed: 'Grup oluşturulamadı',
    group_notification_created: 'Grup oluşturuldu',
    new_contact_request: '{{name}} adlı kişiden yeni kişi isteği',
    group_chat_title: 'Grup ({{count}})',
    group_reconnected: 'tekrar katıldı',
    group_timeout_suffix: ' (zaman aşımı)',
    group_empty: 'Grupta yalnız kaldınız.',
    group_chat_btn: '👥 Grup',
    send_btn: 'Gönder',

    // ========== Profilo ==========
    profile_avatar_upload: 'Profil fotoğrafı yükle',
    profile_avatar_remove: 'Kaldır',
    profile_username_label: 'Kullanıcı Adı',
    profile_language_label: 'Dil',
    profile_api_key_label: 'Gemini API Anahtarı',
    profile_api_key_placeholder: 'Kaldırmak için boş bırakın',
    profile_api_key_hint: 'Anahtar sahibi olmak için yeni bir anahtar girin',
    profile_voice_label: 'Tercih edilen TTS sesi',
    profile_expiry_label: '⏳ Genel Kendini İmha Süresi',
    profile_expiry_hint: 'Yeni mesajlar bu süreyi devralır (sohbet bazında değiştirilebilir)',
    profile_regenerate_keys: 'E2E Anahtarlarını Yeniden Oluştur',
    profile_regenerate_keys_hint: 'Dikkat: Önceki şifreli mesajlar okunamaz hale gelir.',
    profile_logout: 'Çıkış Yap',
    profile_delete_account: 'Hesabı Sil',
    profile_save: 'Değişiklikleri Kaydet',
    profile_password_label: 'Şifre',
    profile_change_password_btn: 'Değiştir',
    change_password_title: 'Şifreyi değiştir',
    current_password_placeholder: 'Mevcut şifre',
    new_password_placeholder: 'Yeni şifre',
    confirm_password_placeholder: 'Yeni şifreyi onayla',
    profile_saved: 'Ayarlar kaydedildi',
    profile_error: 'Hata',
    profile_ui_language_label: 'Arayüz Dili',
    profile_theme_label: 'Renk teması',
    theme_red: 'Yoğun kırmızı',
    theme_blue: 'Okyanus mavisi',
    theme_green: 'Orman yeşili',
    theme_purple: 'Kraliyet moru',
    profile_ephemeral_default: '👻 Varsayılan Ghost',
    profile_beep_label: 'Ses kaydı başlangıcı',

    // --- Chiavi API ---
    profile_api_keys_label: 'API Anahtarları',
    manage_api_keys_btn: 'API Anahtarlarını Yönet',
    profile_api_keys_hint: 'Gemini anahtarları ekleyin veya kaldırın.',
    api_keys_modal_title: 'API Anahtarlarınız',
    new_api_key_placeholder: 'Yeni bir API anahtarı yapıştırın',
    add_api_key_btn: 'Ekle',
    no_api_keys: 'Kayıtlı API anahtarı yok',
    confirm_delete_api_key: 'Bu anahtar silinsin mi?',

    // ========== Errori e avvisi ==========
    error_network: 'Sunucuya bağlanılamıyor',
    error_session_expired: 'Oturum süresi doldu',
    error_login_failed: 'Giriş yapılırken hata oluştu',
    error_register_failed: 'Kayıt olurken hata oluştu',
    error_contact_load: 'Kişiler yüklenirken hata oluştu',
    error_profile_load: 'Profil yüklenemedi',
    error_send_failed: 'Gönderim başarısız. Tekrar deneyin.',
    error_send_text_failed: 'Metin gönderimi başarısız. Birazdan tekrar deneyin.',
    error_dictation_blocked: 'Bu tarayıcıda sesli dikte desteklenmiyor.\nÖnerilen tarayıcılar: Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (etkin bayrakla).',
    error_dictation_mic: 'Dikte için mikrofon izni reddedildi.',
    error_dictation_generic: 'Dikte sırasında hata: {error}',
    error_recording_unsupported: 'Kayıt desteklenmiyor',
    error_mic_access: 'Sesli not için mikrofona erişilemiyor',
    error_voice_note_e2e: 'Sesli not gönderilemiyor: Alıcı E2E şifrelemesini yapılandırmadı. Profilini açmasını isteyin.',
    error_private_key_missing: 'Özel anahtar eksik. Profilden E2E anahtarlarını yeniden oluşturun.',
    error_voice_note_send_failed: 'Sesli not gönderimi başarısız',
    error_text_e2e_required: 'Mesaj gönderilemiyor: Alıcı E2E şifrelemesini yapılandırmadı. Profilini açmasını isteyin.',
    error_decryption_failed: 'Ses çözme başarısız',
    error_no_audio_data: 'Ses verisi mevcut değil.',
    error_audio_decrypt: 'Ses çözme başarısız',
    error_ephemeral_message: 'Geçici mesaj hatası',
    error_voice_note_network: 'Sesli not gönderilirken ağ hatası',
    error_send_retry: 'Gönderim başarısız. Dokunup tekrar deneyin.',
    error_audio_data_unavailable: 'Ses verisi mevcut değil.',
    error_delete_account: 'Hesap silinirken hata oluştu',
    error_generic: 'Hata',
    error_key_regeneration: 'Anahtarlar yeniden oluşturulurken hata.',
    ephemeral_language_error: 'Geçici mod aynı dili gerektirir.',
    ephemeral_offline_error: 'Alıcı çevrimdışı. Geçici mesajlar iletilemez.',
    confirm_delete_contact: 'Bu kişiyi kaldırmak istiyor musunuz?',
    confirm_delete_account: 'Hesabınızı kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    confirm_regenerate_keys: 'E2E anahtarlarını yeniden oluşturmak istiyor musunuz? Önceki şifreli mesajlar okunamaz hale gelir.',
    keys_regenerated: 'Yeni anahtarlar başarıyla oluşturuldu.',
    account_deleted: 'Hesap başarıyla silindi',
    avatar_upload_error: 'Resim yüklenirken hata oluştu',
    no_chats: 'Aktif sohbet yok',
    error_loading_chats: 'Sohbet yükleme hatası',
    error_guest_diff_language: "Farklı dildeki kullanıcılarla sohbet etmek için bir API anahtarı gereklidir. Profil sayfasından bir API anahtarı kaydedin.",
    error_guest_group_multilingual: "Misafir kullanıcılar sadece aynı dili konuşan kişilerle grup oluşturabilir. Çok dilli gruplar için bir API anahtarı şart.",
    warning_keyholder_add_guest_diff_language: "Eklediğin kişi Misafir hesabı ve dili senden farklı. Aranızdaki tüm sohbetler, senin Gemini API anahtarlarınla çevrilecek.",
    alert_fill_all_fields: 'Tüm zorunlu alanları doldurun',
    error_missing_public_key: '{memberId} için genel anahtar eksik',
    error_cannot_get_public_key: '{memberId} için genel anahtar alınamıyor',

    // ========== Notifiche push ==========
    push_new_message: '{name} kişisinden yeni mesaj',
    push_voice_note: '{name} kişisinden sesli not',
    push_body: '🎵 Sesli not',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'Senin E2E parmak izin:',
    speaker_title: 'Dinle',
    media_upload_title: 'Fotoğraf veya video gönder',
    media_expiry_default_warning: 'Kendini imha zamanlayıcısı olmadan gönderilen medya dosyaları 7 gün sonra otomatik olarak silinecektir.',
    lightbox_image_alt: 'Görsel',
    lightbox_video_alt: 'Video',
    translate_show_original: 'Orijinali göster',
    translating_placeholder: 'Çevriliyor…',
    error_translation_failed: 'Çeviri başarısız oldu',
    error_translation_api_key: 'Çeviri için bir API anahtarı ekleyin',
    translate_title: 'Çevirmen',
    encrypted_message: '🔒 Şifreli mesaj',

    // --- Amministrazione ---
    admin_requests_title: 'Kayıt talepleri',
    admin_requests_btn: 'Talepleri yönet',
    admin_note_placeholder: 'Not (en fazla 30 karakter)',
    admin_account_active: 'Aktif',
    admin_account_inactive: 'Beklemede',
    admin_toggle_activate: 'Hesabı etkinleştir',
    admin_toggle_deactivate: 'Hesabı devre dışı bırak',
    admin_back_to_profile: '← Profile dön',

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "Hayalet modunu etkinleştir: Gönderilen mesajlar sunucuda kaydedilmez ve sohbetten ayrıldığınızda kaybolur. Yalnızca alıcının da sohbeti açık olması durumunda çalışır.",
    tour_chat_selfdestruct: 'Her mesaj için bir kendini imha zamanlayıcısı ayarlayabilirsiniz. Geri sayım, alıcı mesajı görüntülediğinde başlar. Süre dolduğunda mesaj herkesten silinir.',
    tour_chat_dictate: 'Kısa dokunma: sesle dikte etmeyi başlatır, ikinci dokunma durdurur ve metni gönderir. Basılı tutun: sesli mesaj kaydedersiniz; bıraktığınızda gönderilir. Konuşmadan önce bip sesini bekleyin.',
    tour_chat_sent: 'Kendi mesajınızı silmek için üzerine basılı tutun.',
    tour_chat_received: 'Aldığınız bir mesaja emoji tepkisi eklemek için üzerine basılı tutun.',
    tour_chat_speaker: 'Mesajın altındaki hoparlör simgesine dokunarak mesajı sesli okutabilirsiniz.',
    tour_chat_clear: "Kendi sohbet arayüzünüzdeki mesajları temizleyin, ancak karşınızdakinin arayüzündekileri silmeyin.",
    tour_group_ghost: 'Grup sohbeti her zaman Ghost modundadır: sohbetten ayrıldığınızda tüm konuşma ve mesajlar silinir.',
    tour_contacts_fab: 'Yeni kişi eklemek için dokunun.',
    tour_contacts_delete: 'Bir kişiyi silmek için üzerine basılı tutun. Silme işlemini onaylamanız gerekecek.',
    tour_chatslist_fab: "Yeni bir birebir veya grup sohbeti oluşturmak için dokunun. Tüm grup sohbetleri her zaman Hayalet modundadır: mesajlar kaydedilmez ve yalnızca en az iki katılımcı aynı anda sohbeti açık tuttuğunda çalışır.",
    tour_chatslist_delete: 'Bir sohbeti silmek için başlığına basılı tutun. Silme işlemini onaylamanız gerekecek.',
    tour_profile_recording: 'Sesli mesaj kaydının gerçekten başladığını bildiren sesi seçin.',
    tour_profile_api: "Farklı bir dil konuşan kişilerle sohbet etmek için en az bir Gemini API anahtarı gerekir. Bir Google hesabınız varsa, ücretsiz olanlar da dahil olmak üzere bir veya daha fazla anahtarı 3 adımda kaydedebilirsiniz:<br>1) <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a>'ya gidin<br>2) Sol alttaki 'API anahtarı oluştur' butonuna tıklayın<br>3) Buraya yapıştırın.<br>Birden fazla anahtarınız varsa, sistem günlük limit dolana kadar ilkini kullanır, ardından otomatik olarak bir sonrakine geçer.<br>Alternatif olarak, ortak bir dil konuşuyorsanız API anahtarı olmadan sohbet edebilirsiniz. İkinizin de bunu Profil sayfasından ayarlaması gerekir, ancak kendi dilinizi konuşan kişilerle sohbete döndüğünüzde tekrar değiştirmeyi unutmayın.",
    tour_profile_e2e: 'Mesajlarınız için yeni şifreleme anahtarları oluşturun. Dikkat: yeniden oluşturduktan sonra eski mesajları okuyamazsınız.',
    tour_translate_howto: 'Sizin dilinizi konuşmayan kişilerle yüz yüze konuşmalar için tasarlanmıştır. İki dili seçin. Kendi dilinizdeki Konuş düğmesine bir kez basın, konuşun ve tekrar basın. Çeviri görünecek ve bir ses karşı tarafın dilinde okuyacaktır. Karşınızdaki kişi kendi dilindeki düğmeyle yanıt verir.',
    tour_translate_original: 'Konuşan kişinin dilindeki orijinal metni de görmek için etkinleştirin; böylece mesajın doğru aktarılıp aktarılmadığını kontrol edebilirsiniz. API anahtarınızın daha fazla kotasını tüketir: günde daha az mesaj çevirebilirsiniz.',
    tour_translate_limits: 'Çevirmenin kullanımı Gemini API anahtarlarınızın günlük limitlerine tabidir.',

    // --- UI del tour ---
    tour_next: 'İleri',
    tour_skip: 'Atla',
    tour_finish: 'Bitir',
    profile_tour_label: "Tur Bilgisi",
    profile_tour_button: "Turu Tekrar Başlat",

    // --- Legal Form ---
    terms_title: "Kullanım Koşulları",
    terms_accept_label: "Koşulları okuduğumu ve kabul ettiğimi beyan ederim",
    terms_confirm_btn: "Kabul et ve kaydol",
    terms_text: `BELGE – GHOST CHAT HİZMETİ KULLANIM KOŞULLARI
      Giriş
      Bu hizmet (“Ghost Chat” PWA'sı) yalnızca kullanıcılar arasında anonim mesajlaşma için teknik bir platform olarak sağlanmaktadır. Sunucunun sahibi/işletmecisi (“Sağlayıcı”), kullanıcılar arasında paylaşılan içerikler, beyan edilen kimlikler veya kullanıcı davranışları üzerinde hiçbir kontrole sahip değildir. Uygulamanın kullanımı, aşağıdaki koşulları eksiksiz olarak kabul etmeyen herkese yasaktır.
      1. Kabul ve Okuma Zorunluluğu
      Uygulamaya erişerek veya kullanarak, kullanıcı bu belgedeki tüm maddeleri okuduğunu, anladığını ve koşulsuz olarak kabul ettiğini beyan eder. Kabul, hizmetin kullanımı için zorunlu bir ön koşuldur.
      2. Yasal Kullanım ve Kesin Yasaklar
      Kullanıcı, Uygulamayı yalnızca yasal, medeni ve İtalyan ve Avrupa hukukuna ve kendi ikamet ülkesinin yasalarına uygun amaçlarla kullanmayı taahhüt eder. Aşağıdakiler kesinlikle yasaktır:
      çocuk pornografisi, şiddet içeren, ayrımcı, karalayıcı, hakaret içeren veya nefreti körükleyen materyal yaymak;
      her türlü suçu planlamak, teşvik etmek veya işlemek (ör. terörizm, taciz, dolandırıcılık, gasp, uyuşturucu ticareti, özel şiddet);
      başkalarının haklarını ihlal etmek (gizlilik, fikri mülkiyet, meslek sırrı);
      Uygulamayı kimlik avı, kötü amaçlı yazılım, spam veya siber saldırılar için kullanmak;
      üçüncü taraflara zarar vermek için bildirim sistemlerini veya anonimliği atlatmak.
      3. Teknik Anonimlik ve Tanımlayıcı Veri Bulunmaması
      Hizmet, kayıt anında hiçbir kişisel veri (isim, e-posta, telefon, kalıcı IP adresi) talep etmez veya toplamaz. Sunucu, mesajların iletilmesi için kesinlikle gerekli olan süre dışında (ve hiçbir şekilde oturumu aşmayacak şekilde) bağlantı kaydı veya kullanıcıların IP adreslerini muhafaza etmez.
      Bu nedenle, bir mahkeme kararı durumunda bile Sağlayıcı, kullanıcılar hakkında herhangi bir tanımlayıcı bilgi sağlayamaz veya gerçek kimliklerine ulaşamaz.
      Bir hesapla ilişkilendirilen tek veri, kullanıcının seçtiği ve gerçek bir kişiyi tanımlamaya izin vermeyen kullanıcı adıdır.
      4. Yasa Dışı Kullanımlar İçin Sağlayıcının Tamamen Sorumluluk Reddi
      Sağlayıcı, aşağıdakilerden hukuken, cezai veya idari olarak hiçbir şekilde sorumlu değildir:
      kullanıcıların içerikleri, konuşmaları, dosyaları veya eylemleri;
      üçüncü kişilerin alınan mesajları kullanma şekli;
      Uygulama aracılığıyla işlenen olası suçlar (platform, 70/2003 sayılı Kanun Hükmünde Kararname'nin 14. maddesi ve AB 2000/31/EC Direktifi uyarınca pasif ve tarafsız bir veri iletim aracı olduğundan).
      Kullanıcı, hizmetin kullanımından kaynaklanan tüm riskleri üstlenir.
      5. Tazmin Yükümlülüğü (Garanti)
      Kullanıcı, Sağlayıcıyı aşağıdakilerden kaynaklanan her türlü talep, yasal işlem, para cezası, yaptırım, yasal masraf veya tazminattan tazmin etmeyi, zararsız kılmayı ve savunmayı taahhüt eder:
      kullanıcı tarafından bu koşulların ihlali;
      kendi hesabına/oturumuna atfedilebilen Uygulamanın yasa dışı veya yetkisiz kullanımları;
      Uygulamanın kullanımından kaynaklanan kullanıcılar arasındaki veya üçüncü taraflarla olan anlaşmazlıklar.
      Sağlayıcının, kullanıcıya atfedilebilen bir fiil nedeniyle mahkum edilmesi durumunda, kullanıcı, yasal ücretler dahil olmak üzere Sağlayıcıya ödenen tutarın tamamını geri ödemekle yükümlüdür.
      6. Yetkililerle İş Birliği ve Teknik Sınırlamalar
      Sağlayıcı, yürürlükteki yasalara saygı göstererek, hizmetin olası yasa dışı kullanımlarıyla mücadele etmek amacıyla yargı veya polis makamlarıyla tam iş birliği yapmaya hazır olduğunu beyan eder.
      Bununla birlikte, kullanıcı aşağıdakileri not eder ve kabul eder:
      hizmet, kullanıcıların IP adreslerini veya diğer tanımlayıcı verilerini toplamayacak veya saklamayacak şekilde tasarlanmıştır;
      Sağlayıcının özel sohbet içeriklerine görsel erişimi yoktur ve bunları çıkarma teknik kapasitesi yoktur;
      olası teknik kayıtlar (zaman damgaları, bağlantı meta verileri veya sistem izleri gibi) yalnızca sunucu altyapı sağlayıcısında (barındırma sağlayıcısı) bulunabilir ve Sağlayıcının doğrudan kullanımında değildir;
      Sağlayıcı, sahip olmadığı veya teknik olarak erişilemeyen verileri sağlayamaz ve kendi anonimlik ve şifreleme önlemlerini aşamaz.
      Bir yetkili makamın resmi talebi halinde, Sağlayıcı aşağıdakileri yapmayı taahhüt eder:
      teknik olarak mümkün olduğunda, belirtilen kullanıcının hesabını derhal askıya almak veya silmek;
      yetkili makama kendi elindeki her türlü bilgiyi (minimal veya tanımlayıcı olmasa bile) sağlamak;
      yetkili makama, Sağlayıcının kullanımında olmayan olası teknik kayıtları doğrudan talep edebilmesi için sunucu sağlayıcısının iletişim bilgilerini vermek.
      Kullanıcı, hizmetin doğası gereği Sağlayıcının iş birliğinin, hiçbir zaman sahip olmadığı verileri toplama veya teslim etme konusundaki nesnel teknik imkansızlığıyla sınırlı olduğunu kabul eder. Bu sözleşmenin hiçbir hükmü, Sağlayıcının yasanın tutmasını zorunlu kılmadığı delilleri veya kimlik bilgilerini sağlama yükümlülüğü olarak yorumlanamaz.
      7. Garanti ve Kullanılabilirlik Sınırları
      Hizmet “olduğu gibi”, süreklilik, hatasız çalışma veya mutlak güvenlik garantisi olmaksızın sağlanır. Sağlayıcı, üçüncü taraflarca dinleme veya teknik güvenlik açıklarının olmadığını garanti etmez.
      8. Süre, Değişiklik ve Fesih
      Sağlayıcı, bu koşulları herhangi bir zamanda, Uygulama aracılığıyla bildirimde bulunarak değiştirebilir. Değişiklikten sonra hizmeti kullanmaya devam etmek, kabul anlamına gelir. Kullanıcı kullanımı istediği zaman durdurabilir. İhlal durumunda Sağlayıcı, önceden bildirimde bulunmaksızın erişimi iptal edebilir.
      9. Yetkili Mahkeme ve Uygulanacak Hukuk
      Bu sözleşme İtalyan hukukuna tabidir. Hizmet veya bu koşullarla ilgili her türlü uyuşmazlık için özel yetkili mahkeme, Sağlayıcının ikamet ettiği yerin (veya kendi seçimine göre Milano/Roma) mahkemesidir. Kullanıcı, diğer her türlü yargı yetkisinden açıkça feragat eder.
      10. Kısmi Geçersizlik
      Herhangi bir maddenin geçersiz veya işlevsiz ilan edilmesi durumunda, kalan maddeler tamamen geçerli olmaya devam eder.
      11. İtalyan Medeni Kanunu md. 1341 ve 1342 uyarınca Açık Onay
      Kullanıcı, özellikle şu maddeleri okuduğunu ve açıkça onayladığını beyan eder: sorumluluk reddi (md. 4), tazmin yükümlülüğü (md. 5), garanti sınırları (md. 7), yetkili mahkeme (md. 9).

      Zorunlu Kabul Onayı
      “Kabul Ediyorum” düğmesine basarak veya görüntülemeden sonraki 10 saniye içinde Uygulamayı kullanmaya devam ederek, kullanıcı yukarıda belirtilen tüm koşulları kabul ettiğini onaylar.`,

    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 Kabulü etkinleştirmek için sonuna kadar kaydırın",

    // --- Admin alerts ---
    admin_no_requests: "Hiç kayıt talebi yok",
    admin_delete_btn: "Sil",
    admin_delete_btn_title: "Bu hesabı kalıcı olarak sil",
    admin_delete_confirm: "Bu hesabı tamamen silmek istediğine emin misin? Bu işlem geri alınamaz.",
    admin_delete_error: "Hesap silinirken bir hata oluştu",
    admin_load_error: "Talepler yüklenirken hata oluştu",
    },
  hi: {
    // ========== Autenticazione (Login / Registrazione) ==========
    login_title: 'Ghost Chat',
    login_subtitle: 'Talk local, chat global, anonymously',
    login_heading: 'लॉग इन',
    login_username_placeholder: 'यूज़रनेम',
    login_password_placeholder: 'पासवर्ड',
    login_button: 'लॉग इन',
    login_no_account: 'खाता नहीं है?',
    login_register_link: 'रजिस्टर करें',
    register_heading: 'रजिस्टर करें',
    register_username_placeholder: 'यूज़रनेम',
    register_password_placeholder: 'पासवर्ड',
    register_language_label: 'भाषा',
    register_api_key_placeholder: 'Gemini API कुंजी (वैकल्पिक)',
    register_button: 'रजिस्टर करें',
    register_has_account: 'पहले से खाता है?',
    register_login_link: 'लॉग इन',
    register_fields_required: 'सभी आवश्यक फ़ील्ड भरें',
    registration_pending: 'पंजीकरण पूरा हुआ। व्यवस्थापक की स्वीकृति की प्रतीक्षा करें।',

    // ========== Navigazione ==========
    nav_contacts: 'संपर्क',
    nav_chats: 'चैट',
    nav_profile: 'प्रोफ़ाइल',
    nav_translate: 'अनुवाद करें',

    // ========== Banner offline ==========
    offline_banner: '⚠️ ऑफ़लाइन - कनेक्शन की प्रतीक्षा में...',

    // ========== Contatti ==========
    contacts_title: 'संपर्क',
    add_contact_btn: '+ जोड़ें',
    requests_in: 'आने वाले अनुरोध',
    requests_out: 'भेजे गए अनुरोध',
    no_contacts: 'कोई संपर्क नहीं',
    pending_badge: 'लंबित',
    role_keyholder: 'की-होल्डर',
    role_guest: 'अतिथि',
    btn_accept: 'स्वीकारें',
    btn_remove: 'हटाएँ',
    contacts_manage_btn: 'संपर्क',
    new_chat_btn: 'नई चैट',
    new_chat_modal_title: 'नई चैट',
    contacts_modal_title: 'संपर्क',
    confirm_delete_contact_message: 'क्या {name} को संपर्कों से हटाएँ?',
    confirm_delete_contact_msg: 'क्या आप "{name}" संपर्क हटाना चाहते हैं?',
    contact_online: '● ऑनलाइन',
    contact_offline: '● ऑफ़लाइन',
    add_contacts_title: 'संपर्क जोड़ें',
    btn_cancel: 'रद्द करें',
    btn_send_requests: 'अनुरोध भेजें',
    select_at_least_one: 'कम से कम एक उपयोगकर्ता चुनें',
    search_contacts_placeholder: 'संपर्क खोजें...',

    // --- Modale aggiungi contatto ---
    modal_title: 'संपर्क जोड़ें',
    search_placeholder: 'यूज़रनेम खोजें...',
    btn_add: 'जोड़ें',
    btn_close: 'बंद करें',

    // ========== Chat ==========
    back_btn: '← वापस',
    clear_chat_btn: 'चैट साफ़ करें',
    typing_indicator: 'लिख रहे हैं...',
    expiry_label: '⏳ स्वतः नष्ट:',
    expiry_options: [
          { value: '0', text: 'कोई समय सीमा नहीं' },
          { value: '0.002777', text: '10 सेकंड (परीक्षण)' },
          { value: '0.0166667', text: '1 मिनट' },
          { value: '0.0833333', text: '5 मिनट' },
          { value: '1', text: '1 घंटा' },
          { value: '6', text: '6 घंटे' },
          { value: '12', text: '12 घंटे' },
          { value: '24', text: '24 घंटे' },
          { value: '168', text: '7 दिन' },
        ],
    record_btn_speak: '<img src="icons/mic.png" class="mic-icon" alt=""> बोलें',
    record_btn_dictate: '<img src="icons/mic.png" class="mic-icon" alt=""> श्रुतलेख',
    record_btn_listening: '<img src="icons/mic.png" class="mic-icon" alt=""> सुनें',
    record_btn_release: '⏹ छोड़ें',
    text_input_placeholder: 'लिखें',
    send_text_btn: 'टेक्स्ट भेजें',
    send_text_sending: 'भेजा जा रहा है...',
    message_sent_confirm: '{name} से नया संदेश\n\n{text}\n\nचैट खोलें?',
    voice_note_confirm: '{name} से नया वॉइस नोट\n\nचैट खोलें?',
    confirm_image_message: '{name} से नई इमेज\n\nचैट खोलें?',
    confirm_video_message: '{name} से नया वीडियो\n\nचैट खोलें?',
    local_notification_voice_note: '🎵 वॉइस नोट',
    local_notification_image: '🖼️ तस्वीर',
    local_notification_video: '🎬 वीडियो',
    voice_note_sent: '🎵 वॉइस नोट भेजा गया',
    voice_note_listen: '▶️ वॉइस नोट सुनें',
    no_messages: 'कोई संदेश नहीं',
    load_error: 'संदेश लोड करने में त्रुटि',
    sent_read_status: '✓✓',
    sent_delivered_status: '✓',
    ephemeral_mode: '👻 भूत',
    individual_chat: '💬 व्यक्तिगत चैट',
    group_chat: '👥 ग्रुप चैट',
    search_chats_placeholder: 'चैट खोजें...',
    btn_delete: 'हटाएँ',
    confirm_delete_chat_msg: 'क्या आप "{name}" के साथ चैट बंद करना चाहते हैं?',
    confirm_delete_message: 'क्या आप यह संदेश हटाना चाहते हैं? यह प्राप्तकर्ता की चैट से भी हट जाएगा।',

    // --- Gruppi ---
    group_chat_modal_title: 'ग्रुप चैट बनाएँ',
    group_chat_modal_subtitle: 'ऑनलाइन संपर्क चुनें',
    group_create_btn: 'ग्रुप बनाएँ',
    group_leave_btn: 'छोड़ें',
    group_invite_title: 'ग्रुप आमंत्रण',
    group_invite_accept: 'शामिल हों',
    group_invite_decline: 'अस्वीकार करें',
    group_user_joined: 'ग्रुप में शामिल हुए',
    group_user_left: 'ग्रुप छोड़ दिया',
    group_error_no_contacts_online: 'कोई ऑनलाइन संपर्क नहीं',
    group_error_select_contact: 'कम से कम एक संपर्क चुनें',
    group_error_creation_failed: 'ग्रुप बनाने में विफल',
    group_notification_created: 'ग्रुप बनाया गया',
    new_contact_request: '{{name}} से नया संपर्क अनुरोध',
    group_chat_title: 'ग्रुप ({{count}})',
    group_reconnected: 'फिर से जुड़े',
    group_timeout_suffix: ' (टाइमआउट)',
    group_empty: 'ग्रुप में सिर्फ़ आप बचे हैं।',
    group_chat_btn: '👥 ग्रुप',
    send_btn: 'भेजें',

    // ========== Profilo ==========
    profile_avatar_upload: 'प्रोफ़ाइल फ़ोटो अपलोड करें',
    profile_avatar_remove: 'हटाएँ',
    profile_username_label: 'यूज़रनेम',
    profile_language_label: 'भाषा',
    profile_api_key_label: 'Gemini API कुंजी',
    profile_api_key_placeholder: 'हटाने के लिए खाली छोड़ें',
    profile_api_key_hint: 'की-होल्डर बनने के लिए नई कुंजी डालें',
    profile_voice_label: 'पसंदीदा TTS आवाज़',
    profile_expiry_label: '⏳ वैश्विक स्वतः नष्ट',
    profile_expiry_hint: 'नए संदेश इस अवधि को अपनाएँगे (चैट में बदला जा सकता है)',
    profile_regenerate_keys: 'E2E कुंजी पुनर्जीवित करें',
    profile_regenerate_keys_hint: 'सावधान: पिछले एन्क्रिप्टेड संदेश अपठनीय हो जाएँगे।',
    profile_logout: 'लॉग आउट',
    profile_delete_account: 'खाता हटाएँ',
    profile_save: 'बदलाव सहेजें',
    profile_password_label: 'पासवर्ड',
    profile_change_password_btn: 'बदलें',
    change_password_title: 'पासवर्ड बदलें',
    current_password_placeholder: 'वर्तमान पासवर्ड',
    new_password_placeholder: 'नया पासवर्ड',
    confirm_password_placeholder: 'नया पासवर्ड पुष्टि करें',
    profile_saved: 'सेटिंग सहेजी गईं',
    profile_error: 'त्रुटि',
    profile_ui_language_label: 'इंटरफ़ेस भाषा',
    profile_theme_label: 'रंग थीम',
    theme_red: 'गहरा लाल',
    theme_blue: 'समुद्री नीला',
    theme_green: 'वन हरा',
    theme_purple: 'शाही बैंगनी',
    profile_ephemeral_default: '👻 डिफ़ॉल्ट घोस्ट',
    profile_beep_label: 'ऑडियो रिकॉर्डिंग शुरू',

    // --- Chiavi API ---
    profile_api_keys_label: 'API कुंजियाँ',
    manage_api_keys_btn: 'API कुंजियाँ प्रबंधित करें',
    profile_api_keys_hint: 'Gemini कुंजियाँ जोड़ें या हटाएँ।',
    api_keys_modal_title: 'आपकी API कुंजियाँ',
    new_api_key_placeholder: 'नई API कुंजी पेस्ट करें',
    add_api_key_btn: 'जोड़ें',
    no_api_keys: 'कोई API कुंजी सहेजी नहीं गई',
    confirm_delete_api_key: 'क्या यह कुंजी हटाएँ?',

    // ========== Errori e avvisi ==========
    error_network: 'सर्वर से कनेक्ट नहीं हो पाया',
    error_session_expired: 'सत्र समाप्त हो गया',
    error_login_failed: 'लॉगिन में त्रुटि',
    error_register_failed: 'पंजीकरण में त्रुटि',
    error_contact_load: 'संपर्क लोड करने में त्रुटि',
    error_profile_load: 'प्रोफ़ाइल लोड नहीं हो सकी',
    error_send_failed: 'भेजने में विफल। पुनः प्रयास करें।',
    error_send_text_failed: 'टेक्स्ट भेजने में विफल। कुछ क्षण बाद पुनः प्रयास करें।',
    error_dictation_blocked: 'इस ब्राउज़र पर वाक् पहचान समर्थित नहीं है।\nअनुशंसित ब्राउज़र: Google Chrome, Microsoft Edge, Safari (iOS/macOS), Firefox (फ़्लैग सक्षम करके)।',
    error_dictation_mic: 'डिक्टेशन के लिए माइक्रोफ़ोन की अनुमति अस्वीकृत।',
    error_dictation_generic: 'डिक्टेशन के दौरान त्रुटि: {error}',
    error_recording_unsupported: 'रिकॉर्डिंग समर्थित नहीं',
    error_mic_access: 'वॉइस नोट के लिए माइक्रोफ़ोन तक नहीं पहुँच पाए',
    error_voice_note_e2e: 'वॉइस नोट नहीं भेज सकते: प्राप्तकर्ता ने E2E एन्क्रिप्शन सेटअप नहीं किया है। उनसे प्रोफ़ाइल खोलने को कहें।',
    error_private_key_missing: 'निजी कुंजी अनुपलब्ध। प्रोफ़ाइल से E2E कुंजी पुनर्जीवित करें।',
    error_voice_note_send_failed: 'वॉइस नोट भेजने में विफल',
    error_text_e2e_required: 'संदेश नहीं भेज सकते: प्राप्तकर्ता ने E2E एन्क्रिप्शन सेटअप नहीं किया है। उनसे प्रोफ़ाइल खोलने को कहें।',
    error_decryption_failed: 'ऑडियो डिक्रिप्शन विफल',
    error_no_audio_data: 'ऑडियो डेटा उपलब्ध नहीं।',
    error_audio_decrypt: 'ऑडियो डिक्रिप्ट करने में विफल',
    error_ephemeral_message: 'अल्पकालिक संदेश त्रुटि',
    error_voice_note_network: 'वॉइस नोट भेजने में नेटवर्क त्रुटि',
    error_send_retry: 'भेजना विफल। टैप करके पुनः प्रयास करें।',
    error_audio_data_unavailable: 'ऑडियो डेटा उपलब्ध नहीं है।',
    error_delete_account: 'खाता हटाने में त्रुटि',
    error_generic: 'त्रुटि',
    error_key_regeneration: 'कुंजी पुनः उत्पन्न करने में त्रुटि।',
    ephemeral_language_error: 'अल्पकालिक मोड के लिए समान भाषा आवश्यक है।',
    ephemeral_offline_error: 'प्राप्तकर्ता ऑफ़लाइन है। अल्पकालिक संदेश वितरित नहीं किए जा सकते।',
    confirm_delete_contact: 'क्या इस संपर्क को हटाना है?',
    confirm_delete_account: 'क्या आप वाकई अपना खाता स्थायी रूप से हटाना चाहते हैं? यह क्रिया अपरिवर्तनीय है।',
    confirm_regenerate_keys: 'E2E कुंजी पुनर्जीवित करें? पिछले एन्क्रिप्टेड संदेश अपठनीय हो जाएँगे।',
    keys_regenerated: 'नई कुंजी सफलतापूर्वक बनाई गईं।',
    account_deleted: 'खाता सफलतापूर्वक हटा दिया गया',
    avatar_upload_error: 'इमेज अपलोड करने में त्रुटि',
    no_chats: 'कोई सक्रिय चैट नहीं',
    error_loading_chats: 'चैट लोड करने में त्रुटि',
    error_guest_diff_language: "अलग भाषा के उपयोगकर्ताओं के साथ चैट करने के लिए एक API कुंजी आवश्यक है। प्रोफ़ाइल पृष्ठ पर API कुंजी पंजीकृत करें।",
    error_guest_group_multilingual: "गेस्ट यूज़र सिर्फ एक जैसी भाषा वालों के साथ ग्रुप बना सकते हैं। मल्टीलिंगुअल ग्रुप के लिए API चाबी चाहिए।",
    warning_keyholder_add_guest_diff_language: "जिस कॉन्टैक्ट को आप ऐड कर रहे हैं, उसका गेस्ट अकाउंट है और भाषा आपसे अलग है। आपकी सभी चैट्स का अनुवाद आपकी Gemini API कुंजियों से किया जाएगा।",
    alert_fill_all_fields: 'सभी आवश्यक फ़ील्ड भरें',
    error_missing_public_key: '{memberId} के लिए सार्वजनिक कुंजी अनुपस्थित है',
    error_cannot_get_public_key: '{memberId} की सार्वजनिक कुंजी प्राप्त नहीं कर सकता',

    // ========== Notifiche push ==========
    push_new_message: '{name} से नया संदेश',
    push_voice_note: '{name} से वॉइस नोट',
    push_body: '🎵 वॉइस नोट',

    // ========== Funzionalità aggiuntive ==========
    e2e_fingerprint_self: 'आपका E2E फिंगरप्रिंट:',
    speaker_title: 'सुनें',
    media_upload_title: 'फ़ोटो या वीडियो भेजें',
    media_expiry_default_warning: 'बिना सेल्फ़-डिस्ट्रक्ट टाइमर के भेजे गए मीडिया 7 दिन बाद अपने आप हटा दिए जाएँगे।',
    lightbox_image_alt: 'तस्वीर',
    lightbox_video_alt: 'वीडियो',
    translate_show_original: 'मूल दिखाएँ',
    translating_placeholder: 'अनुवाद हो रहा है…',
    error_translation_failed: 'अनुवाद विफल',
    error_translation_api_key: 'अनुवाद के लिए API कुंजी जोड़ें',
    translate_title: 'अनुवादक',
    encrypted_message: '🔒 एन्क्रिप्टेड संदेश',

    // --- Amministrazione ---
    admin_requests_title: 'पंजीकरण अनुरोध',
    admin_requests_btn: 'अनुरोध प्रबंधित करें',
    admin_note_placeholder: 'नोट (अधिकतम 30 अक्षर)',
    admin_account_active: 'सक्रिय',
    admin_account_inactive: 'प्रतीक्षारत',
    admin_toggle_activate: 'खाता सक्रिय करें',
    admin_toggle_deactivate: 'खाता निष्क्रिय करें',
    admin_back_to_profile: '← प्रोफ़ाइल पर वापस जाएँ',

    // ========== Tour guidato ==========
    tour_chat_ephemeral: "Ghost मोड सक्रिय करें: भेजे गए संदेश सर्वर पर सहेजे नहीं जाते और चैट छोड़ने पर गायब हो जाते हैं। यह तभी काम करता है जब प्राप्तकर्ता की भी चैट खुली हो।",
    tour_chat_selfdestruct: 'हर संदेश में सेल्फ़-डिस्ट्रक्ट टाइमर लग सकता है। जैसे ही पाने वाला उसे देखता है, उल्टी गिनती शुरू हो जाती है। समय खत्म होने पर संदेश सबके लिए मिट जाता है।',
    tour_chat_dictate: 'छोटा टैप: वॉइस डिक्टेशन शुरू करता है, दूसरा टैप रोकता है और टेक्स्ट भेजता है। देर तक दबाएँ: वॉइस मैसेज रिकॉर्ड करें; छोड़ने पर भेज दिया जाता है। बोलने से पहले बीप का इंतज़ार करें।',
    tour_chat_sent: 'अपने संदेश को हटाने के लिए उसे देर तक दबाए रखें।',
    tour_chat_received: 'इमोजी रिएक्शन जोड़ने के लिए प्राप्त संदेश को देर तक दबाएँ।',
    tour_chat_speaker: 'संदेश के नीचे स्पीकर आइकन पर टैप करके उसे ज़ोर से सुनें।',
    tour_chat_clear: "अपने चैट इंटरफ़ेस के संदेश मिटाएँ, लेकिन दूसरे व्यक्ति के इंटरफ़ेस से नहीं।",
    tour_group_ghost: 'ग्रुप चैट हमेशा घोस्ट मोड में होती है: जब आप चैट छोड़ते हैं तो पूरी बातचीत और सभी संदेश मिटा दिए जाते हैं।',
    tour_contacts_fab: 'नया संपर्क जोड़ने के लिए टैप करें।',
    tour_contacts_delete: 'किसी संपर्क को हटाने के लिए उसे देर तक दबाएँ। आपको पुष्टि करनी होगी।',
    tour_chatslist_fab: "एकल या समूह चैट बनाने के लिए टैप करें। सभी समूह चैट हमेशा Ghost मोड में होती हैं: संदेश सहेजे नहीं जाते और तभी काम करते हैं जब कम से कम दो प्रतिभागियों की चैट एक साथ खुली हो।",
    tour_chatslist_delete: 'चैट को हटाने के लिए उसके बैनर पर देर तक दबाएँ। आपको पुष्टि करनी होगी।',
    tour_profile_recording: 'वह ध्वनि चुनें जो आपको सूचित करे कि वॉइस मैसेज की रिकॉर्डिंग सही से शुरू हो गई है।',
    tour_profile_api: "किसी दूसरी भाषा बोलने वालों के साथ चैट करने के लिए आपको कम से कम एक Gemini API कुंजी चाहिए। अगर आपके पास Google खाता है तो आप 3 चरणों में एक या अधिक मुफ्त कुंजियाँ भी बना सकते हैं:<br>1) <a href='https://aistudio.google.com/welcome' target='_blank' rel='noopener noreferrer'>Google AI Studio</a> पर जाएँ<br>2) नीचे बाईं तरफ 'API कुंजी बनाएँ' पर क्लिक करें<br>3) इसे यहाँ चिपकाएँ।<br>अगर आपके पास एक से अधिक कुंजियाँ हैं, तो सिस्टम पहले वाली का उपयोग तब तक करेगा जब तक उसकी दैनिक सीमा समाप्त न हो जाए, फिर स्वचालित रूप से अगली पर स्विच कर देगा।<br>वैकल्पिक रूप से, यदि आप एक सामान्य भाषा बोलते हैं तो आप बिना API कुंजी के चैट कर सकते हैं। आप दोनों को इसे प्रोफ़ाइल पृष्ठ से सेट करना होगा, लेकिन जब आप अपनी ही भाषा बोलने वाले लोगों के साथ चैट करने के लिए वापस लौटें तो इसे फिर से बदलना याद रखें।",
    tour_profile_e2e: 'अपने संदेशों के लिए नई एन्क्रिप्शन कुंजियाँ जनरेट करें। ध्यान दें: दोबारा जनरेट करने के बाद आप पुराने संदेश नहीं पढ़ पाएँगे।',
    tour_translate_howto: 'उन लोगों के साथ आमने-सामने बातचीत के लिए बनाया गया है जो आपकी भाषा नहीं बोलते। दोनों भाषाएँ चुनें। अपनी भाषा में बोलें बटन को एक बार दबाएँ, बोलें और फिर से दबाएँ। अनुवाद दिखेगा और एक आवाज़ दूसरे की भाषा में पढ़ेगी। सामने वाला अपनी भाषा के बटन से जवाब देता है।',
    tour_translate_original: 'बोलने वाले की भाषा में मूल पाठ भी देखने के लिए इसे चालू करें, ताकि आप जाँच सकें कि संदेश सही गया या नहीं। इससे आपकी API कुंजी के ज़्यादा संसाधन खर्च होते हैं: आप प्रतिदिन कम संदेशों का अनुवाद कर पाएँगे।',
    tour_translate_limits: 'अनुवादक का उपयोग आपकी Gemini API कुंजियों की दैनिक सीमाओं पर निर्भर करता है।',

    // --- UI del tour ---
    tour_next: 'आगे',
    tour_skip: 'छोड़ें',
    tour_finish: 'समाप्त',
    profile_tour_label: "टूर जानकारी",
    profile_tour_button: "टूर फिर से शुरू करें",

    // --- Legal Form ---
    terms_title: "उपयोग की शर्तें",
    terms_accept_label: "मैं घोषणा करता हूँ कि मैंने शर्तें पढ़ ली हैं और उन्हें स्वीकार करता हूँ",
    terms_confirm_btn: "स्वीकार करें और पंजीकरण करें",
    terms_text: `दस्तावेज़ – घोस्ट चैट सेवा के उपयोग की शर्तें
      प्रस्तावना
      यह सेवा (pwa “घोस्ट चैट”) केवल उपयोगकर्ताओं के बीच गुमनाम संदेशन के लिए एक तकनीकी मंच के रूप में प्रदान की जाती है। सर्वर के स्वामी/प्रशासक (“प्रदाता”) का उपयोगकर्ताओं द्वारा आदान-प्रदान की गई सामग्री, बताई गई पहचान या उपयोगकर्ताओं के आचरण पर कोई नियंत्रण नहीं है। ऐप का उपयोग उन सभी के लिए वर्जित है जो निम्नलिखित शर्तों को पूर्ण रूप से स्वीकार नहीं करते हैं।
      1. स्वीकृति और पढ़ने का दायित्व
      ऐप तक पहुँचने या उसका उपयोग करके, उपयोगकर्ता घोषणा करता है कि उसने इस दस्तावेज़ के सभी खंडों को पढ़, समझ और बिना किसी शर्त के स्वीकार कर लिया है। स्वीकृति सेवा के उपयोग के लिए एक अनिवार्य पूर्वापेक्षा है।
      2. वैध उपयोग और पूर्ण निषेध
      उपयोगकर्ता ऐप का उपयोग केवल वैध, सभ्य उद्देश्यों के लिए और इतालवी एवं यूरोपीय कानून के साथ-साथ अपने निवास देश के कानूनों के अनुपालन में करने का वचन देता है। निम्नलिखित स्पष्ट रूप से निषिद्ध है:
      बाल अश्लील, हिंसक, भेदभावपूर्ण, मानहानिकारक, अपमानजनक सामग्री या घृणा भड़काने वाली सामग्री का प्रसार;
      किसी भी प्रकार के अपराधों की योजना बनाना, बढ़ावा देना या करना (जैसे आतंकवाद, स्टॉकिंग, धोखाधड़ी, जबरन वसूली, मादक पदार्थों की तस्करी, निजी हिंसा);
      दूसरों के अधिकारों का उल्लंघन करना (गोपनीयता, बौद्धिक संपदा, व्यावसायिक गोपनीयता);
      फ़िशिंग, मैलवेयर, स्पैम या साइबर हमलों के लिए ऐप का उपयोग करना;
      दूसरों को नुकसान पहुँचाने के लिए रिपोर्टिंग या गुमनामी प्रणालियों को बायपास करना।
      3. तकनीकी गुमनामी और पहचान संबंधी डेटा का अभाव
      सेवा पंजीकरण के समय किसी भी व्यक्तिगत डेटा (नाम, ईमेल, फोन, स्थायी आईपी पता) की आवश्यकता नहीं करती है और न ही एकत्र करती है। सर्वर संदेशों के प्रसारण के लिए सख्त रूप से आवश्यक समय के अलावा (और किसी भी स्थिति में सत्र से अधिक नहीं) कोई कनेक्शन लॉग या उपयोगकर्ताओं के आईपी पते संग्रहीत नहीं करता है।
      इसलिए, न्यायिक आदेश के मामले में भी, प्रदाता उपयोगकर्ताओं के बारे में कोई पहचान संबंधी जानकारी प्रदान करने या उनकी वास्तविक पहचान का पता लगाने में सक्षम नहीं है।
      किसी खाते से जुड़ा एकमात्र डेटा उपयोगकर्ता द्वारा चुना गया उपयोगकर्ता नाम है, जो किसी प्राकृतिक व्यक्ति की पहचान करने की अनुमति नहीं देता है।
      4. अवैध उपयोगों के लिए प्रदाता की पूर्ण दायित्व से मुक्ति
      प्रदाता किसी भी तरह से – दीवानी, दंड या प्रशासनिक रूप से – उत्तरदायी नहीं है:
      उपयोगकर्ताओं की सामग्री, वार्तालापों, फ़ाइलों या कार्यों के लिए;
      तीसरे पक्षों द्वारा प्राप्त संदेशों के उपयोग के लिए;
      ऐप के माध्यम से किए गए किसी भी अपराध के लिए, क्योंकि मंच डेटा संचारित करने का एक निष्क्रिय और तटस्थ उपकरण है (विधायी डिक्री 70/2003 के अनुच्छेद 14 और यूरोपीय संघ निर्देश 2000/31/ईसी के अनुसार)।
      उपयोगकर्ता सेवा के उपयोग से उत्पन्न होने वाले सभी जोखिमों को वहन करता है।
      5. क्षतिपूर्ति का दायित्व (हानि से मुक्त रखना)
      उपयोगकर्ता प्रदाता को किसी भी दावे, कानूनी कार्रवाई, जुर्माना, प्रतिबंध, कानूनी खर्च या मुआवजे से मुक्त रखने, क्षतिपूर्ति करने और बचाव करने का वचन देता है जो निम्न से उत्पन्न होते हैं:
      उपयोगकर्ता द्वारा इन शर्तों का उल्लंघन;
      अपने खाते/सत्र से संबंधित ऐप के अवैध या अनधिकृत उपयोग;
      उपयोगकर्ताओं के बीच या ऐप के उपयोग से उत्पन्न तीसरे पक्षों के साथ विवाद।
      यदि प्रदाता को उपयोगकर्ता को जिम्मेदार ठहराए जाने वाले कार्य के लिए दोषी ठहराया जाता है, तो उपयोगकर्ता प्रदाता को भुगतान की गई पूरी राशि, जिसमें कानूनी फीस शामिल है, वापस करने के लिए बाध्य है।
      6. अधिकारियों के साथ सहयोग और तकनीकी सीमाएँ
      प्रदाता अवैध उपयोगों का मुकाबला करने के लिए लागू कानूनों के अनुपालन में न्यायिक या पुलिस अधिकारियों के साथ पूर्ण सहयोग करने के लिए अपनी उपलब्धता घोषित करता है।
      हालाँकि, उपयोगकर्ता इस बात से अवगत और सहमत है कि:
      सेवा को उपयोगकर्ताओं के आईपी पते या अन्य पहचान संबंधी डेटा को एकत्र या संग्रहीत नहीं करने के लिए डिज़ाइन किया गया है;
      प्रदाता की निजी चैट की सामग्री तक दृश्य पहुँच नहीं है और न ही उन्हें निकालने की तकनीकी क्षमता है;
      कोई भी तकनीकी लॉग (जैसे टाइमस्टैम्प, कनेक्शन मेटाडेटा या सिस्टम ट्रेस) केवल सर्वर इंफ्रास्ट्रक्चर प्रदाता (होस्टिंग प्रदाता) के पास मौजूद हो सकते हैं और प्रदाता की सीधी पहुँच में नहीं हैं;
      प्रदाता उन डेटा को प्रदान करने में सक्षम नहीं है जो उसके पास नहीं हैं या तकनीकी रूप से दुर्गम हैं, न ही अपने स्वयं के गुमनामी और एन्क्रिप्शन उपायों को बायपास करने के लिए।
      किसी अधिकारी द्वारा औपचारिक अनुरोध के मामले में, प्रदाता निम्नलिखित करने का वचन देता है:
      यदि तकनीकी रूप से संभव हो तो बताए गए उपयोगकर्ता के खाते को तुरंत निलंबित या हटा देना;
      अधिकारी को अपने पास मौजूद हर जानकारी (चाहे वह न्यूनतम हो या पहचान करने योग्य न हो) प्रदान करना;
      अधिकारी को सर्वर प्रबंधक के संपर्क विवरण बताना, ताकि वह सीधे उससे कोई भी तकनीकी लॉग मांग सके जो प्रदाता के पास उपलब्ध नहीं है।
      उपयोगकर्ता स्वीकार करता है कि सेवा की प्रकृति के कारण, प्रदाता का सहयोग उसकी उद्देश्यपूर्ण तकनीकी असंभवता द्वारा सीमित है, जो ऐसे डेटा को एकत्र या वितरित करने के लिए है जो उसके पास कभी नहीं थे। इस अनुबंध के किसी भी प्रावधान की व्याख्या प्रदाता के लिए सबूत या पहचान पत्र प्रदान करने के दायित्व के रूप में नहीं की जा सकती है जिसे रखने के लिए कानून उसे बाध्य नहीं करता है।
      7. वारंटी और उपलब्धता की सीमाएँ
      सेवा “जैसी है वैसी” प्रदान की जाती है, बिना निरंतरता, त्रुटियों की अनुपस्थिति या पूर्ण सुरक्षा की गारंटी के। प्रदाता तीसरे पक्षों द्वारा अवरोधन या तकनीकी कमजोरियों की अनुपस्थिति की गारंटी नहीं देता है।
      8. अवधि, संशोधन और निरसन
      प्रदाता किसी भी समय इन शर्तों को संशोधित कर सकता है, ऐप के माध्यम से इसकी सूचना देकर। संशोधन के बाद सेवा का निरंतर उपयोग स्वीकृति माना जाएगा। उपयोगकर्ता किसी भी समय उपयोग बंद कर सकता है। उल्लंघन की स्थिति में प्रदाता बिना किसी सूचना के पहुँच रद्द कर सकता है।
      9. सक्षम अदालत और लागू कानून
      यह अनुबंध इतालवी कानून द्वारा शासित है। सेवा या इन शर्तों से संबंधित किसी भी विवाद के लिए, विशेष अदालत वह होगी जहाँ प्रदाता का निवास स्थान है (या उसकी पसंद पर, मिलान/रोम की अदालत)। उपयोगकर्ता स्पष्ट रूप से किसी भी अन्य अधिकारिता का त्याग करता है।
      10. आंशिक अमान्यता
      यदि किसी भी खंड को अमान्य या अप्रभावी घोषित किया जाता है, तो शेष खंड पूरी तरह से वैध बने रहेंगे।
      11. इतालवी नागरिक संहिता के अनुच्छेद 1341 और 1342 के तहत स्पष्ट सहमति
      उपयोगकर्ता घोषणा करता है कि उसने विशेष रूप से निम्नलिखित खंडों को पढ़ा और अनुमोदित किया है: दायित्व से मुक्ति (अनुच्छेद 4), क्षतिपूर्ति का दायित्व (अनुच्छेद 5), वारंटी की सीमाएँ (अनुच्छेद 7), सक्षम अदालत (अनुच्छेद 9)।

      अनिवार्य स्वीकृति की पुष्टि
      “स्वीकार करता हूँ” दबाकर या दिखाने के 10 सेकंड के भीतर ऐप का उपयोग जारी रखकर, उपयोगकर्ता ऊपर दी गई सभी शर्तों को स्वीकार करने की पुष्टि करता है।`,

    // --- Modale Legal Form ---
    terms_scroll_hint: "🔽 स्वीकृति सक्रिय करने के लिए अंत तक नीचे स्क्रॉल करें",

    // --- Admin alerts ---
    admin_no_requests: "कोई रजिस्ट्रेशन रिक्वेस्ट नहीं",
    admin_delete_btn: "हटाएँ",
    admin_delete_btn_title: "इस अकाउंट को हमेशा के लिए डिलीट करें",
    admin_delete_confirm: "क्या आप यकीनन यह अकाउंट हमेशा के लिए डिलीट करना चाहते हैं? यह वापस नहीं आएगा।",
    admin_delete_error: "अकाउंट डिलीट करने में गड़बड़ी",
    admin_load_error: "रिक्वेस्ट लोड करने में एरर",
  },
};

let currentUILanguage = localStorage.getItem('ui_language') || 'it';

function t(key, params = {}) {
  const lang = translations[currentUILanguage] || translations.it;
  let text = lang[key] || translations.it[key] || key;
  for (const [k, v] of Object.entries(params)) {
    text = text.replace(`{${k}}`, v);
  }
  return text;
}

function setUILanguage(lang) {
  if (translations[lang]) {
    currentUILanguage = lang;
    localStorage.setItem('ui_language', lang);
  }
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.setAttribute('placeholder', t(key));
    }
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.setAttribute('title', t(key));
    }
  });
  // Traduci opzioni dei selettori data-i18n-select
  document.querySelectorAll('[data-i18n-select]').forEach((select) => {
    const key = select.getAttribute('data-i18n-select');
    if (key) {
      const options = t(key);
      if (Array.isArray(options)) {
        select.innerHTML = '';
        options.forEach((opt) => {
          const optionEl = document.createElement('option');
          optionEl.value = opt.value;
          optionEl.textContent = opt.text;
          select.appendChild(optionEl);
        });
      }
    }
  });
}
