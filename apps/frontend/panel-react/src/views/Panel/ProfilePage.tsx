'use client';

import { FC } from 'react';
import Typography from '@mui/material/Typography';

import PanelLayout from './PanelLayout';
import UpdateProfileForm from '@/features/profile/UpdateProfileForm';
import { TPage } from '../types';
import useTranslate from '@/shared/hooks/useTranslate';
import ProfileSessions from '@/features/profile/ProfileSessions';
import ProfileRoles from '@/features/profile/ProfileRoles';
import UpdatePasswordForm from '@/features/profile/UpdatePasswordForm';
import ChangeEmailRequestForm from '@/features/profile/ChangeEmailRequestForm';

const ProfilePage: FC<TPage> = ({ h1 }) => {
  const t = useTranslate();

  return (
    <PanelLayout h1={h1}>
      <UpdateProfileForm />
      <Typography component="h2" variant="h6" sx={{ mt: 3, mb: 1 }}>
        {t.roles}
      </Typography>
      <ProfileRoles />
      <Typography component="h2" variant="h6" sx={{ mt: 3, mb: 1 }}>
        {t.changeEmail}
      </Typography>
      <ChangeEmailRequestForm />
      <Typography component="h2" variant="h6" sx={{ mt: 3, mb: 1 }}>
        {t.updatePassword}
      </Typography>
      <UpdatePasswordForm />
      <Typography component="h2" variant="h6" sx={{ mt: 3, mb: 1 }}>
        {t.sessions}
      </Typography>
      <ProfileSessions />
    </PanelLayout>
  );
};
export default ProfilePage;
