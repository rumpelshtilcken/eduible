import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const MuiButton = ({ onClick, className, buttonStyle, labelStyle, label, backgroundColor }) => (
  <RaisedButton
    label={label}
    className={className}
    buttonStyle={buttonStyle}
    labelStyle={labelStyle}
    backgroundColor={backgroundColor}
    onClick={onClick}
  />
);

MuiButton.defaultProps = {
  label: 'Continue',
  backgroundColor: '#7262BF',
  labelStyle: {
    color: 'white',
    fontSize: '11px'
  }
};

MuiButton.propTypes = {
  backgroundColor: PropTypes.string,
  buttonStyle: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.objectOf(PropTypes.string),
  onClick: PropTypes.func.isRequired
};

export default MuiButton;
