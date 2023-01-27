import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/users.dto';
import { UsersService } from '../service/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }
}
