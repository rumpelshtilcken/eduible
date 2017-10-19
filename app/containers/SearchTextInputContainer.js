import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SearchTextInput } from 'components';
import * as searchAction from 'actions/search';

class SearchTextInputContainer extends Component {
  static propTypes = {
    input: PropTypes.string,
    placeholder: PropTypes.string,
    searchUpdate: PropTypes.func.isRequired
  };

  handleSearchChange = (input) => {
    this.props.searchUpdate({ name: 'input', value: input.value });
  };

  render() {
    console.log(this.props.input);
    return (
      <SearchTextInput
        value={this.props.input}
        onChange={this.handleSearchChange}
        placeholder={this.props.placeholder}
      />);
  }
}

const mapStateToProps = ({ search }) => ({ input: search.input });

export default connect(mapStateToProps, searchAction)(SearchTextInputContainer);
