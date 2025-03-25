import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { employeeId } = req.body;

    // 1. Verify employee exists
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId }
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // 2. Create clock in record
    await prisma.attendance.create({
      data: {
        employeeId,
        clockIn: new Date(),
      }
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Clock in error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}