import { Component } from 'react';

import styles from './index.css';


class TabBarMenu extends Component {
  state ={
    links: [{
      link: '/ProfessionalProfileEdit  ',
      label: 'Profile Edit',
      className: 'link current'
    },
    {
      link: '/PaymentDetailsPage',
      label: 'Pay Out',
      className: 'link'
    }]
  }

  render() {
    return (
      <ul className="menu">
        {this.state.links.map(item =>
          <li><a className={item.className} href={item.link}>{item.label}</a></li>)}
        <style jsx>
          {styles}
        </style>
      </ul>);
  }
}

export default TabBarMenu;
