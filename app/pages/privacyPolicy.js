
import Head from 'next/head';

import withPage from 'hoc/withPage';
import { PrivacyPolicy } from 'components';

const PrivacyPolicyPage = () => (
  <div>
    <Head>
      <title>{'Privacy Policy'}</title>
    </Head>
    <PrivacyPolicy />
  </div>
);

export default withPage(PrivacyPolicyPage);
