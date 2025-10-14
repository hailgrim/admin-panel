import { FC, useEffect } from "react";

import useRights from "@/shared/hooks/useRights";
import { useAppDispatch } from "@/app/store/hooks";
import { addAlert } from "@/app/store/main/main";
import useLanguageRef from "@/shared/hooks/useLanguageRef";
import useTranslateRef from "@/shared/hooks/useTranslateRef";
import { getErrorText, ROUTES } from "@ap/shared/dist/libs";
import ResourceForm from "@/entities/resource/ResourceForm";
import { IResource } from "@ap/shared/dist/types";
import resourcesApi from "@/entities/resource/api";

const ResourceCreate: FC<{ onCreate?: (data: IResource) => void }> = ({
  onCreate,
}) => {
  const dispatch = useAppDispatch();
  const lRef = useLanguageRef();
  const tRef = useTranslateRef();
  const [create, createReq] = resourcesApi.useCreateMutation();
  const rights = useRights(ROUTES.api.resources);

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
    <ResourceForm
      onCreate={(fields) => create(fields)}
      createDisabled={!rights.creating}
      createLoading={createReq.isLoading || Boolean(createReq.data)}
    />
  );
};
export default ResourceCreate;
