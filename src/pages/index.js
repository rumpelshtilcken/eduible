import { Page, Layout } from 'components';

import ComingSoonPage from './ComingSoonPage';

class Homepage extends Page {
  render() {
    return (
      <Layout title="Eduible" session={this.props.session}>
        <ComingSoonPage />
      </Layout>
    );
  }
}

export default Homepage;
