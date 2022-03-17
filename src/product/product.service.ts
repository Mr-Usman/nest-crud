import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
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

  async updateProduct(productObject) {
    // Promise<Product | string | null>
    const { id, name, skuId, price } = productObject;
    const productData = await this.productRepository.findOne({ where: { id } });
    if (productData) {
      const updatedProductData = await getConnection()
        .createQueryBuilder()
        .update(Product)
        .set({ name, skuId, price })
        .where('id = :id', { id })
        .execute();
      if (updatedProductData.affected) {
        return { message: 'product updated successfully' };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Product could not updated',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  async deleteProductById(id: string) {
    const productData = await this.productRepository.findOne({ where: { id } });
    if (productData) {
      const deletedProduct = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Product)
        .where('id = :id', { id })
        .execute();
      // const result = await this.productRepository.delete(id);
      if (deletedProduct.affected) {
        return { message: 'product deleted successfully' };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Product could not deleted',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  async getAllProducts(): Promise<Product[]> {
    const result = await this.productRepository.find();
    return result;
  }
}
