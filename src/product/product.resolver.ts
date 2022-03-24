/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../user/jwt.guard';
import { createNewProduct } from './dto/create-product';
import { ProductOrderDetails } from './dto/product-order';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => Product)
  async getProductOrderByProductId(
    @Args('productOrder') productOrder: ProductOrderDetails,
  ): Promise<Product | any> {
    const { productId } = productOrder;
    const result = this.productService.getProductById(productId);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Product])
  async getAllProductOrders(): Promise<Product[] | any> {
    const result = this.productService.getAllProdOrders();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Product)
  async addNewProduct(
    @Args('createProduct') createNewProduct: createNewProduct,
  ): Promise<Product | any> {
    const result = this.productService.addNewProduct(createNewProduct);
    return result;
  }
}
