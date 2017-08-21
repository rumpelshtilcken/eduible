import Page from '../components/Page';
import Layout from '../components/Layout';
import ProfileEdit from '../components/ProfileEdit';

class ProfileEditPage extends Page {
  render() {
    return (
      <Layout>
        <ProfileEdit />
      </Layout>
    );
  }
}
export default ProfileEditPage;
