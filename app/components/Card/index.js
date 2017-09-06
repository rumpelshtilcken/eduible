import PropTypes from 'prop-types';

import stylesheet from './index.css';

const Card = ({ children }) =>
  (<div className="cardContainer">
    {children}
    <style jsx>
      {stylesheet}
    </style>
  </div>);

Card.propTypes = {
  children: PropTypes.element
};

export default Card;
