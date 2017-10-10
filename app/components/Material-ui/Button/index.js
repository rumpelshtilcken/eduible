import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const MuiButton = ({ onClick, className, labelStyle, label, backgroundColor, labelColor }) => (
  <RaisedButton
    label={label}
    className={className}
    labelStyle={labelStyle}
    labelColor={labelColor}
    fullWidth
    backgroundColor={backgroundColor}
    onClick={onClick}
  />
);

MuiButton.defaultProps = {
  label: 'Continue',
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
  labelColor: PropTypes.string,
  labelStyle: PropTypes.objectOf(PropTypes.string),
  onClick: PropTypes.func.isRequired
};

export default MuiButton;
