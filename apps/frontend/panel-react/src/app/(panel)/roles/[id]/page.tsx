import { FC } from "react";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";

import { IAppPage } from "@/app/types";
import { getT } from "@ap/shared/dist/locales";
import EditRolePage from "@/views/panel/roles/EditRolePage";
import rolesService from "@/entities/role/service";
import resourcesService from "@/entities/resource/service";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = getT();
  return {
    title: t.role,
    description: t.role,
  };
};

const Page: FC<IAppPage> = async ({ params }) => {
  const t = getT();
  const { id } = await params;

  if (id) {
    const role = await rolesService.getOne(id);
    const resources = await resourcesService.getList();

    if (role.data) {
      return (
        <EditRolePage
          h1={t.role}
          data={{ role: role.data, resources: resources.data?.rows }}
        />
      );
    }
  }

  return notFound();
};
export default Page;
