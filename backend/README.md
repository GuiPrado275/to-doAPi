# Todo API — NestJS + TypeORM + SQLite

## Tecnologias
- **NestJS 11** — framework Node.js com arquitetura modular
- **TypeORM** — ORM com suporte a migrations e decorators
- **SQLite** — banco de dados local (zero configuração)
- **class-validator / class-transformer** — validação de DTOs
- **Swagger/OpenAPI** — documentação automática da API

## Estrutura

```
src/
├── common/
│   └── filters/
│       └── all-exceptions.filter.ts   # Handler global de erros
├── tasks/
│   ├── dto/
│   │   ├── create-task.dto.ts         # Validação de criação
│   │   ├── update-task.dto.ts         # Validação de atualização (PartialType)
│   │   └── filter-task.dto.ts         # Filtros de listagem
│   ├── shared/task/
│   │   └── task.entity.ts             # Entidade TypeORM (model)
│   ├── tasks.controller.ts            # Rotas REST
│   ├── tasks.module.ts                # Módulo de tarefas
│   ├── tasks.service.ts               # Lógica de negócio
│   └── tasks.service.spec.ts          # Testes unitários
├── app.module.ts                      # Módulo raiz + TypeORM config
└── main.ts                            # Bootstrap, CORS, Swagger, Pipes
```

## Endpoints

| Método | Rota                    | Descrição                        |
|--------|-------------------------|----------------------------------|
| POST   | /api/tasks              | Criar tarefa                     |
| GET    | /api/tasks              | Listar tarefas (com filtros)     |
| GET    | /api/tasks/stats        | Estatísticas                     |
| GET    | /api/tasks/:id          | Buscar por ID                    |
| PATCH  | /api/tasks/:id          | Atualizar tarefa                 |
| PATCH  | /api/tasks/:id/done     | Marcar como concluída            |
| DELETE | /api/tasks/:id          | Remover tarefa                   |


