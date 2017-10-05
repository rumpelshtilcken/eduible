import { Component } from 'react';
import PropTypes from 'prop-types';

import { MuiTextField } from 'components';

import stylesheet from './index.css';

class SignInFormInputs extends Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    return this.props.onChange && this.props.onChange({ name, value });
  };

  render() {
    const { email, password } = this.props.params;

    return (
      <div className="inputsContainer">
        <div className="emailContainer">
          <MuiTextField
            key={'Email'}
            font
            name={'email'}
            onChange={this.handleChange}
            title={'Email'}
            type={'email'}
            value={email}
          />
        </div>
        <div className="passwordContainer">
          <MuiTextField
            key={'Password'}
            name={'password'}
            onChange={this.handleChange}
            title={'Password'}
            type={'password'}
            value={password}
          />
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

SignInFormInputs.propTypes = {
  onChange: PropTypes.func,
  params: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired
};

export default SignInFormInputs;
