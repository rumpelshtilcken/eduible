import { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { RoundedButton, SideMoreLayout, SelectDropdown, Textarea } from 'components';

import stylessheet from './index.css';

class CallRequestForm extends Component {
  state = {
    message: '',
    estimatedLength: '15',
    date: '24/08/17',
    time: '6.30'
  };
  estimatedLengthOptions = [
    { value: '15', label: '15 minutes ($75.00)' },
    { value: '30', label: '30 minutes ($150.00)' },
    { value: '60', label: '60 minutes ($300.00)' }
  ];

  suggestedDayOptions = [
    { value: '24/08/17', label: 'Thu, Aug 24 2017' },
    { value: '14/08/17', label: 'Mon, Aug 14 2017' },
    { value: '10/08/17', label: 'Sn, Aug 10 2017' }
  ];

  suggestedTimeOptions = [
    { value: '6.30', label: '6:30 PM' },
    { value: '7.00', label: '7:00 PM' },
    { value: '7.30', label: '7:30 PM' }
  ];

  handleMessageTextChange = event => this.setState({ message: event.target.value });

  handleEstimateLengthChange = event => this.setState({ estimatedLength: event.target.value });

  handleDateChange = event => this.setState({ date: event.target.value });

  handleTimeChange = event => this.setState({ time: event.target.value });

  handleRequestCallClick = (event) => {
    event.preventDefault();

    this.props.onRequestCallClick({
      message: this.state.message,
      estimatedLength: this.state.estimatedLength,
      date: this.state.date,
      time: this.state.time
    });
  };

  render() {
    return (
      <form className="container">
        <p className="formTitle">Request a Call</p>

        <p className="formElementTitle">Message to Miguel</p>
        <SideMoreLayout
          leftChildren={
            <div className="formTextareaContainer">
              <Textarea value={this.state.message} onChange={this.handleMessageTextChange} />
            </div>
          }
          rightChildren={
            <p className={'messageTitle'}>Tell Miguel what you want to talk with him about.</p>
          }
        />

        <p className="formElementTitle">Set Estimated Length</p>
        <SideMoreLayout
          leftChildren={
            <SelectDropdown
              onChange={this.handleEstimateLengthChange}
              value={this.state.estimatedLength}
              options={this.estimatedLengthOptions}
            />
          }
          rightChildren={
            <p
              className={cx('messageTitle', {
                dynamicText: true
              })}
            >
              How long do you want to talk with Miguel?
            </p>
          }
        />

        <div className="formElementTitle">
          <p>Suggest Times When You are Free to Talk</p>
          <p className="messageTitle">
            Please note that the times you choose will be 10 hours earlier for Miguel
          </p>
        </div>

        <SideMoreLayout
          leftChildren={
            <SelectDropdown
              onChange={this.handleDateChange}
              value={this.state.date}
              options={this.suggestedDayOptions}
            />
          }
          rightChildren={
            <SelectDropdown
              onChange={this.handleTimeChange}
              value={this.state.time}
              options={this.suggestedTimeOptions}
            />
          }
        />

        <div className="bottomContainer">
          <p>
            By scheduling a call you agree with our <u>Terms of Service.</u>
          </p>
          <div className="buttonContainer">
            <RoundedButton
              onClick={this.handleRequestCallClick}
              title="Request a Call"
              type="submit"
            />
          </div>
        </div>
        <style jsx>{stylessheet}</style>
      </form>
    );
  }
}

CallRequestForm.propTypes = {
  onRequestCallClick: PropTypes.func.isRequired
};

export default CallRequestForm;
