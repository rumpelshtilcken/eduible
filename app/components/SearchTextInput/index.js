import { Component } from 'react';
import PropTypes from 'prop-types';

import stylesheet from './index.css';

class SearchTextInput extends Component {
  static defaultProps = {
    placeholder: 'search...'
  };

  static propTypes = {
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
          className="searchBar"
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
        />
        <img className="searchIcon" src="/static/search.png" alt="search" />
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default SearchTextInput;
