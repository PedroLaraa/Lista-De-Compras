import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get('/:cartId')
  async getCartById(
    @Param('cartId') cartId: string,
    @UserId() userId: string,
  ): Promise<CartEntity> {
    return this.cartService.listCartById(cartId, userId);
  }

  @Get()
  async getAllCart(@UserId() userId: string): Promise<CartEntity[]> {
    return this.cartService.listCartByUser(userId);
  }

  @Put('/:cartId')
  async updateCart(
    @UserId() userId: string,
    @Param('cartId') cartId: string,
    @Body() updateCartDto: CreateCartDto,
  ): Promise<CartEntity> {
    return this.cartService.updateCart(cartId, userId, updateCartDto);
  }

  @Delete('/:cartId')
  async deleteCart(@Param('cartId') cartId: string, @UserId() userId: string) {
    await this.cartService.deleteCart(cartId, userId);
  }
}
