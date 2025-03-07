import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ email, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  // ✅ Update return type to 'User | null' instead of 'User | undefined'
  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } }) ?? null;
  }

  // ✅ Ensure 'findById' also returns 'User | null'
  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } }) ?? null;
  }
}
