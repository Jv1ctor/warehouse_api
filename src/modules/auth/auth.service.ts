import { comparing, hashing } from '@/shared/bcrypt';
import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { signJwt } from '@/shared/jwt';

import type { InputLoginDto } from './dtos/input-login.dto';
import type { InputRegisterDto } from './dtos/input-register.dto';
import type { LoginDto } from './dtos/login.dto';
import type { UserDto } from './dtos/user.dto';
import type { IUserRepository } from './interface/user-repository.interface';

export const authService = (deps: { repository: IUserRepository }) => ({
  async register(input: InputRegisterDto): Promise<UserDto> {
    const existEmail = await deps.repository.findByEmail(input.email);

    if (existEmail) {
      throw new ConflictError({ message: 'Email já utilizado' });
    }

    const passHash = await hashing(input.password);

    const user = await deps.repository.create({
      name: input.name,
      email: input.email,
      password: passHash,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  },

  async login(input: InputLoginDto): Promise<LoginDto> {
    const user = await deps.repository.findByEmail(input.email);

    if (!user) {
      throw new BadRequestError({ message: 'Credenciais invalidas' });
    }

    const correctPass = await comparing(
      input.password,
      user.password as string,
    );

    if (!correctPass) {
      throw new BadRequestError({ message: 'Credenciais invalidas' });
    }

    const token = signJwt({ name: user.name, userId: user.id });

    return { token };
  },
});
