"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

import PanelLayout from "../PanelLayout";
import { TPage } from "@/views/types";
import UserCreate from "@/features/users/UserCreate";
import { ROUTES } from "@ap/shared/dist/libs";

const CreateUserPage: FC<TPage> = ({ h1 }) => {
  const router = useRouter();

  return (
    <PanelLayout h1={h1}>
      <UserCreate onCreate={(data) => router.push(ROUTES.ui.user(data.id))} />
    </PanelLayout>
  );
};
export default CreateUserPage;
