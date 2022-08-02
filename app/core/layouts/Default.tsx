import { Head, BlitzLayout } from 'blitz';
import Navbar from '../components/Navbar';

const DefaultLayout: BlitzLayout<{
  title?: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className="">
      <Head>
        <title>{`${title} - Flashcards`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-2">
        <Navbar />

        <div className="p-2 pt-4">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
