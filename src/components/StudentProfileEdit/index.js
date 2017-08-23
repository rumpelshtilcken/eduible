// import { Component } from 'react';
// import PropTypes from 'prop-types';
import stylesheet from './index.css';
// import PropTypes from 'prop-types';

import StudentProfile from './StudentProfile';
import StudentProfileDetails from './StudentProfileDetails';

const StudentProfileEdit = () =>
  (<div className="container">
    <StudentProfile
      profileName={'ANNA STARK'}
      profileImageUrl={'/static/anna.jpg'}
      profileLocation={'MIAMI, FL'}
      profileLocUrl={'/static/loc.jpg'}
    />
    <StudentProfileDetails />
    <style jsx>{stylesheet}</style>
  </div>);

export default StudentProfileEdit;

// class StudentProfileEdit extends Component {
//   render() {
//     return (
//       <div className="container">
// <div className="profile">
//   <img src="/static/anna.jpg" alt="" />
//   <div className="column">
//     <p className="anna">ANNA STARK</p>
//     <div className="row">
//       <img src="/static/loc.jpg" alt="" />
//       <p>MIAMI, FL</p>
//     </div>
//   </div>
//   <button className="editBtn"><p id="edit">Edit Profile</p></button>
// </div>
// <div className="secondPart">
//   <div className="navigation">
//     <p>Universities</p>
//     <img className="line" src="/static/Liine.jpg" alt="" />
//     <p>Grades</p>
//     <img className="line" src="/static/Liine.jpg" alt="" />
//    <div className="conv"><p className="conv">Conversations</p><img src="/static/circlee.jpg" alt="" />
// </div>;
//   </div>
//   <div className="conversations">
//     <div className="confer">
//       <p>Forthcoming Conferences</p>
//       <div className="firstConversation">
//         <div className="first" >
//           <img src="/static/profile.jpg" alt="" />
//           <div className="fullName">
//             <p>MIGUEL CARRERA</p>
//             <p>15 minutes</p>
//           </div>
//         </div>
//         <div className="second">
//           <div className="together">
//             <div className="calendar">
//               <img src="/static/Calendar.svg" alt="" />
//               <p>16 AUG, 2017</p>
//             </div>
//             <div className="duration">
//               <img src="/static/clock.svg" alt="" />
//               <p>3:30 PM</p>
//             </div>
//           </div>
//           <button className="connectBtn">Connect</button>
//         </div>
//       </div>
//       <div className="secondConversation">
//         <div className="first" >
//           <img src="/static/profile.jpg" alt="" />
//           <div className="fullName">
//             <p>MIGUEL CARRERA</p>
//             <p>15 minutes</p>
//           </div>
//         </div>
//         <div className="second">
//           <div className="together">
//             <div className="calendar">
//               <img src="/static/Calendar.svg" alt="" />
//               <p>16 AUG, 2017</p>
//             </div>
//             <div className="duration">
//               <img src="/static/clock.svg" alt="" />
//               <p>3:30 PM</p>
//             </div>
//           </div>
//           <button className="connectBtn">Connect</button>
//         </div>
//       </div>
//       <p>History</p>
//       <div className="history">
//         <div className="first" >
//           <img src="/static/profile.jpg" alt="" />
//           <div className="fullName">
//             <p>MIGUEL CARRERA</p>
//             <p>15 minutes</p>
//           </div>
//         </div>
//         <div className="second">
//           <div className="together">
//             <div className="calendar">
//               <img src="/static/Calendar.svg" alt="" />
//               <p>16 AUG, 2017</p>
//             </div>
//             <div className="duration">
//               <img src="/static/clock.svg" alt="" />
//               <p>3:30 PM</p>
//             </div>
//           </div>
//           <button className="connectBtn">History</button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// <style jsx>{stylesheet}</style> 
//       </div>
//     );
//   }
// }
// export default StudentProfileEdit;
