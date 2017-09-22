import { Component } from 'react';

import { ProfessionalProfile } from 'components';

class ProfessionalProfileContainer extends Component {
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
    return <ProfessionalProfile user={this.user} />;
  }
}

export default ProfessionalProfileContainer;
