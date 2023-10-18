import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { CartEntity } from '../entities/cart.entity';
import { ReturnProdutctDto } from 'src/product/dtos/returnProduct.dto';

export class ReturnCartDto {
  id: string;
  name: string;
  date: string;
  product: ReturnProdutctDto[];
  user_owner: ReturnUserDto;

  constructor(cartEntity: CartEntity) {
    this.id = cartEntity.id;
    this.name = cartEntity.name;
    this.date = cartEntity.date;

    this.user_owner = cartEntity.user_owner
      ? new ReturnUserDto(cartEntity.user_owner)
      : undefined;

    this.product = cartEntity.product
      ? cartEntity.product.map((product) => new ReturnProdutctDto(product))
      : undefined;
  }
}
