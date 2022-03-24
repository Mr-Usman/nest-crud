/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './jwt.guard';
import { UserService } from './user.service';
import {
  UserInput,
  LoginResponsePayload,
  createUserInput,
  createUserResponsePayload,
  UserOrderDetails,
  UserPayload,
} from './dto/user-input';
import { CurrentUser } from './user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => LoginResponsePayload, { nullable: true })
  async lognIn(@Args('user') user: UserInput): Promise<LoginResponsePayload> {
    const { email, password } = user;
    const result = await this.userService.loginUser(email, password);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  async getAllUsers(@CurrentUser() user: User): Promise<User[]> {
    // console.log('current user:', user);
    return await this.userService.getAllUsers();
  }

  @Mutation(() => createUserResponsePayload)
  async createUser(
    @Args('createUser') createUser: createUserInput,
  ): Promise<User> {
    const { username, email, password } = createUser;
    const result = await this.userService.createNewUser({
      username,
      email,
      password,
    });
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async getUserOrder(
    @CurrentUser() user: User,
    @Args('userOrder') userOrder: UserOrderDetails,
  ): Promise<UserPayload | any> {
    const { id: userId } = user;
    const { id } = userOrder;
    const result = await this.userService.getUserAllOrders(
      id,
      userId.toString(),
    );
    return result;
  }
}
