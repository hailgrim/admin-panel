import { FC } from "react";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";

import { IAppPage } from "@/app/types";
import { getT } from "@ap/shared/dist/locales";
import ListUsersPage from "@/views/panel/users/ListUsersPage";
import usersService from "@/entities/user/service";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = getT();
  return {
    title: t.users,
    description: t.users,
  };
};

const Page: FC<IAppPage> = async ({ searchParams }) => {
  const t = getT();
  const { data } = await usersService.getList(await searchParams);

  if (data) {
    return <ListUsersPage data={data} h1={t.users} />;
  }

  return notFound();
};
export default Page;
