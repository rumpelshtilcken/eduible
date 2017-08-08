import { Component } from 'react';
import stylesheet from './index.css';

class Menu extends Component {
  state = {
    menuOpen: false
  };
  render() {
    return (
      <ul className="menuWrap">
        <li className="menuItem">MENU 1</li>
        <li className="menuItem">MENU 2</li>
        <li className="menuItem">MENU 3</li>
        <style jsx>{stylesheet}</style>
      </ul>
    );
  }
}

export default Menu;
