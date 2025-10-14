import { FC, useEffect } from "react";

import useRights from "@/shared/hooks/useRights";
import { useAppDispatch } from "@/app/store/hooks";
import { addAlert } from "@/app/store/main/main";
import useLanguageRef from "@/shared/hooks/useLanguageRef";
import useTranslateRef from "@/shared/hooks/useTranslateRef";
import { getErrorText, ROUTES } from "@ap/shared/dist/libs";
import { IResource, IRole } from "@ap/shared/dist/types";
import RoleRightsForm from "@/entities/role/RoleRightsForm";
import rolesApi from "@/entities/role/api";

const RoleRightsUpdate: FC<{
  role: IRole;
  resources: IResource[];
}> = ({ role, resources }) => {
  const dispatch = useAppDispatch();
  const lRef = useLanguageRef();
  const tRef = useTranslateRef();
  const [update, updateReq] = rolesApi.useUpdateRightsMutation();
  const rights = useRights(ROUTES.api.roles);

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
    <RoleRightsForm
      role={role}
      resources={resources}
      onUpdate={(newRights) =>
        update({
          id: role.id,
          fields: { items: newRights },
        })
      }
      updateDisabled={!rights.updating || role.default}
      updateLoading={updateReq.isLoading}
    />
  );
};
export default RoleRightsUpdate;
