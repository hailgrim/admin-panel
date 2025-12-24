"use client";

import { FC } from "react";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import PanelLayout from "../PanelLayout";
import useTranslate from "@/shared/hooks/useTranslate";
import { TPage } from "@/views/types";
import { IRole, IUser } from "@ap/shared/dist/types";
import UserUpdate from "@/features/users/UserUpdate";
import { ROUTES } from "@ap/shared/dist/libs";
import UserRolesUpdate from "@/features/users/UserRolesUpdate";

const EditUserPage: FC<
  TPage<{
    user: IUser;
    roles?: IRole[] | null;
  }>
> = ({ h1, data }) => {
  const t = useTranslate();
  const router = useRouter();

  return (
    <PanelLayout h1={h1}>
      <UserUpdate
        data={data.user}
        onDelete={() => router.push(ROUTES.ui.users)}
      />
      {data.roles && (
        <>
          <Typography component="h2" variant="h6" sx={{ mt: 3, mb: 1 }}>
            {t.roles}
          </Typography>
          <UserRolesUpdate user={data.user} roles={data.roles} />
        </>
      )}
    </PanelLayout>
  );
};
export default EditUserPage;
