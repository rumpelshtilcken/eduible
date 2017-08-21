import { Component } from 'react';
import PropTypes from 'prop-types';

import stylessheet from './index.css';

class TextInput extends Component {
  render() {
    const { placeholder } = this.props;

    return (
      <div className="container">
        <input className="textInput" type="text" placeholder={placeholder} />
        <style jsx>
          {stylessheet}
        </style>
      </div>
    );
  }
}

TextInput.defaultProps = {
  placeholder: '',
  type: PropTypes.oneOf
};

TextInput.propTypes = {
  placeholder: PropTypes.string
};

export default TextInput;
