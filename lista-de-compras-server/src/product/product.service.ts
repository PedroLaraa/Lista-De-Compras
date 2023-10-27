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
    cartId: string,
  ): Promise<ProductEntity> {
    await this.userService.findUserById(userId);

    const product = new ProductEntity();

    product.amount = createProductDto.amount;
    product.name = createProductDto.name;
    product.price = createProductDto.price;

    const carrinho = await this.cartService.listCartById(cartId, userId);

    carrinho.product.push(product);

    return await this.productRepository.save({
      ...createProductDto,
      cartId,
    });

    await this.cartRepository.save({
      ...carrinho,
    });
  }
}
