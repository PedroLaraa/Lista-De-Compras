import { ReturnCartDto } from 'src/cart/dtos/returnCart.dto';
import { ProductEntity } from '../entities/product.entity';

export class ReturnProdutctDto {
  id: string;
  name: string;
  amount: number;
  price?: number | null;
  checked?: boolean | null;
  cart: ReturnCartDto;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.amount = productEntity.amount;
    this.price = productEntity.price;
    this.checked = productEntity.checked;

    this.cart = productEntity.cart
      ? new ReturnCartDto(productEntity.cart)
      : undefined;
  }
}
