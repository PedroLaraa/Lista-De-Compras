import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadGatewayException(`${createUserDto.email} already in use`);
    }

    const passwordHashed = await this.hashPassword(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      password: passwordHashed,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ID: ${userId} invalid or not found.`);
    }

    return user;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    if (!updateUserDto.password) {
      return await this.userRepository.save({
        ...user,
        ...updateUserDto,
      });
    } else {
      const passwordHashed = await this.hashPassword(updateUserDto.password);

      return await this.userRepository.save({
        ...user,
        ...updateUserDto,
        password: passwordHashed,
      });
    }
  }

  async deleteUser(userId: string) {
    await this.findUserById(userId);

    try {
      await this.userRepository.delete(userId);
      return `User has deleted. `;
    } catch (error) {
      return `Error: ${error}`;
    }
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email: ${email} Not Found.`);
    }

    return user;
  }

  async hashPassword(password: string) {
    if (password) {
      const saltRounds = 10;

      const passwordHashed = await hash(password, saltRounds);

      return passwordHashed;
    } else {
      return `Give a password param for hash.`;
    }
  }
}
