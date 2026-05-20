import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../user/shared/user/user.entity';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity('tasks')
export class Task {
  @ApiProperty({ description: 'ID único da tarefa', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Título da tarefa', example: 'Comprar pão' })
  @Column({ length: 200 })
  title: string;

  @ApiProperty({
    description: 'Descrição detalhada',
    example: 'Ir à padaria antes das 9h',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ApiProperty({
    enum: TaskStatus,
    description: 'Status atual da tarefa',
    default: TaskStatus.PENDING,
  })
  @Column({
    type: 'text',
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @ApiProperty({
    enum: TaskPriority,
    description: 'Prioridade da tarefa',
    default: TaskPriority.MEDIUM,
  })
  @Column({
    type: 'text',
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @ApiProperty({
    description: 'Data de vencimento',
    example: '2025-12-31',
    required: false,
  })
  @Column({ type: 'date', nullable: true })
  dueDate: string | null;

  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização' })
  @UpdateDateColumn()
  updatedAt: Date;

  // Relação com o dono da tarefa
  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;
}
