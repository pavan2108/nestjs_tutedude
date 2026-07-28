import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { LoggerService } from '../../helpers/logger/logger.service';

@Injectable()
export class ProductsService {
  private PRODUCTS = [
    {
      id: 1,
      name: 'Sample Product',
      stock: 1,
      inStock: true,
    },
  ];

  constructor(@Inject() private readonly logger: LoggerService) {}

  private getNewId(): number {
    const lastObject = this.PRODUCTS[this.PRODUCTS.length - 1];
    return lastObject.id + 1;
  }

  create(product: CreateProductDto) {
    if (product.stock <= 0) {
      product.stock = 0;
    }

    const productInfo = {
      id: this.getNewId(),
      name: product.name,
      stock: product.stock,
      inStock: product.stock != 0,
    };

    this.PRODUCTS.push(productInfo);

    this.logger.info(`Successfully added product with id : ${productInfo.id}`);

    return productInfo;
  }

  findById(id: number) {
    return this.PRODUCTS.find((product) => product.id === id);
  }

  findAll() {
    return this.PRODUCTS;
  }
}
