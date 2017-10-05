
import Head from 'next/head';

import withPage from 'hoc/withPage';
import { StudentProfileEditContainer } from 'containers';

const studentProfileEditPage = () => (
  <div>
    <Head>
      <title>{'Profile edit'}</title>
    </Head>
    <StudentProfileEditContainer />
  </div>
);

export default withPage(studentProfileEditPage);
