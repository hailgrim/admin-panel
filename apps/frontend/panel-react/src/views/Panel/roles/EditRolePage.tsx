"use client";

import { FC } from "react";
import Typography from "@mui/material/Typography";

import PanelLayout from "../PanelLayout";
import useTranslate from "@/shared/hooks/useTranslate";
import { TPage } from "@/views/types";
import { IResource, IRole } from "@ap/shared/dist/types";
import RoleUpdate from "@/features/roles/RoleUpdate";
import { useRouter } from "next/navigation";
import { ROUTES } from "@ap/shared/dist/libs";
import RoleRightsUpdate from "@/features/roles/RoleRightsUpdate";

const EditRolePage: FC<
  TPage<{
    role: IRole;
    resources?: IResource[] | null;
  }>
> = ({ h1, data }) => {
  const t = useTranslate();
  const router = useRouter();

  return (
    <PanelLayout h1={h1}>
      <RoleUpdate
        data={data.role}
        onDelete={() => router.push(ROUTES.ui.roles)}
      />
      {data.resources && (
        <>
          <Typography component="h2" variant="h6" sx={{ mt: 3, mb: 1 }}>
            {t.resources}
          </Typography>
          <RoleRightsUpdate role={data.role} resources={data.resources} />
        </>
      )}
    </PanelLayout>
  );
};
export default EditRolePage;
