import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from './Role.service';
import { Role } from './Role.entity';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

}
