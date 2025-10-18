import { Module } from '@nestjs/common';

import { MailModule } from './mail/mail.module';

@Module({
  imports: [MailModule],
})
export class MicroserviceModule {}
