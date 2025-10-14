import { PartialType, PickType } from '@nestjs/swagger';

import { ResourceDto } from './resource.dto';
import { TResourceUpdate } from '@ap/shared/dist/types';

export class ResourceUpdateDto
  extends PartialType(
    PickType(ResourceDto, ['name', 'path', 'description', 'enabled']),
  )
  implements TResourceUpdate {}
