import { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { RoundedButton, SideMoreLayout } from 'components';
import DatePickerContainer from 'containers/DatePickerContainer';
import TextFieldContainer from 'containers/TextFieldContainer';
import SelectDropDownContainer from 'containers/SelectDropDownContainer';
import TimePickerContainer from 'containers/TimePickerContainer';

import stylessheet from './index.css';

class CallRequestForm extends Component {
  propTypes = {
    professional: PropTypes.shape({
      price: PropTypes.number,
      user: PropTypes.shape({ name: PropTypes.string.isRequired }),
      educations: PropTypes.arrayOf({
        startYear: PropTypes.date,
        endYear: PropTypes.date,
        major: PropTypes.shape({
          name: PropTypes.string.isRequired,
          school: PropTypes.shape({
            university: PropTypes.shape({ name: PropTypes.string.isRequired })
          })
        })
      }),
      job: PropTypes.shape({
        jobTitle: PropTypes.shape({ title: PropTypes.string.isRequired }),
        company: PropTypes.shape({ name: PropTypes.string.isRequired })
      })
    }),
    onRequestCallClick: PropTypes.func.isRequired
  };

  estimatedLengthOptions = [
    { key: '15 minutes', value: '15', label: `15 minutes ($${this.props.professional.price * 15})` },
    { key: '30 minutes', value: '30', label: `30 minutes ($${this.props.professional.price * 30})` },
    { key: '60 minutes', value: '60', label: `60 minutes ($${this.props.professional.price * 60})` }
  ];

  handleRequestCallClick = (event) => {
    event.preventDefault();

    this.props.onRequestCallClick();
  };

  render() {
    const { user } = this.props.professional;
    const firstName = user.name.split(' ')[0];
    return (
      <form className="container">
        <p className="formTitle">Request a Call</p>

        <p className="formElementTitle">{`Message to ${firstName}`}</p>
        <SideMoreLayout
          leftChildren={
            <div className="formTextareaContainer">
              <TextFieldContainer
                name={'message'}
                type={'string'}
                placeholder={'Message...'}
              />
            </div>
          }
          rightChildren={
            <p className={'messageTitle'}>
              {`Tell ${firstName} what you want to talk with him about.`}
            </p>
          }
        />

        <p className="formElementTitle">Set Estimated Length</p>
        <SideMoreLayout
          leftChildren={
            <SelectDropDownContainer
              isFormInput
              reduxStoreName={'appointmentLength'}
              options={this.estimatedLengthOptions}
            />
          }
          rightChildren={
            <p className={cx('messageTitle', { dynamicText: true })} >
              {`How long do you want to talk with ${firstName}?`}
            </p>
          }
        />

        <div className="formElementTitle">
          <p>Suggest Times When You are Free to Talk</p>
          <p className="messageTitle">
            {`Please note that the times you choose will be 10 hours earlier for ${firstName}`}
          </p>
        </div>

        <SideMoreLayout
          leftChildren={
            <DatePickerContainer
              name={'appointmentDate'}
              placeholder={'13/11/2018'}
            />
          }
          rightChildren={
            <TimePickerContainer
              name={'appointmentTime'}
              placeholder={'12.00'}
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

export default CallRequestForm;
