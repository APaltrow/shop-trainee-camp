import { FC } from 'react';

import { Profile } from '@components';
import { AuthLayout } from '@layouts';

export const ProfilePage: FC = () => {
  return (
    <AuthLayout>
      <Profile />
    </AuthLayout>
  );
};
