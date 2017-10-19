import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SelectDropdown } from 'components';
import * as searchAction from 'actions/search';

class SelectDropDownContainer extends Component {
  static propTypes = {
    reduxStoreName: PropTypes.string,
    searchUpdate: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      }).isRequired
    ).isRequired,
    search: PropTypes.object
  };

  handleChange = value =>
    this.props.searchUpdate({ name: [this.props.reduxStoreName], value });

  render() {
    return (
      <SelectDropdown
        key={this.props.reduxStoreName}
        options={this.props.options}
        value={this.props.search[this.props.reduxStoreName]}
        onChange={this.handleChange}
      />);
  }
}

const mapStateToProps = ({ search }) => ({ search });

export default connect(mapStateToProps, searchAction)(SelectDropDownContainer);
