import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(name: string, email: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User>;
    update(id: number, data: {
        name?: string;
        email?: string;
        password?: string;
    }): Promise<User>;
    remove(id: number): Promise<void>;
}
