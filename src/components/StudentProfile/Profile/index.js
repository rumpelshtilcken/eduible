import Card from '../Card';
import stylesheet from './index.css';

const Profile = () => (
  <div className="wrapper">
    <Card isHalfRound>
      <div className="content">
        <div className="userPhoto" />
        <div className="userInfo">
          <h2 className="userName">Anna Stark</h2>
          <p className="userLocation">Miami, FL</p>
        </div>
        <div className="edit editIcon" />
        <div className="edit editButton">
          <button>Edit profile</button>
        </div>
      </div>
    </Card>
    <style jsx>{stylesheet}</style>
  </div>
);

export default Profile;
