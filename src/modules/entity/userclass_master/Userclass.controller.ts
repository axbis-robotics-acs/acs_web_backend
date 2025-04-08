import { Controller, Get, Param } from '@nestjs/common';
import { UserclassService } from './Userclass.service';
import { Userclass } from './Userclass.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('userclass')
@Controller('userclass')
export class UserclassController {
  constructor(private readonly userclassService: UserclassService) {}

  @Get()
  async findAll(): Promise<Userclass[]> {
    return this.userclassService.findAll();
  }

}
