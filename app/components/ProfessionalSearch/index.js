import { PropTypes } from 'react';

import { Card, SearchTextInput } from 'components';

import stylesheet from './index.css';

const ProfessionalSearch = ({ professionals, universities, professions }) => (
  <div className="con">
    <p className="title">Browse through more than 1000+ professionals in the US </p>
    <div className="searchBar">
      <SearchTextInput placeholder="search by name, profession, degree..." />
      <img className="searchIcon" src="../../static/search.png" alt="search" />
    </div>
    <hr />
    <div className="selects">
      <select className="professions" defaultValue="Professions">
        {professions.map(item => <option key={item}>{item}</option>)}
        <option key="Professions" disabled hidden>
          Professions
        </option>
      </select>
      <select className="universities" defaultValue="Universities">
        <option key="Universities" disabled hidden>
          Universities
        </option>
        {universities.map(item => <option key={item}>{item}</option>)}
      </select>
    </div>
    <select className="pricesFilter" defaultValue="LOWEST PRICE">
      <option key="HIGHEST PRICE">HIGHEST PRICE</option>
      <option key="LOWEST PRICE">LOWEST PRICE</option>
    </select>
    {professionals.map(item => (
      <div className="profs">
        <Card>
          <div className="infoHeader">
            <img src={item.picture} className="picture" alt="avatar" />
            <div className="block">
              <div className="name">{item.name} </div>
              <div className="city">{item.city} </div>
              <div className="major">{item.major}</div>
            </div>
          </div>
          <div className="about"> {item.about}</div>
          <div className="infoFooter">
            <div className="cost">
              <div>{`${item.cost}$ ${item.per}`}</div>
              <div className="rating">{item.rating}</div>
            </div>
            <button className="call"> Request a Call</button>
          </div>
        </Card>
      </div>
    ))}

    <style jsx>{stylesheet}</style>
  </div>
);
const handleSelectChange = (e) => {
  console.log(e);
};
ProfessionalSearch.propTypes = {
  professionals: PropTypes.object,
  universities: PropTypes.object,
  professions: PropTypes.object
};

export default ProfessionalSearch;
