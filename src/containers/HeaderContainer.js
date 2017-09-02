import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Header } from 'components';

class HeaderContainer extends Component {
  render() {
    return (<Header />);
  }
}

HeaderContainer.propTypes = {
  conf: PropTypes.arrayOf(PropTypes.string).isRequired,
  config: PropTypes.arrayOf(PropTypes.string).isRequired,
  config2: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default HeaderContainer;
