import { IResListMeta } from "@ap/shared/dist/types";

export interface IEntityFormCreate<T = unknown> {
  onCreate?: (fields: T) => void;
  createDisabled?: boolean;
  createLoading?: boolean;
}

export interface IEntityFormUpdate<T = unknown> {
  onUpdate?: (fields: T) => void;
  updateDisabled?: boolean;
  updateLoading?: boolean;
}

export interface IEntityFormDelete {
  onDelete?: () => void;
  deleteDisabled?: boolean;
  deleteLoading?: boolean;
}

export interface IEntityForm<T = unknown, C = unknown, U = unknown>
  extends IEntityFormCreate<C>,
    IEntityFormUpdate<U>,
    IEntityFormDelete {
  initialData?: T;
}

export interface IEntityList<T = unknown> {
  initialRows?: T[];
  initialMeta?: IResListMeta<T>;
  onMetaUpdate?: (newMeta: IResListMeta<T>) => void;
}
