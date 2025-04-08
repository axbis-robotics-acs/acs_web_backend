import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginHist } from './LoginHist.entity';

@Injectable()
export class LoginHistService {
  constructor(
    @InjectRepository(LoginHist)
    private readonly loginhistRepository: Repository<LoginHist>,
  ) {}

  async findAll(): Promise<LoginHist[]> {
    return this.loginhistRepository.find();
  }
}
