import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/shared/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/shared/user/user.entity';
export interface AuthResponse {
    access_token: string;
    user: Omit<User, 'password' | 'tasks'>;
}
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<AuthResponse>;
    login(dto: LoginDto): Promise<AuthResponse>;
    getProfile(user: User): Promise<Omit<User, 'password' | 'tasks'>>;
    private buildResponse;
}
