import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

const MuiSnackbar = ({
  isOpen,
  messageType,
  message,
  action,
  onRequestClose,
  onActionTouchTap
}) => (
  isOpen
    ? <Snackbar
      open={isOpen}
      message={message}
      action={action}
      contentStyle={{ color: '#383838' }}
      autoHideDuration={4000}
      onRequestClose={onRequestClose}
      onActionTouchTap={onActionTouchTap}
      bodyStyle={messageType === 'success' ? successColor : errorColor}
    />
    : null
);

const successColor = { backgroundColor: '#00ff00' };
const errorColor = { backgroundColor: '#ff9494' };

MuiSnackbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  action: PropTypes.string,
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string,
  onRequestClose: PropTypes.func.isRequired,
  onActionTouchTap: PropTypes.func
};

export default MuiSnackbar;
