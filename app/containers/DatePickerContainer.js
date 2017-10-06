import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as formActions from 'actions/form';

import { MuiDatePicker } from 'components';

class DatePickerContainer extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    title: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
  };

  handleChange = (event, date) =>
    this.props.update({ name: this.props.name, value: date });

  defineValue = () => {
    if (this.props.values && this.props.values[this.props.name]) {
      return this.props.values[this.props.name].toString();
    }

    return this.props.placeholder || '';
  };

  render() {
    const { name, title } = this.props;
    return (
      <MuiDatePicker
        name={name}
        onChange={this.handleChange}
        title={title}
        value={this.defineValue()}
      />
    );
  }
}

const mapStateToProps = state => ({ values: state.form });

const EnhancedTextField = connect(mapStateToProps, formActions)(DatePickerContainer);

export default EnhancedTextField;
