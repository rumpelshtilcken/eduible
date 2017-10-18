import PropTypes from 'prop-types';

import stylessheet from './index.css';

const RoundedButton = ({ onClick, type, title, style, disabled }) => (
  <div className="roundedButtonContainer">
    <button type={type} onClick={onClick} style={style} disabled={disabled}>
      {title}
    </button>
    <style jsx>{stylessheet}</style>
  </div>
);

RoundedButton.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.obj
};

export default RoundedButton;
