import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, createQueryBuilder } from 'typeorm';
import { User } from './entities/user.entity';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // private jwtService: JwtService,
    private jwtService: JwtService,
  ) {}

  async verify(token: string) {
    const secretStr = await this.jwtService.verify(token);
    return {
      ...secretStr,
    };
  }

  async createNewUser(userInfo: UserModel): Promise<User> {
    const { email, password, username } = userInfo;
    const isUserExists = await this.userRepository.findOne({
      where: { email },
    });
    if (isUserExists) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = await this.userRepository.create({
      email,
      password: hashedPassword,
      username,
    });
    const result = await this.userRepository.save(userData);
    return result;
  }

  async updateUser(userObject) {
    const { id, username, oldPassword, newPassword } = userObject;
    const userData = await this.userRepository.findOne({ where: { id } });
    if (userData) {
      // check user-previous password
      const matchPassword = await bcrypt.compare(
        oldPassword,
        userData.password,
      );
      if (matchPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const updatedUserData = await getConnection()
          .createQueryBuilder()
          .update(User)
          .set({ password: hashedPassword, username })
          .where('id = :id', { id })
          .execute();
        if (updatedUserData.affected) {
          return { message: 'user updated successfully' };
        } else {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: 'User could not updated',
            },
            HttpStatus.NOT_FOUND,
          );
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Incorrect password',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }

  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    const matchPassword = await bcrypt.compare(password, user.password);

    if (user && matchPassword) {
      const accessToken = this.jwtService.sign({
        email: user.email,
        id: user.id,
      });
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async getAllUsers() {
    // const users = await this.userRepository.find();
    const users = await this.userRepository
      .createQueryBuilder('User')
      .select(['User.username', 'User.email'])
      .getMany();
    return users;
  }

  async deleteUserById(id: string) {
    const userData = await this.userRepository.findOne({ where: { id } });
    // console.log('deleted product:', productData);
    if (userData) {
      const deletedUser = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id })
        .execute();
      // const result = await this.productRepository.delete(id);
      if (deletedUser.affected) {
        return { message: 'user deleted successfully' };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'User could not deleted',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async getUserAllOrders(id: string, userId: string) {
    const userData = await this.userRepository.findOne({ where: { id } });
    if (userData) {
      const result = await createQueryBuilder('User') // FROM Order
        .innerJoinAndSelect('User.order', 'Order') // Inner join User
        .where('User.id = :id', { id: userId }) // WHERE User.id = userId
        .getOne();
      return result;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
