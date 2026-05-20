import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  TaskStats,
  TaskFilters,
} from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/tasks';

  getAll(filters: TaskFilters = {}): Observable<Task[]> {
    let params = new HttpParams();
    if (filters.status) params = params.set('status', filters.status);
    if (filters.priority) params = params.set('priority', filters.priority);
    if (filters.search) params = params.set('search', filters.search);
    return this.http.get<Task[]>(this.baseUrl, { params });
  }

  getOne(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  getStats(): Observable<TaskStats> {
    return this.http.get<TaskStats>(`${this.baseUrl}/stats`);
  }

  create(payload: CreateTaskPayload): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, payload);
  }

  update(id: number, payload: UpdateTaskPayload): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/${id}`, payload);
  }

  markAsDone(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/${id}/done`, {});
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
