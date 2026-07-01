import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import contactsRoutes, { setContactsSocketIO } from './routes/contacts';
import chatsRoutes, { setChatsSocketIO } from './routes/chats';
import { setAdminSocketIO } from './routes/admin';
import conversationRoutes, { setSocketIO } from './routes/conversation';
import translateRoutes from './routes/translate';
import apiKeysRoutes from './routes/apiKeys';
import adminRoutes from './routes/admin';
import notificationRoutes from './routes/notifications';
import mediaRoutes from './routes/media';
import uploadRoutes from './routes/upload';

dotenv.config();
console.log('ENCRYPTION_KEY loaded?', !!process.env.ENCRYPTION_KEY);
console.log('ENCRYPTION_IV loaded?', !!process.env.ENCRYPTION_IV);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Current directory:', __dirname);
// Verifica configurazione storage S3
if (!process.env.S3_ENDPOINT || !process.env.S3_ACCESS_KEY_ID || !process.env.S3_SECRET_ACCESS_KEY || !process.env.S3_BUCKET) {
  console.warn('⚠️  Configurazione S3 incompleta. Lo storage dei file non funzionerà.');
} else {
  console.log('✅ Configurazione S3 trovata');
}
console.log('ENCRYPTION_KEY defined?', !!process.env.ENCRYPTION_KEY);
console.log('ENCRYPTION_IV defined?', !!process.env.ENCRYPTION_IV);

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.socket.io'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        connectSrc: [
          "'self'",
          'http://localhost:3001',
          'ws://localhost:3001',
          'wss://localhost:3001',
          'https://cdn.socket.io',
          'http://localhost:9000',
        ],
        mediaSrc: ["'self'", 'blob:', 'data:', 'http://localhost:9000'],
        imgSrc: ["'self'", 'data:', 'blob:', 'http://localhost:9000'],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

async function ensureAdminUser() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('⚠️  ADMIN_PASSWORD non impostata nel .env. Impossibile creare admin.');
    return;
  }
  try {
    const hashed = await bcrypt.hash(adminPassword, 10);
    const admin = await prisma.user.upsert({
      where: { username: 'OriginalBla' },
      update: { isAdmin: true, isActive: true },
      create: {
        username: 'OriginalBla',
        name: 'OriginalBla',
        password_hash: hashed,
        isAdmin: true,
        isActive: true,
        language_code: 'it-IT',
        flag: '🏴‍☠️',
      },
    });
    console.log('✅ Admin creato/aggiornato:', admin.username);
  } catch (err) {
    console.error('❌ Errore creazione admin:', err);
  }
}

//app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3001', credentials: true }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '100mb' }));
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Troppe richieste. Riprova più tardi.' },
});
app.use(express.static('client'));
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/chats', chatsRoutes);
const conversationLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Hai superato il limite di 10 messaggi al minuto.' },
});
app.use('/api/conversation', conversationRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/auth', apiKeysRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const server = createServer(app);

const io = new SocketIOServer(server, {
  cors: { origin: '*' },
  maxHttpBufferSize: 100 * 1024 * 1024, // 100 MB per test
});

setChatsSocketIO(io);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Token mancante'));
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    (socket as any).userId = decoded.userId;
    next();
  } catch (err) {
    next(new Error('Token non valido'));
  }
});

const onlineUsers = new Set<string>();
const activeGroups = new Map<string, { id: string; members: Set<string>; createdBy: string }>();
const userGroups = new Map<string, Set<string>>();
const disconnectTimers = new Map<string, NodeJS.Timeout>();
// Traccia quale chat singola ha aperta ogni utente (userId -> contactId)
export const activeChats = new Map<string, string | null>();
export const userVisibility = new Map<string, boolean>();   // true = pagina visibile
// Traccia quale gruppo ha aperto ogni utente (userId -> groupId)
const activeGroupChats = new Map<string, string | null>();

async function notifyContactsStatus(userId: string, online: boolean) {
  console.log(`[PRESENZA] Inizio notifica per utente ${userId}, online: ${online}`);
  try {
    if (online) {
      onlineUsers.add(userId);
    } else {
      onlineUsers.delete(userId);
    }
    const contacts = await prisma.contact.findMany({
      where: { OR: [{ user_id: userId }, { contact_id: userId }] },
      select: { user_id: true, contact_id: true },
    });
    const contactIds = contacts.map((c) => (c.user_id === userId ? c.contact_id : c.user_id));
    for (const cId of contactIds) {
      const sockets = io.sockets.adapter.rooms.get(`user_${cId}`);
      if (sockets && sockets.size > 0) {
        const event = online ? 'contact_online' : 'contact_offline';
        io.to(`user_${cId}`).emit(event, { userId });
      }
    }
  } catch (e) {
    console.error('[PRESENZA] Errore notifica stato contatti', e);
  }
}

