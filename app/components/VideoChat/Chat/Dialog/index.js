import { Component } from 'react';
import PropTypes from 'prop-types';

import stylesheet from './index.css';

class TextInputBox extends Component {
  static propTypes = {
    onSubmitButtonClick: PropTypes.func.isRequired
  };

  state = {
    message: ''
  }

  handleChange = ({ target: value }) => this.setState({ message: value });

  handleSubmit = () => {
    this.props.onSubmitButtonClick(this.state.msg);
    this.setState({ msg: '' });
  }

  render() {
    return (
      <div className="chatInputContainer">
        <input
          className="chatInput"
          type="text"
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type message ..."
        />
        <button className="sendButton" onClick={this.handleSubmit} />
        <style jsx> {stylesheet} </style>
      </div>
    );
  }
}

export default TextInputBox;
