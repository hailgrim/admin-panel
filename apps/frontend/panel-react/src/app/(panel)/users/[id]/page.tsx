import { FC } from "react";
import { Metadata } from "next/types";
import { notFound } from "next/navigation";

import { IAppPage } from "@/app/types";
import { getT } from "@ap/shared/dist/locales";
import EditUserPage from "@/views/panel/users/EditUserPage";
import usersService from "@/entities/user/service";
import rolesService from "@/entities/role/service";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = getT();
  return {
    title: t.user,
    description: t.user,
  };
};

const Page: FC<IAppPage> = async ({ params }) => {
  const t = getT();
  const { id } = await params;

  if (id) {
    const user = await usersService.getOne(id);
    const roles = await rolesService.getList();

    if (user.data) {
      return (
        <EditUserPage
          h1={t.user}
          data={{ user: user.data, roles: roles.data?.rows }}
        />
      );
    }
  }

  return notFound();
};
export default Page;
