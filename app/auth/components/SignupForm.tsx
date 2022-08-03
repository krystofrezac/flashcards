import { useMutation } from 'blitz';
import { Form, FORM_ERROR } from 'app/core/components/Form';
import signup from 'app/auth/mutations/signup';
import { Signup } from 'app/auth/validations';
import React from 'react';
import TextInput from 'app/core/components/TextInput';

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm: React.FC<SignupFormProps> = props => {
  const [signupMutation] = useMutation(signup);

  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        schema={Signup}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values): Promise<Record<string, string> | void> => {
          try {
            await signupMutation(values);
            props.onSuccess?.();
          } catch (error: any) {
            if (
              error.code === 'P2002' &&
              error.meta?.target?.includes('email')
            ) {
              // This error comes from Prisma
              return { email: 'This email is already being used' };
            }

            return { [FORM_ERROR]: error.toString() };
          }
        }}
      >
        <TextInput name="email" label="Email" />
        <TextInput name="password" label="Password" />
      </Form>
    </div>
  );
};

export default SignupForm;
