import { FC, useEffect } from "react";

import useRights from "@/shared/hooks/useRights";
import { useAppDispatch } from "@/app/store/hooks";
import { addAlert } from "@/app/store/main/main";
import useTranslateRef from "@/shared/hooks/useTranslateRef";
import useLanguageRef from "@/shared/hooks/useLanguageRef";
import { getErrorText, ROUTES } from "@ap/shared/dist/libs";
import RoleForm from "@/entities/role/RoleForm";
import { IRole } from "@ap/shared/dist/types";
import rolesApi from "@/entities/role/api";

const RoleCreate: FC<{ onCreate?: (data: IRole) => void }> = ({ onCreate }) => {
  const dispatch = useAppDispatch();
  const lRef = useLanguageRef();
  const tRef = useTranslateRef();
  const [create, createReq] = rolesApi.useCreateMutation();
  const rights = useRights(ROUTES.api.roles);

  useEffect(() => {
    if (createReq.data) {
      dispatch(addAlert({ type: "success", text: tRef.current.success }));
      onCreate?.(createReq.data);
    }
  }, [createReq.data, dispatch, onCreate, tRef]);

  useEffect(() => {
    if (createReq.error) {
      dispatch(
        addAlert({
          type: "error",
          text: getErrorText(createReq.error, lRef.current),
        })
      );
    }
  }, [createReq.error, dispatch, lRef]);

  return (
    <RoleForm
      onCreate={(fields) => create(fields)}
      createDisabled={!rights.creating}
      createLoading={createReq.isLoading || Boolean(createReq.data)}
    />
  );
};
export default RoleCreate;
