import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly userService: UserService,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    userId,
    cartId,
  ): Promise<ProductEntity> {
    await this.userService.findUserById(userId);

    return await this.productRepository.save({
      ...createProductDto,
      cartId,
    });
  }
}
