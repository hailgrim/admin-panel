"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

import PanelLayout from "../PanelLayout";
import { TPage } from "@/views/types";
import RoleCreate from "@/features/roles/RoleCreate";
import { ROUTES } from "@ap/shared/dist/libs";

const CreateRolePage: FC<TPage> = ({ h1 }) => {
  const router = useRouter();

  return (
    <PanelLayout h1={h1}>
      <RoleCreate onCreate={(data) => router.push(ROUTES.ui.role(data.id))} />
    </PanelLayout>
  );
};
export default CreateRolePage;
