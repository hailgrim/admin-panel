import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { UsersModule } from 'src/users/users.module';
import { ResourceEntity } from './resource.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResourceEntity]),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [ResourcesService],
})
export class ResourcesModule {}
