import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { CacheHealthService } from './cache-health.service';
import { QueueHealthService } from './queue-health.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private cache: CacheHealthService,
    private queue: QueueHealthService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database', { timeout: 300 }),
      () => this.cache.isHealthy(),
      () => this.queue.isHealthy(),
    ]);
  }
}
