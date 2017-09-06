import { Component } from 'react';
import PropTypes from 'prop-types';

import { CallRequest } from 'components';

class CallRequestContainer extends Component {
  handleRequestCallClick = () => {
    // TODO: take params and send to server
  };

  render() {
    return (
      <CallRequest
        onBackButtonClick={this.props.onBackButtonClick}
        onRequestCallClick={this.handleRequestCallClick}
      />);
  }
}

CallRequestContainer.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired
};

export default CallRequestContainer;
