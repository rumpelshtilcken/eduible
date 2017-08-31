import { Component } from 'react';
import stylesheet from './index.css';

const Price = () => (
  <div className="profile_box meeting">
    <div className="half"><div className="box_title">Price</div>
      <button className="box__edit">
        <img className="box__edit" src="/static/prof/edit.svg" alt="edit" />
      </button>
    </div>
    <div className="meeting_clock">
      <img src="/static/clock.jpg" alt="" />
      <p>$5 per minute</p>
    </div>

    <style jsx>{stylesheet}</style>
  </div>
);

export default Price;

