import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { ProductEntity } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post(':cartId')
  async createProduct(
    @Body() createProduct: CreateProductDto,
    @UserId() userId: string,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct, userId);
  }
}
