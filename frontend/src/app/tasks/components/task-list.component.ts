import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { AuthService } from '../../auth/services/auth.service';
import { Task, TaskFilters, TaskStats } from '../models/task.model';
import { TaskFormComponent } from './task-form.component';
import { TaskCardComponent } from './task-card.component';
import { UserProfileComponent } from '../../auth/components/user-profile.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskFormComponent, TaskCardComponent, UserProfileComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  private readonly tasksService = inject(TasksService);
  readonly authService  = inject(AuthService);
  private readonly router = inject(Router);

  tasks       = signal<Task[]>([]);
  stats       = signal<TaskStats>({ total: 0, pending: 0, inProgress: 0, done: 0 });
  loading     = signal(false);
  error       = signal<string | null>(null);
  showForm    = signal(false);
  editingTask = signal<Task | null>(null);
  showProfile = signal(false);   // Controla o modal de perfil

  filters: TaskFilters = {};
  searchQuery = '';

  filteredCount = computed(() => this.tasks().length);

  ngOnInit(): void { this.loadAll(); }

  loadAll(): void {
    this.loading.set(true);
    this.error.set(null);

    this.tasksService.getAll(this.filters).subscribe({
      next: (tasks) => { this.tasks.set(tasks); this.loading.set(false); },
      error: () => { this.error.set('Erro ao carregar tarefas.'); this.loading.set(false); },
    });

    this.tasksService.getStats().subscribe({
      next: (stats) => this.stats.set(stats),
    });
  }

  onSearch(): void {
    this.filters = { ...this.filters, search: this.searchQuery || undefined };
    this.loadAll();
  }

  onFilterStatus(status: string): void {
    this.filters = { ...this.filters, status: (status || undefined) as any };
    this.loadAll();
  }

  onFilterPriority(priority: string): void {
    this.filters = { ...this.filters, priority: (priority || undefined) as any };
    this.loadAll();
  }

  openCreateForm(): void   { this.editingTask.set(null); this.showForm.set(true); }
  openEditForm(task: Task): void { this.editingTask.set(task); this.showForm.set(true); }
  closeForm(): void        { this.showForm.set(false); this.editingTask.set(null); }
  onTaskSaved(): void      { this.closeForm(); this.loadAll(); }

  // Abre/fecha modal de perfil do usuário
  openProfile(): void  { this.showProfile.set(true); }
  closeProfile(): void { this.showProfile.set(false); }

  onMarkDone(task: Task): void {
    this.tasksService.markAsDone(task.id).subscribe({
      next: () => this.loadAll(),
      error: () => this.error.set('Erro ao concluir tarefa'),
    });
  }

  onDelete(task: Task): void {
    if (!confirm(`Remover "${task.title}"?`)) return;
    this.tasksService.remove(task.id).subscribe({
      next: () => this.loadAll(),
      error: () => this.error.set('Erro ao remover tarefa'),
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  clearError(): void { this.error.set(null); }
}
