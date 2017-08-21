import { Component } from 'react';
import stylesheet from './index.css';

class ProfileEdit extends Component {
  render() {
    return (
      <div className="container">
        <div className="navigation">
          <p className="violet">Profile Edit</p>
          <img src="/static/Linee.jpg" alt="" />
          <p className="payOut">Pay Out</p>
        </div>
        <div className="profile">
          <h3> Profile Edit</h3>
          <form>
            <div className="pic">
              <img src="/static/imgProf.jpg" alt="" />
              <
            </div>
          </form>
        </div>


        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}
export default ProfileEdit;
