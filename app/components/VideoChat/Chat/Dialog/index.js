import { Component } from 'react';
import PropTypes from 'prop-types';

import stylesheet from './index.css';

class TextInputBox extends Component {
  static propTypes = {
    onSubmitButtonClick: PropTypes.func.isRequired
  };

  state = {
    message: ''
  };

  handleKeyPress = ({ key }) =>
    (key === 'Enter') &&
    this.handleSubmitButtonClick();

  handleChange = ({ target: { value } }) => this.setState({ message: value });

  handleSubmitButtonClick = () => {
    if (!this.state.message) return;

    this.props.onSubmitButtonClick(this.state.message);
    this.setState({ message: '' });
  };

  render() {
    return (
      <div className="chatInputContainer">
        <input
          className="chatInput"
          type="text"
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type message ..."
          onKeyPress={this.handleKeyPress}
        />
        <button className="sendButton" onClick={this.handleSubmitButtonClick} />
        <style jsx> {stylesheet} </style>
      </div>
    );
  }
}

export default TextInputBox;
