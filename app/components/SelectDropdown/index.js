import { Component } from 'react';
import PropTypes from 'prop-types';

import stylesheet from './index.css';

class SelectDropdown extends Component {
  static propTypes = {
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      }).isRequired
    ).isRequired
  };

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { key, value, options } = this.props;

    return (
      <select
        className="select"
        key={key}
        onChange={this.handleChange}
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
  }
}
export default SelectDropdown;
