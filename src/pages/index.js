import { Provider } from 'react-redux';

import { Page, Layout, CommingSoon } from 'components';
import getReduxStore from 'data/getReduxStore';

class Homepage extends Page {
  render() {
    return (
      <Provider store={getReduxStore({})}>
        <Layout title="Eduible" session={this.props.session}>
          <CommingSoon />
        </Layout>
      </Provider>
    );
  }
}

export default Homepage;
