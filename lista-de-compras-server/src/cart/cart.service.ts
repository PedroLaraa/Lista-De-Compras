import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dtos/createCart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async createCart(createCarDto: CreateCartDto): Promise<CartEntity> {
    return await this.cartRepository.save({
      ...createCarDto,
    });
  }

  async listCart(): Promise<CartEntity[]> {
    return await this.cartRepository.find();
  }
}
