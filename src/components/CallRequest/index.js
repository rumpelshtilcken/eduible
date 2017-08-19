import { Component } from 'react';

import CallRequestHeader from './CallRequestHeader';
import CallRequestForm from './CallRequestForm';

class CallRequest extends Component {
  handleOnBackButtonClick = () => {};
  handleSelectChange = event => console.log('Chosen: ', event.target.value);

  render() {
    return (
      <div>
        <CallRequestHeader onBackButtonClick={this.handleOnBackButtonClick} />

        <CallRequestForm handleSelectChange={this.handleSelectChange} />
      </div>
    );
  }
}

export default CallRequest;
