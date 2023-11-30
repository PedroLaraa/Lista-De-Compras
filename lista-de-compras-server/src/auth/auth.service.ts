import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { compare } from 'bcrypt';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayloadDto } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    if (!user) {
      throw new NotFoundException('Email invalid');
    }

    const passwordValid = await compare(loginDto.password, user?.password);

    if (!passwordValid) {
      throw new NotFoundException(`Password invalid`);
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayloadDto(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
