import { CartEntity } from 'src/cart/entities/cart.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @Column({ name: 'price', nullable: true })
  price?: number | null;

  @Column({ name: 'check', nullable: true })
  checked?: boolean | null;

  @OneToOne(() => CartEntity)
  
}
