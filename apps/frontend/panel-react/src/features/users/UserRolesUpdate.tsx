import { FC, useEffect } from "react";

import useRights from "@/shared/hooks/useRights";
import { useAppDispatch } from "@/app/store/hooks";
import { addAlert } from "@/app/store/main/main";
import useTranslateRef from "@/shared/hooks/useTranslateRef";
import useLanguageRef from "@/shared/hooks/useLanguageRef";
import { IRole, IUser } from "@ap/shared/dist/types";
import { getErrorText, ROUTES } from "@ap/shared/dist/libs";
import UserRolesForm from "@/entities/user/UserRolesForm";
import usersApi from "@/entities/user/api";

const UserRolesUpdate: FC<{
  user: IUser;
  roles: IRole[];
}> = ({ user, roles }) => {
  const dispatch = useAppDispatch();
  const lRef = useLanguageRef();
  const tRef = useTranslateRef();
  const [update, updateReq] = usersApi.useUpdateRolesMutation();
  const rights = useRights(ROUTES.api.users);

  useEffect(() => {
    if (updateReq.isSuccess) {
      dispatch(addAlert({ type: "success", text: tRef.current.success }));
    }
  }, [updateReq.isSuccess, dispatch, tRef]);

  useEffect(() => {
    if (updateReq.error) {
      dispatch(
        addAlert({
          type: "error",
          text: getErrorText(updateReq.error, lRef.current),
        })
      );
    }
  }, [updateReq.error, dispatch, lRef]);

  return (
    <UserRolesForm
      user={user}
      roles={roles}
      onUpdate={(newUserRoles) =>
        update({
          id: user.id,
          fields: { items: newUserRoles },
        })
      }
      updateDisabled={!rights.updating}
      updateLoading={updateReq.isLoading}
    />
  );
};
export default UserRolesUpdate;
