import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { SignUpStudent } from 'components';
import * as authActions from 'actions/auth';
import * as modalActions from 'actions/modal';
import * as formActions from 'actions/form';

class SignUpStudentContainer extends Component {
  static propTypes = {
    signupStudent: PropTypes.func.isRequired,
    hideModal: PropTypes.func,
    values: PropTypes.object.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleContinueButtonClick = async () => {
    const params = this.prepareParams();
    this.props.signupStudent(params, this.handleDidSignUp);
  };

  handleDidSignUp = () => {
    this.props.reset();
    this.props.hideModal();
  }

  prepareParams = () => {
    const values = _.omit(this.props.values, ['error']);

    const params = Object.keys(values).reduce((acc, key) => {
      let gKey;
      const value = this.props.values[key];
      switch (key) {
        case 'fullname':
          gKey = 'name';
          break;
        case 'date':
          gKey = 'birthday';
          break;
        default:
          gKey = key;
      }

      return value
        ? { ...acc, [gKey]: value }
        : acc;
    }, {});

    return params;
  };

  render() {
    return (
      <SignUpStudent
        onContinueButtonClick={this.handleContinueButtonClick}
        onLoginButtonClick={this.handleLoginButtonClick}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { error, timestamp, forgotMsg, loading } = state.auth;
  return {
    error,
    timestamp,
    forgotMsg,
    loading,
    values: state.form
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(authActions, dispatch),
  ...bindActionCreators(formActions, dispatch),
  ...bindActionCreators(modalActions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUpStudentContainer);
