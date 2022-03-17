import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../../src/user/user.service';
import { Repository, createQueryBuilder } from 'typeorm';
// import { User } from './entities/user.entity';
// import { UserModel } from './user.model';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from 'src/user/user.service';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>, // private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async addNewOrder(orderInfo): Promise<Order | null> {
    const { userId, productId } = orderInfo;
    // const userRawObject = await this.userService.getUserById(userId);
    const orderData = this.orderRepository.create({
      user: userId,
      product: productId,
    });
    const result = await this.orderRepository.save(orderData);
    return result;
  }

  async getOrderDetails(id: string): Promise<any> {
    const result = await createQueryBuilder('Order') // FROM Order
      .innerJoinAndSelect('Order.user', 'User') // Inner join User
      .innerJoinAndSelect('Order.product', 'Product') // Inner join Product
      .where('Order.id = :id', { id })
      .getOne();

    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Order not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
}
