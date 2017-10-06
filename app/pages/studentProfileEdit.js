
import Head from 'next/head';
import { StudentProfile } from 'components';

const studentProfileEditPage = () => (
  <div>
    <Head>
      <title>{'Profile edit'}</title>
    </Head>
    <StudentProfile />
  </div>
);

export default studentProfileEditPage;
