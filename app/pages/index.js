import { Page, Layout } from 'components';

import VideoChatPage from './VideoChatPage';

class Homepage extends Page {
  render() {
    return (
      <Layout title="Eduible" session={this.props.session}>
        <VideoChatPage />
      </Layout>
    );
  }
}

export default Homepage;
