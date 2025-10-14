import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { ReqListDto } from 'src/database/dto/req-list.dto';
import { ResourceDto } from './resource.dto';
import { TResourceReqList } from '@ap/shared/dist/types';

export class ResourceReqListDto
  extends IntersectionType(
    ReqListDto<ResourceDto>,
    PartialType(PickType(ResourceDto, ['name', 'path', 'enabled', 'default'])),
  )
  implements TResourceReqList {}
