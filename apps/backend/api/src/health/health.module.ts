import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './health.controller';
import { CacheHealthService } from './cache-health.service';
import { CacheModule } from 'src/cache/cache.module';
import { QueueModule } from 'src/queue/queue.module';
import { QueueHealthService } from './queue-health.service';

@Module({
  imports: [TerminusModule, CacheModule, QueueModule],
  controllers: [HealthController],
  providers: [CacheHealthService, QueueHealthService],
})
export class HealthModule {}
