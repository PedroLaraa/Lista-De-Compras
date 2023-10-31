import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { CartService } from 'src/cart/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity, CartEntity])],
  controllers: [ProductController],
  providers: [ProductService, UserService, CartService],
})
export class ProductModule {}
