import PropTypes from 'prop-types';

import stylessheet from './index.css';

const RoundedButton = ({ onClick, type, title }) =>
  (<div className="roundedButtonContainer">
    <button className="roundedButton" type={type} onClick={onClick}>
      {title}
    </button>
    <style jsx>
      {stylessheet}
    </style>
  </div>);

RoundedButton.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RoundedButton;
