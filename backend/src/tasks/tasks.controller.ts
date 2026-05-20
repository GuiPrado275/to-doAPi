import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './shared/task/task.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/shared/user/user.entity';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)           // Protege TODAS as rotas do controller
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova tarefa' })
  @ApiResponse({ status: 201, type: Task })
  create(
    @Body() dto: CreateTaskDto,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return this.tasksService.create(dto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tarefas do usuário autenticado' })
  @ApiResponse({ status: 200, type: [Task] })
  findAll(
    @Query() filters: FilterTaskDto,
    @CurrentUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.findAll(filters, user.id);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas das tarefas do usuário' })
  getStats(@CurrentUser() user: User) {
    return this.tasksService.getStats(user.id);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Buscar tarefa por ID' })
  @ApiResponse({ status: 200, type: Task })
  @ApiResponse({ status: 404, description: 'Não encontrada' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return this.tasksService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Atualizar tarefa' })
  @ApiResponse({ status: 200, type: Task })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return this.tasksService.update(id, dto, user.id);
  }

  @Patch(':id/done')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Marcar tarefa como concluída' })
  markAsDone(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return this.tasksService.markAsDone(id, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Remover tarefa' })
  @ApiResponse({ status: 204, description: 'Removida' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<void> {
    return this.tasksService.remove(id, user.id);
  }
}