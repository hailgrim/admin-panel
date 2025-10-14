import {
  IReqItems,
  IRights,
  IRole,
  TRoleCreate,
  TRoleUpdate,
  TRoleReqList,
  TRoleResList,
  IFetchUpdate,
} from "@ap/shared/dist/types";
import { ROUTES } from "@ap/shared/dist/libs";
import { IFetchArgs, IFetchRes } from "@/app/api/types";
import serverFetch from "@/app/api/serverFetch";

class RolesService {
  createArgs(payload: TRoleCreate): IFetchArgs {
    return {
      url: ROUTES.api.roles,
      method: "POST",
      credentials: "include",
      body: payload,
    };
  }

  getOneArgs(payload: IRole["id"]): IFetchArgs {
    return {
      url: ROUTES.api.role(payload),
      method: "GET",
      credentials: "include",
    };
  }

  async getOne(payload: IRole["id"]): Promise<IFetchRes<IRole>> {
    return serverFetch<IRole>(this.getOneArgs(payload));
  }

  getListArgs(payload?: TRoleReqList): IFetchArgs {
    return {
      url: ROUTES.api.roles,
      method: "GET",
      credentials: "include",
      params: payload as Record<string, unknown>,
    };
  }

  async getList(payload?: TRoleReqList): Promise<IFetchRes<TRoleResList>> {
    return serverFetch<TRoleResList>(this.getListArgs(payload));
  }

  updateArgs(payload: IFetchUpdate<TRoleUpdate, IRole["id"]>): IFetchArgs {
    return {
      url: ROUTES.api.role(payload.id),
      method: "PATCH",
      credentials: "include",
      body: payload.fields,
    };
  }

  updateRightsArgs(
    payload: IFetchUpdate<IReqItems<IRights>, IRole["id"]>
  ): IFetchArgs {
    return {
      url: ROUTES.api.roleRights(payload.id),
      method: "PATCH",
      credentials: "include",
      body: payload.fields,
    };
  }

  deleteArgs(payload: IReqItems<IRole["id"]>): IFetchArgs {
    return {
      url: ROUTES.api.roles,
      method: "DELETE",
      credentials: "include",
      body: payload,
    };
  }
}

const rolesService = new RolesService();
export default rolesService;
