import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;

  @Output() onEdit   = new EventEmitter<Task>();
  @Output() onDone   = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<Task>();

  get statusLabel(): string {
    const map: Record<string, string> = {
      pending:     'Pendente',
      in_progress: 'Em Andamento',
      done:        'Concluída',
    };
    return map[this.task.status] ?? this.task.status;
  }

  get priorityLabel(): string {
    const map: Record<string, string> = {
      low:    'Baixa',
      medium: 'Média',
      high:   'Alta',
    };
    return map[this.task.priority] ?? this.task.priority;
  }

  get isDone(): boolean {
    return this.task.status === 'done';
  }

  get isOverdue(): boolean {
    if (!this.task.dueDate || this.isDone) return false;
    return new Date(this.task.dueDate) < new Date();
  }

  get formattedDueDate(): string | null {
    if (!this.task.dueDate) return null;
    return new Date(this.task.dueDate + 'T00:00:00').toLocaleDateString('pt-BR');
  }
}
