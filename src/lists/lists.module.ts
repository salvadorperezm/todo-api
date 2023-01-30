import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entity/lists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List])],

  exports: [TypeOrmModule],
})
export class ListsModule {}
