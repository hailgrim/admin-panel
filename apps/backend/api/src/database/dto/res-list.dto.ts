import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { IResList, IResListMeta, ISort } from '@ap/shared/dist/types';
import { Type } from 'class-transformer';

export class SortDto<T> implements ISort<T> {
  @IsString()
  field: T extends object ? keyof T : string;

  @IsEnum(['ASC', 'DESC'])
  order: 'ASC' | 'DESC';
}

export class MetaDto<T> implements IResListMeta<T> {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => SortDto)
  sort?: SortDto<T>;

  @IsOptional()
  @IsObject()
  filters?: T extends object ? Partial<T> : { [K: string]: unknown };
}

export class ResListDto<T> implements IResList<T> {
  @ApiProperty({ type: Array })
  @IsArray()
  rows: T[];

  @ApiPropertyOptional({ type: MetaDto<T> })
  @IsOptional()
  @ValidateNested()
  @Type(() => MetaDto<T>)
  meta?: MetaDto<T>;
}
