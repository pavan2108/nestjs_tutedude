import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '../../models/customer.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { GetCustomerTaskDto } from './dto/get-customer.task.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async get(dto: GetCustomerTaskDto) {
    const whereClause: FindOptionsWhere<Customer> = {};
    if (!dto.limit) {
      dto.limit = 10;
    }
    if (dto.limit <= 0 || dto.limit >= 10) {
      dto.limit = 10;
    }

    if (!dto.page) {
      dto.page = 0;
    }
    if (dto.page < 0) {
      dto.page = 0;
    }

    const customerTasks = await this.customerRepository.findAndCount({
      where: whereClause,
      skip: dto.page * dto.limit,
      take: dto.limit,
      relations: {
        tasks: true,
      },
    });

    return {
      data: customerTasks[0],
      total: customerTasks[1],
      hasNextPage: customerTasks[1] - dto.page * dto.limit > 0,
    };
  }
}
