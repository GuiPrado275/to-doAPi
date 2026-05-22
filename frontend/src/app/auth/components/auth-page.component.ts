import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

type Mode = 'login' | 'register';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router      = inject(Router);

  mode    = signal<Mode>('login');
  loading = signal(false);
  error   = signal<string | null>(null);

  // Campos
  name     = '';
  email    = '';
  password = '';

  get isLogin() { return this.mode() === 'login'; }

  toggleMode(): void {
    this.mode.set(this.isLogin ? 'register' : 'login');
    this.error.set(null);
    this.name = this.email = this.password = '';
  }

  submit(): void {
    this.error.set(null);

    if (!this.email || !this.password) {
      this.error.set('Preencha todos os campos obrigatórios');
      return;
    }

    if (!this.isLogin && !this.name.trim()) {
      this.error.set('Informe seu nome');
      return;
    }

    this.loading.set(true);

    const req$ = this.isLogin
      ? this.authService.login({ email: this.email, password: this.password })
      : this.authService.register({ name: this.name, email: this.email, password: this.password });

    req$.subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading.set(false);
        const msg = err?.error?.message;
        this.error.set(
          Array.isArray(msg) ? msg.join(', ') : msg ?? 'Ocorreu um erro. Tente novamente.',
        );
      },
    });
  }
}
//Valida os campos antes de enviar, chama o backend pra logar ou registrar dependendo do modo,
//redireciona pra tela principal, se der certo exibe o erro se der errado e limpa os campos ao alternar entre os modos.