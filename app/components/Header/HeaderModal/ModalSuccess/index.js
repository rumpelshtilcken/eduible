import styles from './index.css';

const ModalSuccess = () => (
  <div className="secondSign">
    <h1 className="signUpText">SIGN UP</h1>
    <div className="firstTxt">
      <p>A verification code has been sent to your email address.</p>
      <p>Please enter the code below to verify your email and finish the registration process</p>
    </div>
    <form className="codeForm">
      <input type="string" name="fullname" className="codeInput" placeholder="a233jnk4kl4k" />
      <button className="sendAgain"> Did not receive the code? Send again</button>
    </form>
    <button className="createButton">CREATE ACCOUNT</button>
    <p className="ssylka">
      By creating an account, you agree to &nbsp;
      <a href="">Eduible’s Terms and Conditions and Privacy Policy.</a>
    </p>
    <style jsx>{styles}</style>
  </div>
);

export default ModalSuccess;
