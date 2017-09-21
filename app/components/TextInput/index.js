import { Component } from 'react';
import PropTypes from 'prop-types';
import stylessheet from './index.css';


class TextInput extends Component {
  handleUnfocus = () => {
    if (this.props.validation) {
      console.log(this.props.validation(this.inputRef.value));
    }
  };

  render() {
    const { placeholder, type, maxLength } = this.props;

    return (
      <div className="container">
        <input className="textInput" type={type} maxLength={maxLength} placeholder={placeholder} ref={ref => this.inputRef = ref} onBlur={this.handleUnfocus} />
        <style jsx>
          {stylessheet}
        </style>
      </div>
    );
  }
}

TextInput.defaultProps = {
  placeholder: ''
};

TextInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  validation: PropTypes.func,
  maxLength: PropTypes.string
};

export default TextInput;
