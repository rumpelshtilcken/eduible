import stylesheet from './index.css';

const ProfileEdit = () => (
  <div className="container">
    <div className="navigation">
      <p className="violet">Profile Edit</p>
      <img src="/static/Linee.jpg" alt="" />
      <p className="payOut">Pay Out</p>
    </div>
    <div className="profile">
      <h3> Profile Edit</h3>
      <div className="image">
        <div className="pic">
          <p className="change">Change</p>
        </div>
        <div className="background">
          <p>Upload Image</p>
        </div>
      </div>
      <form>
        <p>Full Name</p>
        <input type="text" name="fullName" placeholder="Migguel Carrera" />
        <p>Date of birth</p>
        <input type="text" name="date" placeholder="04/08/1984" />
        <p>About</p>
        <textarea
          type="text"
          name="message"
          placeholder="Lorem ipsum dolor sit amet!
consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum"
        />
        <p>Set Estimated Coast</p>
        <div className="two">
          <input type="number" className="dollarInput" placeholder="5" />
          <span className="dollar">$</span>
        </div>
      </form>
    </div>

    <style jsx>{stylesheet}</style>
  </div>
);

export default ProfileEdit;
