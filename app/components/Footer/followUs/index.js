import stylesheet from './index.css';

const FollowUs = () => (
  <div className="footerLinksBlock" >
    <div className="title"> FOLLOW US </div>
    <div className="iconContainer" >
      <a className="icon" href="www.facebook.com"><img src="/static/Icons/Facebook.svg" alt="" /></a>
      <a className="icon" href="www.facebook.com"><img src="/static/Icons/LinkedIn.svg" alt="" /></a>
      <a className="icon" href="www.facebook.com"><img src="/static/Icons/Tweeter.svg" alt="" /></a>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);


export default FollowUs;
