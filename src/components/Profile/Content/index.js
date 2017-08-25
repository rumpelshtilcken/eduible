import { Component } from 'react';

import About from './About';
import Price from './Price';
import stylesheet from './index.css';
import Calendar from './Calendar';

class Content extends Component {
  render() {
    return (
      <div className="bottom">
        <About />
        <Price />
        <Calendar />
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default Content;
