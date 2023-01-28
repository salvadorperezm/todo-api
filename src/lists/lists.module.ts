import { Module } from '@nestjs/common';
import { ListsService } from './service/lists.service';

@Module({
  providers: [ListsService]
})
export class ListsModule {}
