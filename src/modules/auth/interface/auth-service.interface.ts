import type { InputLoginDto } from '../dtos/input-login.dto';
import type { InputRegisterDto } from '../dtos/input-register.dto';
import type { LoginDto } from '../dtos/login.dto';
import type { UserDto } from '../dtos/user.dto';

export interface IAuthService {
  register(input: InputRegisterDto): Promise<UserDto>;
  login(input: InputLoginDto): Promise<LoginDto>;
}
