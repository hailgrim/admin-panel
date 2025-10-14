import { FC, useEffect, useState } from "react";

import useRights from "@/shared/hooks/useRights";
import { useAppDispatch } from "@/app/store/hooks";
import { addAlert } from "@/app/store/main/main";
import useTranslate from "@/shared/hooks/useTranslate";
import useLanguageRef from "@/shared/hooks/useLanguageRef";
import useTranslateRef from "@/shared/hooks/useTranslateRef";
import { IRole, TRoleUpdate } from "@ap/shared/dist/types";
import { getErrorText, getUpdatedValues, ROUTES } from "@ap/shared/dist/libs";
import RoleForm from "@/entities/role/RoleForm";
import rolesApi from "@/entities/role/api";

const RoleUpdate: FC<{ data: IRole; onDelete?: () => void }> = ({
  data,
  onDelete,
}) => {
  const dispatch = useAppDispatch();
  const lRef = useLanguageRef();
  const tRef = useTranslateRef();
  const t = useTranslate();
  const [update, updateReq] = rolesApi.useUpdateMutation();
  const [destroy, deleteReq] = rolesApi.useDeleteMutation();
  const [cachedData, setCachedData] = useState<IRole>(data);
  const rights = useRights(ROUTES.api.roles);

  const updateHandler = (fields: TRoleUpdate) => {
    const updatedValues = getUpdatedValues<TRoleUpdate>(cachedData, fields);

    if (Object.keys(updatedValues).length > 0) {
      update({ id: data.id, fields: updatedValues });
    } else {
      dispatch(addAlert({ type: "warning", text: t.nothingToUpdate }));
    }
  };

  useEffect(() => {
    if (updateReq.isSuccess) {
      dispatch(addAlert({ type: "success", text: tRef.current.success }));
      setCachedData((prev) => ({ ...prev, ...updateReq.originalArgs?.fields }));
    }
  }, [updateReq.isSuccess, updateReq.originalArgs, dispatch, tRef]);

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

  useEffect(() => {
    if (deleteReq.isSuccess) {
      dispatch(addAlert({ type: "success", text: tRef.current.success }));
      onDelete?.();
    }
  }, [deleteReq.isSuccess, dispatch, onDelete, tRef]);

  useEffect(() => {
    if (deleteReq.error) {
      dispatch(
        addAlert({
          type: "error",
          text: getErrorText(deleteReq.error, lRef.current),
        })
      );
    }
  }, [deleteReq.error, dispatch, lRef]);

  return (
    <RoleForm
      initialData={data}
      onUpdate={(fields) => updateHandler(fields)}
      updateDisabled={
        !rights.updating ||
        data.default ||
        deleteReq.isLoading ||
        deleteReq.isSuccess
      }
      updateLoading={updateReq.isLoading}
      onDelete={() => destroy({ items: [data.id] })}
      deleteDisabled={!rights.deleting || deleteReq.isSuccess || data.default}
      deleteLoading={deleteReq.isLoading}
    />
  );
};
export default RoleUpdate;
