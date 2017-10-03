import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import ValidationUtils from 'utils/ValidationUtils';
import { Scrollbars } from 'react-custom-scrollbars';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

class SignUpAsProfessional extends React.Component {
    state = {
      error: false,
      inpt: [
        {
          title: 'FIRST AND LAST NAME',
          input: {
            type: 'string',
            name: 'fullname',
            hintText: 'John Doe',
            errorText: []
          }
        },
        {
          title: 'BIRTH DATE',
          input: {
            name: 'date',
            hintText: '13/11/1992',
            errorText: []
          }
        },
        {
          title: 'EMAIL',
          input: {
            type: 'string',
            name: 'email',
            hintText: 'example@email.com',
            errorText: []
          }
        },
        {
          title: 'PASSWORD',
          input: {
            type: 'password',
            name: 'pwd',
            hintText: 'at least six characters',
            errorText: []
          }
        },
        {
          title: 'COUNTRY',
          input: {
            type: 'string',
            name: 'country',
            hintText: 'choose from the list',
            errorText: []
          }
        },
        {
          title: 'ZIP CODE',
          input: {
            type: 'string',
            name: 'zip',
            hintText: '16044728',
            errorText: []
          }
        }
      ]
    }

  handleChange = (e, i) => {
    const em = e.target.value;
    const field = this.state.inpt[i].input;
    const err = {};
    switch (field.name) {
      case 'fullname':
        err.errTxt = 'invalid name';
        this.validate(e, i, ValidationUtils.isValidName(em), err.errTxt);
        break;
      case 'email':
        err.errTxt = 'invalid email';
        this.validate(e, i, ValidationUtils.isValidEmail(em), err.errTxt);
        break;
      case 'pwd':
        err.errTxt = 'invalid password';
        this.validate(e, i, ValidationUtils.isValidPassword(em), err.errTxt);
        break;
      default:
        this.setState({ error: false });
        break;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.error) {
      this.props.openJobTitleModal();
    }
  }

  validate = (e, i, isBool, errTxt) => {
    const field = this.state.inpt[i].input;

    if (!isBool) {
      this.setState({ [this.state.error]: true });
      field.errorText.push(errTxt);
      this.setState({
        ...this.state.inpt[i].input.errorText,
        ...field.errorText });
    } else {
      this.setState({ [this.state.error]: false });
      this.state.inpt[i].input.errorText = [];
    }
  }

  renderInput = (x, i) => {
    if (i === 1) {
      return (<div className={x.input.name}>
        <DatePicker
          floatingLabelText={x.title}
          floatingLabelFixed
          floatingLabelStyle={floatingLabelStyle}
          hintText={x.input.hintText}
          hintStyle={hintStyle}
          inputStyle={inputStyle}
          mode="landscape"
          fullWidth
        />
      </div>);
    }
    if (i !== 1) {
      return (<div className={x.input.name}>
        <TextField
          type={x.input.type}
          name={x.input.name}
          floatingLabelText={x.title}
          floatingLabelFixed
          fullWidth
          hintText={x.input.hintText}
          errorText={x.input.errorText[[x.input.errorText.length] - 1]}
          hintStyle={hintStyle}
          inputStyle={inputStyle}
          floatingLabelStyle={floatingLabelStyle}
          onBlur={e => this.handleChange(e, i)}
        />
      </div>);
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        className="SignUpAsProfessional"
        overlayClassName="OverlayModal"
      >
        <Scrollbars autohide>
          <div className="container">
            <div>
              <p className="sign">JOIN AS PROFESSIONAL</p>
              <p className="share">Share your knowledge and experience. Start now - it’s free</p>
            </div>
            <div className="container-div">
              {this.state.inpt.map(this.renderInput)}

              <RaisedButton
                label="Continue"
                className="continuebtn-div"
                buttonStyle={{ backgroundColor: '#7262BF', fullWidth: true }}
                labelStyle={{ color: 'white', fontSize: '11px' }}
                onClick={this.handleSubmit}
              />
              <div className="linkedinbtn-div" >
                <p>OR JOIN WITH</p>
                <RaisedButton
                  label="LINKEDIN"
                  fullWidth
                  buttonStyle={{ backgroundColor: '#2679B2' }}
                  labelStyle={{
                    color: 'white',
                    fontSize: '11px',
                    fontFamily: 'Effra'
                  }}
                />
              </div>
              <div className="loginhere-div">
                <img src="/static/Line.jpg" alt="hrline" />
                <p>ALREADY A MEMBER?</p>
                <a href="#">Login here</a>
              </div>
            </div>
          </div>
        </Scrollbars>
      </Modal>
    );
  }
}

const inputStyle = {
  fontSize: '11px'
};

const hintStyle = {
  fontSize: '11px'
};

const floatingLabelStyle = {
  fontSize: '12px',
  color: '#626262'
};

SignUpAsProfessional.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  openJobTitleModal: PropTypes.func.isRequired
};

export default SignUpAsProfessional;
