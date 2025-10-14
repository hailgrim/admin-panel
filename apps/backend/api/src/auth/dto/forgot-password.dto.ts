import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IForgotPassword } from '@ap/shared/dist/types';

export class ForgotPasswordDto implements IForgotPassword {
  @ApiProperty({ type: String, example: 'example@mail.com' })
  @IsString()
  email: string;
}
