import Page from '../components/Page';
import Layout from '../components/LayoutComing';
import ComingSoon from '../components/ComingSoon';

class ComingSoonPage extends Page {
  render() {
    return (
      <Layout title="Eduible" session={this.props.session}>
        <ComingSoon />
      </Layout>
    );
  }
}

export default ComingSoonPage;
