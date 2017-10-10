import PropTypes from 'prop-types';

import stylesheet from './index.css';

const SearchTextInput = ({ placeholder, onChange }) => (
  <div className="search">
    <input className="searchBar" onChange={onChange} placeholder={placeholder} />{' '}
    <img className="searchIcon" src="../../static/search.png" alt="search" />
    <style jsx>{stylesheet}</style>
  </div>
);

SearchTextInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

SearchTextInput.defaultProps = {
  placeholder: 'search...'
};

export default SearchTextInput;
