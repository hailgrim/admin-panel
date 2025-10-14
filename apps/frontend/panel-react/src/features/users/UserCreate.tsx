import { FC, useEffect } from "react";

import useRights from "@/shared/hooks/useRights";
import { useAppDispatch } from "@/app/store/hooks";
import { addAlert } from "@/app/store/main/main";
import useLanguageRef from "@/shared/hooks/useLanguageRef";
import useTranslateRef from "@/shared/hooks/useTranslateRef";
import { getErrorText, ROUTES } from "@ap/shared/dist/libs";
import UserForm from "@/entities/user/UserForm";
import { IUser } from "@ap/shared/dist/types";
import usersApi from "@/entities/user/api";

const UserCreate: FC<{ onCreate?: (data: IUser) => void }> = ({ onCreate }) => {
  const dispatch = useAppDispatch();
  const tRef = useTranslateRef();
  const lRef = useLanguageRef();
  const [create, createReq] = usersApi.useCreateMutation();
  const rights = useRights(ROUTES.api.users);

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
    <UserForm
      onCreate={(fields) => create(fields)}
      createDisabled={!rights.creating}
      createLoading={createReq.isLoading || Boolean(createReq.data)}
    />
  );
};
export default UserCreate;
