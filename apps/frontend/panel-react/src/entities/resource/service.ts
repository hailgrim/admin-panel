import {
  IReqItems,
  IResource,
  IFetchUpdate,
  TResourceCreate,
  TResourceUpdate,
  TResourceReqList,
  TResourceResList,
} from "@ap/shared/dist/types";
import { ROUTES } from "@ap/shared/dist/libs";
import { IFetchArgs, IFetchRes } from "@/app/api/types";
import serverFetch from "@/app/api/serverFetch";

class ResourcesService {
  createArgs(payload: TResourceCreate): IFetchArgs {
    return {
      url: ROUTES.api.resources,
      method: "POST",
      credentials: "include",
      body: payload,
    };
  }

  getOneArgs(payload: IResource["id"]): IFetchArgs {
    return {
      url: ROUTES.api.resource(payload),
      method: "GET",
      credentials: "include",
    };
  }

  async getOne(payload: IResource["id"]): Promise<IFetchRes<IResource>> {
    return serverFetch<IResource>(this.getOneArgs(payload));
  }

  getListArgs(payload?: TResourceReqList): IFetchArgs {
    return {
      url: ROUTES.api.resources,
      method: "GET",
      credentials: "include",
      params: payload as Record<string, unknown>,
    };
  }

  async getList(
    payload?: TResourceReqList
  ): Promise<IFetchRes<TResourceResList>> {
    return serverFetch<TResourceResList>(this.getListArgs(payload));
  }

  updateArgs(
    payload: IFetchUpdate<TResourceUpdate, IResource["id"]>
  ): IFetchArgs {
    return {
      url: ROUTES.api.resource(payload.id),
      method: "PATCH",
      credentials: "include",
      body: payload.fields,
    };
  }

  deleteArgs(payload: IReqItems<IResource["id"]>): IFetchArgs {
    return {
      url: ROUTES.api.resources,
      method: "DELETE",
      credentials: "include",
      body: payload,
    };
  }
}

const resourcesService = new ResourcesService();
export default resourcesService;
