import stylesheet from './index.css';

const FollowUs = () => (
  <div className="footerLinksBlock" >
    <div className="title"> FOLLOW US </div>
    <div className="iconContainer" >
      <a
        className="icon"
        key="www.facebook.com"
        href="https://www.facebook.com/Eduible-1862562624009406"
      >
        <img src="/static/Icons/Facebook.svg" alt="" />
      </a>
      <a className="icon" key="www.linkedIn.com" href="https://www.LinkedIn.com"><img src="/static/Icons/LinkedIn.svg" alt="" /></a>
      <a className="icon" key="www.twitter.com" href="https://www.twitter.com"><img src="/static/Icons/Tweeter.svg" alt="" /></a>
    </div>
    <style jsx>{stylesheet}</style>
  </div>
);


export default FollowUs;
