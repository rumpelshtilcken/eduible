import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import ValidationUtils from '/utils/ValidationUtils';
import { Scrollbars } from 'react-custom-scrollbars';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import style from './index.css';

class SignUpAsProfessional extends React.Component {
    inpt = [
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
        title: 'DATE OF BIRTH',
        input: {
          type: 'string',
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
          type: 'string',
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

  handleChange = (e, i) => {
    const em = e.target.value;
    const field = this.inpt[i].input;
    const err = { errorText: '' };

    switch (field.name) {
      case 'fullname':
        break;
      case 'email':
        if (!ValidationUtils.isValidEmail(em)) {
          err.errorText = 'invalid email';
          field.errorText.push([err.errorText]);
          this.setState({ [this.inpt[i].input.errorText]: field.errorText });
        }
        this.setState({});
        break;
      case 'date':
        this.setState({});
        break;
      case 'pwd':
        this.setState({});
        break;
      case 'country':
        this.setState({});
        break;
      case 'zip':
        this.setState({});
        break;
      default:
        this.setState({ [inpt.errorText]: '' });
        break;
    }
  }

  renderInput = (x, i) =>
    (<div className={x.input.name}>
      <TextField
        type={x.input.type}
        name={x.input.name}
        floatingLabelText={x.title}
        floatingLabelFixed
        fullWidth
        hintText={x.input.hintText}
        errorText={x.input.errorText[0]}
        hintStyle={hintStyle}
        inputStyle={inputStyle}
        floatingLabelStyle={floatingLabelStyle}
        onBlur={e => this.handleChange(e, i)}
      />
    </div>);

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        className="SignUpAsProfessional"
        overlayClassName="OverlayModal"
      >
        <Scrollbars style={style.scroll} autohide>
          <div className="container">
            <div>
              <p className="sign">JOIN AS PROFESSIONAL</p>
              <p className="share">Share your knowledge and experience. Start now - it’s free</p>
            </div>
            <div className="container-div">
              {this.inpt.map(this.renderInput)}

              <RaisedButton
                label="Continue"
                className="continuebtn-div"
                buttonStyle={{ backgroundColor: '#7262BF', fullWidth: true }}
                labelStyle={{ color: 'white', fontSize: '11px' }}
                onClick={this.props.openJobTitleModal}
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
            <style global>{style}</style>
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
