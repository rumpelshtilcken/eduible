import { Provider } from 'react-redux';
import Head from 'next/head';

import getReduxStore from 'data/getReduxStore';
import withPage from 'hoc/withPage';

const Homepage = () => (
  <Provider store={getReduxStore({})}>
    <Head>
      <title>{'Eduible'}</title>
    </Head>
  </Provider>
);

export default withPage(Homepage);
