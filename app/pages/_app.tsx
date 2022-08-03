import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from 'blitz';
import LoginForm from 'app/auth/components/LoginForm';

import 'app/core/styles/index.css';
import React from 'react';

const RootErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />;
  }
  if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  }

  return (
    <ErrorComponent
      statusCode={error.statusCode || 400}
      title={error.message || error.name}
    />
  );
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page): JSX.Element => page);

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  );
};

export default App;
