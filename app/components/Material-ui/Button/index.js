import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';


const MuiButton = ({ onClick, className, labelStyle, label, backgroundColor }) => (
  <RaisedButton
    label={label}
    className={className}
    labelStyle={labelStyle}
    fullWidth
    backgroundColor={backgroundColor}
    onClick={onClick}
  />
);

MuiButton.defaultProps = {
  label: 'Continue',
  type: 'button',
  backgroundColor: '#7262BF',
  primary: true,
  labelStyle: {
    color: 'white',
    fontSize: '11px'
  }
};

MuiButton.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.objectOf(PropTypes.string),
  onClick: PropTypes.func.isRequired
};

export default MuiButton;
