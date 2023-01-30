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
import { CreateListDto } from 'src/lists/dto/lists.dto';
import { UpdateListDto } from 'src/lists/dto/update-lists.dto';
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

  @UseGuards(JwtAuthGuard)
  @Get(':userId/lists/:listId')
  getOneList(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('listId', ParseIntPipe) listId: number,
    @Request() request,
  ) {
    return this.usersService.getOneList(userId, request.user.id, listId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':userId/lists/:listId')
  updateOneList(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('listId', ParseIntPipe) listId: number,
    @Request() request,
    @Body() payload: UpdateListDto,
  ) {
    return this.usersService.updateOneList(
      userId,
      request.user.id,
      listId,
      payload,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/lists/:listId')
  deleteOneList(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('listId', ParseIntPipe) listId: number,
    @Request() request,
  ) {
    return this.usersService.deleteOneList(userId, request.user.id, listId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/lists/:listId/tasks')
  createTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('listId', ParseIntPipe) listId: number,
    @Request() request,
    @Body() payload: CreateTaskDto,
  ) {
    return this.usersService.createTask(
      userId,
      request.user.id,
      listId,
      payload,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/lists/:listId/tasks')
  getAllTasksByList(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('listId', ParseIntPipe) listId: number,
    @Request() request,
  ) {
    return this.usersService.getAllTasksByList(userId, request.user.id, listId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/lists/:listId/tasks/:taskId')
  getOneTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('listId', ParseIntPipe) listId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Request() request,
  ) {
    return this.usersService.getOneTask(
      userId,
      request.user.id,
      listId,
      taskId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':userId/lists/:listId/tasks/:taskId')
  updateOneTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('listId', ParseIntPipe) listId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Request() request,
    @Body() payload: UpdateTaskDto,
  ) {
    return this.usersService.updateOneTask(
      userId,
      request.user.id,
      listId,
      taskId,
      payload,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/lists/:listId/tasks/:taskId')
  deleteOneTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('listId', ParseIntPipe) listId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Request() request,
  ) {
    return this.usersService.deleteOneTask(
      userId,
      request.user.id,
      listId,
      taskId,
    );
  }
}
