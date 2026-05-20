import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/shared/user/user.entity';

// Decorator que extrai o usuário autenticado do request e injeta como parâmetro no controller
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
