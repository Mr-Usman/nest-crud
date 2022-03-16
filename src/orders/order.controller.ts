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
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../user/jwt.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProduct(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
  ) {
    const orderObject = { userId, productId };
    const result = this.orderService.addNewOrder(orderObject);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/details/:id')
  async getOrderDetails(@Param('id') id: string) {
    const result = this.orderService.getOrderDetails(id);
    return result;
  }
}
