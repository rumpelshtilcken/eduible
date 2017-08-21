import PropTypes from 'prop-types';

import stylesheet from './index.css';

const SelectDropdown = ({ key, onChange, options, value }) =>
  (<select key={key || value} onChange={onChange} value={value}>
    {options.map(opt =>
      (<option key={opt.value || opt.key} value={opt.value}>
        {opt.label}
      </option>)
    )}

    <style jsx>
      {stylesheet}
    </style>
  </select>);

SelectDropdown.propTypes = {
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }).isRequired
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default SelectDropdown;
