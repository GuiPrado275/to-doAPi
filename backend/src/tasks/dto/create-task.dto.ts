import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MaxLength,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../shared/task/task.entity';

export class CreateTaskDto {
  @ApiProperty({ description: 'Título da tarefa', example: 'Estudar' })
  @IsString()
  @IsNotEmpty({ message: 'O título não pode ser vazio' })
  @MaxLength(200, { message: 'Título deve ter no máximo 200 caracteres' })
  title: string;

  @ApiProperty({
    description: 'Descrição detalhada (opcional)',
    example: 'Estudar',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: TaskStatus,
    description: 'Status inicial da tarefa',
    default: TaskStatus.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: `Status deve ser: ${Object.values(TaskStatus).join(', ')}`,
  })
  status?: TaskStatus;

  @ApiProperty({
    enum: TaskPriority,
    description: 'Prioridade da tarefa',
    default: TaskPriority.MEDIUM,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskPriority, {
    message: `Prioridade deve ser: ${Object.values(TaskPriority).join(', ')}`,
  })
  priority?: TaskPriority;

  @ApiProperty({
    description: 'Data de vencimento (YYYY-MM-DD)',
    example: '2025-12-31',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Data deve estar no formato YYYY-MM-DD' })
  dueDate?: string;
}
