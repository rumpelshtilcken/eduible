import { Component } from 'react';

import { ProfessionalProfileOwner } from 'components';

class ProfessionalProfileOwnerContainer extends Component {
  user = {
    imgUrl: '/static/profile.png',
    data: [
      {
        text: 'MIGUEL CARRERA',
        location: {
          imgUrl: '/static/prof/Location.svg',
          text: 'Miami, Fl'
        }
      },
      {
        text: 'IT developer',
        location: {
          imgUrl: '/static/prof/Circle.svg',
          text: 'Facebook'
        }
      },
      {
        text: 'IT with positions',
        location: {
          imgUrl: '/static/prof/Education.svg',
          text: 'Hogwards 2007-2011'
        }
      }
    ]
  };

  render() {
    return <ProfessionalProfileOwner user={this.user} />;
  }
}

export default ProfessionalProfileOwnerContainer;
