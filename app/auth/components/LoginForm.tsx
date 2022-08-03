import {
  AuthenticationError,
  Link,
  useMutation,
  Routes,
  PromiseReturnType,
} from 'blitz';
import { Form, FORM_ERROR, SubmitHandler } from 'app/core/components/Form';
import login from 'app/auth/mutations/login';
import { Login } from 'app/auth/validations';
import React from 'react';
import Card, { CardActions, CardTitle } from 'app/core/components/Card';
import Submit from 'app/core/components/Submit';
import TextInput from 'app/core/components/TextInput';

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void;
};

const LoginForm: React.FC<LoginFormProps> = props => {
  const [loginMutation] = useMutation(login);

  const handleSubmit: SubmitHandler<typeof Login> = async values => {
    try {
      const user = await loginMutation(values);
      props.onSuccess?.(user);
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: 'Sorry, those credentials are invalid' };
      }

      return {
        [FORM_ERROR]: `Sorry, we had an unexpected error. Please try again. - ${error.toString()}`,
      };
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <Card>
        <CardTitle>Login</CardTitle>

        <Form
          schema={Login}
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <TextInput name="email" label="Email" />
          <TextInput name="password" label="Password" />

          <CardActions>
            <Submit variant="primary">Login</Submit>
          </CardActions>
        </Form>

        <div className="flex gap-4 pt-5 justify-center">
          <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>•
          <Link href={Routes.SignupPage()}>Sign Up</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
