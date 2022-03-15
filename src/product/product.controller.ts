import {
  Controller,
  Get,
  Header,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../user/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProduct(
    @Body('name') name: string,
    @Body('skuId') skuId: string,
    @Body('price') price: string,
    @Body('userId') userId: string,
  ) {
    const productObject = { name, skuId, price, userId };
    const result = this.productService.addNewProduct(productObject);
    return result;
  }
}
