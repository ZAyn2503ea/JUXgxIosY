// 代码生成时间: 2025-09-24 07:08:06
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.validateUserPassword(username, pass);
    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }
    return user;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 登录验证的DTO，用于校验用户输入
  static AuthCredentialsDto = AuthCredentialsDto;
}