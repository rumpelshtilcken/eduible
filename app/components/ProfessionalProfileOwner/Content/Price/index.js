import { Component } from 'react';
import stylesheet from './index.css';

const Price = () => (
  <div className="profileBox meeting">
    <div className="half"><div className="boxTitle">Price</div>
      <button className="boxEdit">
        <img className="boxEdit" src="/static/prof/edit.svg" alt="edit" />
      </button>
    </div>
    <div className="meetingClock">
      <img src="/static/clock.jpg" alt="" />
      <p>$5 per minute</p>
    </div>

    <style jsx>{stylesheet}</style>
  </div>
);

export default Price;

