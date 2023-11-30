import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dtos/createCart.dto';
import { UserService } from 'src/user/user.service';
import { ProductEntity } from 'src/product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly userService: UserService,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
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

  async listCartByUser(userId: string): Promise<CartEntity[]> {
    await this.userService.findUserById(userId);

    return await this.cartRepository.find({
      where: {
        userId,
      },
    });
  }

  async listCartById(cartId: string, userId: string): Promise<CartEntity> {
    await this.userService.findUserById(userId);

    const cart = await this.cartRepository.findOne({
      where: {
        id: cartId,
      },
      relations: {
        product: true,
      },
    });

    await this.verifyCartOwner(cart.userId, userId);

    return cart;
  }

  async updateCart(
    cartId: string,
    userId: string,
    updateCartDto: CreateCartDto,
  ): Promise<CartEntity> {
    await this.userService.findUserById(userId);

    const cart = await this.listCartById(cartId, userId);

    await this.verifyCartOwner(cart.userId, userId);

    return await this.cartRepository.save({
      ...cart,
      ...updateCartDto,
    });
  }

  async deleteCart(cartId: string, userId: string) {
    await this.userService.findUserById(userId);

    const cart = await this.listCartById(cartId, userId);

    if (!cart) {
      throw new NotFoundException(`Cart with ID ${cartId} not found`);
    }

    await this.verifyCartOwner(cart.userId, userId);

    for (const product of cart.product) {
      await this.productRepository.delete(product.id);
    }

    await this.cartRepository.delete(cartId);

    return `Cart are deleted succesful`;
  }

  async verifyCartOwner(cartUserId: string, userId: string) {
    if (cartUserId !== userId) {
      throw new NotFoundException('You are allowed to see only your carts.');
    }
  }
}
