import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateListDto } from 'src/lists/dto/lists.dto';
import { UpdateListDto } from 'src/lists/dto/update-lists.dto';
import { List } from 'src/lists/entity/lists.entity';
import { CreateTaskDto } from 'src/tasks/dto/task.dto';
import { Task } from 'src/tasks/entity/tasks.entity';
import { hashPassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/users.dto';
import { User } from '../entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(List) private listsRepository: Repository<List>,
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
    if (userId !== requestId) {
      throw new UnauthorizedException();
    }

    return await this.usersRepository.findOne(userId);
  }

  async verifyListBelongsToUser(user: User, listId: number) {
    const list = await this.listsRepository.findOne(listId, {
      relations: ['user'],
    });

    if (!list || list.user.id !== user.id) {
      throw new UnauthorizedException();
    }
    return await this.listsRepository.findOne(listId);
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

  async createList(userId: number, requestId: number, payload: CreateListDto) {
    const user = await this.verifyUser(userId, requestId);
    const newTask = this.listsRepository.create({
      ...payload,
      user,
    });
    return await this.listsRepository.save(newTask);
  }

  async getAllLists(userId: number, requestId: number) {
    const user = await this.verifyUser(userId, requestId);
    const relations = await this.usersRepository.findOne(user.id, {
      relations: ['lists'],
    });

    return relations.lists;
  }

  async getOneList(userId: number, requestId: number, listId: number) {
    const user = await this.verifyUser(userId, requestId);
    return await this.verifyListBelongsToUser(user, listId);
  }

  async updateOneList(
    userId: number,
    requestId: number,
    listId: number,
    payload: UpdateListDto,
  ) {
    const user = await this.verifyUser(userId, requestId);
    const list = await this.verifyListBelongsToUser(user, listId);
    return await this.listsRepository.update(
      {
        id: list.id,
      },
      {
        title: payload.title,
      },
    );
  }

  async deleteOneList(userId: number, requestId: number, listId: number) {
    const user = await this.verifyUser(userId, requestId);
    const list = await this.verifyListBelongsToUser(user, listId);
    return await this.listsRepository.softDelete(list.id);
  }

  async createTask(
    userId: number,
    requestId: number,
    listId: number,
    payload: CreateTaskDto,
  ) {
    const user = await this.verifyUser(userId, requestId);
    const list = await this.verifyListBelongsToUser(user, listId);
    const newTask = this.tasksRepository.create({ ...payload, list });
    return await this.tasksRepository.save(newTask);
  }
}
