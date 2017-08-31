import stylesheet from './index.css';

const About = () => (
  <div className="profile_box about">
    <div className="half">
      <div className="box_title">
        About
      </div>
      <button className="box__edit">
        <img className="box__edit" src="/static/prof/edit.svg" alt="edit" />
      </button>
    </div>
    <div className="about_content">Lorem ipsum dolor sit amet!
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

