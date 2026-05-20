import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Task } from './tasks/shared/task/task.entity';
import { User } from './user/shared/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.db',
      entities: [Task, User],
      synchronize: true,
      logging: false,
    }),
    UserModule,
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
