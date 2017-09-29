import Head from 'next/head';

import Main from 'components/Main';
import withPage from 'hoc/withPage';
// import { Main } from 'components';

const Homepage = () => (
  <div>
    <Head>
      <title>{'Eduible'}</title>
    </Head>
    <Main />
  </div>
);

export default withPage(Homepage);
