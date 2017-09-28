import Link from 'next/link';

import stylesheet from './index.css';

const Main = () => (
  <div>
    <div className="container">
      <div className="start"><div>LETS START LOOKING FOR</div></div>
      <div className="chooseBoxes">
        <div className="box">
          <div className="professionalsBox">
            <Link href="/searchProfessional" prefetch>
              <a className="text">
                <h1>PROFESSIONALS</h1>
                <p>lorem ipsum dolor sit amet vulputate consectetur adipiscing elit</p>
              </a>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="universityBox">
            <Link href="/searchUniversity" prefetch>
              <a className="text">
                <h1>UNIVERSITY</h1>
                <p>lorem ipsum dolor sit amet vulputate consectetur adipiscing elit</p>
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
