import { TaskStatus, TaskPriority } from '../shared/task/task.entity';
export declare class FilterTaskDto {
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
}
