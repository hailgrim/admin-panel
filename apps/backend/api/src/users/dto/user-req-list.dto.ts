import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { ReqListDto } from 'src/database/dto/req-list.dto';
import { UserDto } from './user.dto';
import { TUserReqList } from '@ap/shared/dist/types';

export class UserReqListDto
  extends IntersectionType(
    ReqListDto<UserDto>,
    PartialType(PickType(UserDto, ['name', 'enabled', 'email', 'verified'])),
  )
  implements TUserReqList {}
