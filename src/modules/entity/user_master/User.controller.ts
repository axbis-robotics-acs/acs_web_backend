import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './User.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginHistService } from '../login_hist/LoginHist.service';
import { generateTimestampId } from 'src/common/utils/date.format';
import {
  CommonCriteria,
  CommonCriteriaHistInput,
} from 'src/common/query/common.criteria';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly loginHistService: LoginHistService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { account_id: string; password: string }) {
    const { account_id, password } = loginDto;
    const isValid = await this.userService.validateUser(account_id, password);
    const userInfo = await this.userService.selectOne({
      account_id,
    });
    if (isValid && userInfo) {
      const criteria = CommonCriteriaHistInput.build(
        userInfo.site_cd,
        'Login Successful',
        'Login',
        'system',
      );

      const loginHist = {
        hist_id: generateTimestampId(), // hist_id가 auto가 아니라면 예시로 timestamp 사용
        user_nm: account_id,
        role_cd: userInfo.role_cd,
        access_by: new Date(),
        ...(criteria as Required<CommonCriteria>), // 👈 해결 포인트
      };

      await this.loginHistService.create(loginHist);
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
