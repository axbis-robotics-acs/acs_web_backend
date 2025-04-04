import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuRoleRel } from './MenuRoleRel.entity';

@Injectable()
export class MenuRoleRelService {
  constructor(
    @InjectRepository(MenuRoleRel)
    private readonly menurolerelRepository: Repository<MenuRoleRel>,
  ) {}

  async findAll(): Promise<MenuRoleRel[]> {
    return this.menurolerelRepository.find();
  }

  async getMenuByRole(role_cd: string, site_cd: string) {
    return this.menurolerelRepository.find({
      where: { role_cd, site_cd, usable_fl: 1 }, // 역할 & 사이트 & 활성화된 메뉴만 가져오기
      select: ['menu_cd'], // 필요한 정보만 선택
    });
  }
}
