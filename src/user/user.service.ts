import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    const matchPassword = await bcrypt.compare(password, user.password);

    if (user && matchPassword) {
      const accessToken = this.jwtService.sign({ email: user.email });
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
}
