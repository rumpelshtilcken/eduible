import { Component } from 'react';
import { WebAuth } from 'auth0-js';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { domain, clientId } from 'config';

import style from './index.css';

class ModalDefault extends Component {
  state = {
    fullname: '',
    date: '',
    email: '',
    password: ''
  };

  componentDidMount() {
    // TODO: add meaningfull redirect
    this.auth = new WebAuth({
      domain,
      clientID: clientId,
      redirectUri: 'localhost:3000/studentProfile',
      responseType: 'token'
    });
  }

  inpt = [
    {
      title: 'FIRST AND LAST NAME',
      input: {
        type: 'string',
        name: 'fullname',
        className: 'input',
        hintText: this.state.fullname
      }
    },
    {
      title: 'DATE OF BIRTH',
      input: {
        type: 'date',
        name: 'date',
        className: 'input',
        hintText: this.state.date
      }
    },
    {
      title: 'EMAIL',
      input: {
        type: 'string',
        name: 'email',
        className: 'input',
        hintText: this.state.email
      }
    },
    {
      title: 'PASSWORD',
      input: {
        type: 'string',
        name: 'password',
        className: 'input',
        hintText: this.state.password
      }
    }
  ];

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSignUpClick = () => {
    this.signUpUser();
  };

  /* Sign up */
  signUpUser = async () => {
    try {
      const result = await this.auth.signup({
        connection: 'Username-Password-Authentication',
        email: this.state.email,
        password: this.state.password
      }, (err) => {
        if (err) return console.log('Error:|| ', err);

        return console.log('success signup without login!');
      });

      console.log('Result: ', result);
    } catch (error) {
      console.log('Error catch: ', error);
    }
  }

  renderInput = x => (
    <div className={x.input.name}>
      <TextField
        key={x.input.name}
        onChange={this.handleChange}
        value={x.input.value}
        type={x.input.type}
        name={x.input.name}
        floatingLabelText={x.title}
        floatingLabelFixed
        fullWidth
        hintText={x.input.hintText}
        hintStyle={hintStyle}
        inputStyle={inputStyle}
        floatingLabelStyle={floatingLabelStyle}
      />
    </div>
  );

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        className="ModalDefault"
        overlayClassName="OverlayModal"
      >
        <div className="container">
          <p className="sign">JOIN AS PROFESSIONAL</p>
          <div className="container-div">
            {this.inpt.map(this.renderInput)}

            <RaisedButton
              label="Continue"
              className="continuebtn-div"
              buttonStyle={{ backgroundColor: '#7262BF', fullWidth: true }}
              labelStyle={{ color: 'white', fontSize: '11px' }}
              onClick={this.handleSignUpClick}
            />
            <div className="linkedinbtn-div" >
              <p>OR SIGN UP USING</p>
              <RaisedButton
                label="FACEBOOK"
                fullWidth
                buttonStyle={{ backgroundColor: '#6981CA' }}
                labelStyle={{
                  color: 'white',
                  fontSize: '11px'
                }}
              />
              <RaisedButton
                label="GOOGLE"
                fullWidth
                buttonStyle={{ backgroundColor: '#CB5541' }}
                style={{ marginTop: '14px' }}
                labelStyle={{
                  color: 'white',
                  fontSize: '11px'
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

ModalDefault.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired
};

export default ModalDefault;
