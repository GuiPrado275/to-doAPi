import { Component, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" (click)="close()">
      <div class="profile-panel" (click)="$event.stopPropagation()">

        <div class="profile-header">
          <div class="profile-avatar">{{ authService.user()?.name?.charAt(0)?.toUpperCase() }}</div>
          <div>
            <h2 class="profile-name">{{ authService.user()?.name }}</h2>
            <p class="profile-email">{{ authService.user()?.email }}</p>
          </div>
          <button class="btn-close-x" (click)="close()">×</button>
        </div>

        <!-- Formulário de edição -->
        <form class="profile-form" (ngSubmit)="save()">
          <h3 class="section-title">Editar Perfil</h3>

          <label class="field-label">Nome</label>
          <input class="field-input" type="text" [(ngModel)]="name" name="name" placeholder="Seu nome" />

          <label class="field-label">E-mail</label>
          <input class="field-input" type="email" [(ngModel)]="email" name="email" placeholder="seu@email.com" />

          <label class="field-label">Nova Senha <span class="optional">(deixe em branco para manter)</span></label>
          <input class="field-input" type="password" [(ngModel)]="password" name="password" placeholder="Mínimo 6 caracteres" />

          @if (successMsg()) {
            <div class="alert alert-success">✓ {{ successMsg() }}</div>
          }
          @if (errorMsg()) {
            <div class="alert alert-error">⚠ {{ errorMsg() }}</div>
          }

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="saving()">
              {{ saving() ? 'Salvando...' : 'Salvar Alterações' }}
            </button>
          </div>
        </form>

        <!-- Zona de perigo -->
        <div class="danger-zone">
          <h3 class="danger-title">⚠ Zona de Perigo</h3>
          <p class="danger-desc">Excluir sua conta remove permanentemente todos os seus dados e tarefas. Essa ação não pode ser desfeita.</p>
          @if (!confirmDelete()) {
            <button class="btn btn-danger" (click)="confirmDelete.set(true)">Excluir Minha Conta</button>
          } @else {
            <div class="confirm-delete">
              <p class="confirm-text">Tem certeza? Esta ação é irreversível.</p>
              <div class="confirm-actions">
                <button class="btn btn-ghost" (click)="confirmDelete.set(false)">Cancelar</button>
                <button class="btn btn-danger" (click)="deleteAccount()" [disabled]="deleting()">
                  {{ deleting() ? 'Excluindo...' : 'Sim, excluir minha conta' }}
                </button>
              </div>
            </div>
          }
        </div>

      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.5);
      display: flex; align-items: center; justify-content: center;
      z-index: 100; padding: 1rem;
    }
    .profile-panel {
      background: #fff; border-radius: 16px;
      width: 100%; max-width: 480px;
      box-shadow: 0 20px 60px rgba(0,0,0,.2);
      overflow: hidden;
    }
    .profile-header {
      display: flex; align-items: center; gap: 1rem;
      padding: 1.5rem 1.5rem 1rem;
      border-bottom: 1px solid #f0f0f0;
      position: relative;
    }
    .profile-avatar {
      width: 52px; height: 52px; border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff; font-size: 1.4rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .profile-name { margin: 0; font-size: 1.1rem; font-weight: 700; color: #1a1a2e; }
    .profile-email { margin: 0; font-size: .85rem; color: #888; }
    .btn-close-x {
      position: absolute; right: 1rem; top: 1rem;
      background: none; border: none; font-size: 1.5rem;
      cursor: pointer; color: #aaa; line-height: 1;
    }
    .btn-close-x:hover { color: #333; }

    .profile-form { padding: 1.5rem; }
    .section-title { margin: 0 0 1rem; font-size: 1rem; font-weight: 700; color: #1a1a2e; }
    .field-label { display: block; font-size: .8rem; font-weight: 600; color: #555; margin-bottom: .35rem; margin-top: .9rem; }
    .field-label:first-of-type { margin-top: 0; }
    .optional { font-weight: 400; color: #aaa; }
    .field-input {
      width: 100%; padding: .6rem .9rem; border: 1.5px solid #e2e8f0;
      border-radius: 8px; font-size: .9rem; outline: none; box-sizing: border-box;
      transition: border .2s;
    }
    .field-input:focus { border-color: #6366f1; }
    .form-actions { margin-top: 1.25rem; }
    .alert { padding: .7rem 1rem; border-radius: 8px; font-size: .85rem; margin-top: .75rem; }
    .alert-success { background: #ecfdf5; color: #065f46; }
    .alert-error   { background: #fef2f2; color: #991b1b; }

    .danger-zone {
      margin: 0 1.5rem 1.5rem;
      padding: 1.25rem; border: 1.5px solid #fca5a5;
      border-radius: 12px; background: #fff5f5;
    }
    .danger-title { margin: 0 0 .5rem; font-size: .95rem; font-weight: 700; color: #dc2626; }
    .danger-desc  { margin: 0 0 1rem; font-size: .82rem; color: #b91c1c; }
    .confirm-delete { margin-top: .75rem; }
    .confirm-text { font-size: .85rem; color: #7f1d1d; margin: 0 0 .75rem; font-weight: 600; }
    .confirm-actions { display: flex; gap: .5rem; }

    .btn { padding: .6rem 1.2rem; border-radius: 8px; border: none; font-size: .9rem; font-weight: 600; cursor: pointer; transition: all .2s; }
    .btn:disabled { opacity: .6; cursor: not-allowed; }
    .btn-primary  { background: #6366f1; color: #fff; width: 100%; padding: .75rem; }
    .btn-primary:hover:not(:disabled) { background: #4f46e5; }
    .btn-danger   { background: #dc2626; color: #fff; }
    .btn-danger:hover:not(:disabled) { background: #b91c1c; }
    .btn-ghost    { background: transparent; color: #666; border: 1.5px solid #ddd; }
    .btn-ghost:hover { background: #f5f5f5; }
  `],
})
export class UserProfileComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();
  @Output() accountDeleted = new EventEmitter<void>();

  readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  name = '';
  email = '';
  password = '';

  saving       = signal(false);
  deleting     = signal(false);
  confirmDelete = signal(false);
  successMsg   = signal<string | null>(null);
  errorMsg     = signal<string | null>(null);

  ngOnInit(): void {
    const u = this.authService.user();
    if (u) { this.name = u.name; this.email = u.email; }
  }

  close(): void { this.closed.emit(); }

  // Envia apenas os campos que foram alterados
  save(): void {
    this.saving.set(true);
    this.successMsg.set(null);
    this.errorMsg.set(null);

    const payload: any = {};
    if (this.name  !== this.authService.user()?.name)  payload.name  = this.name;
    if (this.email !== this.authService.user()?.email) payload.email = this.email;
    if (this.password) payload.password = this.password;

    if (!Object.keys(payload).length) {
      this.saving.set(false);
      this.successMsg.set('Nenhuma alteração detectada.');
      return;
    }

    this.userService.updateMe(payload).subscribe({
      next: (updated) => {
        this.saving.set(false);
        this.password = '';
        this.successMsg.set('Perfil atualizado com sucesso!');
        // Atualiza o estado local do AuthService
        (this.authService as any)._user.set(updated);
        localStorage.setItem('todo_user', JSON.stringify(updated));
      },
      error: (err) => {
        this.saving.set(false);
        const msg = err?.error?.message;
        this.errorMsg.set(Array.isArray(msg) ? msg.join(', ') : msg ?? 'Erro ao salvar.');
      },
    });
  }

  // Exclui a conta e desloga o usuário
  deleteAccount(): void {
    this.deleting.set(true);
    this.userService.deleteMe().subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.deleting.set(false);
        this.errorMsg.set('Erro ao excluir conta. Tente novamente.');
      },
    });
  }
}
