/**
  The code below is a singleton pattern to create a single instance of PrismaClient
  and share it across the application. This is done by creating a global variable
  that is shared. The PrismaClient instance is created only once and stored.
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: ['query'],
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
