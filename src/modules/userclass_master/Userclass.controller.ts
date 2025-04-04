import { Controller, Get, Param } from '@nestjs/common';
import { UserclassService } from './Userclass.service';
import { Userclass } from './Userclass.entity';

@Controller('userclass')
export class UserclassController {
  constructor(private readonly userclassService: UserclassService) {}

  @Get()
  async findAll(): Promise<Userclass[]> {
    return this.userclassService.findAll();
  }

}
