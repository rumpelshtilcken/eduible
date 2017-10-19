import { Component } from 'react';
import PropTypes from 'prop-types';

import stylesheet from './index.css';

class SelectPrice extends Component {
  static propTypes = {
    handleSort: PropTypes.func
  };

  handleSort = e =>
    this.props.handleSort(e.target.value);

  render() {
    return (
      <select
        className="hidden pricesFilter"
        defaultValue="LOWEST PRICE"
        onChange={this.handleSort}
      >
        <option key="LOWEST PRICE" selected value={'price_ASC'}>LOWEST PRICE</option>
        <option key="HIGHEST PRICE" value={'price_DESC'}>HIGHEST PRICE</option>

        <style jsx>{stylesheet}</style>
      </select>
    );
  }
}
export default SelectPrice;
