import { FC } from "react";
import { Metadata } from "next/types";

import CreateResourcePage from "@/views/panel/resources/CreateResourcePage";
import { getT } from "@ap/shared/dist/locales";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = getT();
  return {
    title: t.newResource,
    description: t.newResource,
  };
};

const Page: FC = async () => {
  const t = getT();
  return <CreateResourcePage h1={t.newResource} />;
};
export default Page;
