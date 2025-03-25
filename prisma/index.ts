import { PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';

//  omits the password field from the user table
export type CustomPrismaClient = PrismaClient<
  { omit: { user: { password: true } } },
  never,
  DefaultArgs
>;

let prisma: PrismaClient<{ omit: { user: { password: true } } }>;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    omit: {
      user: {
        password: true,
      },
    },
  });
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: typeof prisma;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({
      omit: {
        user: {
          password: true,
        },
      },
    });
  }
  prisma = globalWithPrisma.prisma;
}

prisma.$extends(
  createSoftDeleteExtension({
    models: {
      User: true,
    },
    defaultConfig: {
      field: 'deletedAt',
      createValue: (deleted) => {
        if (deleted) return new Date();
        return null;
      },
    },
  })
);

export default prisma;
