# Todo Frontend — Angular 19

## Tecnologias
- **Angular 19** — standalone components, signals, control flow (`@if`, `@for`)
- **FormsModule** — two-way binding com `[(ngModel)]`
- **HttpClient** — comunicação com a API NestJS
- **SCSS** — estilos por componente

## Estrutura

```
src/app/
├── tasks/
│   ├── components/
│   │   ├── task-list.component.{ts,html,scss}   # Tela principal
│   │   ├── task-card.component.{ts,html,scss}   # Card de tarefa
│   │   └── task-form.component.{ts,html,scss}   # Modal criar/editar
│   ├── models/
│   │   └── task.model.ts                        # Interfaces TypeScript
│   └── services/
│       └── tasks.service.ts                     # HTTP service
├── app.component.ts                             # Root component
├── app.config.ts                                # Bootstrap config
└── main.ts                                      # Entry point
```

## Instalação

```bash
npm install
```

## Executar

```bash
# Certifique-se que a API NestJS está rodando em localhost:3000
npm start
# Acesse: http://localhost:4200
```

## Funcionalidades

- ✅ Listar todas as tarefas com estatísticas
- ✅ Criar nova tarefa via modal
- ✅ Editar tarefa existente
- ✅ Marcar como concluída
- ✅ Remover tarefa
- ✅ Filtrar por status e prioridade
- ✅ Busca por título em tempo real
- ✅ Badge de tarefa atrasada
- ✅ Spinner de loading e estado vazio
