import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/users/entity/users.entity';
import { comparePasswords } from 'src/utils/bcrypt';

import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });

    if (user && comparePasswords(password, user.password)) {
      return user;
    }

    return null;
  }
}
