import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/tasks/dto/task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Task } from 'src/tasks/entity/tasks.entity';
import { hashPassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/users.dto';
import { User } from '../entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async findUserByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async verifyUser(userId: number, requestId: number) {
    const user = await this.usersRepository.findOne(userId);

    if (!user || user.id !== requestId) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async verifyTaskBelongsToUser(user: User, taskId: number) {
    const task = await this.tasksRepository.findOne(taskId, {
      relations: ['user'],
    });

    if (!task || user.id !== task.user.id) {
      throw new UnauthorizedException();
    }

    return task;
  }

  async createUser(payload: CreateUserDto) {
    const existingUser = await this.findUserByUsername(payload.username);

    if (existingUser) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = this.usersRepository.create({
      ...payload,
      password: hashPassword(payload.password),
    });
    return await this.usersRepository.save(newUser);
  }

  async createTask(userId: number, requestId: number, payload: CreateTaskDto) {
    const user = await this.verifyUser(userId, requestId);
    const newTask = this.tasksRepository.create({ ...payload, user });
    return await this.tasksRepository.save(newTask);
  }

  async getAllTasks(userId: number, requestId: number) {
    const user = await this.verifyUser(userId, requestId);
    const relations = await this.usersRepository.findOne(user.id, {
      relations: ['tasks'],
    });

    return relations.tasks;
  }

  async getOneTask(userId: number, requestId: number, taskId: number) {
    const user = await this.verifyUser(userId, requestId);
    await this.verifyTaskBelongsToUser(user, taskId);

    return await this.tasksRepository.findOne(taskId);
  }

  async updateOneTask(
    userId: number,
    requestId: number,
    taskId: number,
    payload: UpdateTaskDto,
  ) {
    const user = await this.verifyUser(userId, requestId);
    const task = await this.verifyTaskBelongsToUser(user, taskId);
    return await this.tasksRepository.update(
      {
        id: task.id,
      },
      {
        title: payload.title,
        isCompleted: payload.isCompleted,
      },
    );
  }

  async deleteOneTask(userId: number, requestId: number, taskId: number) {
    const user = await this.verifyUser(userId, requestId);
    const task = await this.verifyTaskBelongsToUser(user, taskId);
    return await this.tasksRepository.softDelete(task.id);
  }
}
