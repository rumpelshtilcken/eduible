import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MuiSnackbar } from 'components';
import * as snackbarActions from 'actions/snackbar';

const SnackbarContainer = ({ message, messageType, hideSnackbar }) => (
  <MuiSnackbar
    isOpen={message && messageType}
    action="HIDE"
    message={message}
    messageType={messageType}
    handleActionTouchTap={hideSnackbar}
    handleRequestClose={hideSnackbar}
  />
);

SnackbarContainer.propTypes = {
  message: PropTypes.string,
  messageType: PropTypes.string,
  hideSnackbar: PropTypes.func
};

const mapStateToProps = state => ({ ...state.snackbar });

export default connect(mapStateToProps, snackbarActions)(SnackbarContainer);
