import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';

// Entidades (verifique se o caminho do import está batendo com suas pastas)
import { User } from './user/shared/user/user';
import { Task } from './tasks/shared/task/task';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'todo_db',
      entities: [User, Task],
      synchronize: true, // Isso vai criar as tabelas 'user' e 'task' agora!
    }),
    TasksModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
