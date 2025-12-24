import { FC, useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

import SessionForm from "@/features/profile/SessionForm";
import { addAlert } from "@/app/store/main/main";
import { useAppDispatch } from "@/app/store/hooks";
import useLanguageRef from "@/shared/hooks/useLanguageRef";
import { TSessionExternal } from "@ap/shared/dist/types";
import { getErrorText } from "@ap/shared/dist/libs";
import profileApi from "@/entities/profile/api";

const ProfileSessions: FC = () => {
  const dispatch = useAppDispatch();
  const lRef = useLanguageRef();
  const { data, isLoading, error } = profileApi.useGetSessionsQuery();
  const [sessions, setSessions] = useState<TSessionExternal[]>();

  useEffect(() => {
    setSessions(
      data &&
        Array.from(data).sort((a, b) => (!a.current && b.current ? 1 : -1))
    );
  }, [data]);

  useEffect(() => {
    if (error) {
      dispatch(
        addAlert({
          type: "error",
          text: getErrorText(error, lRef.current),
        })
      );
    }
  }, [dispatch, error, lRef]);

  return (
    <>
      {isLoading && (
        <Skeleton variant="rounded" width="100%" height={56} sx={{ mb: 1 }} />
      )}
      {sessions?.map((session) => (
        <SessionForm
          key={session.id}
          session={session}
          onDelete={() =>
            setSessions(sessions.filter((item) => item.id !== session.id))
          }
        />
      ))}
    </>
  );
};
export default ProfileSessions;
