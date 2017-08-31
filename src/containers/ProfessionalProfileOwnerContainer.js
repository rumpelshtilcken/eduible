import PropTypes from 'prop-types';

import { ProfessionalProfileOwner } from 'components';

const ProfessionalProfileOwnerContainer = () => (
  <ProfessionalProfileOwner user={user} />
);

const user = {
  imgUrl: '/static/profile.png',
  data: [
    {
      text: 'MIGUEL CARRERA',
      location:
      {
        imgUrl: '/static/prof/Location.svg',
        text: 'Miami, Fl'
      }
    },
    {
      text: 'IT developer',
      location:
      {
        imgUrl: '/static/prof/Circle.svg',
        text: 'Facebook'
      }
    },
    {
      text: 'IT with positions',
      location:
      {
        imgUrl: '/static/prof/Education.svg',
        text: 'Hogwards 2007-2011'
      }
    }
  ]
};

ProfessionalProfileOwnerContainer.propTypes = {
  user: PropTypes.shape({
    imgUrl: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.string).isRequired })
};


export default ProfessionalProfileOwnerContainer;
