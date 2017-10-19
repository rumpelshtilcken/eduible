import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SelectPrice } from 'components';
import * as searchAction from 'actions/search';

class SelectPriceContainer extends Component {
  static propTypes = {
    reduxStoreName: PropTypes.string,
    searchUpdate: PropTypes.func.isRequired,
    search: PropTypes.object
  };

  handleChange = value =>
    this.props.searchUpdate({ name: [this.props.reduxStoreName], value });

  render() {
    return (
      <SelectPrice
        key={this.props.reduxStoreName}
        value={this.props.search[this.props.reduxStoreName]}
        onChange={this.handleChange}
      />);
  }
}

const mapStateToProps = ({ search }) => ({ search });

export default connect(mapStateToProps, searchAction)(SelectPriceContainer);
