import { Provider } from 'react-redux';

import Page from '../components/Page';
import Layout from '../components/Layout';
import ComingSoon from '../components/ComingSoon';
import CallRequset from '../components/CallRequest';

import getReduxStore from '../data/getReduxStore';

class Homepage extends Page {
  render() {
    return (
      <Provider store={getReduxStore({})}>
        <Layout title="Eduible" session={this.props.session}>
          <CallRequset />
        </Layout>
      </Provider>
    );
  }
}

export default Homepage;
