// This is our database connection singleton
// We use this pattern to prevent multiple connections in development
// Is it perfect? No. Does it work? Absolutely! 

import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // This logging queries!
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
// ^ This handle hot reloading.
// Don't touch it if it works. 