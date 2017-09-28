import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const MuiButton = props => (
  <RaisedButton
    buttonStyle={{ backgroundColor: props.backgroundColor, fullWidth: true }}
    labelStyle={{ color: 'white', fontSize: '11px' }}
    {...props}
  />
);

MuiButton.propTypes = {
  backgroundColor: PropTypes.string
};

export default MuiButton;
