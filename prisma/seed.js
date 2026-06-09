const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ERRORE: imposta ADMIN_PASSWORD nel file .env');
    process.exit(1);
  }
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
  console.log('Admin creato/aggiornato:', admin.username);
}
main().finally(() => prisma.$disconnect());