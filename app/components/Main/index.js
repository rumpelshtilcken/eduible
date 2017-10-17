import Link from 'next/link';

import stylesheet from './index.css';

const Main = () => (
  <div>
    <div className="container">
      <div className="start">
        <div className="mainTitleContainer">
          <div>
            {'Welcome to Eduible Platform'}
          </div>
          <div>
            {'Place where questions find it\'s answers from primary source'}
          </div>
          <div>
            {'Connect with professionals from any industry and search for Universities worldwide'}
          </div>
        </div>
      </div>
      <div className="chooseBoxes">
        <div className="box">
          <div className="professionalsBox">
            <Link href="/searchProfessional" prefetch>
              <a className="text">
                <div>
                  <h1>PROFESSIONALS</h1>
                  <p>{'Connect with pros to gain knowledge, answer your questions & stay ahead of competition.'}</p>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="universityBox">
            <Link href="/searchUniversity" prefetch>
              <a className="text">
                <div>
                  <h1>UNIVERSITY</h1>
                  <p>{'Search by College or Major, get your personal admittance chart & take successful path.'}</p>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{stylesheet}</style>
    </div>
  </div>
);

export default Main;
