import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { UserDto } from './user.dto';
import { IUser } from '@ap/shared/dist/types';

export class UserExternalDto
  extends IntersectionType(
    PickType(UserDto, ['id', 'name', 'enabled', 'verified']),
    PartialType(PickType(UserDto, ['email', 'googleId', 'roles'])),
  )
  implements IUser {}
