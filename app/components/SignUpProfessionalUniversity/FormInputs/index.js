import { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import stylesheet from './index.css';

class SignUpFormInputs extends Component {
  inputs = [
    {
      title: 'University',
      input: {
        type: 'string',
        name: 'university',
        hintText: this.props.params.fullname || 'John',
        errorText: []
      }
    },
    {
      title: 'Major',
      input: {
        type: 'string',
        name: 'major',
        hintText: this.props.params.fullname || 'John',
        errorText: []
      }
    },
    {
      title: 'Start year',
      input: {
        type: 'string',
        name: 'startYear',
        hintText: this.props.params.fullname || 'John',
        errorText: []
      }
    },
    {
      title: 'End year',
      input: {
        type: 'string',
        name: 'endYear',
        hintText: this.props.params.fullname || 'John',
        errorText: []
      }
    }
  ]

  handleChange = (e) => {
    const { name, value } = e.target;
    return this.props.onChange && this.props.onChange({ name, value });
  };

  renderInput = ({ title, input }) => (
    <div key={input.name} className={input.name}>
      <TextField
        type={input.type}
        name={input.name}
        floatingLabelText={title}
        floatingLabelFixed
        fullWidth
        hintText={input.hintText}
        hintStyle={{ fontSize: '11px' }}
        inputStyle={{ fontSize: '11px' }}
        floatingLabelStyle={{ fontSize: '12px', color: '#626262', fontWeight: 'bold' }}
        onChange={this.handleChange}
        mode="landscape"
      />
    </div>
  );

  render() {
    return (
      <div className="inputs">
        {this.inputs.map(this.renderInput)}
        <style global jsx>{stylesheet}</style>
      </div>
    );
  }
}

SignUpFormInputs.propTypes = {
  onChange: PropTypes.func,
  params: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired
  }).isRequired
};

export default SignUpFormInputs;
