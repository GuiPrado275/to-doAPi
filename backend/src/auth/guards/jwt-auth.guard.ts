import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard que protege rotas exigindo um token JWT válido no header da requisição
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
