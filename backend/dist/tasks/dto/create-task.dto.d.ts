import { TaskStatus, TaskPriority } from '../shared/task/task.entity';
export declare class CreateTaskDto {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string;
}
