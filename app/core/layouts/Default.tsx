import { Head, BlitzLayout } from 'blitz';

const DefaultLayout: BlitzLayout<{
  title?: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{`${title}- flashcards`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  );
};

export default DefaultLayout;
