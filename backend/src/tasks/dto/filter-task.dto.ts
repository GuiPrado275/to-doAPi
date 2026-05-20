import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../shared/task/task.entity';

export class FilterTaskDto {
  @ApiPropertyOptional({ enum: TaskStatus, description: 'Filtrar por status' })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    enum: TaskPriority,
    description: 'Filtrar por prioridade',
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({
    description: 'Busca por título (parcial)',
    example: 'Estudar',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
