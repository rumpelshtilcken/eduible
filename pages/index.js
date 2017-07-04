import Page from '../components/Page';
import Layout from '../components/Layout';
import Card from '../components/Card';

class Homepage extends Page {
  render() {
    return (
      <Layout session={this.props.session}>
        <Card />
      </Layout>
    );
  }
}

export default Homepage;
