import { Component } from 'react';
import ProfessionalProfileEditContainer from 'containers/ProfessionalProfileEditContainer';
import { Layout } from 'components';

class ProfessionalProfileEditPage extends Component {
  render() {
    return (
      <Layout>
        <ProfessionalProfileEditContainer />
      </Layout>
    );
  }
}

export default ProfessionalProfileEditPage;
