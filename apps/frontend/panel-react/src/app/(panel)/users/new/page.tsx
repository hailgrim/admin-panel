import { FC } from "react";
import { Metadata } from "next/types";

import { getT } from "@ap/shared/dist/locales";
import CreateUserPage from "@/views/panel/users/CreateUserPage";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = getT();
  return {
    title: t.newUser,
    description: t.newUser,
  };
};

const Page: FC = async () => {
  const t = getT();
  return <CreateUserPage h1={t.newUser} />;
};
export default Page;
