import stylesheet from './index.css';

const About = () => (
  <div className="profileBox about">
    <div className="half">
      <div className="boxTitle">
        About
      </div>
      <button className="boxEdit">
        <img className="boxEdit" src="/static/prof/edit.svg" alt="edit" />
      </button>
    </div>
    <div className="aboutContent">Lorem ipsum dolor sit amet!
      consectetur adipiscing elit, sed do eiusmod
       tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore
         eu fugiat nulla pariatur.
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);

export default About;

