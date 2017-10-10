import Head from 'next/head';

// import Main from 'components/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withPage from 'hoc/withPage';
import { StudentProfileEdit } from 'components';

const Homepage = () => (
  <MuiThemeProvider>
    <div>
      <Head>
        <title>{'Eduible'}</title>
      </Head>
      <StudentProfileEdit />
    </div>
  </MuiThemeProvider>
);

export default withPage(Homepage);
