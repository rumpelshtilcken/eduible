import { UniversityType } from 'types/common';

import FoundedUniversity from './FoundedUniversity';
import Search from './Search';
import stylesheet from './index.css';

const SearchUniversity = ({ universities }) =>
  (<div className="container">
    <div className="sortButtonsWrap">
      <div className="sortButtons">
        <button className="sortButton">SORT BY</button>
        <hr className="hr" />
        <button className="filterButton">FILTER</button>
      </div>
      <Search />
    </div>
    <div className="universitiesWrap">
      <div className="leftSide">
        <p className="filterOption">FILTERS</p>
        <div className="dropdownButtons">
          <button className="dropdownButton">FILTER DROPDOWN</button>
          <button className="dropdownButton">FILTER DROPDOWN</button>
          <button className="dropdownButton">FILTER DROPDOWN</button>
        </div>
        <div className="filterCheckboxes">
          <div className="filterCheckboxWrap">
            <input className="filterCheckbox" type="checkbox" />
            <span className="checkboxLabel">CHECKBOX FILTER</span>
          </div>
          <div className="filterCheckboxWrap">
            <input className="filterCheckbox" type="checkbox" />
            <span className="checkboxLabel">CHECKBOX FILTER</span>
          </div>
          <div className="filterCheckboxWrap">
            <input className="filterCheckbox" type="checkbox" />
            <span className="checkboxLabel">CHECKBOX FILTER</span>
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="filterLabels">
          <p className="filterOption">VIEW OPTION</p>
          <p className="filterOption">SORT OPTION</p>
          <p className="filterOption">OTHER OPTION</p>
        </div>

        {universities.map(univer => <FoundedUniversity key={univer.title} univer={univer} />)}
      </div>
    </div>
    <style jsx>
      {stylesheet}
    </style>
  </div>);

SearchUniversity.propTypes = {
  universities: UniversityType
};

export default SearchUniversity;
