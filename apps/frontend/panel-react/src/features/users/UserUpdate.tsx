import { FC, useEffect, useState } from "react";

import useTranslate from "@/shared/hooks/useTranslate";
import useTranslateRef from "@/shared/hooks/useTranslateRef";
import useRights from "@/shared/hooks/useRights";
import { useAppDispatch } from "@/app/store/hooks";
import { addAlert } from "@/app/store/main/main";
import useLanguageRef from "@/shared/hooks/useLanguageRef";
import { IUser, TUserUpdate } from "@ap/shared/dist/types";
import { getErrorText, getUpdatedValues, ROUTES } from "@ap/shared/dist/libs";
import UserForm from "@/entities/user/UserForm";
import usersApi from "@/entities/user/api";

const UserUpdate: FC<{ data: IUser; onDelete?: () => void }> = ({
  data,
  onDelete,
}) => {
  const dispatch = useAppDispatch();
  const lRef = useLanguageRef();
  const tRef = useTranslateRef();
  const t = useTranslate();
  const [update, updateReq] = usersApi.useUpdateMutation();
  const [destroy, deleteReq] = usersApi.useDeleteMutation();
  const [cachedData, setCachedData] = useState<IUser>(data);
  const rights = useRights(ROUTES.api.users);

  const updateHandler = (fields: TUserUpdate) => {
    const updatedValues = getUpdatedValues<TUserUpdate>(cachedData, fields);

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
    <UserForm
      initialData={data}
      onUpdate={(fields) => updateHandler(fields)}
      updateDisabled={
        !rights.updating || deleteReq.isLoading || deleteReq.isSuccess
      }
      updateLoading={updateReq.isLoading}
      onDelete={() => destroy({ items: [data.id] })}
      deleteDisabled={
        !rights.deleting ||
        deleteReq.isSuccess ||
        data.roles?.some((role) => role.admin)
      }
      deleteLoading={deleteReq.isLoading}
    />
  );
};
export default UserUpdate;
