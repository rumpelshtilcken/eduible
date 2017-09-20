import { Card } from 'components';
import { UniversityType } from 'types/common';

import stylesheet from './index.css';

const FoundUniversities = ({ univer }) => (
  <div className="foundUniversitiesContainer">
    <Card>
      <div className="universityContainer">
        <div className="headerInfo">
          <div className="universityLogo" />
          <div className="headerRight">
            <div className="mainInfo">
              <p className="title">{univer.title}</p>
              <p className="city">
                <img className="placaholderIcon" src="../../static/placeholderIcon.svg" alt="" />
                {univer.city}
              </p>
            </div>
            <p className="description">{univer.description}</p>
          </div>
        </div>
        <div className="footerInfo">
          <div className="group">
            <p className="circle">~{univer.priceYear}K</p>
            <p className="text">price per year</p>
          </div>
          <div className="group">
            <p className="circle">{univer.received} of 10</p>
            <p className="text">students received</p>
          </div>
        </div>
      </div>
    </Card>

    <style jsx>{stylesheet}</style>
  </div>
);

FoundUniversities.propTypes = {
  univer: UniversityType
};

export default FoundUniversities;
