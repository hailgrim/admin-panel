import { Injectable } from '@nestjs/common';

import { TDatabaseGetList } from './database.types';
import { IReqList, IResListMeta } from '@ap/shared/dist/types';

@Injectable()
export class DatabaseService {
  buildGetListOptions<T extends object>(
    reqList: IReqList<T> = {},
    options: TDatabaseGetList<T> = { skip: 0, take: 25 },
    meta: IResListMeta<T> = {},
  ) {
    if (reqList.reqLimit && reqList.reqLimit > 0 && reqList.reqLimit <= 100) {
      options.take = reqList.reqLimit;
      meta.limit = options.take;
    }

    if (reqList.reqPage && reqList.reqPage > 0) {
      options.skip = (reqList.reqPage - 1) * options.take;
      meta.page = options.skip / options.take + 1;
    }

    return { options, meta };
  }
}
