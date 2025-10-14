import { Metadata } from 'next/types';
import { FC } from 'react';

import RegistrationPage from '@/views/auth/RegistrationPage';
import { getT } from '@ap/shared/dist/locales';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = getT();
  return {
    title: t.signUp,
    description: t.signUp,
  };
};

const Page: FC = async () => {
  const t = getT();
  return <RegistrationPage h1={t.signUp} />;
};
export default Page;
