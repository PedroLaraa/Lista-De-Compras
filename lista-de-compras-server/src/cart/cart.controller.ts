import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dtos/createCart.dto';
import { CartEntity } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post()
  async createCart(@Body() createCart: CreateCartDto): Promise<CartEntity> {
    return this.cartService.createCart(createCart);
  }
}
