import { Component } from 'react';
import Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import FormInputs from './FormInputs';
import stylesheet from './index.css';

class SignUpProfessionalUniversity extends Component {
  state = {
    university: '',
    major: '',
    startYear: '',
    endYear: ''
  };

  handleChange = ({ name, value }) => this.setState({ [name]: value });

  handleAddButtonClick = () =>
    this.props.onAddButtonClick(this.state);

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Modal
            isOpen={this.props.isOpen}
            onRequestClose={this.props.onRequestClose}
            className="SignUpProfessionalUniversity"
            overlayClassName="OverlayModal"
          >
            <div className="container">
              <div className="headerTitle">{'Let’s add University, Major and Years studied to your profile.'}</div>
              <div className="description">It will increase attractiveness of your profile by users who are willing to take same academic pathway.
              </div>
              <FormInputs params={this.state} onChange={this.handleChange} />
              <button className="skip" onClick={this.props.onSkip}>{'skip this step'}</button>
            </div>
            <div className="button">
              <RaisedButton
                label="Add"
                className="btn"
                buttonStyle={{ backgroundColor: '#7262BF', fullWidth: true }}
                labelStyle={{ color: 'white', fontSize: '11px', fontWeight: 'bold' }}
                onClick={this.handleAddButtonClick}
              />
            </div>
            <style global jsx>{stylesheet}</style>
          </Modal>
        </div>
      </MuiThemeProvider>
    );
  }
}

SignUpProfessionalUniversity.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func,
  onSkip: PropTypes.func
};

export default SignUpProfessionalUniversity;
