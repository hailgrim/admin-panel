import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { IReqList } from '@ap/shared/dist/types';
import { toBoolean } from 'libs/utils';

export class ReqListDto<T> implements IReqList<T> {
  @ApiPropertyOptional({ type: Number, example: 2 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber({ allowNaN: false })
  reqPage?: number;

  @ApiPropertyOptional({ type: Number, example: 10 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber({ allowNaN: false })
  reqLimit?: number;

  @ApiPropertyOptional({ type: Boolean, example: false })
  @IsOptional()
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  reqCount?: boolean;

  @ApiPropertyOptional({ type: String, example: 'someField' })
  @IsOptional()
  @IsString()
  reqSortField?: T extends object ? keyof T : string;

  @ApiPropertyOptional({ type: String, example: 'ASC' })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  reqSortOrder?: 'ASC' | 'DESC';
}
