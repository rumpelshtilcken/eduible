import PropTypes from 'prop-types';

import stylessheet from './index.css';

const Textarea = ({ placeholder, value, onChange }) =>
  (<div className="textareaContainer">
    <textarea
      className="textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder || 'Your Message'}
    />
    <style jsx>{stylessheet}</style>
  </div>);

Textarea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Textarea;
