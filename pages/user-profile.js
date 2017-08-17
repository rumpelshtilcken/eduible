import Page from '../components/Page';
import Layout from '../components/Layout';
import UserProfile from '../components/UserProfile';

class UserProfilePage extends Page {
  render() {
    return (
      <Layout title="Eduible" session={this.props.session}>
        <UserProfile />
      </Layout>
    );
  }
}

export default UserProfilePage;
