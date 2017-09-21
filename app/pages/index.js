import { Provider } from 'react-redux';

import { Page, Layout } from 'components';
import getReduxStore from 'data/getReduxStore';

import ProfessionalProfileOwner from './ProfessionalProfileOwnerPage';

class Homepage extends Page {
  render() {
    return (
      <Provider store={getReduxStore({})}>
        <Layout title="Eduible" session={this.props.session}>
          <ProfessionalProfileOwner />
        </Layout>
      </Provider>
    );
  }
}

export default Homepage;
