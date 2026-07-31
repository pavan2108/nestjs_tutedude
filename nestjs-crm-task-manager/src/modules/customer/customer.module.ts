import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from '../../models/customer.entity';
import { DataSource } from 'typeorm';

@Module({
  providers: [
    {
      provide: 'CUSTOMER_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Customer),
      inject: ['DATA_SOURCE'],
    },
    CustomerService,
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
