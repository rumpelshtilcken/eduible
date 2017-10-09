import { PropTypes, Component } from 'react';

import { Card, SearchTextInput, InputRange, ProfessionalRating, SelectDropdown } from 'components';

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

  handleSearchChange = (event) => {
    this.props.onSearchChange(event.target);
  };

  render() {
    return (
      <div className="con">
        <p className="title">Browse through more than 1000+ professionals in the US </p>
        <SearchTextInput placeholder="search by name, profession, degree..." onChange={this.handleSearchChange} />
        <hr />
        <div className="step">
          <div className="selects">
            <div className="hidden labels">FILTERS</div>
            <SelectDropdown
              className="professions"
              onChange={this.handleFilter}
              options={this.props.professions}
            />
            <SelectDropdown
              className="universities"
              onChange={this.handleFilter}
              options={this.props.universities}
            />
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
            {this.props.professionals && this.props.professionals.map(prof => (
              <Card>
                <div className="prof">
                  <div className="infoHeader">
                    <img src={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0lIiAdHx8kKDosJCY7JysfLT0tLzU9Ojo6Iys1Oz84TTRCRUEBCgoKDQwNDgUNEy0ZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIADwAPAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAHCAAGAQQFAwL/xAA3EAABAwIEAwUFBgcAAAAAAAABAgMEBREABhIhEzFBB1FSYZEUFSKB0SMyQnGxwQhTYoKh8PH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwA4YnXExCcBOuM4H9bz3U36lIpOSqKqrSo6tD8latLDK/De4ufmMVer5m7XqYC9IoUUtAXIjs8YAf2rJwBnxBgAU3t3rEeRorVIiOoBsoMFTS0+pP7YLuUM50fN0QvUp8lxA+1juCzjf5ju8xtgLEMTGcTAYxyM0yJLNGfRADhlvDhshoXXc8ykHa4FyL7bb2x18VavM1KqJlP0F5CZMZCo7XGUpKFqO6/iTuLEJFx4VDa98B55DqMAxXKJHpr9KlQAOJDkW1kHk5cbKueZ78WzFWoDpjo49TbSZqC3G1pUXChS9OpAWSSRq+K1zYW32sOfmaoxJlVTTxXqtBdOopENbSQCj7xsRrUB16bHuOA3835BoOa2lmdES1LI+GWyNLgPmfxfkcLzVIda7Mc4pSy/Z9mzjLqb6Xmz3juNiCPLDN0FFUYZcj1WQ3M0WLMxCAgupPiSNgod42NxywuXbbXE1nPMltsEN09PsouOZSSVH1JHywDC5KzNFzXQGKpFskr+F1q9y0sc0n/eRGO9hcf4f68uBmxdJWo+z1Bo2TfYOIBUD6ah6YY/AYPI4rtBckOUmCwjd1LTbkpZFgorGpQB77m//bgF1XtszVNWfYzEgtm4Aba1n5lV/wBBgrzKzVIWQKBWqYzIfSiOwuWzHSkrU2psXIuk8jY9Nr7jAWKoRkhpgU5hfEpjvHQzoKUukoUnSFEWJOo7772vjak0Kmyp6Kg9ER7ahBQmQglDlj01Ag2xWsp57NelNR002cUuJJLyoi20tn+q9028wrn0xcISnlxW1SkhDxF1JHTAfLq41Mp63F6WYsZok9AhCR+wwoVaj1SpvTswOwJQiSZC3FSC0rh3Wom2rlhvZ4irjqZmoQ408CgtKTqDmxJFuuwO2At20ZgSaS5TeGptLjmmO04jQoNjhnVp52uk8+eodxsFD7IIz0ntEo/AB+zcU4sjokJN7/p88NgMLl2K5kytlf2yTWpa2Z8izaDwVKShsb8wDuT+gwbYudMrymUvM16nFB5apKUn0JBGATzDddnzq3Ml5d4PCWx7A0lxWvdJCQNtt9wQeWFf91MeJz1H0wR+ymTLgRKy3GnSUojRTIZQXLpQsc/h5G/W4xKlMBbGhMqbbLpjx0mRL/koP3fNR/CPM/K/LGhTZMltnU9IXIWsaip0AW8gEgD/ABjxrlTkstMNsKS0X5CGlLSPiSDzIvtfClVntczicv5dEZnSuqvnhodb2EdWndST4gDt1GoH81ulSX5b635TzjzyzdTjiipSj5k4LfbTHbeqVNigFtliMVpSk81KWdRJNySbDfA491MeJz1H0wpXFxMdr3Ux4nPUfTE91MeJz1H0wpX/2Q=='} className="picture" alt="avatar" />
                    <div className="block">
                      <div className="step2">
                        <div className="name">{prof.user.name} </div>
                        <div className="cityIcon">
                          <img
                            className="placaholderIcon"
                            src="../../static/placeholderIcon.svg"
                            alt=""
                          />
                          {prof.country && prof.country.name}
                        </div>
                      </div>
                      {prof.majors && prof.majors.map(major => (
                        <div key={major.name} className="major">{major.name}</div>
                      ))}
                      <div className="about hidden">
                        {prof.about && (prof.about.length > 100
                          ? `${prof.about.substring(0, 100)}...`
                          : prof.about)}
                      </div>
                    </div>
                  </div>
                  <div className="about unhidden">
                    {prof.about && (prof.about.length > 100 ? `${prof.about.substring(0, 100)}...` : prof.about)}
                  </div>
                  <div className="infoFooter">
                    <div className="cost">
                      {prof.price && (<div>{`${prof.price}$ per minute`}</div>)}
                      <div className="rating">
                        {prof.ratings && (
                          <ProfessionalRating rating={prof.rating} />
                        )}
                        {prof.reviews && (
                          <div className="reviews">&nbsp;({prof.reviews} reviews)</div>
                        )}
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
  professionals: PropTypes.array.isRequired,
  universities: PropTypes.array.isRequired,
  professions: PropTypes.array,
  onSearchChange: PropTypes.func
};

export default ProfessionalSearch;
