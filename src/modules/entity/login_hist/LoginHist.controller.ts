import { Controller, Get, Param } from '@nestjs/common';
import { LoginHistService } from './LoginHist.service';
import { LoginHist } from './LoginHist.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('loginhist')
@Controller('loginhist')
export class LoginHistController {
  constructor(private readonly loginhistService: LoginHistService) {}

  @Get()
  async findAll(): Promise<LoginHist[]> {
    return this.loginhistService.findAll();
  }

  async save(loginHist: LoginHist): Promise<LoginHist> {
    return this.loginhistService.create(loginHist);
  }
}
