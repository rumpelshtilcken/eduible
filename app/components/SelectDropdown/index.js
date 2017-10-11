import PropTypes from 'prop-types';

import stylesheet from './index.css';

const SelectDropdown = ({ className, key, onChange, options, value, defaultValue }) => (
  <select
    defaultValue={defaultValue || ''}
    className={className || 'select'}
    key={key}
    onChange={onChange}
    value={value}
  >
    {options.map(opt => (
      <option key={opt.key || opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}

    <style jsx>{stylesheet}</style>
  </select>
);

SelectDropdown.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }).isRequired
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default SelectDropdown;
