import stylesheet from './index.css';

const Header = () => (
  <header><div className="box">
    <div className="logo">
      <img src={'/static/images/eduible.svg'} alt={'logo'} />
    </div>
  </div>
    <style jsx>{stylesheet}</style>
  </header>
);

export default Header;
