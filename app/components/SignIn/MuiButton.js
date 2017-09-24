import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const MuiButton = ({ onClick, backgroundColor, title }) => (
  <RaisedButton
    label={title}
    buttonStyle={{ backgroundColor, fullWidth: true }}
    labelStyle={{ color: 'white', fontSize: '11px' }}
    onClick={onClick}
  />
);

MuiButton.propTypes = {
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default MuiButton;
