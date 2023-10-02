import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cart' })
export class CartEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'date', nullable: false })
  date: string;

  @Column({ name: 'user_owner', nullable: false })
  user_owner: UserEntity;

  //@Column({ name: 'products', nullable: true })
  //products?: ProductEntity[];

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.name)
  products?: ProductEntity[];
}
