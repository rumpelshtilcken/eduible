import { PropTypes, Component } from 'react';

import { Card, SearchTextInput } from 'components';

import ProfessionalRating from './ProfessionalRating';
import InputRange from './InputRange';
import stylesheet from './index.css';

class ProfessionalSearch extends Component {
  state = {
    profs: this.props.professionals
  };
  mSelect = 'All professions';
  uSelect = 'All universities';

  handleFilter = (e) => {
    const value = e.target.value;
    if (this.props.professionals.find(x => x.major === value)) this.mSelect = value;
    else if (this.props.professionals.find(x => x.university === value)) this.uSelect = value;
    else {
      this.uSelect = 'All universities';
      this.mSelect = 'All professions';
    }
    if (this.mSelect === 'All professions' && this.uSelect === 'All universities') {
      this.setState({ profs: this.props.professionals });
    } else if (this.mSelect !== 'All professions' && this.uSelect === 'All universities') {
      this.setState({ profs: this.props.professionals.filter(x => x.major === this.mSelect) });
    } else if (this.mSelect === 'All professions' && this.uSelect !== 'All universities') {
      this.setState({ profs: this.props.professionals.filter(x => x.university === this.uSelect) });
    } else if (this.mSelect !== 'All professions' && this.uSelect !== 'All universities') {
      this.setState({
        profs: this.props.professionals.filter(
          x => x.university === this.uSelect && x.major === this.mSelect
        )
      });
    }
  };

  handleSort = (e) => {
    const value = e.target.value;
    if (value === 'LOWEST PRICE') {
      this.setState({
        profs: this.state.profs.sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost))
      });
    } else {
      this.setState({
        profs: this.state.profs.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost))
      });
    }
  };

  handleRangeChange = ({ minCost, maxCost }) => {
    this.setState({
      profs: this.props.professionals.filter(x => x.cost >= minCost && x.cost <= maxCost)
    });
  };

  render() {
    return (
      <div className="con">
        <p className="title">Browse through more than 1000+ professionals in the US </p>
        <div className="searchBar">
          <SearchTextInput placeholder="search by name, profession, degree..." />
          <img className="searchIcon" src="../../static/search.png" alt="search" />
        </div>
        <hr />
        <div className="step">
          <div className="selects">
            <p className="hidden labels">FILTERS</p>
            <select className="professions" onChange={this.handleFilter}>
              <option value="All professions" key="All professions">
                All professions
              </option>
              {this.props.professions.map(item => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <select className="universities" onChange={this.handleFilter}>
              <option value="All universities" key="All universities">
                All universities
              </option>
              {this.props.universities.map(item => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="hidden">
              <p className="hidden labels">PRICE RANGE</p>
              <InputRange onChange={this.handleRangeChange} />
            </div>
          </div>
          <div className="profs">
            <select
              className="hidden pricesFilter"
              defaultValue="LOWEST PRICE"
              onChange={this.handleSort}
            >
              <option key="HIGHEST PRICE">HIGHEST PRICE</option>
              <option key="LOWEST PRICE">LOWEST PRICE</option>
            </select>
            {this.state.profs.map(item => (
              <Card>
                <div className="prof">
                  <div className="infoHeader">
                    <img src={item.picture} className="picture" alt="avatar" />
                    <div className="block">
                      <div className="step2">
                        <div className="name">{item.name} </div>
                        <div className="cityIcon">
                          <img
                            className="placaholderIcon"
                            src="../../static/placeholderIcon.svg"
                            alt=""
                          />
                          {item.city}
                        </div>
                      </div>
                      <div className="major">{item.major}</div>
                      <div className="about hidden">
                        {item.about.length > 100 ? (
                          `${item.about.substring(0, 100)}...`
                        ) : (
                          item.about
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="about unhidden">
                    {item.about.length > 100 ? `${item.about.substring(0, 100)}...` : item.about}
                  </div>
                  <div className="infoFooter">
                    <div className="cost">
                      <div>{`${item.cost}$ ${item.per}`}</div>
                      <div className="rating">
                        <ProfessionalRating rating={item.rating} />
                        <div className="reviews">&nbsp;({item.reviews} reviews)</div>
                      </div>
                    </div>
                    <button className="call"> Request a Call</button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <style jsx global>
          {stylesheet}
        </style>
      </div>
    );
  }
}

ProfessionalSearch.propTypes = {
  professionals: PropTypes.object.isRequired,
  universities: PropTypes.array.isRequired,
  professions: PropTypes.array.isRequired
};

export default ProfessionalSearch;
