import { FC } from "react";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";

import { IAppPage } from "@/app/types";
import { getT } from "@ap/shared/dist/locales";
import ListResourcesPage from "@/views/panel/resources/ListResourcesPage";
import resourcesService from "@/entities/resource/service";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = getT();
  return {
    title: t.resources,
    description: t.resources,
  };
};

const Page: FC<IAppPage> = async ({ searchParams }) => {
  const t = getT();
  const { data } = await resourcesService.getList(await searchParams);

  if (data) {
    return <ListResourcesPage data={data} h1={t.resources} />;
  }

  return notFound();
};
export default Page;
