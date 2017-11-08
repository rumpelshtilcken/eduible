import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as formActions from 'actions/form';

import { MuiTextField } from 'components';

class TextFieldContainer extends Component {
  static propTypes = {
    onContinueButtonClick: PropTypes.func,
    errorMessage: PropTypes.func,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    validation: PropTypes.func,
    values: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (this.props.validation) {
      this.validation(this.props.name, (this.props.values[name] || ''));
    }
  }

  handleEnterKeyPress = event => (event.key === 'Enter') &&
                                  this.props.onContinueButtonClick &&
                                  this.props.onContinueButtonClick();

  handleChange = ({ target }) => {
    if (this.props.validation) this.validation(target.name, target.value);
    this.props.update({ name: target.name, value: target.value });
  }

  validation = (name, value) => {
    const errorMessage = this.props.validation(value) || '';
    this.props.errorMessage({ name, errorMessage });
  };

  defineValue = () =>
    this.props.values &&
    this.props.values[this.props.name] &&
    this.props.values[this.props.name];

  render() {
    const { name, title, type, values, placeholder } = this.props;
    return (
      <MuiTextField
        onEnterKeyPress={this.handleEnterKeyPress}
        errorText={values && values.error && values.error[name]}
        name={name}
        onChange={this.handleChange}
        title={title}
        type={type}
        placeholder={placeholder}
        value={this.defineValue()}
      />
    );
  }
}

const mapStateToProps = state => ({ values: state.form });

const EnhancedTextField = connect(mapStateToProps, formActions)(TextFieldContainer);

export default EnhancedTextField;
