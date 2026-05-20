"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./shared/task/task.entity");
let TasksService = TasksService_1 = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    async create(createTaskDto, userId) {
        this.logger.log(`[User ${userId}] Criando tarefa: "${createTaskDto.title}"`);
        const task = this.taskRepository.create({ ...createTaskDto, userId });
        return this.taskRepository.save(task);
    }
    async findAll(filters, userId) {
        const where = { userId };
        if (filters.status)
            where.status = filters.status;
        if (filters.priority)
            where.priority = filters.priority;
        if (filters.search)
            where.title = (0, typeorm_2.Like)(`%${filters.search}%`);
        return this.taskRepository.find({ where, order: { createdAt: 'DESC' } });
    }
    async findOne(id, userId) {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task)
            throw new common_1.NotFoundException(`Tarefa com ID ${id} não encontrada`);
        if (task.userId !== userId)
            throw new common_1.ForbiddenException('Sem permissão para acessar esta tarefa');
        return task;
    }
    async update(id, updateTaskDto, userId) {
        const task = await this.findOne(id, userId);
        if (task.status === task_entity_1.TaskStatus.DONE &&
            updateTaskDto.status &&
            updateTaskDto.status !== task_entity_1.TaskStatus.DONE) {
            throw new common_1.BadRequestException('Não é possível reverter o status de uma tarefa concluída');
        }
        Object.assign(task, updateTaskDto);
        return this.taskRepository.save(task);
    }
    async remove(id, userId) {
        const task = await this.findOne(id, userId);
        await this.taskRepository.remove(task);
    }
    async markAsDone(id, userId) {
        const task = await this.findOne(id, userId);
        task.status = task_entity_1.TaskStatus.DONE;
        return this.taskRepository.save(task);
    }
    async getStats(userId) {
        const tasks = await this.taskRepository.find({ where: { userId } });
        return {
            total: tasks.length,
            pending: tasks.filter((t) => t.status === task_entity_1.TaskStatus.PENDING).length,
            inProgress: tasks.filter((t) => t.status === task_entity_1.TaskStatus.IN_PROGRESS).length,
            done: tasks.filter((t) => t.status === task_entity_1.TaskStatus.DONE).length,
        };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map