import { Component } from 'react';
import stylesheet from './index.css';

const About = () => (
  <div className="profileBox about">
    <div className="half"><div className="boxTitle">About </div>
      <button className="boxEdit">
        <img className="boxEdit" src="/static/prof/edit.svg" alt="edit" />
      </button>
    </div>
    <div className="aboutContent">My name is Miguel. I
     don't know what to tell me about yourself,
     so that the block is a bit sparse. </div>

    <style jsx>{stylesheet}</style>
  </div>
);
export default About;

