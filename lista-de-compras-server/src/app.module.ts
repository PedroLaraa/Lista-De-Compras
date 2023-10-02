import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      synchronize: true,
      ssl: true,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
    }),
    UserModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
