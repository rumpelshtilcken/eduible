import { Component } from 'react';

import About from './About';
import Price from './Price';
import stylesheet from './index.css';
import Calendar from './Calendar';
import Conversations from './Conversations';

class Content extends Component {
  render() {
    return (
      <div className="bottom">
        <About />
        <Price />
        <Calendar />
        <Conversations />
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default Content;
