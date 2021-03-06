import { Component } from 'react';
import PropTypes from 'prop-types';

import stylesheet from './index.css';

class SearchTextInput extends Component {
  static defaultProps = {
    placeholder: 'search...'
  };

  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  handleChange = (event) => {
    this.props.onChange(event.target);
  };

  render() {
    return (
      <div className="search">
        <input
          value={this.props.value}
          className="searchBar"
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
        />
        <img className="searchIcon" src="http://res.cloudinary.com/dsyyowxl0/image/upload/v1509976838/search_q5onpq.svg" alt="search" />
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default SearchTextInput;
