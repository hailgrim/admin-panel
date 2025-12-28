"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

import PanelLayout from "../PanelLayout";
import { TPage } from "@/views/types";
import { IResource } from "@ap/shared/dist/types";
import { ROUTES } from "@ap/shared/dist/libs";
import ResourceUpdate from "@/features/resources/ResourceUpdate";

const EditResourcePage: FC<TPage<IResource>> = ({ h1, data }) => {
  const router = useRouter();

  return (
    <PanelLayout h1={h1}>
      <ResourceUpdate
        data={data}
        onDelete={() => router.push(ROUTES.ui.resources)}
      />
    </PanelLayout>
  );
};
export default EditResourcePage;
