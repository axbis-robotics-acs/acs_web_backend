import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './User.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: { account_id: string; password: string }) {
    const { account_id, password } = loginDto;
    const isValid = await this.userService.validateUser(account_id, password);
    if (isValid) {
      return { message: 'Login successful', status: 'ok' };
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('checkRole')
  async checkRole(@Body() checkRoleDto: { account_id: string }) {
    const { account_id } = checkRoleDto;
    const role = await this.userService.checkRole(account_id);
    return { role };
  }

  @Post('register')
  async register(
    @Body()
    registerDto: {
      account_id: string;
      password: string;
      email_nm: string;
      site_cd: string;
    },
  ) {
    const newUser = await this.userService.createUser(
      registerDto.account_id,
      registerDto.password,
      registerDto.email_nm,
      registerDto.site_cd,
    );
    return { message: 'User registered successfully', user: newUser };
  }
}
