const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Hash a sample password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create test user with clock records
  await prisma.user.create({
    data: {
      email: 'nandu@gmail.com',
      password: hashedPassword,
      clockRecords: {
        create: [
          { 
            clockIn: new Date(),
            clockOut: null
          },
          {
            clockIn: new Date(Date.now() - 86400000), // Yesterday
            clockOut: new Date(Date.now() - 82800000) // Yesterday + 10 hours
          }
        ]
      }
    }
  });

  console.log('Seed data created successfully');
}

main()
  .catch(e => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });