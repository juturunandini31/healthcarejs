import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { employeeId } = req.body;

    // 1. Find latest clock in without clock out
    const latestRecord = await prisma.attendance.findFirst({
      where: {
        employeeId,
        clockOut: null
      },
      orderBy: {
        clockIn: 'desc'
      }
    });

    if (!latestRecord) {
      return res.status(400).json({ message: 'No active clock in found' });
    }

    // 2. Update with clock out time
    await prisma.attendance.update({
      where: { id: latestRecord.id },
      data: { clockOut: new Date() }
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Clock out error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}