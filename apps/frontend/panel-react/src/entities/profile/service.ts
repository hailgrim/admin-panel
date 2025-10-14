import serverFetch from "@/app/api/serverFetch";
import { IFetchArgs, IFetchRes } from "@/app/api/types";
import { ROUTES } from "@ap/shared/dist/libs";
import {
  IChangeEmailConfirm,
  IChangeEmailRequest,
  IReqItems,
  IUpdatePassword,
  IUser,
  TSessionExternal,
  TUserUpdate,
} from "@ap/shared/dist/types";

class ProfileService {
  getProfileArgs(): IFetchArgs {
    return {
      url: ROUTES.api.profile,
      method: "GET",
      credentials: "include",
    };
  }

  async getProfile(): Promise<IFetchRes<IUser>> {
    return serverFetch<IUser>(this.getProfileArgs());
  }

  updateProfileArgs(payload: TUserUpdate): IFetchArgs {
    return {
      url: ROUTES.api.profile,
      method: "PATCH",
      credentials: "include",
      body: payload,
    };
  }

  updatePasswordArgs(payload: IUpdatePassword): IFetchArgs {
    return {
      url: ROUTES.api.updatePassword,
      method: "PATCH",
      credentials: "include",
      body: payload,
    };
  }

  changeEmailRequestArgs(payload: IChangeEmailRequest): IFetchArgs {
    return {
      url: ROUTES.api.changeEmail,
      method: "POST",
      credentials: "include",
      body: payload,
    };
  }

  changeEmailConfirmArgs(payload: IChangeEmailConfirm): IFetchArgs {
    return {
      url: ROUTES.api.changeEmail,
      method: "PATCH",
      credentials: "include",
      body: payload,
    };
  }

  getSessionsArgs(): IFetchArgs {
    return {
      url: ROUTES.api.sessions,
      method: "GET",
      credentials: "include",
    };
  }

  deleteSessionsArgs(payload: IReqItems<TSessionExternal["id"]>): IFetchArgs {
    return {
      url: ROUTES.api.sessions,
      method: "DELETE",
      credentials: "include",
      body: payload,
    };
  }
}

const profileService = new ProfileService();
export default profileService;
