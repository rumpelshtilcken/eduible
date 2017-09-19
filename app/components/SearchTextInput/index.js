import PropTypes from 'prop-types';

import stylesheet from './index.css';

const SearchTextInput = ({ placeholder }) => (
  <div className="search">
    <input className="searchBar" placeholder={placeholder} />{' '}
    <img className="searchIcon" src="../../static/search.png" alt="search" />
    <style jsx>{stylesheet}</style>
  </div>
);

SearchTextInput.propTypes = {
  placeholder: PropTypes.string
};

SearchTextInput.defaultProps = {
  placeholder: 'search...'
};

export default SearchTextInput;
