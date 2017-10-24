import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SelectDropdown } from 'components';
import * as searchActions from 'actions/search';
import * as formActions from 'actions/form';

class SelectDropDownContainer extends Component {
  static propTypes = {
    isFormInput: PropTypes.bool,
    reduxStoreName: PropTypes.string,
    searchUpdate: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      }).isRequired
    ).isRequired,
    search: PropTypes.object,
    form: PropTypes.object,
    update: PropTypes.func,
    reset: PropTypes.func,
    resetFilter: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { value } = this.props.options[0];
    if (this.props.isFormInput) {
      this.props.update({ name: [this.props.reduxStoreName], value });
    }

    this.props.searchUpdate({ name: [this.props.reduxStoreName], value });
  }

  handleSearchChange = value => (value
    ? this.props.searchUpdate({ name: [this.props.reduxStoreName], value })
    : this.props.resetFilter({ name: [this.props.reduxStoreName] }))

  handleFormChange = value => (value
    ? this.props.update({ name: [this.props.reduxStoreName], value })
    : this.props.reset({ name: [this.props.reduxStoreName] }));

  render() {
    const value = this.props.isFormInput
      ? this.props.form[this.props.reduxStoreName]
      : this.props.search[this.props.reduxStoreName];

    const handleChange = this.props.isFormInput
      ? this.handleFormChange
      : this.handleSearchChange;

    return (
      <SelectDropdown
        {...this.props}
        key={this.props.reduxStoreName}
        options={this.props.options}
        value={value}
        onChange={handleChange}
      />);
  }
}

const mapStateToProps = ({ search, form }) => ({ search, form });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(formActions, dispatch),
  ...bindActionCreators(searchActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDropDownContainer);
