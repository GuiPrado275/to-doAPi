import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './shared/task/task.entity';
import { User } from '../user/shared/user/user.entity';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(dto: CreateTaskDto, user: User): Promise<Task>;
    findAll(filters: FilterTaskDto, user: User): Promise<Task[]>;
    getStats(user: User): Promise<{
        total: number;
        pending: number;
        inProgress: number;
        done: number;
    }>;
    findOne(id: number, user: User): Promise<Task>;
    update(id: number, dto: UpdateTaskDto, user: User): Promise<Task>;
    markAsDone(id: number, user: User): Promise<Task>;
    remove(id: number, user: User): Promise<void>;
}
