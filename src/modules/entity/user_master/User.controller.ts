import {
  Controller,
  Post,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './User.service';
import { LoginHistService } from '../login_hist/LoginHist.service';
import { ConstService } from '../const_master/Const.service';
import { generateTimestampId } from 'src/common/utils/date.format';
import {
  CommonCriteria,
  CommonCriteriaHistInput,
} from 'src/common/query/common.criteria';
import { RedisService } from 'src/common/adapter/redis/redis.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly loginHistService: LoginHistService,
    private readonly constService: ConstService,
    private readonly redisService: RedisService,
  ) { }

  @Post('login')
  async login(
    @Body()
    loginDto: {
      account_id: string;
      password: string;
      site_cd: string;
      lang_cd: string;
    },
    @Req() req: Request,
  ) {
    const { account_id, password, site_cd } = loginDto;
    const isValid = await this.userService.validateUser(
      account_id,
      password,
      site_cd,
    );
    const userInfo = await this.userService.selectOne({
      account_id,
      site_cd,
    });

    console.log(`User Info: ${JSON.stringify(userInfo)}`);

    if (isValid && userInfo) {
      const criteria = CommonCriteriaHistInput.build(
        site_cd,
        'Login Successful',
        'Login',
        'system',
      );

      const loginHist = {
        hist_id: generateTimestampId(), // hist_id가 auto가 아니라면 예시로 timestamp 사용
        user_nm: account_id,
        role_cd: userInfo.role_cd,
        access_by: new Date(),
        ...(criteria as Required<CommonCriteria>),
      };

      const sessionTimeoutStr = await this.constService.getValueByCode(
        'SESSION_TIMEOUT',
        site_cd,
      );
      const timeoutMin = Number(sessionTimeoutStr) || 60;

      req.session.user = {
        ...userInfo,
      };
      req.session.cookie.maxAge = (timeoutMin || 30) * 60 * 1000;
      // await this.redisService.setSessionUser(req.sessionID, userInfo, timeoutMin * 60 * 1000);

      await this.loginHistService.create(loginHist);
      return {
        message: 'Login successful',
        status: 200,
        session_id: req.sessionID, // 세션 ID 반환
        expiresAt: req.session.cookie.maxAge,
      };
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
