import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { RoleDto } from './role.dto';
import { TRoleCreate } from '@ap/shared/dist/types';

export class RoleCreateDto
  extends IntersectionType(
    PickType(RoleDto, ['name']),
    PartialType(PickType(RoleDto, ['description', 'enabled'])),
  )
  implements TRoleCreate {}
