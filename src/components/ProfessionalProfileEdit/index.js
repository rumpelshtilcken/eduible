import { Component, PropTypes } from 'react';

import styles from './index.css';


class ProfessionalProfileEdit extends Component {
  state ={
    defaultBackground: '/static/ProfileBackgroundImage(large).svg',
    defaultAvatar: '/static/Profile Picture.svg'
  }
  links = [{
    link: '/ProfessionalProfileEdit',
    label: 'Profile Edit',
    className: 'link current'
  },
  {
    link: '/PaymentDetailsPage',
    label: 'Pay Out',
    className: 'link'
  }];

  options = ['Per minute', 'Per day', 'Per hour'];
  openCalendar = (e) => {
    e.preventDefault();
    console.log('calendar');
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSaveButtonPress(
      {
        fullName: this.fullNameRef.value,
        dateOfBirth: this.dateOfBirthRef.value,
        about: this.aboutRef.value,
        cost: this.costRef.value,
        per: this.perRef.value,
        dayComment: this.dayCommentRef.value,
        currentPass: this.currentPassRef.value,
        newPass: this.newPassRef.value
      }
    );
  }

  render() {
    const {
      fullName,
      dateOfBirth,
      about,
      cost,
      per,
      dayComment,
      currentPass,
      newPass
    } = this.props.user;

    const {
      background,
      avatar
    } = this.props.images;

    return (
      <div className="component">
        <ul className="menu">
          {this.links.map(item =>
            <li><a className={item.className} href={item.link}>{item.label}</a></li>)}
        </ul>
        <div className="title"> Profile Edit</div>
        <form className="profile">
          <div className="photos">
            <label
              htmlFor="inputPhoto"
              className="photo"
              style={{ backgroundImage: `url(${avatar === '' ? `'${this.state.defaultAvatar}'` : avatar})` }}
            />
            <input type="file" accept="image/*" className="inputH" id="inputPhoto" />
            <label
              htmlFor="inputBack"
              className="uploadButton"
              style={{ backgroundImage: `url(${background === '' ? `'${this.state.defaultBackground}'` : background})` }}
            />
            <input type="file" accept="image/*" className="inputH" id="inputBack" />
          </div>
          <div className="step">
            <div className="step_child">
              <div className="label">Full Name</div>
              <input className="input" ref={ref => (this.fullNameRef = ref)} type="text" defaultValue={fullName} /></div>
            <div className="step_child"><div className="label">Date Of Birth</div>
              <input className="input date" ref={ref => (this.dateOfBirthRef = ref)} type="date" defaultValue={dateOfBirth} />
            </div>
          </div>
          <div className="label">About</div>
          <textarea className="input about" ref={ref => (this.aboutRef = ref)} placeholder="Tell us about you." defaultValue={about} />
          <div className="label">Set Estimated Cost</div>
          <div className="dollarSign">
            <input className="input small" ref={ref => (this.costRef = ref)} defaultValue={cost} type="text" />
            <select className="input select" ref={ref => (this.perRef = ref)} defaultValue={per} >
              {this.options.map(item => (
                <option>{item}</option>
              ))}
            </select>
          </div>
          <div className="label">Suggest Day When You're Free to Talk</div>
          <div className="step2">
            <button className="button" onClick={this.openCalendar}>Open Calendar</button>
            <input className="input comment" ref={ref => (this.dayCommentRef = ref)} type="text" defaultValue={dayComment} /></div>
          <div className="label">Change Password</div>
          <div className="passwords">
            <input className="input pass" ref={ref => (this.currentPassRef = ref)} type="text" placeholder="Current Password" defaultValue={currentPass} />
            <input className="input" ref={ref => (this.newPassRef = ref)} type="text" placeholder="New Password" defaultValue={newPass} />
          </div>
          <div className="buttons">
            <button className="button cancel" type="reset" >Cancel</button>
            <button className="button save" type="submit" onClick={this.handleSubmit} >Save Updates</button>
          </div>
        </form>
        <style jsx>
          {styles}
        </style>
      </div>
    );
  }
}
ProfessionalProfileEdit.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    per: PropTypes.string.isRequired,
    dayComment: PropTypes.string.isRequired,
    currentPass: PropTypes.string.isRequired,
    newPass: PropTypes.string.isRequired
  }),
  handleSaveButtonPress: PropTypes.func.isRequired,
  images: PropTypes.shape({
    background: PropTypes.string,
    avatar: PropTypes.string
  })
};

export default ProfessionalProfileEdit;
