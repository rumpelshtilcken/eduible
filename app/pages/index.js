import Head from 'next/head';

import withPage from 'hoc/withPage';

const Homepage = () => (
  <Head>
    <title>{'Eduible'}</title>
  </Head>
);

export default withPage(Homepage);
