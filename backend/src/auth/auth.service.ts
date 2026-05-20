import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/shared/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/shared/user/user.entity';

export interface AuthResponse {
  access_token: string;
  user: Omit<User, 'password' | 'tasks'>;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const user = await this.userService.create(dto.name, dto.email, dto.password);
    return this.buildResponse(user);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    return this.buildResponse(user);
  }

  async getProfile(user: User): Promise<Omit<User, 'password' | 'tasks'>> {
    const { password, tasks, ...profile } = user as any;
    return profile;
  }

  private buildResponse(user: User): AuthResponse {
    const payload = { sub: user.id, email: user.email };
    const { password, tasks, ...safeUser } = user as any;

    return {
      access_token: this.jwtService.sign(payload),
      user: safeUser,
    };
  }
}
