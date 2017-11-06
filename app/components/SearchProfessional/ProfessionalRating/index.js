import { PropTypes } from 'react';

const ProfessionalRating = ({ rating }) => {
  const obj = [];
  const MAX_RATING = 5;

  /* eslint-disable */
  for (let i = 1; i <= MAX_RATING; i++) {
    if (i <= rating) {
      obj.push(<img key={i} src="http://res.cloudinary.com/dsyyowxl0/image/upload/v1509976468/star_p_vyahon.svg" className="purpleStar" alt="" />);
    } else obj.push(<img key={i} src="http://res.cloudinary.com/dsyyowxl0/image/upload/v1509976492/star_g_ieotz2.svg" className="grayStar" alt="" />);
  }

  return <div>{obj}</div>;
};
ProfessionalRating.propTypes = {
  rating: PropTypes.number
};

export default ProfessionalRating;
