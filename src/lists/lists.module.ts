import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entity/lists.entity';
import { ListsService } from './service/lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  providers: [ListsService],
  exports: [TypeOrmModule],
})
export class ListsModule {}
