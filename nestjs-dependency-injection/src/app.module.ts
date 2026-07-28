import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './helpers/logger/logger.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { OrderModule } from './modules/orders/orders.module';

@Module({
  imports: [LoggerModule, UsersModule, ProductsModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
