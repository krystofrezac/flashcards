import { BlitzPage, useMutation } from 'blitz';
import DefaultLayout from 'app/core/layouts/Default';
import { Form, FORM_ERROR } from 'app/core/components/Form';
import { ForgotPassword } from 'app/auth/validations';
import forgotPassword from 'app/auth/mutations/forgotPassword';
import React from 'react';
import TextInput from 'app/core/components/TextInput';
import Submit from 'app/core/components/Submit';

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword);

  return (
    <div>
      <h1>Forgot your password?</h1>

      {isSuccess ? (
        <div>
          <h2>Request Submitted</h2>
          <p>
            If your email is in our system, you will receive instructions to
            reset your password shortly.
          </p>
        </div>
      ) : (
        <Form
          schema={ForgotPassword}
          initialValues={{ email: '' }}
          onSubmit={async (
            values,
          ): Promise<{ [FORM_ERROR]: string } | void> => {
            try {
              await forgotPasswordMutation(values);
            } catch (error: any) {
              return {
                [FORM_ERROR]:
                  'Sorry, we had an unexpected error. Please try again.',
              };
            }
          }}
        >
          <TextInput name="email" label="Email" />
          <Submit>Send reset password instructions</Submit>
        </Form>
      )}
    </div>
  );
};

ForgotPasswordPage.redirectAuthenticatedTo = '/';
ForgotPasswordPage.getLayout = (page): React.ReactElement => (
  <DefaultLayout title="Forgot Your Password?">{page}</DefaultLayout>
);

export default ForgotPasswordPage;
