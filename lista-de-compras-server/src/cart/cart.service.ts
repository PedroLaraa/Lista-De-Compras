import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dtos/createCart.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly userService: UserService,
  ) {}

  async createCart(
    createCarDto: CreateCartDto,
    userId: string,
  ): Promise<CartEntity> {
    await this.userService.findUserById(userId);

    return await this.cartRepository.save({
      ...createCarDto,
      userId,
    });
  }

  async listCart(userId: string): Promise<CartEntity[]> {
    await this.userService.findUserById(userId);

    return await this.cartRepository.find({
      where: {
        userId,
      },
    });
  }
}
