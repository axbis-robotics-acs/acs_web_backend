import { Controller, Get, Param } from '@nestjs/common';
import { LoginHistService } from './LoginHist.service';
import { LoginHist } from './LoginHist.entity';

@Controller('loginhist')
export class LoginHistController {
  constructor(private readonly loginhistService: LoginHistService) {}

  @Get()
  async findAll(): Promise<LoginHist[]> {
    return this.loginhistService.findAll();
  }

}
