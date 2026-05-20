import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UserService } from './shared/user/user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from './shared/user/user.entity';

export class UpdateUserDto {
  @IsOptional() @IsString()  name?: string;
  @IsOptional() @IsEmail()   email?: string;
  @IsOptional() @IsString() @MinLength(6) password?: string;
}

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)   // Todas as rotas exigem token
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /api/user/me — retorna o perfil do usuário logado
  @Get('me')
  @ApiOperation({ summary: 'Retorna perfil do usuário autenticado' })
  getMe(@CurrentUser() user: User) {
    const { password, tasks, ...profile } = user as any;
    return profile;
  }

  // PATCH /api/user/me — atualiza nome, e-mail ou senha
  @Patch('me')
  @ApiOperation({ summary: 'Atualiza nome, e-mail ou senha do usuário' })
  @ApiResponse({ status: 200, description: 'Perfil atualizado' })
  @ApiResponse({ status: 409, description: 'E-mail já em uso' })
  async updateMe(@CurrentUser() user: User, @Body() dto: UpdateUserDto) {
    const updated = await this.userService.update(user.id, dto);
    const { password, tasks, ...profile } = updated as any;
    return profile;
  }

  // DELETE /api/user/me — exclui a conta e todas as tarefas do usuário
  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Exclui permanentemente a conta do usuário' })
  @ApiResponse({ status: 204, description: 'Conta excluída' })
  deleteMe(@CurrentUser() user: User): Promise<void> {
    return this.userService.remove(user.id);
  }
}
