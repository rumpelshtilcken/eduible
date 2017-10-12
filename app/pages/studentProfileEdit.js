
import Head from 'next/head';
import StudentProfileEditContainer from 'containers/StudentProfileEditContainer';

const studentProfileEditPage = () => (
  <div>
    <Head>
      <title>{'Profile edit'}</title>
    </Head>
    <StudentProfileEditContainer />
  </div>
);

export default studentProfileEditPage;
