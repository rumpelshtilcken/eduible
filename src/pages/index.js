import { Provider } from 'react-redux';

import Page from '../components/Page';
import Layout from '../components/Layout';
import VideoChat from '../components/VideoChat';

import getReduxStore from 'data/getReduxStore';

class Homepage extends Page {
  render() {
    return (
      <Provider store={getReduxStore({})}>
        <Layout title="Eduible" session={this.props.session}>
          <VideoChat />
        </Layout>
      </Provider>
    );
  }
}

export default Homepage;
