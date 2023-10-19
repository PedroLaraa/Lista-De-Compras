import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    cartId,
  ): Promise<ProductEntity> {
    return await this.productRepository.save({
      ...createProductDto,
      cartId,
    });
  }
}
