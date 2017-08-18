import styles from './index.css';

const ModalSuccess = () => (
  <div className="secondSign">
    <p className="signUpText">JOIN AS PROFESSIONAL</p>
    <div className="firstTxt">
      <p className="share">Share your knowledge and experience. Start now - it’s free</p>
    </div>
    <div className="columns">
      <div className="firstColumn">
        <form className="codeForm">
          <p>JOB TITLE</p>
          <input
            type="string"
            name="fullname"
            className="codeInput"
            placeholder="IT developer"
          />
          <p className="company">COMPANY</p>
          <input
            type="string"
            name="fullname"
            className="codeInput"
            placeholder="facebook"
          />
        </form>
      </div>
      <div className="secondColumn">
        <p className="provide">Providing your job title and company name  will help users find you on Eduible</p>
        <button className="continueButton" onClick="openThird()">CONTINUE</button>
        <a href="" className="ssylka">skip this step</a>
      </div>
    </div>
    <style jsx>{styles}</style>
  </div>
);

export default ModalSuccess;
