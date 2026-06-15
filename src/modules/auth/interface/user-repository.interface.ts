import type { User } from '@/generated/prisma/browser';
import type { UserCreateInput } from '@/generated/prisma/models';

export interface IUserRepository {
  create(data: Omit<UserCreateInput, 'id' | 'createdAt'>): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
