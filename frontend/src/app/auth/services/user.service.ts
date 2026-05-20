import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/auth.model';

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly base = 'http://localhost:3000/api/user';

  // Busca perfil atualizado do servidor
  getMe(): Observable<AuthUser> {
    return this.http.get<AuthUser>(`${this.base}/me`);
  }

  // Atualiza nome, e-mail ou senha do usuário logado
  updateMe(payload: UpdateUserPayload): Observable<AuthUser> {
    return this.http.patch<AuthUser>(`${this.base}/me`, payload);
  }

  // Exclui permanentemente a conta e todas as tarefas
  deleteMe(): Observable<void> {
    return this.http.delete<void>(`${this.base}/me`);
  }
}
