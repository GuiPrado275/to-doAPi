import { UserService } from './shared/user/user.service';
import { User } from './shared/user/user.entity';
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
}
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getMe(user: User): any;
    updateMe(user: User, dto: UpdateUserDto): Promise<any>;
    deleteMe(user: User): Promise<void>;
}
