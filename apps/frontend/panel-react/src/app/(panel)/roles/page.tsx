import { FC } from "react";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";

import { IAppPage } from "@/app/types";
import { getT } from "@ap/shared/dist/locales";
import ListRolesPage from "@/views/panel/roles/ListRolesPage";
import rolesService from "@/entities/role/service";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = getT();
  return {
    title: t.roles,
    description: t.roles,
  };
};

const Page: FC<IAppPage> = async ({ searchParams }) => {
  const t = getT();
  const { data } = await rolesService.getList(await searchParams);

  if (data) {
    return <ListRolesPage data={data} h1={t.roles} />;
  }

  return notFound();
};
export default Page;
