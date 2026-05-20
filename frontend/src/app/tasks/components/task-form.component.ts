import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { Task, TaskStatus, TaskPriority } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  /** Se fornecido, o formulário está no modo edição */
  @Input() task: Task | null = null;

  @Output() saved     = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private readonly tasksService = inject(TasksService);

  loading = signal(false);
  error   = signal<string | null>(null);

  // Campos do formulário
  title       = '';
  description = '';
  status: TaskStatus   = 'pending';
  priority: TaskPriority = 'medium';
  dueDate     = '';

  get isEditing(): boolean {
    return !!this.task;
  }

  ngOnInit(): void {
    if (this.task) {
      this.title       = this.task.title;
      this.description = this.task.description ?? '';
      this.status      = this.task.status;
      this.priority    = this.task.priority;
      this.dueDate     = this.task.dueDate ?? '';
    }
  }

  submit(): void {
    if (!this.title.trim()) {
      this.error.set('O título é obrigatório');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const payload = {
      title:       this.title.trim(),
      description: this.description.trim() || undefined,
      status:      this.status,
      priority:    this.priority,
      dueDate:     this.dueDate || undefined,
    };

    const request$ = this.isEditing
      ? this.tasksService.update(this.task!.id, payload)
      : this.tasksService.create(payload);

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.saved.emit();
      },
      error: (err) => {
        this.loading.set(false);
        const msg = err?.error?.message;
        this.error.set(
          Array.isArray(msg) ? msg.join(', ') : msg ?? 'Erro ao salvar tarefa',
        );
      },
    });
  }
}
