import { Provider } from 'react-redux';

import { Page, Layout } from 'components';
import getReduxStore from 'data/getReduxStore';

import VideoChatPage from './VideoChatPage';

import ComingSoonPage from './ComingSoonPage';

class Homepage extends Page {
  render() {
    return (
      <Provider store={getReduxStore({})}>
        <Layout title="Eduible" session={this.props.session}>
          <VideoChatPage />
        </Layout>
      </Provider>
    );
  }
}

export default Homepage;
