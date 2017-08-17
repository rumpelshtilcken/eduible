import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './index.css';

const config = [
  {
    title: 'BROWSE...',
    input: {
      type: 'file',
      name: 'photo',
      className: 'inputfile'
    }

  }];


class ModalDefault extends Component {
  renderInput = item => (
    <div>
      <p>{item.title}</p>
      <input
        type={item.input.type}
        name={item.input.name}
        className={item.input.className}
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
          <a href="">Browse...</a>
          {config.map(this.renderInput)}
          <label className="label" for="photo"/>
          <img classname="browse" src="/static/borwse.svg" />
          <img className="edit"  src="/static/edit.svg" />
          <div className="captionGray">skip this step</div>
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
