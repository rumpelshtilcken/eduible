import Head from 'next/head';

import withPage from 'hoc/withPage';
import ProfessionalProfileEditContainer from 'containers/ProfessionalProfileEditContainer';

const ProfessionalProfileEditPage = () => (
  <div>
    <Head>
      <title>{'Profile edit'}</title>
    </Head>
    <ProfessionalProfileEditContainer />
  </div>
);

export default withPage(ProfessionalProfileEditPage);
