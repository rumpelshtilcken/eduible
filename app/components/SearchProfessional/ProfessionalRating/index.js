import { PropTypes } from 'react';

const ProfessionalRating = ({ rating }) => {
  const obj = [];
  const MAX_RATING = 5;

  /* eslint-disable */
  for (let i = 1; i <= MAX_RATING; i++) {
    if (i <= rating) {
      obj.push(<img key={i} src="static/Icons/star_p.svg" className="purpleStar" alt="" />);
    } else obj.push(<img key={i} src="static/Icons/star_g.svg" className="grayStar" alt="" />);
  }

  return <div>{obj}</div>;
};
ProfessionalRating.propTypes = {
  rating: PropTypes.number
};

export default ProfessionalRating;
