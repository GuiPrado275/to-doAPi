import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus, TaskPriority } from './shared/task/task.entity';

const mockTask: Task = {
  id: 1,
  title: 'Tarefa Teste',
  description: null,
  status: TaskStatus.PENDING,
  priority: TaskPriority.MEDIUM,
  dueDate: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockRepository = {
  create: jest.fn().mockReturnValue(mockTask),
  save: jest.fn().mockResolvedValue(mockTask),
  find: jest.fn().mockResolvedValue([mockTask]),
  findOne: jest.fn().mockResolvedValue(mockTask),
  remove: jest.fn().mockResolvedValue(mockTask),
};

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const result = await service.create({ title: 'Tarefa Teste' });
    expect(result).toEqual(mockTask);
    expect(mockRepository.create).toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should return all tasks', async () => {
    const result = await service.findAll({});
    expect(result).toEqual([mockTask]);
  });

  it('should throw NotFoundException for unknown id', async () => {
    mockRepository.findOne.mockResolvedValueOnce(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should remove a task', async () => {
    await expect(service.remove(1)).resolves.toBeUndefined();
  });
});
