import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

const MuiSnackbar = ({ isOpen, message, handleRequestClose }) => (
  <div>
    <Snackbar
      open={isOpen}
      message={message}
      autoHideDuration={4000}
      onRequestClose={handleRequestClose}
      style={style}
    />
  </div>
);

const style = {
  backgroundColor: '#fafafa'
};

MuiSnackbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  handleRequestClose: PropTypes.func.isRequired
};

export default MuiSnackbar;
