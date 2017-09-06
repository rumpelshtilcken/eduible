import { Component, PropTypes } from 'react';

import styles from './index.css';


class TabBarMenu extends Component {
onChange = e =>
  e.target.value !== this.props.currentTab && this.props.changeTab(e.target.value);


render() {
  return (
    <ul>
      {this.props.links.map(item =>
        (<li><button
          key={item.value}
          value={item.value}
          onClick={this.onChange}
          className={item.className}
        > {item.label} </button>
        </li>))}
      <style jsx>
        {styles}
      </style>
    </ul>);
}
}
TabBarMenu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      className: PropTypes.string.isRequired
    })).isRequired,
  currentTab: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired

};

export default TabBarMenu;
