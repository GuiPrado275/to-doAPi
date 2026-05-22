import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../../tasks/shared/task/task.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'João Silva' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @Column({ unique: true, length: 200 })
  email: string;

  // Excluído das respostas JSON automaticamente via ClassSerializerInterceptor
  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}