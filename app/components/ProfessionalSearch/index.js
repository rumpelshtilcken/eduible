import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  InputRange,
  SelectDropdown
} from 'components';
import SearchTextInputContainer from 'containers/SearchTextInputContainer';

import ProfessionalCard from './ProfessionalCard';
import stylesheet from './index.css';

class ProfessionalSearch extends Component {
  static propTypes = {
    onProfessionalChoose: PropTypes.func.isRequired,
    onRequestButtonClick: PropTypes.func.isRequired,
    professionals: PropTypes.array.isRequired,
    universities: PropTypes.array.isRequired,
    jobTitles: PropTypes.array.isRequired,
    onUniversityChoose: PropTypes.func.isRequired,
    onJobTitleChoose: PropTypes.func.isRequired,
    chosenUniversityId: PropTypes.string,
    chosenJobTitleId: PropTypes.string,
    handleSort: PropTypes.func,
    handleRangeChange: PropTypes.func
  };

  prepareDataToSelectDropdown = data => data.map(item => ({
    key: item.id,
    label: item.name || item.title,
    value: item.id
  }));

  handleSort = e =>
    this.props.handleSort(e.target.value);

  handleRangeChange = ({ minCost, maxCost }) =>
    this.props.handleRangeChange({ min: minCost, max: maxCost });

  handleUniversityChoose = e =>
    this.props.onUniversityChoose(e.target.value);

  handleJobTitleChoose = e =>
    this.props.onJobTitleChoose(e.target.value);

  renderProfessional = (professional) => {
    const handleRequestCallClick = () =>
      this.props.onRequestButtonClick({
        professionalId: professional.id
      });

    const handleProfessionalChoose = () =>
      this.props.onProfessionalChoose({
        userId: professional.user.id
      });

    return (
      <ProfessionalCard
        key={professional.id}
        professional={professional}
        onRequestButtonClick={handleRequestCallClick}
        onProfessionalChoose={handleProfessionalChoose}
      />
    );
  };

  renderLeftFilters = () => {
    const universities = this.props.universities &&
      [
        { key: 'Default Value', label: 'University', value: '' },
        ...this.prepareDataToSelectDropdown(this.props.universities)
      ];
    const jobTitles = this.props.jobTitles &&
      [
        { key: 'Default Value', label: 'Profession', value: '' },
        ...this.prepareDataToSelectDropdown(this.props.jobTitles)
      ];

    return (
      <div className="selects">
        <div className="hidden labels">FILTERS</div>
        {universities &&
        <SelectDropdown
          defaultValue={this.props.chosenUniversityId}
          className="selectDropdown"
          onChange={this.handleUniversityChoose}
          options={universities}
        />}
        {jobTitles &&
        <SelectDropdown
          defaultValue={this.props.chosenJobTitleId}
          className="selectDropdown"
          onChange={this.handleJobTitleChoose}
          options={jobTitles}
        />}
        <div className="hidden">
          <p className="hidden labels">PRICE RANGE</p>
          <InputRange onChange={this.handleRangeChange} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="con">
        <p className="title">Browse through more than 1000+ professionals in the US </p>
        <SearchTextInputContainer placeholder="search by name, profession, degree..." />
        <hr />
        <div className="step">
          {this.renderLeftFilters()}
          <div className="profs">
            <select
              className="hidden pricesFilter"
              defaultValue="LOWEST PRICE"
              onChange={this.handleSort}
            >
              <option key="LOWEST PRICE" value={'price_ASC'}>LOWEST PRICE</option>
              <option key="HIGHEST PRICE" value={'price_DESC'}>HIGHEST PRICE</option>
            </select>
            {
              this.props.professionals && this.props.professionals.map(
                this.renderProfessional)
            }
          </div>
        </div>

        <style jsx global> {stylesheet} </style>
      </div>
    );
  }
}

export default ProfessionalSearch;
