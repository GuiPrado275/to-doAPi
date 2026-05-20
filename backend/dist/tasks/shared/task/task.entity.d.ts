import { User } from '../../../user/shared/user/user.entity';
export declare enum TaskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    DONE = "done"
}
export declare enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export declare class Task {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: number;
}
