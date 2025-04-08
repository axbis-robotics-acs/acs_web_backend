import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './User.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ✅ 사용자 검증 (로그인)
  async validateUser(account_id: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { account_id } });

    if (user && (await bcrypt.compare(password, user.password_tx))) {
      return true; // 비밀번호 일치
    }
    return false; // 비밀번호 불일치 또는 계정 없음
  }

  async checkRole(account_id: string) {
    // 사용자 역할 확인
    const user = await this.userRepository.findOne({ where: { account_id } });
    return user?.role_cd;
  }

  // ✅ 사용자 생성 (비밀번호 암호화 후 저장)
  async createUser(
    account_id: string,
    password: string,
    email_nm: string,
    site_cd: string,
  ) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); // 🔐 비밀번호 해싱

    const newUser = this.userRepository.create({
      account_id,
      password_tx: hashedPassword, // 🔐 해시된 비밀번호 저장
      email_nm,
      site_cd,
    });

    return await this.userRepository.save(newUser);
  }
}
