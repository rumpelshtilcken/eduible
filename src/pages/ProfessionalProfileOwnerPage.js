
import { Component } from 'react';

import ProfessionalProfileOwnerContainer from 'containers/ProfessionalProfileOwnerContainer';

class ProfessionalProfilePage extends Component {
  handleNotifyMeButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return <ProfessionalProfileOwnerContainer onNotifyMeButtonClick={this.handleNotifyMeButtonClick} />;
  }
}

export default ProfessionalProfilePage;
