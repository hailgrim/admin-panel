import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { ResListDto } from 'src/database/dto/res-list.dto';
import { UserExternalDto } from './user-external.dto';
import { TUserResList } from '@ap/shared/dist/types';

export class UserResListDto
  extends ResListDto<UserExternalDto>
  implements TUserResList
{
  @ApiProperty({ type: [UserExternalDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserExternalDto)
  declare rows: UserExternalDto[];
}
