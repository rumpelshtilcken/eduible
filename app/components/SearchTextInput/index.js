import PropTypes from 'prop-types';

import stylesheet from './index.css';

const SearchTextInput = ({ placeholder }) =>
  (<div>
    <input className="searchBar" placeholder={placeholder} />
    <style jsx>
      {stylesheet}
    </style>
  </div>);

SearchTextInput.propTypes = {
  placeholder: PropTypes.string
};

SearchTextInput.defaultProps = {
  placeholder: 'search...'
};

export default SearchTextInput;
