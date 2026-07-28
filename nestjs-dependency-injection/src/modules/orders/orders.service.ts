import { Inject, Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { LoggerService } from '../../helpers/logger/logger.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject() private readonly productsService: ProductsService,
    @Inject() private readonly usersService: UsersService,
    @Inject() private readonly logger: LoggerService,
  ) {}

  private ORDERS = [
    {
      id: 1,
      product_id: 1,
      user_id: 1,
      quantity: 2,
    },
  ];

  private getNewId(): number {
    const lastObject = this.ORDERS[this.ORDERS.length - 1];
    return lastObject.id + 1;
  }

  create(order: CreateOrderDto) {
    const userExists = this.usersService.isUserExistsByID(order.user_id);
    if (!userExists) {
      this.logger.error(
        `User with ID : ${order.user_id} does not exists, hacker 👾`,
      );
      return;
    }
    const prouductData = this.productsService.findById(order.product_id);
    if (!prouductData) {
      this.logger.error(
        `the product with id : ${order.product_id} does not exist`,
      );
      return;
    }

    if (!prouductData.inStock || prouductData.stock < order.quantity) {
      this.logger.error(
        `the required product with quantity does not exist in inventory`,
      );
      return;
    }

    const orderInfo = {
      id: this.getNewId(),
      ...order,
    };

    this.ORDERS.push(orderInfo);

    this.logger.info(`Successfully created order with id: ${orderInfo.id}`);

    return {
      ...orderInfo,
      user: this.usersService.findById(order.user_id),
      product: this.productsService.findById(order.product_id),
      user_id: undefined,
      product_id: undefined,
    };
  }
}
