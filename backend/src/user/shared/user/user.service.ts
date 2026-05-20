import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Cria novo usuário com senha hasheada
  async create(name: string, email: string, password: string): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) throw new ConflictException('Este e-mail já está cadastrado');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ name, email, password: hashed });
    return this.userRepository.save(user);
  }

  // Busca usuário pelo e-mail (usado no login)
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Busca usuário pelo ID (usado no JWT strategy)
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  // Atualiza nome, e-mail e/ou senha do usuário autenticado
  async update(
    id: number,
    data: { name?: string; email?: string; password?: string },
  ): Promise<User> {
    const user = await this.findById(id);

    if (data.email && data.email !== user.email) {
      const conflict = await this.userRepository.findOne({ where: { email: data.email } });
      if (conflict) throw new ConflictException('Este e-mail já está em uso');
      user.email = data.email;
    }

    if (data.name)     user.name     = data.name;
    if (data.password) user.password = await bcrypt.hash(data.password, 10);

    return this.userRepository.save(user);
  }

  // Remove permanentemente a conta e todas as tarefas do usuário
  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }
}