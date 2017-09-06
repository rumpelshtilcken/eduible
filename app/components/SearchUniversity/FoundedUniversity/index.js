import { Card, RoundedButton } from 'components';
import { UniversityType } from 'types/common';

import stylesheet from './index.css';

const FoundedUniversity = ({ univer }) =>
  (<div className="foundedUniversityContainer">
    <Card>
      <div className="universityContainer">
        <div className="universityLogo" />

        <div className="detailsWrapper">
          <p className="rank">
            {univer.rank}
          </p>
          <div className="detailsContainer">
            <div className="generalInfo">
              <p className="title">
                {univer.title}
              </p>
              <p className="description">
                {univer.description}
              </p>
            </div>

            <div className="factsContainer">
              {univer.facts.map(fact =>
                (<p className="fact">
                  {fact}
                </p>)
              )}
            </div>

            <div className="buttonsContainer">
              <div className="actionButton">
                <RoundedButton title={'action button'} onClick={() => {}} />
              </div>
              <div className="actionButton">
                <RoundedButton title={'action button'} onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <style jsx>
      {stylesheet}
    </style>
  </div>);

FoundedUniversity.propTypes = {
  univer: UniversityType
};

export default FoundedUniversity;
