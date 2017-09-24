import Head from 'next/head';

import withPage from 'hoc/withPage';
import ProfessionalProfileOwnerContainer from 'containers/ProfessionalProfileOwnerContainer';

const ProfessionalProfilePage = () => (
  <div>
    <Head>
      <title>{'Profile'}</title>
    </Head>
    <ProfessionalProfileOwnerContainer />
  </div>
);

export default withPage(ProfessionalProfilePage);
