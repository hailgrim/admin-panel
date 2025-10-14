import { FC } from "react";
import { Metadata } from "next/types";

import { getT } from "@ap/shared/dist/locales";
import CreateRolePage from "@/views/panel/roles/CreateRolePage";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = getT();
  return {
    title: t.newRole,
    description: t.newRole,
  };
};

const Page: FC = async () => {
  const t = getT();
  return <CreateRolePage h1={t.newRole} />;
};
export default Page;
