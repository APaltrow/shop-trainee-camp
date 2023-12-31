import { FC } from 'react';

import { Wishlist } from '@components';
import { AuthLayout } from '@layouts';

export const WishlistPage: FC = () => {
  return (
    <AuthLayout>
      <Wishlist />
    </AuthLayout>
  );
};
