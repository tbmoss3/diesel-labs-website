import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('DieselLabs2025!', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'benton@diesel.dev' },
    update: {},
    create: {
      email: 'benton@diesel.dev',
      name: 'Benton Moss',
      password: adminPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
  });

  console.log('Created admin user:', admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
