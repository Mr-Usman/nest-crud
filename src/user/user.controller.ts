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
  Request,
} from '@nestjs/common';
import { UserOrderResponsePayload } from './dto/user-input';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  addNewUser(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('pass') password: string,
  ) {
    const user = { username, email, password };
    const result = this.userService.createNewUser(user);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAllUsers() {
    const result = this.userService.getAllUsers();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(
    @Body('username') username: string,
    @Body('newPassword') newPassword: string,
    @Body('oldPassword') oldPassword: string,
    @Param('id') id: string,
  ) {
    const updateUserObject = { id, username, newPassword, oldPassword };
    const result = this.userService.updateUser(updateUserObject);
    return result;
  }

  @Post('login')
  loginUser(@Body('email') email: string, @Body('pass') password: string) {
    const result = this.userService.loginUser(email, password);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const result = this.userService.deleteUserById(id);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('order/:id')
  async getUsersOrders(
    @Param('id') id: string,
    @Request() req, // : Promise<UserOrderPayload>
  ) {
    const { id: userId } = req.user;
    const result = await this.userService.getUserAllOrders(id, userId);
    return result;
  }
}
