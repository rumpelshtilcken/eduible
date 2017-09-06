import { Component, PropTypes } from 'react';

import { RoundedButton, SideMoreLayout, SelectDropdown, TextInput } from 'components';
import ValidationUtils from 'utils/ValidationUtils';

import stylessheet from './index.css';

class PaymentDetailsForm extends Component {
  state = {
    creditCardholderName: '',
    creditCardNumber: '',
    creditCardCVV: '',
    expirationMonth: '',
    expirationYear: ''
  };

  month = [
    { value: 'january', label: 'January' },
    { value: 'february', label: 'February' },
    { value: 'march', label: 'March' },
    { value: 'april', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'june', label: 'June' },
    { value: 'july', label: 'July' },
    { value: 'august', label: 'August' },
    { value: 'september', label: 'September' },
    { value: 'october', label: 'October' },
    { value: 'november', label: 'November' },
    { value: 'december', label: 'December' }
  ];

  generateYear = () => {
    const MAX_EXPIRATION_YEAR = 2025;
    const MIN_EXPIRATION_YEAR = 2017;
    const year = [];
    let i = 0;

    for (i = MIN_EXPIRATION_YEAR; i <= MAX_EXPIRATION_YEAR; i++) {
      year.push({ value: i, label: i });
    }

    return year;
  };

  handleExpirationMonthChoose = event => this.setState({ expirationMonth: event.target.value });
  handleExpirationYearChoose = event => this.setState({ expirationYear: event.target.value });

  handleCreditCardNumberType = event => this.setState({ creditCardNumber: event.target.value });
  handleCreditCardCVVType = event => this.setState({ creditCardCVV: event.target.value });

  handleCreditCardholderNameType = event =>
    this.setState({ creditCardholderName: event.target.value });

  handleRequestCallClick = () => { };

  render() {
    return (
      <div className="container">
        <p className="formTitle">Payment Details</p>

        <p className="formElementTitle"> Credit Card</p>
        <SideMoreLayout
          leftChildren={<TextInput type="text" maxLength="19" placeholder="1234 5678 9123 4567" validation={ValidationUtils.isValidEmail} />}
          rightChildren={<TextInput type="text" maxLength="3" placeholder="CVV" validation={ValidationUtils.isValidCVV} />}
        />

        <p className="formElementTitle"> Expiration</p>
        <SideMoreLayout
          leftChildren={
            <SelectDropdown
              onChange={this.handleExpirationMonthChoose}
              value={this.state.expirationMonth}
              options={this.month}
            />
          }
          rightChildren={
            <SelectDropdown
              onChange={this.handleExpirationYearChoose}
              value={this.state.expirationYear}
              options={this.generateYear()}
            />
          }
        />

        <p className="formElementTitle"> Cardholder Name</p>
        <TextInput type="text" placeholder="John Doe" validation={ValidationUtils.isValidName} />

        <div className="checkboxContainer">
          <input className="checkbox" type="checkbox" />
          <p className="checkboxTitle">Save my card information for future purchases</p>
        </div>

        <div className="priceTotalContainer">
          <p className="priceTotal">
            Total: {'$75.00'}
          </p>
          <div className="buttonContainer">
            <RoundedButton onClick={this.handleRequestCallClick} title="Submit" type="submit" />
          </div>
        </div>

        <style jsx>
          {stylessheet}
        </style>
      </div>
    );
  }
}

PaymentDetailsForm.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  getValue: PropTypes.func
};

export default PaymentDetailsForm;
