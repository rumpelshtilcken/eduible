import { Component } from 'react';

import { ProfessionalProfileEdit } from 'components';

class ProfessionalProfileEditContainer extends Component {
 state = {
   user: {
     fullName: 'Galm',
     dateOfBirth: '1994-08-27',
     about: 'I like anime and video games',
     cost: '666',
     per: 'Per day',
     dayComment: 'I am watching you',
     currentPass: '666999',
     newPass: '999666'
   },
   images: {
     background: '',
     avatar: ''
   }
 }

 handleSaveButtonPress = (userData) => {
   this.setState({ user: userData });
   console.log(this.state.user);
 };

 render() {
   return (
     <ProfessionalProfileEdit user={this.state.user} handleSaveButtonPress={this.handleSaveButtonPress} images={this.state.images} />
   );
 }
}


export default ProfessionalProfileEditContainer;
