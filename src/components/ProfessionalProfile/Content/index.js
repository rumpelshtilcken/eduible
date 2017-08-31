import About from './About';
import Price from './Price';
import Calendar from './Calendar';
import stylesheet from './index.css';

const Content = () => (
  <div className="bottom">
    <About />
    <Price />
    <Calendar />
    <style jsx>{stylesheet}</style>
  </div>
);

export default Content;
