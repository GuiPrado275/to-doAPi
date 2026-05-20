# Todo App — NestJS + Angular

Aplicação completa de gerenciamento de tarefas (To-Do) com backend em **NestJS** e frontend em **Angular**.

```
todo-project/
├── backend/   ← API REST NestJS (porta 3000)
└── frontend/  ← SPA Angular    (porta 4200)
```

---

## Pré-requisitos

- **Node.js** 18+ e **npm** 9+
- **Angular CLI**: `npm install -g @angular/cli`
- **NestJS CLI** (opcional): `npm install -g @nestjs/cli`

---

## 1. Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
```

- API disponível em: `http://localhost:3000/api`
- Swagger/Docs em:   `http://localhost:3000/api/docs`
- Banco SQLite criado automaticamente como `todo.db`

### Endpoints

| Método | Rota                      | Descrição                    |
|--------|---------------------------|------------------------------|
| POST   | /api/tasks                | Criar tarefa                 |
| GET    | /api/tasks                | Listar (filtros opcionais)   |
| GET    | /api/tasks/stats          | Estatísticas por status      |
| GET    | /api/tasks/:id            | Buscar por ID                |
| PATCH  | /api/tasks/:id            | Atualizar parcialmente       |
| PATCH  | /api/tasks/:id/done       | Marcar como concluída        |
| DELETE | /api/tasks/:id            | Remover                      |

### Filtros disponíveis

```
GET /api/tasks?status=pending&priority=high&search=texto
```

---

## 2. Frontend (Angular)

```bash
cd frontend
npm install
npm start
```

- App disponível em: `http://localhost:4200`

---

## Boas práticas aplicadas

### Backend
- Arquitetura modular (módulo, controller, service, entity, DTOs separados)
- DTOs com `class-validator` (whitelist, transform, forbidNonWhitelisted)
- `PartialType` para reutilização de DTOs
- Repository Pattern via TypeORM
- `ParseIntPipe` para validar IDs numéricos
- `HttpCode(204)` em DELETE
- Logger nativo do NestJS
- Rota especial `/stats` antes de `/:id` para evitar conflito de rota
- CORS configurado apenas para origem do frontend
- Swagger automático com decorators

### Frontend
- Standalone components (Angular 14+)
- Signals (`signal`, `computed`) para estado reativo
- Controle de fluxo moderno (`@if`, `@for`)
- Separação de responsabilidades: model / service / component
- SCSS por componente (sem CSS global desnecessário)
- Tratamento de erros com feedback visual
- Loading states e empty states