async function handleUserLeaveGroup(userId: string, groupId: string, reason: string) {
  const group = activeGroups.get(groupId);
  if (!group || !group.members.has(userId)) return;

  const sockets = io.sockets.adapter.rooms.get(groupId);
  if (sockets) {
    for (const socketId of sockets) {
      const sock = io.sockets.sockets.get(socketId);
      if (sock && (sock as any).userId === userId) {
        sock.leave(groupId);
      }
    }
  }
  group.members.delete(userId);

  const groups = userGroups.get(userId);
  if (groups) {
    groups.delete(groupId);
    if (groups.size === 0) userGroups.delete(userId);
  }

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { username: true } });
  const userName = user?.username || userId;
  const roomSockets = io.sockets.adapter.rooms.get(groupId);
  io.to(groupId).emit('group_user_left', { userId, userName, reason, groupId });

  if (group.members.size === 0) {
    activeGroups.delete(groupId);
  }
}

io.on('connection', (socket) => {
  const userId = (socket as any).userId;
  socket.join(`user_${userId}`);
  // Invia lo stato di visibilità iniziale (presumo visibile all'avvio)
  userVisibility.set(userId, true);

  socket.on('visibility_status', (data: { visible: boolean }) => {
    userVisibility.set(userId, data.visible);
  });
  // Invia lo stato di visibilità iniziale (presumo visibile all'avvio)
  userVisibility.set(userId, true);

  socket.on('visibility_status', (data: { visible: boolean }) => {
    userVisibility.set(userId, data.visible);
  });
  console.log(`Utente connesso: ${userId}`);

  notifyContactsStatus(userId, true);

  const existingTimer = disconnectTimers.get(userId);
  if (existingTimer) {
    clearTimeout(existingTimer);
    disconnectTimers.delete(userId);
    const groups = userGroups.get(userId);
    if (groups) {
      for (const groupId of groups) {
        socket.join(groupId);
        prisma.user
          .findUnique({ where: { id: userId }, select: { username: true } })
          .then((user) => {
            const userName = user?.username || userId;
            socket.to(groupId).emit('group_user_reconnected', { userId, userName, groupId });
          });
      }
    }
  }

  (async () => {
    try {
      const contacts = await prisma.contact.findMany({
        where: { OR: [{ user_id: userId }, { contact_id: userId }] },
        select: { user_id: true, contact_id: true },
      });
      const contactIds = contacts.map((c) => (c.user_id === userId ? c.contact_id : c.user_id));
      for (const cId of contactIds) {
        if (onlineUsers.has(cId)) {
          socket.emit('contact_online', { userId: cId });
        }
      }
    } catch (e) {
      console.error(e);
    }
  })();

  socket.on('typing_start', (data) => {
    io.to(`user_${data.recipientId}`).emit('typing_start', { senderId: userId });
  });
  socket.on('typing_stop', (data) => {
    io.to(`user_${data.recipientId}`).emit('typing_stop', { senderId: userId });
  });
    // Tracciamento chat aperta
  socket.on('chat_opened', (data: { contactId: string }) => {
    activeChats.set(userId, data.contactId);
  });

  socket.on('chat_closed', () => {
    activeChats.delete(userId);
  });

  socket.on('group_chat_opened', (data: { groupId: string }) => {
    activeGroupChats.set(userId, data.groupId);
  });

  socket.on('group_chat_closed', () => {
    activeGroupChats.delete(userId);
  });

  socket.on('ephemeral_message', async (data) => {
    const senderId = (socket as any).userId;
    const sender = await prisma.user.findUnique({ where: { id: senderId } });
    if (!sender) return;

    // Verifica che il destinatario abbia la chat aperta con il mittente
    const recipientActiveChat = activeChats.get(data.recipientId);
    if (recipientActiveChat !== senderId) {
      socket.emit('ephemeral_error', { message: 'Il destinatario non ha la chat aperta' });
      return;
    }

    const recipientSockets = io.sockets.adapter.rooms.get(`user_${data.recipientId}`);
    if (!recipientSockets || recipientSockets.size === 0) {
      socket.emit('ephemeral_error', { message: 'Destinatario offline' });
      return;
    }

    io.to(`user_${data.recipientId}`).emit('ephemeral_message', {
      senderId,
      senderName: sender.username,
      encryptedPayload: data.encryptedPayload,
      timestamp: new Date().toISOString(),
      messageId: data.messageId,
      type: data.type || 'text',
    });
    socket.emit('ephemeral_sent', { messageId: data.messageId });
  });

  // Chat di gruppo effimere
  socket.on('create_group', async (data: { contactIds: string[] }) => {
    const { contactIds } = data;
    const allOnline = contactIds.every((id) => onlineUsers.has(id));
    if (!allOnline) {
      socket.emit('group_error', { errorCode: 'GROUP_OFFLINE_MEMBERS' });
      return;
    }

    // Controllo lingua per utenti guest
    const creatorUser = await prisma.user.findUnique({ where: { id: userId } });
    if (creatorUser && !creatorUser.has_api_key) {
      const members = await prisma.user.findMany({ where: { id: { in: [userId, ...contactIds] } } });
      const languages = new Set(members.map(m => m.language_code));
      if (languages.size > 1) {
        socket.emit('group_error', { errorCode: 'GUEST_GROUP_MULTILINGUAL' });
        return;
      }
    }

    const groupId = `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const memberSet = new Set<string>([userId, ...contactIds]);
    activeGroups.set(groupId, { id: groupId, members: memberSet, createdBy: userId });

    for (const memberId of memberSet) {
      if (!userGroups.has(memberId)) userGroups.set(memberId, new Set());
      userGroups.get(memberId)!.add(groupId);
    }

    socket.join(groupId);

    const creatorInfo = await prisma.user.findUnique({ where: { id: userId }, select: { username: true } });
    const creatorName = creatorInfo?.username || userId;

    for (const contactId of contactIds) {
      io.to(`user_${contactId}`).emit('group_invite', {
        groupId,
        from: userId,
        fromName: creatorName,
        members: Array.from(memberSet),
      });
    }

    socket.emit('group_created', { groupId, members: Array.from(memberSet) });
  });

  socket.on('join_group', async (data: { groupId: string }) => {
    const group = activeGroups.get(data.groupId);
    if (!group) {
      socket.emit('group_error', { message: 'Gruppo non trovato' });
      return;
    }
    if (!group.members.has(userId)) {
      socket.emit('group_error', { message: 'Non sei invitato a questo gruppo' });
      return;
    }
    socket.join(data.groupId);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });
    const userName = user?.username || userId;
    socket.to(data.groupId).emit('group_user_joined', { userId, userName, groupId: data.groupId });
  });

  socket.on('leave_group', async (data: { groupId: string }) => {
    await handleUserLeaveGroup(userId, data.groupId, 'volontaria');
  });

  socket.on('group_message', async (data) => {
    const group = activeGroups.get(data.groupId);
    if (!group || !group.members.has(userId)) {
      socket.emit('group_error', { message: 'Non fai parte del gruppo', messageId: data.messageId });
      return;
    }

    // Verifica che almeno un altro membro abbia il gruppo aperto
    const hasActiveListener = Array.from(group.members).some(
      (memberId) => memberId !== userId && activeGroupChats.get(memberId) === data.groupId
    );

    if (!hasActiveListener) {
      socket.emit('group_error', { message: 'Nessun utente disponibile per ricevere messaggi in modalità Ghost', messageId: data.messageId });
      return;
    }

    const sender = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });
    const senderName = sender?.username || userId;

    for (const memberId of group.members) {
      if (memberId === userId) continue;
      const payload = data.encryptedPayload[memberId];
      if (payload) {
        io.to(`user_${memberId}`).emit('group_message', {
          groupId: data.groupId,
          senderId: userId,
          senderName,
          encryptedPayload: payload,
          messageId: data.messageId,
          timestamp: new Date().toISOString(),
          type: data.type || 'text',
        });
      }
    }
  });

  socket.on('request_online_status', async () => {
    try {
      const contacts = await prisma.contact.findMany({
        where: { OR: [{ user_id: userId }, { contact_id: userId }] },
        select: { user_id: true, contact_id: true },
      });
      const contactIds = contacts.map((c) => (c.user_id === userId ? c.contact_id : c.user_id));
      for (const cId of contactIds) {
        if (onlineUsers.has(cId)) {
          socket.emit('contact_online', { userId: cId });
        }
      }
    } catch (e) {
      console.error('Errore richiesta stato online', e);
    }
  });

  socket.on('disconnect', () => {
    activeChats.delete(userId);
    activeGroupChats.delete(userId);   
    userVisibility.delete(userId); 
    const timer = setTimeout(async () => {
      disconnectTimers.delete(userId);
      const groups = userGroups.get(userId);
      if (groups) {
        for (const groupId of [...groups]) {
          await handleUserLeaveGroup(userId, groupId, 'timeout');
        }
      }
      notifyContactsStatus(userId, false);
    }, 30000);
    disconnectTimers.set(userId, timer);
  });
});

setSocketIO(io);
setContactsSocketIO(io);
setAdminSocketIO(io);

setInterval(
  async () => {
    const now = new Date();
    await prisma.message.deleteMany({
      where: { expires_at: { not: null, lt: now } },
    });
    console.log(`[CLEANUP] Messaggi scaduti eliminati alle ${now.toISOString()}`);
  },
  60 * 60 * 1000
);

ensureAdminUser().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
