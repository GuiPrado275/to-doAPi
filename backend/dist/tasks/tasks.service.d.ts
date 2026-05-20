import { Repository } from 'typeorm';
import { Task } from './shared/task/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
export declare class TasksService {
    private readonly taskRepository;
    private readonly logger;
    constructor(taskRepository: Repository<Task>);
    create(createTaskDto: CreateTaskDto, userId: number): Promise<Task>;
    findAll(filters: FilterTaskDto, userId: number): Promise<Task[]>;
    findOne(id: number, userId: number): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task>;
    remove(id: number, userId: number): Promise<void>;
    markAsDone(id: number, userId: number): Promise<Task>;
    getStats(userId: number): Promise<{
        total: number;
        pending: number;
        inProgress: number;
        done: number;
    }>;
}
