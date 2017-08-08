import { Component } from 'react';

import stylesheet from './index.css';

class ComingSoon extends Component {
  render() {
    return (
      <div className="container">
        <div className="sortButtonsWrap">
          <div className="sortButtons">
            <button className="sortButton">SORT BY</button>
            <hr className="hr" />
            <button className="filterButton">FILTER</button>
          </div>
          <div className="searchBlock">
            <p className="searchTitle">Browse through more than 5000+
            universities in the US</p>
            <input className="searchBar" placeholder="search by university, major,college…" />
          </div>
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
            <div className="universityCard">
              <div className="universityLogoWrapper">
                <div className="universityLogo" />
              </div>
              <div className="detailsWrap">
                <p className="ranking">RANKING</p>
                <div className="details">
                  <div className="description">
                    <p className="title">TITLE</p>
                    <p className="about">short description short description short
                    short description short description short</p>
                  </div>
                  <div className="facts">
                    <p className="fact">FACT 1</p>
                    <p className="fact">FACT 2</p>
                    <p className="fact">FACT 3</p>
                    <p className="fact">FACT 4</p>
                  </div>
                  <div className="buttons">
                    <button className="button">action button</button>
                    <button className="button">action button</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default ComingSoon;
