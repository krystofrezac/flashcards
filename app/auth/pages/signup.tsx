import { useRouter, BlitzPage, Routes } from 'blitz';
import DefaultLayout from 'app/core/layouts/Default';
import { SignupForm } from 'app/auth/components/SignupForm';
import React from 'react';

const SignupPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <div>
      <SignupForm
        onSuccess={(): void => {
          router.push(Routes.Home());
        }}
      />
    </div>
  );
};

SignupPage.redirectAuthenticatedTo = '/';
SignupPage.getLayout = (page): React.ReactElement => (
  <DefaultLayout title="Sign Up">{page}</DefaultLayout>
);

export default SignupPage;
