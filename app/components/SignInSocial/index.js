import { Component } from 'react';
import PropTypes from 'prop-types';
import MuiButton from 'components/Material-ui/MuiButton';

import { MuiButton } from 'components';

import stylesheet from './index.css';

class SignInSocial extends Component {
  socialButtonParams = {
    Facebook: { color: '#6981CA', onClick: this.props.onFacebookButtonClick },
    Google: { color: '#CB5541', onClick: this.props.onGoogleButtonClick },
    Linkedin: { color: '#2679B2', onClick: this.props.onLinkedinButtonClick }
  };

  render() {
    const { renderButtons } = this.props;
    return (
      <div className="button">
        {renderButtons.map((signInType) => {
          const { color, onClick } = this.socialButtonParams[signInType];
          return (
            <MuiButton
              key={signInType}
              backgroundColor={color}
              onClick={onClick}
              label={signInType.toUpperCase()}
            />
          );
        })}
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

SignInSocial.propTypes = {
  renderButtons: PropTypes.arrayOf(PropTypes.string),
  onFacebookButtonClick: PropTypes.func,
  onGoogleButtonClick: PropTypes.func,
  onLinkedinButtonClick: PropTypes.func
};

export default SignInSocial;
