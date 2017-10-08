import PropTypes from 'prop-types';

import stylesheet from './index.css';

const About = ({ content }) => (
  <div className="profileBox about">
    <div className="half">
      <div className="boxTitle">{'About'}</div>
      <button className="boxEdit">
        <img className="boxEdit" src="/static/prof/edit.svg" alt="edit" />
      </button>
    </div>
    {content &&
      <div className="aboutContent">
        {content}
      </div>
    }
    <style jsx>{stylesheet}</style>
  </div>
);

About.propTypes = {
  content: PropTypes.string
};

export default About;
