import React from 'react';
import { BlitzPage } from 'blitz';
import DefaultLayout from 'app/core/layouts/Default';

const Home: BlitzPage = () => {
  return <div>nothing here</div>;
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page): JSX.Element => (
  <DefaultLayout title="Home">{page}</DefaultLayout>
);

export default Home;
