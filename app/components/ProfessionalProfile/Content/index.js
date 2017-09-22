import About from './About';
import Calendar from './Calendar';
import stylesheet from './index.css';

const Content = () => (
  <div className="bottom">
    <About />
    <Calendar />
    <style jsx>{stylesheet}</style>
  </div>
);

export default Content;
