import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { convertFromISOToObject } from 'utils/auth';
import { TimePicker } from 'components';
import * as formActions from 'actions/form';

class TimePickerContainer extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    update: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
  };

  handleChange = (event, date) =>
    this.props.update({ name: this.props.name, value: date });

  defineValue = () => {
    if (this.props.values && this.props.values[this.props.name]) {
      const { hour, minute } = convertFromISOToObject(this.props.values[this.props.name]);
      return `${hour}:${minute}`;
    }

    return this.props.placeholder || '';
  };

  render() {
    const { name, title } = this.props;

    return (
      <TimePicker
        name={name}
        onChange={this.handleChange}
        title={title}
        value={this.defineValue()}
      />
    );
  }
}

const mapStateToProps = state => ({ values: state.form });

const EnhancedTextField = connect(mapStateToProps, formActions)(TimePickerContainer);

export default EnhancedTextField;
