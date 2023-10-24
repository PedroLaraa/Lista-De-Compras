import { Body, Controller, Get, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dtos/createCart.dto';
import { CartEntity } from './entities/cart.entity';
import { UserId } from 'src/decorators/user-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Roles(UserType.User, UserType.Admin)
  @Post()
  async createCart(
    @Body() createCart: CreateCartDto,
    @UserId() userId: string,
  ): Promise<CartEntity> {
    return this.cartService.createCart(createCart, userId);
  }

  @Get()
  async getAllCart() {
    return this.cartService.listCart();
  }
}
