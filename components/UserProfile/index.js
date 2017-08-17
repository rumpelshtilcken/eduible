import { Component } from 'react';
import stylesheet from './index.css';

class UserProfile extends Component {
  render() {
    return (
      <div className="container">
        <div className="pageBlock pageBlock_halfRound" />
        <div className="pageBlockWrapper">
          <div className="tabMenu pageBlock" />
          <div className="universities pageBlock" />
        </div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

export default UserProfile;

