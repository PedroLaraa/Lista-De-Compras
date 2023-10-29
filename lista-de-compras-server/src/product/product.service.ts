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
    cart: CartEntity, // Adicione o carrinho como um parâmetro
  ): Promise<ProductEntity> {
    await this.userService.findUserById(userId);

    const newProduct = this.productRepository.create({
      ...createProductDto,
      cart, // Associe o carrinho ao novo produto
    });

    return await this.productRepository.save(newProduct);
  }
}
