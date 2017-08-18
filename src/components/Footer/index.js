import stylesheet from './index.css';

const Footer = () => (
  <header>
    <div className="container">
      <div className="leftSide">
        <button className="menu">EXTRA MENU</button>
        <button className="menu">EXTRA MENU</button>
      </div>
      <div className="copyright">COPYRIGHT (C) 2017</div>
    </div>
    <style jsx>{stylesheet}</style>
  </header>
);

export default Footer;
