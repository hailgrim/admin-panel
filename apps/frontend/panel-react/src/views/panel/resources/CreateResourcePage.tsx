"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

import PanelLayout from "../PanelLayout";
import { TPage } from "@/views/types";
import ResourceCreate from "@/features/resources/ResourceCreate";
import { ROUTES } from "@ap/shared/dist/libs";

const CreateResourcePage: FC<TPage> = ({ h1 }) => {
  const router = useRouter();

  return (
    <PanelLayout h1={h1}>
      <ResourceCreate
        onCreate={(data) => router.push(ROUTES.ui.resource(data.id))}
      />
    </PanelLayout>
  );
};
export default CreateResourcePage;
