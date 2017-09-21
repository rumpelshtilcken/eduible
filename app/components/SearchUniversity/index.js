import { UniversityType } from 'types/common';
import { Component, PropTypes } from 'react';

import { FoundUniversities, SearchTextInput, InputRange, SelectDropdown } from 'components';

import stylesheet from './index.css';

class SearchUniversity extends Component {
  state = {
    foundUniversities: this.props.foundUniversities
  };
  handleRangeChange = () => {};
  handleSort = () => {};
  render() {
    return (
      <div className="container">
        <div className="searchWrap">
          <div className="searchBlock">
            <p className="searchTitle">Browse through more than 5000+ universities in the US</p>
            <SearchTextInput placeholder="search by university, major,college…" />
          </div>
        </div>
        <div className="universitiesWrap">
          <div className="leftSide">
            <p className="filterOption">FILTERS</p>
            <SelectDropdown
              className="universities"
              onChange={this.handleFilter}
              options={this.props.universities}
            />
            <SelectDropdown
              className="universities"
              onChange={this.handleFilter}
              options={this.props.universities}
            />
            <SelectDropdown
              className="universities"
              onChange={this.handleFilter}
              options={this.props.universities}
            />
            <select className="pricesFilter" defaultValue="LOWEST PRICE" onChange={this.handleSort}>
              <option key="HIGHEST PRICE">HIGHEST PRICE</option>
              <option key="LOWEST PRICE">LOWEST PRICE</option>
            </select>
            <br />
            <InputRange onChange={this.handleRangeChange} />
          </div>
          <div className="rightSide">
            <select
              className="hidden pricesFilter"
              defaultValue="LOWEST PRICE"
              onChange={this.handleSort}
            >
              <option key="HIGHEST PRICE">HIGHEST PRICE</option>
              <option key="LOWEST PRICE">LOWEST PRICE</option>
            </select>

            {this.state.foundUniversities.map(univer => (
              <FoundUniversities key={univer.title} univer={univer} />
            ))}
          </div>
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}
SearchUniversity.propTypes = {
  foundUniversities: UniversityType,
  universities: PropTypes.object
};

export default SearchUniversity;
