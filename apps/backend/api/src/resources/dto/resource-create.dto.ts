import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { ResourceDto } from './resource.dto';
import { TResourceCreate } from '@ap/shared/dist/types';

export class ResourceCreateDto
  extends IntersectionType(
    PickType(ResourceDto, ['name', 'path']),
    PartialType(PickType(ResourceDto, ['description', 'enabled'])),
  )
  implements TResourceCreate {}
