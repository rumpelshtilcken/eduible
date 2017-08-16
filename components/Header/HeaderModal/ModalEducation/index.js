import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './index.css';

const config = [
  {
    title: 'UNIVERSITY',
    input: {
      type: 'string',
      name: 'university',
      className: 'input',
      placeholder: 'Choose from the list'
    }
  },
  {
    title: 'MAJOR',
    input: {
      type: 'string',
      name: 'major',
      className: 'input',
      placeholder: 'Chose from the list'
    }
  },
  {
    title: 'Start YEAR',
    input: {
      type: 'string',
      name: 'start_year',
      className: 'input',
      placeholder: '2008'
    }
  },
  {
    title: 'END YEAR',
    input: {
      type: 'string',
      name: 'end_year',
      className: 'input',
      placeholder: '2013'
    }
  }
];

class ModalEducation extends Component {
  renderInput = item => (
    <div>
      <p>{item.title}</p>
      <input
        type={item.input.type}
        name={item.input.name}
        className={item.input.className}
        placeholder={item.input.placeholder}
      />
      <style jsx>{styles}</style>
    </div>
  );

  render() {
    const { onOpenModal } = this.props;

    return (
      <div className="form">
        <div className="caption">Lets add university, Major and Year studied to your profile.</div>
        <div className="captionGray"> It will increase att</div>
        <div className>
          <div className="inputBox">
            {config.map(this.renderInput)}
            <a className="skip" href="" >skip this step</a>
            <button className="continueButton" onClick={onOpenModal}>
              CONTINUE
            </button>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

ModalEducation.propTypes = {
  onOpenModal: PropTypes.func.isRequired
};

export default ModalEducation;
