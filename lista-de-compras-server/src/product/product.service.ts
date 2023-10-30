import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UserService } from 'src/user/user.service';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly userService: UserService,
    private readonly cartService: CartService,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    userId: string,
    cart: CartEntity,
  ): Promise<ProductEntity> {
    await this.userService.findUserById(userId);

    const newProduct = this.productRepository.create({
      ...createProductDto,
      cart,
    });

    return await this.productRepository.save(newProduct);
  }

  async delteProduct(userId: string, productId: string) {
    await this.userService.findUserById(userId);

    try {
      await this.productRepository.delete(productId);
      return `Product ${productId} has been deleted`;
    } catch (error) {
      return console.error(error);
    }
  }
}
