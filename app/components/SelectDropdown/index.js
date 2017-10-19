import { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

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
    ).isRequired,
    transparent: PropTypes.bool
  };

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { key, value, options, transparent } = this.props;

    return (
      <select
        className={cx('select', {
          transparent
        })}
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
