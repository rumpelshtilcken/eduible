import Head from 'next/head';

import withPage from 'hoc/withPage';
import ProfessionalProfileContainer from 'containers/ProfessionalProfileContainer';

const ProfessionalProfilePage = () => (
  <div>
    <Head>
      <title>{'Profile'}</title>
    </Head>
    <ProfessionalProfileContainer />
  </div>
);

export default withPage(ProfessionalProfilePage);
