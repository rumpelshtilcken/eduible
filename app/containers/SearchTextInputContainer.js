import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SearchTextInput } from 'components';
import * as searchAction from 'actions/search';

class SearchTextInputContainer extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    searchInput: PropTypes.func.isRequired
  };

  handleSearchChange = (input) => {
    this.props.searchInput(input.value);
  };

  render() {
    return (
      <SearchTextInput
        onChange={this.handleSearchChange}
        placeholder={this.props.placeholder}
      />);
  }
}

export default connect(null, searchAction)(SearchTextInputContainer);
