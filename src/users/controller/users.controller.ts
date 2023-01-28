import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateListDto } from 'src/lists/dto/lists.dto';
import { CreateUserDto } from '../dto/users.dto';
import { UsersService } from '../service/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/lists')
  createList(
    @Param('userId', ParseIntPipe) userId: number,
    @Request() request,
    @Body() payload: CreateListDto,
  ) {
    return this.usersService.createList(userId, request.user.id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/lists')
  getAllLists(
    @Param('userId', ParseIntPipe) userId: number,
    @Request() request,
  ) {
    return this.usersService.getAllLists(userId, request.user.id);
  }
}
