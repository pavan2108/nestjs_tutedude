import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject() private readonly orderService: OrdersService) {}

  @Post()
  create(@Body() order: CreateOrderDto) {
    return this.orderService.create(order);
  }
}
