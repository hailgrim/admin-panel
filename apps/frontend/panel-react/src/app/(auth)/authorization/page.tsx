import { Metadata } from 'next/types';
import { FC } from 'react';

import AuthorizationPage from '@/views/auth/AuthorizationPage';
import { getT } from '@ap/shared/dist/locales';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = getT();
  return {
    title: t.signIn,
    description: t.signIn,
  };
};

const Page: FC = async () => {
  const t = getT();
  return <AuthorizationPage h1={t.signIn} />;
};
export default Page;
