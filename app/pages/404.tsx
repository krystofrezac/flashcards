import { Head, ErrorComponent } from 'blitz';
import React from 'react';

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
const Page404: React.FC = () => {
  const statusCode = 404;
  const title = 'This page could not be found';

  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <ErrorComponent statusCode={statusCode} title={title} />
    </>
  );
};

export default Page404;
