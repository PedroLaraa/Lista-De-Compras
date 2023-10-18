import { UserEntity } from '../entities/user.entity';
import { ReturnCartDto } from 'src/cart/dtos/returnCart.dto';

export class ReturnUserDto {
  id: string;
  name: string;
  email: string;
  username: string;
  cart?: ReturnCartDto[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.username = userEntity.username;

    this.cart = userEntity.cart
      ? userEntity.cart.map((cart) => new ReturnCartDto(cart))
      : undefined;
  }
}
