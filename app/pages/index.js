import { Provider } from 'react-redux';

import { Page, Layout} from 'components';
import getReduxStore from 'data/getReduxStore';

class Homepage extends Page {
  render() {
    return (
      <Provider store={getReduxStore({})}>
        <Layout title="Eduible" session={this.props.session}>
        </Layout>
      </Provider>
    );
  }
}

export default Homepage;
