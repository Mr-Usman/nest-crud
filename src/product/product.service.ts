import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';
// import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Product } from './entities/product.entity';
import { userInfo } from 'os';
import { ProductModel } from './product.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>, // private jwtService: JwtService,
    // private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async addNewProduct(productInfo: ProductModel): Promise<Product | null> {
    const { name, price, skuId } = productInfo;
    // const userRawObject = await this.userService.getUserById(userId);
    const productData = this.productRepository.create({
      name,
      price,
      skuId,
    });
    const result = await this.productRepository.save(productData);
    return result;
  }
}
