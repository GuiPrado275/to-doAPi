import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { authInterceptor } from './auth/interceptors/auth.interceptor';
import { authGuard } from './auth/guards/auth.guard';
import { TaskListComponent } from './tasks/components/task-list.component';
import { AuthPageComponent } from './auth/components/auth-page.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter([
      { path: 'login', component: AuthPageComponent },
      { path: '',      component: TaskListComponent, canActivate: [authGuard] },
      { path: '**',    redirectTo: '' },
    ]),
  ],
};
