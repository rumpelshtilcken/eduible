import { Component } from 'react';

import { StudentProfileEdit } from 'components';

class StudentProfileEditContainer extends Component {
  state = {
    // user: {
    //   fullName: 'Galm',
    //   dateOfBirth: '1994-08-27',
    //   about: 'I like anime and video games',
    //   cost: '666',
    //   per: 'Per day',
    //   dayComment: 'I am watching you',
    //   currentPass: '666999',
    //   newPass: '999666'
    // },
    // images: {
    //   background: '',
    //   avatar: ''
    // }
  };

  handleSaveButtonPress = (userData) => {
    this.setState({ user: userData });
  };

  render() {
    return (
      // <StudentProfileEdit
      //   user={this.state.user}
      //   handleSaveButtonPress={this.handleSaveButtonPress}
      //   images={this.state.images}
      />
    );
  }
}

export default StudentProfileEditContainer;
