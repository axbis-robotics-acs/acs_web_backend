import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './User.entity';
import {
  QueryRegistry,
  UpdateResult,
  DeleteResult,
} from '../../../common/query/query-registry.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly queryRegistryService: QueryRegistry,
  ) {}

  async findAll(): Promise<User[]> {
    return this.queryRegistryService.select<User>(User, {});
  }

  async selectOne<K extends keyof User>(
    where: Pick<User, K>,
  ): Promise<User | null> {
    const results = await this.queryRegistryService.select<User>(User, where);
    return results.length > 0 ? results[0] : null;
  }

  async create(userData: User): Promise<User> {
    return this.queryRegistryService.create<User>(User, userData, true);
  }

  async update<K extends keyof User>(
    where: Pick<User, K>,
    userData: User,
  ): Promise<UpdateResult> {
    return this.queryRegistryService.update<User>(User, where, userData, true);
  }

  async delete<K extends keyof User>(
    where: Pick<User, K>,
  ): Promise<DeleteResult> {
    return this.queryRegistryService.delete<User>(User, where, true);
  }

  // ✅ 사용자 검증 (로그인)
  async validateUser(account_id: string, password: string): Promise<boolean> {
    const user = await this.queryRegistryService.selectOne<User>(User, {
      account_id,
    });

    if (user && (await bcrypt.compare(password, user.password_tx))) {
      return true; // 비밀번호 일치
    }
    return false; // 비밀번호 불일치 또는 계정 없음
  }

  async checkRole(account_id: string): Promise<string | undefined> {
    // 사용자 역할 확인
    const user = await this.queryRegistryService.selectOne<User>(User, {
      account_id,
    });
    return user?.role_cd;
  }

  // ✅ 사용자 생성 (비밀번호 암호화 후 저장)
  async createUser(
    account_id: string,
    password: string,
    email_nm: string,
    site_cd: string,
  ): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); // 🔐 비밀번호 해싱

    const newUser = {
      account_id,
      password_tx: hashedPassword, // 🔐 해시된 비밀번호 저장l
      email_nm,
      site_cd,
    };

    return await this.queryRegistryService.create<User>(User, newUser, true);
  }
}
