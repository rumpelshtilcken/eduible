import Head from 'next/head';

import Main from 'components/Main';
// import StudentProfileContainer from 'containers/StudentProfileContainer';
import withPage from 'hoc/withPage';

const Homepage = () => (
  <div>
    <Head>
      <title>{'Eduible'}</title>
    </Head>
    <Main />
  </div>
);

export default withPage(Homepage);
