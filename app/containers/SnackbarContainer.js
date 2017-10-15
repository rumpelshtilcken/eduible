import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MuiSnackbar } from 'components';
import * as snackbarActions from 'actions/snackbar';

class SnackbarContainer extends Component {
  static propTypes = {
    message: PropTypes.string,
    messageType: PropTypes.string,
    hideSnackbar: PropTypes.func.isRequired
  };

  handleRequestClose = () => this.props.hideSnackbar();

  render() {
    const { message, messageType } = this.props;
    return (
      <MuiSnackbar
        isOpen={!!(message && messageType)}
        action="HIDE"
        message={message}
        messageType={messageType}
        onActionTouchTap={this.handleRequestClose}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

const mapStateToProps = state => ({ ...state.snackbar });

export default connect(mapStateToProps, snackbarActions)(SnackbarContainer);
