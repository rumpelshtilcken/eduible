import PropTypes from 'prop-types';

import stylesheet from './index.css';

const SelectDropdown = ({ key, onChange, options, value }) => (
  <select key={key} onChange={onChange} value={value}>
    {options.map(opt =>
      (<option
        key={opt.value || opt.key}
        value={opt.value}
      >{opt.label}</option>))
    }

    <style jsx>{stylesheet}</style>
  </select>
);

SelectDropdown.propTypes = {
  key: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }).isRequired).isRequired,
  value: PropTypes.string.isRequired
};

export default SelectDropdown;
