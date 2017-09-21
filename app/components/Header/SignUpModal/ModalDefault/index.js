import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import style from './index.css';

class ModalDefault extends React.Component {
  renderInput = x => (
    <div className={x.input.name}>
      <TextField
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
            {inpt.map(this.renderInput)}

            <RaisedButton
              label="Continue"
              className="continuebtn-div"
              buttonStyle={{ backgroundColor: '#7262BF', fullWidth: true }}
              labelStyle={{ color: 'white', fontSize: '11px' }}
              onClick={this.props.onOpenModal}
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

const inpt = [
  {
    title: 'FIRST AND LAST NAME',
    input: {
      type: 'string',
      name: 'fullname',
      className: 'input',
      hintText: 'John Smith'
    }
  },
  {
    title: 'DATE OF BIRTH',
    input: {
      type: 'string',
      name: 'date',
      className: 'input',
      hintText: '13/11/1992'
    }
  },
  {
    title: 'EMAIL',
    input: {
      type: 'string',
      name: 'email',
      className: 'input',
      hintText: 'example@email.com'
    }
  },
  {
    title: 'PASSWORD',
    input: {
      type: 'string',
      name: 'email',
      className: 'input',
      hintText: 'at least six characters'
    }
  }
];

ModalDefault.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired
};

export default ModalDefault;
