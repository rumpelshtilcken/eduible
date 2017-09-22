import { Component } from 'react';
import StudentProfileContainer from 'containers/StudentProfileContainer';

class StudentProfilePage extends Component {
  handleNotifyMeButtonClick = () => {
    // TODO: navigate back
  };

  render() {
    return <StudentProfileContainer onNotifyMeButtonClick={this.handleNotifyMeButtonClick} />;
  }
}

export default StudentProfilePage;
