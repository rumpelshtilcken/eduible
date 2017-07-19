import Page from '../components/Page';
import Layout from '../components/Layout';
import ComingSoon from '../components/ComingSoon';


class Homepage extends Page {
  render() {
    return (
      <Layout title="Eduible" session={this.props.session}>
        <ComingSoon />
      </Layout>
    );
  }
}

export default Homepage;
