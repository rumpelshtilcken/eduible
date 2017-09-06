import PropTypes from 'prop-types';

import stylessheet from './index.css';

const Textarea = ({ placeholder, value, onChange }) =>
  (<div className="textareaContainer">
    <textarea className="textarea" value={value} onChange={onChange} placeholder={placeholder} />
    <style jsx>
      {stylessheet}
    </style>
  </div>);

Textarea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

Textarea.defaultProps = {
  placeholder: 'Your Message'
};

export default Textarea;
