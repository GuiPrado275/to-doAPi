import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

// PartialType torna todos os campos opcionais e herda as validações
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
