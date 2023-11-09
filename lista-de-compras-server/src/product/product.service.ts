import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UserService } from 'src/user/user.service';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly userService: UserService,
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

    const product = await this.listProductById(userId, productId);

    await this.verifyProductOwner(product.cart.userId, userId);

    try {
      await this.productRepository.delete(productId);
      return `Product ${productId} has been deleted`;
    } catch (error) {
      return console.error(error);
    }
  }

  async listProductById(userId: string, productId): Promise<ProductEntity> {
    await this.userService.findUserById(userId);

    return await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        cart: true,
      },
    });
  }

  async updateProduct(
    userId: string,
    productId: string,
    updateProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.listProductById(userId, productId);

    if (!product) {
      throw new BadRequestException(
        `This product id "${productId}" not exists`,
      );
    }

    await this.verifyProductOwner(product.cart.userId, userId);

    return await this.productRepository.save({
      ...product,
      ...updateProductDto,
    });
  }

  async verifyProductOwner(productUserId: string, userId: string) {
    if (productUserId !== userId) {
      throw new NotFoundException('You are allowed to see only your carts.');
    }
  }
}
