import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from 'blitz';
import DefaultLayout from 'app/core/layouts/Default';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { Form, FORM_ERROR } from 'app/core/components/Form';
import { ResetPassword } from 'app/auth/validations';
import resetPassword from 'app/auth/mutations/resetPassword';
import React from 'react';

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery();
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword);

  return (
    <div>
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <Form
          submitText="Reset Password"
          schema={ResetPassword}
          initialValues={{
            password: '',
            passwordConfirmation: '',
            token: query.token as string,
          }}
          onSubmit={async (
            values,
          ): Promise<{ [FORM_ERROR]: string } | void> => {
            try {
              await resetPasswordMutation(values);
            } catch (error: any) {
              if (error.name === 'ResetPasswordError') {
                return {
                  [FORM_ERROR]: error.message,
                };
              }
              return {
                [FORM_ERROR]:
                  'Sorry, we had an unexpected error. Please try again.',
              };
            }
          }}
        >
          <LabeledTextField
            name="password"
            label="New Password"
            type="password"
          />
          <LabeledTextField
            name="passwordConfirmation"
            label="Confirm New Password"
            type="password"
          />
        </Form>
      )}
    </div>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = '/';
ResetPasswordPage.getLayout = (page): React.ReactElement => (
  <DefaultLayout title="Reset Your Password">{page}</DefaultLayout>
);

export default ResetPasswordPage;
