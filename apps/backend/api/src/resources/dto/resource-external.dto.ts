import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { ResourceDto } from './resource.dto';
import { IResource } from '@ap/shared/dist/types';

export class ResourceExternalDto
  extends IntersectionType(
    PickType(ResourceDto, ['id', 'name', 'path', 'enabled', 'default']),
    PartialType(PickType(ResourceDto, ['description'])),
  )
  implements IResource {}
