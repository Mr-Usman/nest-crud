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

  @Post('login')
  loginUser(@Body('email') email: string, @Body('pass') password: string) {
    const result = this.userService.loginUser(email, password);
    return result;
  }
}
