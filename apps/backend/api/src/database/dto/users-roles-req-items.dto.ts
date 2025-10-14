import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { ReqItemsDto } from 'src/database/dto/req-items.dto';
import { UsersRolesDto } from './users-roles.dto';

export class UsersRolesReqItemsDto extends ReqItemsDto<UsersRolesDto> {
  @ApiProperty({ type: [UsersRolesDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UsersRolesDto)
  declare items: UsersRolesDto[];
}
