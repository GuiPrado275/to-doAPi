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

# Acesse: http://localhost:4200
