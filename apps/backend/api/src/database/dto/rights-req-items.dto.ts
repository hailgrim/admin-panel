import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { ReqItemsDto } from 'src/database/dto/req-items.dto';
import { RightsDto } from './rights.dto';

export class RightsReqItemsDto extends ReqItemsDto<RightsDto> {
  @ApiProperty({ type: [RightsDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RightsDto)
  declare items: RightsDto[];
}
