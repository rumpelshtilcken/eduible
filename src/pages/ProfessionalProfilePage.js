
import { Component } from 'react';
import ProfessionalProfileContainer from 'containers/ProfessionalProfileContainer';

class ProfessionalProfilePage extends Component {
  handleNotifyMeButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return <ProfessionalProfileContainer onNotifyMeButtonClick={this.handleNotifyMeButtonClick} />;
  }
}

export default ProfessionalProfilePage;
