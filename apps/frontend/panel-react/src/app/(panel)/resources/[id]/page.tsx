import { FC } from "react";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";

import { IAppPage } from "@/app/types";
import { getT } from "@ap/shared/dist/locales";
import EditResourcePage from "@/views/panel/resources/EditResourcePage";
import resourcesService from "@/entities/resource/service";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = getT();
  return {
    title: t.resource,
    description: t.resource,
  };
};

const Page: FC<IAppPage> = async ({ params }) => {
  const t = getT();
  const { id } = await params;

  if (id) {
    const { data } = await resourcesService.getOne(id);

    if (data) {
      return <EditResourcePage h1={t.resource} data={data} />;
    }
  }

  return notFound();
};
export default Page;
