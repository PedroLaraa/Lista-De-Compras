import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cart' })
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'date', nullable: false })
  date: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user_owner: UserEntity;

  @OneToOne(() => ProductEntity)
  @JoinColumn()
  product?: ProductEntity[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
