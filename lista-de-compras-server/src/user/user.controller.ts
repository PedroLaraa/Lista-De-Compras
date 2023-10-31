import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Put()
  async updateUser(
    @UserId() userId: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(userId, updateUser);
  }

  @Delete()
  async deleteUser(@UserId() userId: string) {
    return await this.userService.deleteUser(userId);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUser();
  }
}
