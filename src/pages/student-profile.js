import Page from '../components/Page';
import Layout from '../components/Layout';
import StudentProfile from '../components/StudentProfile';

class StudentProfilePage extends Page {
  render() {
    return (
      <Layout title="Eduible" session={this.props.session}>
        <StudentProfile />
      </Layout>
    );
  }
}

export default StudentProfilePage;
