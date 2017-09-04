import { Page, Layout } from 'components';

import StudentProfileContainer from 'containers/StudentProfileContainer';

class StudentProfilePage extends Page {
  render() {
    return (
      <Layout title="Eduible" session={this.props.session}>
        <StudentProfileContainer />
      </Layout>
    );
  }
}

export default StudentProfilePage;
