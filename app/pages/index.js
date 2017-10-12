import Head from 'next/head';

import { Main } from 'components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withPage from 'hoc/withPage';

const Homepage = () => (
  <MuiThemeProvider>
    <div>
      <Head>
        <title>{'Eduible'}</title>
      </Head>
      <Main />
    </div>
  </MuiThemeProvider>
);

export default withPage(Homepage);
