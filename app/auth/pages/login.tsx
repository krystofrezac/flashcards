import { useRouter, BlitzPage } from 'blitz';
import DefaultLayout from 'app/core/layouts/Default';
import LoginForm from 'app/auth/components/LoginForm';
import React from 'react';

const LoginPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <LoginForm
      onSuccess={(_user): void => {
        const next = router.query.next
          ? decodeURIComponent(router.query.next as string)
          : '/';
        router.push(next);
      }}
    />
  );
};

LoginPage.redirectAuthenticatedTo = '/';
LoginPage.getLayout = (page): React.ReactElement => (
  <DefaultLayout title="Log In">{page}</DefaultLayout>
);

export default LoginPage;
