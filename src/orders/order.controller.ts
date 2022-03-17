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
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../user/jwt.guard';
import { UserService } from '../../src/user/user.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProduct(
    // @Body('userId') userId: string,
    @Body('productId') productId: string,
    @Request() req,
  ) {
    // get user details from auth token
    const { id: userId } = req.user;
    // const { id: userId } = await this.userService.getUserById(id);
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
