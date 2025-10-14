import { FindManyOptions } from 'typeorm';

export type TDatabaseGetList<T = unknown> = Required<
  Pick<FindManyOptions, 'skip' | 'take'>
> &
  Pick<FindManyOptions<T>, 'where' | 'order' | 'relations'>;
