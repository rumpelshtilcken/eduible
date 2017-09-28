import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

const MuiSnackbar = ({ isOpen, message, action, handleRequestClose, handleActionTouchTap }) => (
  <div>
    <Snackbar
      open={isOpen}
      message={message}
      action={action}
      autoHideDuration={4000}
      onRequestClose={handleRequestClose}
      onActionTouchTap={handleActionTouchTap}
      bodyStyle={style}
    />
  </div>
);

const style = {
  backgroundColor: '#7262BF'
};

MuiSnackbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  action: PropTypes.string,
  message: PropTypes.string.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleActionTouchTap: PropTypes.func
};

export default MuiSnackbar;
