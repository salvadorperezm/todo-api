import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsModule } from 'src/lists/lists.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersController } from './controller/users.controller';
import { User } from './entity/users.entity';
import { UsersService } from './service/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ListsModule, TasksModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
