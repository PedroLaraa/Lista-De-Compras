import { Body, Controller, Post, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { ProductEntity } from './entities/product.entity';
import { CartService } from 'src/cart/cart.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
  ) {}
  @Post('/:cartId')
  async createProduct(
    @Body() createProduct: CreateProductDto,
    @Param('cartId') cartId: string,
    @UserId() userId: string,
  ): Promise<ProductEntity> {
    const cart = await this.cartService.listCartById(cartId, userId);
    return this.productService.createProduct(createProduct, userId, cart);
  }

  @Put('/:productId')
  async updateProduct(
    @UserId() userId: string,
    @Body() updateProductDto: CreateProductDto,
    @Param('productId') productId: string,
  ) {
    return await this.productService.updateProduct(
      userId,
      productId,
      updateProductDto,
    );
  }

  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: string,
    @UserId() userId: string,
  ) {
    return await this.productService.delteProduct(userId, productId);
  }
}
