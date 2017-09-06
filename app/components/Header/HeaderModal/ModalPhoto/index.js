import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './index.css';

const config = [
  {
    title: 'BROWSE...',
    input: {
      type: 'file',
      className: 'inputfile',
      id: 'photo'
    }

  }];


class ModalDefault extends Component {
  renderInput = item => (
    <div>
      <input
        type={item.input.type}
        className={item.input.className}
        id={item.input.id}
      />
      <style jsx>{styles}</style>
    </div>
  );
  render() {
    const { onOpenModal } = this.props;

    return (
      <div className="form">
        <div className="caption">Add photo to your profile </div>
        <div className="captionGray">Ant profile is more appealing when a person's face is associated with it.</div>
        <div className="inputBox">
          <div className="browseAndEdit">
            <label htmlFor="photo" className="label">Browse...</label>
            {config.map(this.renderInput)}
      
            <img className="edit" src="/static/edit.svg" alt="edit" />
          </div>
          <div className="skip">skip this step</div>
          <button className="addButton" onClick={onOpenModal}>
            ADD
          </button>
        </div>
      
        <style jsx>{styles}</style>
      </div>
    );
  }
}

ModalDefault.propTypes = {
  onOpenModal: PropTypes.func.isRequired
};

export default ModalDefault;
