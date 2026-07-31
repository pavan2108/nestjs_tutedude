import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { GetCustomerTaskDto } from './dto/get-customer.task.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../helpers/decarators/role.decorator';
import { RoleEnum } from '../../utils/enums/role.enum';
import { RolesGuard } from 'src/helpers/guards/roles.guard';

@Controller('customer')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @Roles(RoleEnum.ADMIN)
  async get(@Query() dto: GetCustomerTaskDto) {
    return this.customerService.get(dto);
  }
}
