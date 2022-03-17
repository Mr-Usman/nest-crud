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
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../user/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllProduct() {
    const result = this.productService.getAllProducts();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProduct(
    @Body('name') name: string,
    @Body('skuId') skuId: string,
    @Body('price') price: string,
  ) {
    const productObject = { name, skuId, price };
    const result = this.productService.addNewProduct(productObject);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProduct(
    @Body('name') name: string,
    @Body('skuId') skuId: string,
    @Body('price') price: string,
    @Param('id') id: string,
  ) {
    const productObject = { name, skuId, price, id };
    const result = this.productService.updateProduct(productObject);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    console.log('id value:', id);
    const result = this.productService.deleteProductById(id);
    return result;
  }
}
