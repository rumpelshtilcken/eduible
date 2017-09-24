import Head from 'next/head';

import withPage from 'hoc/withPage';
import ProfessionalSearchContainer from '../containers/ProfessionalSearchContainer';

const ProfessionalSearchPage = () => (
  <div>
    <Head>
      <title>{'Professional search'}</title>
    </Head>
    <ProfessionalSearchContainer />
  </div>
);

export default withPage(ProfessionalSearchPage);
