import { Task } from '../../../tasks/shared/task/task.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    tasks: Task[];
    createdAt: Date;
    updatedAt: Date;
}
