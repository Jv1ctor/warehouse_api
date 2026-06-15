import type { User } from '@/generated/prisma/browser';
import type { UserCreateInput } from '@/generated/prisma/models';
import { prisma } from '@/shared/database/prisma';

export const userRepository = {
  async create(data: Omit<UserCreateInput, 'id' | 'createdAt'>): Promise<User> {
    return prisma.user.create({ data });
  },

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },
};
