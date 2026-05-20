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

- App disponível em: `http://localhost:4200`
