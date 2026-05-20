import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Task, TaskStatus } from './shared/task/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    this.logger.log(`[User ${userId}] Criando tarefa: "${createTaskDto.title}"`);
    const task = this.taskRepository.create({ ...createTaskDto, userId });
    return this.taskRepository.save(task);
  }

  async findAll(filters: FilterTaskDto, userId: number): Promise<Task[]> {
    const where: any = { userId };
    if (filters.status)   where.status   = filters.status;
    if (filters.priority) where.priority  = filters.priority;
    if (filters.search)   where.title     = Like(`%${filters.search}%`);
    return this.taskRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async findOne(id: number, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    if (task.userId !== userId) throw new ForbiddenException('Sem permissão para acessar esta tarefa');
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task> {
    const task = await this.findOne(id, userId);
    if (
      task.status === TaskStatus.DONE &&
      updateTaskDto.status &&
      updateTaskDto.status !== TaskStatus.DONE
    ) {
      throw new BadRequestException('Não é possível reverter o status de uma tarefa concluída');
    }
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(id: number, userId: number): Promise<void> {
    const task = await this.findOne(id, userId);
    await this.taskRepository.remove(task);
  }

  async markAsDone(id: number, userId: number): Promise<Task> {
    const task = await this.findOne(id, userId);
    task.status = TaskStatus.DONE;
    return this.taskRepository.save(task);
  }

  async getStats(userId: number) {
    const tasks = await this.taskRepository.find({ where: { userId } });
    return {
      total:      tasks.length,
      pending:    tasks.filter((t) => t.status === TaskStatus.PENDING).length,
      inProgress: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
      done:       tasks.filter((t) => t.status === TaskStatus.DONE).length,
    };
  }
}
