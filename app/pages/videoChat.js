import Head from 'next/head';

import withPage from 'hoc/withPage';
import VideoChatContainer from 'containers/VideoChatContainer';

const VideoChatPage = () => (
  <div>
    <Head>
      <title>{'Video chat'}</title>
    </Head>
    <VideoChatContainer />
  </div>
);

export default withPage(VideoChatPage);
