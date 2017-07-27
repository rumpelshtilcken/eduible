import Page from '../components/Page';
import Layout from '../components/Layout';
import MainPage from '../components/MainPage';


class Homepage extends Page {
  render() {
    return (
      <Layout title="Eduible" session={this.props.session}>
        <MainPage />
      </Layout>
    );
  }
}

export default Homepage;
