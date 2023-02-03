import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateTaskDto } from 'src/tasks/dto/task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
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
  @Post(':userId/tasks')
  createTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Request() request,
    @Body() payload: CreateTaskDto,
  ) {
    return this.usersService.createTask(userId, request.user.id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/tasks')
  getAllTasks(
    @Param('userId', ParseIntPipe) userId: number,
    @Request() request,
  ) {
    return this.usersService.getAllTasks(userId, request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/tasks/:taskId')
  getOneTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Request() request,
  ) {
    return this.usersService.getOneTask(userId, request.user.id, taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':userId/tasks/:taskId')
  updateOneTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Request() request,
    @Body() payload: UpdateTaskDto,
  ) {
    return this.usersService.updateOneTask(
      userId,
      request.user.id,
      taskId,
      payload,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/tasks/:taskId')
  deleteOneTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Request() request,
  ) {
    return this.usersService.deleteOneTask(userId, request.user.id, taskId);
  }
}
